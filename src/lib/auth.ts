'use server'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'

export async function login(password: string) {
  if (password === ADMIN_PASSWORD) {
    const cookieStore = await cookies()
    cookieStore.set('admin-auth', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7 // 7 dias
    })
    return { success: true }
  }
  return { success: false, message: 'Senha incorreta' }
}

export async function loginAction(formData: FormData) {
  const password = formData.get('password') as string
  const result = await login(password)
  
  if (result.success) {
    redirect('/dashboard')
  } else {
    return result
  }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('admin-auth')
  redirect('/')
}

export async function isAuthenticated() {
  const cookieStore = await cookies()
  const authCookie = cookieStore.get('admin-auth')
  return authCookie?.value === 'true'
}

export async function requireAuth() {
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    redirect('/login')
  }
}
