import { db } from '../config/database'

export interface Technician {
  id: string
  user_id: string
  availability: string // JSON stringified
  must_change_password: boolean
  created_at: Date
  updated_at: Date
}

export interface TechnicianWithUser {
  id: string
  name: string
  email: string
  avatar: string | null
  availability: string[]
  must_change_password: boolean
}

export async function createTechnician(data: {
  name: string
  email: string
  password: string
  availability: string[]
}) {
  // 1. Cria o user
  const [user] = await db('users').insert({
    name: data.name,
    email: data.email,
    password: data.password,
    role: 'technician'
  }).returning('*')

  // 2. Cria o technician
  await db('technicians').insert({
    user_id: user.id,
    availability: JSON.stringify(data.availability),
    must_change_password: true
  })

  return user.id
}

export async function findAllTechnicians(): Promise<TechnicianWithUser[]> {
  const technicians = await db('users')
    .select(
      'users.id',
      'users.name',
      'users.email',
      'users.avatar',
      'technicians.availability',
      'technicians.must_change_password'
    )
    .join('technicians', 'users.id', 'technicians.user_id')
    .where('users.role', 'technician')

  // Converte JSON string pra array
  return technicians.map(tech => ({
    ...tech,
    availability: JSON.parse(tech.availability)
  }))
}

export async function findTechnicianById(id: string): Promise<TechnicianWithUser | undefined> {
  const technician = await db('users')
    .select(
      'users.id',
      'users.name',
      'users.email',
      'users.avatar',
      'technicians.availability',
      'technicians.must_change_password'
    )
    .join('technicians', 'users.id', 'technicians.user_id')
    .where('users.id', id)
    .first()

  if (!technician) return undefined

  return {
    ...technician,
    availability: JSON.parse(technician.availability)
  }
}

export async function updateTechnician(id: string, data: {
  name?: string
  email?: string
  avatar?: string
  availability?: string[]
}) {
  // Atualiza users
  if (data.name || data.email || data.avatar) {
    await db('users').where('id', id).update({
      ...(data.name && { name: data.name }),
      ...(data.email && { email: data.email }),
      ...(data.avatar && { avatar: data.avatar })
    })
  }

  // Atualiza technicians
  if (data.availability) {
    await db('technicians')
      .where('user_id', id)
      .update({
        availability: JSON.stringify(data.availability)
      })
  }
}
