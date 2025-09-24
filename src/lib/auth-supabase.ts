import { supabase } from './supabase'
import bcryptjs from 'bcryptjs'

export interface AdminUser {
  id: string
  email: string
  name: string
}

// Sign in admin with email/password
export async function signInAdmin(email: string, password: string): Promise<{ user: AdminUser | null; error: string | null }> {
  try {
    // First check if admin exists in our database
    const { data: admin, error: dbError } = await supabase
      .from('admins')
      .select('id, email, password, name')
      .eq('email', email)
      .single()

    if (dbError || !admin) {
      return { user: null, error: 'Invalid credentials' }
    }

    // Verify password
    const isValidPassword = await bcryptjs.compare(password, admin.password)
    if (!isValidPassword) {
      return { user: null, error: 'Invalid credentials' }
    }

    // Create a session using Supabase Auth with the admin email
    // We'll use a simple approach - store admin info in localStorage/session
    const adminUser: AdminUser = {
      id: admin.id,
      email: admin.email,
      name: admin.name
    }

    // Store admin session
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('admin_user', JSON.stringify(adminUser))
    }

    return { user: adminUser, error: null }
  } catch (error) {
    console.error('Sign in error:', error)
    return { user: null, error: 'Authentication failed' }
  }
}

// Sign out admin
export async function signOutAdmin(): Promise<void> {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('admin_user')
  }
}

// Get current admin user
export function getCurrentAdmin(): AdminUser | null {
  if (typeof window === 'undefined') return null
  
  try {
    const adminData = sessionStorage.getItem('admin_user')
    return adminData ? JSON.parse(adminData) : null
  } catch {
    return null
  }
}

// Check if user is admin
export function isAdmin(): boolean {
  return getCurrentAdmin() !== null
}
