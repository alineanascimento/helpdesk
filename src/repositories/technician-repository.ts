import { db } from '../config/database'

export interface Technician {
  id: string
  user_id: string
  availability: string // JSON stringified
  must_change_password: boolean
  created_at: Date
  updated_at: Date
}
// Dados combinados (user + technician) que serão retornados
export interface TechnicianWithUser {
  id: string
  name: string
  email: string
  avatar: string | null
  availability: string[]
  must_change_password: boolean
}


// CREATE
export async function createTechnician(data: {
  name: string
  email: string
  password: string
  availability: string[]
}) {
  // 1. Cria o user
  // o const [user] faz o destructuring do array retornado pelo insert do knex, já que o knex retorna um array com os registros inseridos
  const [user] = await db('users').insert({
    name: data.name,
    email: data.email,
    password: data.password,
    role: 'technician'
  }).returning('*') // devolve os dados que foram inseridos 

  // 2. Cria o technician
  await db('technicians').insert({
    user_id: user.id,
    availability: JSON.stringify(data.availability),
    must_change_password: true
  })

  return user.id
}
// Seleciona só os campos que precisa (não traz password, por exemplo!)
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

  /***O problema:** No banco, `availability` tá como **string JSON**: `"['08:00','09:00']"`

**A solução:** `JSON.parse()` converte de volta pra **array**: `['08:00', '09:00']`

**O `...tech`** = spread operator, copia todos os campos do objeto

**O `availability: JSON.parse(...)`** = sobrescreve só o campo `availability` */
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
  /*1. `data.name` → verifica se existe (não é `undefined`)
2. **SE** existir → `{ name: data.name }` (cria objeto com esse campo)
3. **SE NÃO** existir → retorna `false`
4. `...` → spread operator: "espalha" o objeto (se existir) */
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
