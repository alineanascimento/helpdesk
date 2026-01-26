import { db } from '../config/database'

export interface User {
  id: string
  name: string
  email: string
  password: string
  role: 'admin' | 'technician' | 'customer'
  avatar: string | null
  created_at: Date
  updated_at: Date
}

export async function findByEmail(email: string): Promise<User | undefined> {
  return db('users')
    .where({ email })
    .first()
}
