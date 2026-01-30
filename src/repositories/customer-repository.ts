import { db } from '../config/database'

export interface Customer {
  id: string
  name: string
  email: string
  avatar: string | null
  created_at: Date
  updated_at: Date
}

export async function createCustomer(data: {
  name: string
  email: string
  password: string
}) {
  const [customer] = await db('users')
    .insert({
      name: data.name,
      email: data.email,
      password: data.password,
      role: 'customer'
    })
    .returning('*')

  return customer
}

export async function findAllCustomers(): Promise<Customer[]> {
  return db('users')
    .select('id', 'name', 'email', 'avatar', 'created_at', 'updated_at')
    .where('role', 'customer')
}


export async function findCustomerById(id: string): Promise<Customer | undefined> {
  return db('users')
    .select('id', 'name', 'email', 'avatar', 'created_at', 'updated_at')
    .where({ id, role: 'customer' })
    .first()
}

export async function updateCustomer(id: string, data: {
  name?: string
  email?: string
  avatar?: string | null
}) {
  await db('users').where('id', id).update({
    ...(data.name && { name: data.name }),
    ...(data.email && { email: data.email }),
    ...(data.avatar !== undefined && { avatar: data.avatar })
  })
}

export async function deleteCustomer(id: string) {
  await db('users').where('id', id).delete()
}