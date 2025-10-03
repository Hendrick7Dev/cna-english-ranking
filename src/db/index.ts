import { neon } from '@neondatabase/serverless';
import type { 
  Student, 
  PointActivity, 
  PointEntry, 
  PointEntryWithActivity, 
  PointEntryWithStudentAndActivity,
  StudentWithCalculatedPoints 
} from './types';

const sql = neon(process.env.DATABASE_URL!);

// ===== STUDENTS QUERIES =====

export async function getAllStudents(): Promise<Student[]> {
  return await sql`
    SELECT id, name, level, points, is_active, created_at, updated_at 
    FROM students 
    WHERE is_active = true 
    ORDER BY points DESC
  ` as Student[];
}

export async function getStudentById(id: number): Promise<Student | null> {
  const result = await sql`
    SELECT id, name, level, points, is_active, created_at, updated_at 
    FROM students 
    WHERE id = ${id} 
    LIMIT 1
  ` as Student[];
  
  return result[0] || null;
}

export async function getStudentWithPoints(id: number): Promise<StudentWithCalculatedPoints | null> {
  const student = await getStudentById(id);
  if (!student) return null;

  // Calcular pontos totais das entradas
  const pointEntries = await sql`
    SELECT COALESCE(SUM(points_awarded), 0) as total_points
    FROM point_entries 
    WHERE student_id = ${id}
  `;

  const calculatedPoints = Number(pointEntries[0]?.total_points || 0);
  
  return {
    ...student,
    calculatedPoints
  };
}

// ===== ACTIVITIES QUERIES =====

export async function getAllActivities(): Promise<PointActivity[]> {
  return await sql`
    SELECT id, description, point_value, is_active, created_at, updated_at 
    FROM point_activities 
    WHERE is_active = true 
    ORDER BY description
  ` as PointActivity[];
}

export async function getActivityById(id: number): Promise<PointActivity | null> {
  const result = await sql`
    SELECT id, description, point_value, is_active, created_at, updated_at 
    FROM point_activities 
    WHERE id = ${id} 
    LIMIT 1
  ` as PointActivity[];
  
  return result[0] || null;
}

// ===== POINT ENTRIES QUERIES =====

export async function getPointEntriesByStudent(studentId: number): Promise<PointEntryWithActivity[]> {
  return await sql`
    SELECT 
      pe.id,
      pe.points_awarded,
      pe.notes,
      pe.created_at,
      pa.id as activity_id,
      pa.description as activity_description,
      pa.point_value as activity_point_value
    FROM point_entries pe
    INNER JOIN point_activities pa ON pe.activity_id = pa.id
    WHERE pe.student_id = ${studentId}
    ORDER BY pe.created_at DESC
  ` as PointEntryWithActivity[];
}

export async function getRecentPointEntries(limit: number = 10): Promise<PointEntryWithStudentAndActivity[]> {
  return await sql`
    SELECT 
      pe.id,
      pe.points_awarded,
      pe.notes,
      pe.created_at,
      s.id as student_id,
      s.name as student_name,
      pa.id as activity_id,
      pa.description as activity_description
    FROM point_entries pe
    INNER JOIN students s ON pe.student_id = s.id
    INNER JOIN point_activities pa ON pe.activity_id = pa.id
    ORDER BY pe.created_at DESC
    LIMIT ${limit}
  ` as PointEntryWithStudentAndActivity[];
}

// ===== DASHBOARD STATS =====

export async function getDashboardStats() {
  const [totalStudents, totalActivities, totalPoints, recentEntries] = await Promise.all([
    sql`SELECT COUNT(*) as count FROM students WHERE is_active = true`,
    sql`SELECT COUNT(*) as count FROM point_activities WHERE is_active = true`,
    sql`SELECT COALESCE(SUM(points_awarded), 0) as total FROM point_entries`,
    getRecentPointEntries(5)
  ]);

  const averagePoints = totalStudents[0]?.count 
    ? Math.round(Number(totalPoints[0]?.total || 0) / totalStudents[0].count)
    : 0;

  return {
    totalStudents: totalStudents[0]?.count || 0,
    totalActivities: totalActivities[0]?.count || 0,
    totalPoints: totalPoints[0]?.total || 0,
    averagePoints,
    recentEntries
  };
}

// ===== RANKING QUERIES =====

export async function getStudentsRanking(): Promise<StudentWithCalculatedPoints[]> {
  const students = await getAllStudents();
  
  // Para cada aluno, calcular pontos totais (entradas + pontos iniciais)
  const studentsWithCalculatedPoints = await Promise.all(
    students.map(async (student) => {
      // Calcular pontos das entradas
      const pointEntries = await sql`
        SELECT COALESCE(SUM(points_awarded), 0) as total_points
        FROM point_entries 
        WHERE student_id = ${student.id}
      `;

      const entriesPoints = Number(pointEntries[0]?.total_points || 0);
      
      // Pontos totais = pontos das entradas + pontos iniciais do seed
      const totalPoints = entriesPoints + student.points;
      
      return {
        ...student,
        calculatedPoints: totalPoints
      };
    })
  );

  // Ordenar por pontos calculados
  return studentsWithCalculatedPoints.sort((a, b) => b.calculatedPoints - a.calculatedPoints);
}
