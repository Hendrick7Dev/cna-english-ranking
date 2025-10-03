// Tipos TypeScript para o banco de dados
// Substitui o schema do Drizzle por tipos simples

export interface Student {
  id: number;
  name: string;
  level: string;
  points: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface NewStudent {
  name: string;
  level?: string;
  points?: number;
  is_active?: boolean;
}

export interface PointActivity {
  id: number;
  description: string;
  point_value: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface NewPointActivity {
  description: string;
  point_value: number;
  is_active?: boolean;
}

export interface PointEntry {
  id: number;
  student_id: number;
  activity_id: number;
  points_awarded: number;
  notes?: string;
  created_at: Date;
}

export interface NewPointEntry {
  student_id: number;
  activity_id: number;
  points_awarded: number;
  notes?: string;
}

// Tipos para queries com joins
export interface PointEntryWithActivity extends PointEntry {
  activity_id: number;
  activity_description: string;
  activity_point_value: number;
}

export interface PointEntryWithStudentAndActivity extends PointEntry {
  student_id: number;
  student_name: string;
  activity_id: number;
  activity_description: string;
}

export interface StudentWithCalculatedPoints extends Student {
  calculatedPoints: number;
}
