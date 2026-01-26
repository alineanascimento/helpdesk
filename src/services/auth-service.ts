import bcrypt from 'bcryptjs'
import { findByEmail } from '../repositories/user-repository'
import { generateToken } from '../utils/jwt'

export async function login(email: string, password: string) {
  const user = await findByEmail(email)
   
// 1. Busca o usuário

  if (!user) {
    throw new Error('Invalid credentials')
  }

// 2. Compara a senha
  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    throw new Error('Invalid credentials')
  }

// 3. Gera o token
  const token = generateToken({
    id: user.id,
    role: user.role
  })

// 4. Retorna o token + dados do user (SEM a senha!)
  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar
    }
  }
}
