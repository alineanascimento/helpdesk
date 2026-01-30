import bcrypt from 'bcryptjs'
import { findByEmail } from '../repositories/user-repository'
import { 
  createTechnician as createTechnicianRepo,
  findAllTechnicians,
  findTechnicianById as findTechnicianByIdRepo,
  updateTechnician as updateTechnicianRepo
} from '../repositories/technician-repository'


function generateRandomPassword(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$'
  let password = 'Tech@'
  
  for (let i = 0; i < 8; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  
  return password
}

export async function createTechnician(data: {
  name: string
  email: string
  availability: string[]
}) {
    // 1. Verifica se email já existe
  const existingUser = await findByEmail(data.email)
  
  if (existingUser) {
    throw new Error('Email already in use')
  }
  // 2. Gera senha provisória
  const provisionalPassword = generateRandomPassword()

  // 3. Criptografa a senha
  const hashedPassword = await bcrypt.hash(provisionalPassword, 10)

  // 4. Cria no banco
  const userId = await createTechnicianRepo({
    name: data.name,
    email: data.email,
    password: hashedPassword,
    availability: data.availability
  })

  // 5. Retorna ID e senha provisória
  return {
    id: userId,
    provisionalPassword // ← Admin precisa repassar pro técnico!
  }
}

export async function listTechnicians() {
  return findAllTechnicians()
}

export async function getTechnicianById(id: string) {
  const technician = await findTechnicianByIdRepo(id)
  
  if (!technician) {
    throw new Error('Technician not found')
  }
  
  return technician
}

export async function updateTechnician(id: string, data: {
  name?: string
  email?: string
  avatar?: string
  availability?: string[]
}) {
    // 1. Verifica se técnico existe
  const technician = await findTechnicianByIdRepo(id)
  
  if (!technician) {
    throw new Error('Technician not found')
  }

  // 2. Se tiver novo email, verifica se já não tá em uso
  if (data.email && data.email !== technician.email) {
    const existingUser = await findByEmail(data.email)
    
    if (existingUser) {
      throw new Error('Email already in use')
    }
  }
  // 3. Atualiza
  await updateTechnicianRepo(id, data)
}