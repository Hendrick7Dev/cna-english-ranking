'use server'

import { neon } from '@neondatabase/serverless'
import { revalidatePath } from 'next/cache'

const sql = neon(process.env.DATABASE_URL!)

// ===== STUDENT ACTIONS =====

export async function createStudent(formData: FormData) {
  try {
    const name = formData.get('name') as string
    const level = formData.get('level') as string || 'Beginner'
    const points = parseInt(formData.get('points') as string) || 0

    if (!name || name.trim().length === 0) {
      throw new Error('Nome é obrigatório')
    }

    const result = await sql`
      INSERT INTO students (name, level, points, is_active, created_at, updated_at)
      VALUES (${name.trim()}, ${level}, ${points}, true, now(), now())
      RETURNING id
    `

    if (result.length === 0) {
      throw new Error('Erro ao criar aluno')
    }

    revalidatePath('/dashboard/students')
    revalidatePath('/')
    return { success: true, message: 'Aluno criado com sucesso!' }
  } catch (error) {
    console.error('Erro ao criar aluno:', error)
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Erro interno do servidor' 
    }
  }
}

export async function updateStudent(id: number, formData: FormData) {
  try {
    const name = formData.get('name') as string
    const level = formData.get('level') as string
    const points = parseInt(formData.get('points') as string) || 0
    const isActive = formData.get('is_active') === 'true'

    if (!name || name.trim().length === 0) {
      throw new Error('Nome é obrigatório')
    }

    await sql`
      UPDATE students 
      SET name = ${name.trim()}, 
          level = ${level}, 
          points = ${points}, 
          is_active = ${isActive},
          updated_at = now()
      WHERE id = ${id}
    `

    revalidatePath('/dashboard/students')
    revalidatePath('/')
    return { success: true, message: 'Aluno atualizado com sucesso!' }
  } catch (error) {
    console.error('Erro ao atualizar aluno:', error)
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Erro interno do servidor' 
    }
  }
}

export async function deleteStudent(id: number) {
  try {
    // Verificar se o aluno tem entradas de pontos
    const pointEntries = await sql`
      SELECT COUNT(*) as count FROM point_entries WHERE student_id = ${id}
    `

    if (pointEntries[0]?.count > 0) {
      // Se tem entradas, marcar como inativo ao invés de deletar
      await sql`
        UPDATE students 
        SET is_active = false, updated_at = now()
        WHERE id = ${id}
      `
    } else {
      // Se não tem entradas, deletar completamente
      await sql`DELETE FROM students WHERE id = ${id}`
    }

    revalidatePath('/dashboard/students')
    revalidatePath('/')
    return { success: true, message: 'Aluno removido com sucesso!' }
  } catch (error) {
    console.error('Erro ao deletar aluno:', error)
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Erro interno do servidor' 
    }
  }
}

// ===== POINT ENTRIES ACTIONS =====

export async function addPoints(formData: FormData) {
  try {
    const studentId = parseInt(formData.get('student_id') as string)
    const activityId = parseInt(formData.get('activity_id') as string)
    const pointsAwarded = parseInt(formData.get('points_awarded') as string)
    const notes = formData.get('notes') as string

    if (!studentId || !activityId || !pointsAwarded) {
      throw new Error('Todos os campos são obrigatórios')
    }

    if (pointsAwarded <= 0) {
      throw new Error('Pontos devem ser maiores que zero')
    }

    // Verificar se o aluno existe e está ativo
    const student = await sql`
      SELECT id, name FROM students WHERE id = ${studentId} AND is_active = true
    `

    if (student.length === 0) {
      throw new Error('Aluno não encontrado ou inativo')
    }

    // Verificar se a atividade existe e está ativa
    const activity = await sql`
      SELECT id, description FROM point_activities WHERE id = ${activityId} AND is_active = true
    `

    if (activity.length === 0) {
      throw new Error('Atividade não encontrada ou inativa')
    }

    // Inserir entrada de pontos
    await sql`
      INSERT INTO point_entries (student_id, activity_id, points_awarded, notes, created_at)
      VALUES (${studentId}, ${activityId}, ${pointsAwarded}, ${notes || null}, now())
    `

    // Simplesmente somar os pontos ao valor atual
    await sql`
      UPDATE students 
      SET points = points + ${pointsAwarded}, updated_at = now()
      WHERE id = ${studentId}
    `

    revalidatePath('/dashboard')
    revalidatePath('/')
    revalidatePath('/dashboard/students')
    
    return { 
      success: true, 
      message: `+${pointsAwarded} pontos adicionados para ${student[0].name}!` 
    }
  } catch (error) {
    console.error('Erro ao adicionar pontos:', error)
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Erro interno do servidor' 
    }
  }
}

// ===== ACTIVITY ACTIONS =====

export async function createActivity(formData: FormData) {
  try {
    const description = formData.get('description') as string
    const pointValue = parseInt(formData.get('point_value') as string)

    if (!description || description.trim().length === 0) {
      throw new Error('Descrição é obrigatória')
    }

    if (!pointValue || pointValue <= 0) {
      throw new Error('Valor de pontos deve ser maior que zero')
    }

    await sql`
      INSERT INTO point_activities (description, point_value, is_active, created_at, updated_at)
      VALUES (${description.trim()}, ${pointValue}, true, now(), now())
    `

    revalidatePath('/dashboard')
    return { success: true, message: 'Atividade criada com sucesso!' }
  } catch (error) {
    console.error('Erro ao criar atividade:', error)
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Erro interno do servidor' 
    }
  }
}

export async function updateActivity(id: number, formData: FormData) {
  try {
    const description = formData.get('description') as string
    const pointValue = parseInt(formData.get('point_value') as string)
    const isActive = formData.get('is_active') === 'true'

    if (!description || description.trim().length === 0) {
      throw new Error('Descrição é obrigatória')
    }

    if (!pointValue || pointValue <= 0) {
      throw new Error('Valor de pontos deve ser maior que zero')
    }

    await sql`
      UPDATE point_activities 
      SET description = ${description.trim()}, 
          point_value = ${pointValue}, 
          is_active = ${isActive},
          updated_at = now()
      WHERE id = ${id}
    `

    revalidatePath('/dashboard')
    return { success: true, message: 'Atividade atualizada com sucesso!' }
  } catch (error) {
    console.error('Erro ao atualizar atividade:', error)
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Erro interno do servidor' 
    }
  }
}

export async function deleteActivity(id: number) {
  try {
    // Verificar se a atividade tem entradas de pontos
    const pointEntries = await sql`
      SELECT COUNT(*) as count FROM point_entries WHERE activity_id = ${id}
    `

    if (pointEntries[0]?.count > 0) {
      // Se tem entradas, marcar como inativa ao invés de deletar
      await sql`
        UPDATE point_activities 
        SET is_active = false, updated_at = now()
        WHERE id = ${id}
      `
    } else {
      // Se não tem entradas, deletar completamente
      await sql`DELETE FROM point_activities WHERE id = ${id}`
    }

    revalidatePath('/dashboard')
    return { success: true, message: 'Atividade removida com sucesso!' }
  } catch (error) {
    console.error('Erro ao deletar atividade:', error)
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Erro interno do servidor' 
    }
  }
}
