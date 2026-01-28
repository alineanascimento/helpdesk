import { db } from '../config/database'


// define o formato de um usuario 
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
// acessa a tabela users, filtra pelo email, pega só o primeiro resultado e retorna um usuer ou undefined
export async function findByEmail(email: string): Promise<User | undefined> {
  return db('users')
    .where({ email })
    .first()
}
