import { db } from '../config/database'


export interface Service {
    id: string
    name: string
    description: string
    price: number
    is_active: boolean
    created_at: Date
    updated_at: Date
}


export async function createService(data: {
  name: string
  description: string
  price: number
}) {
  const [service] = await db('services')
    .insert({
      name: data.name,
      description: data.description,
      price: data.price,
      is_active: true 
    })
    .returning('*')

  return service
}

export async function findAllServices(activeOnly: boolean = false): Promise<Service[]> {
  const query = db('services').select('*')

  if (activeOnly) {
    query.where('is_active', true)
  }

  return query
}

export async function findServiceById(id: string): Promise<Service | undefined> {
  return db('services').where('id', id).first()
}

export async function updateService(id: string, data: {
  name?: string
  description?: string
  price?: number
}) {
  await db('services').where('id', id).update({
    ...(data.name && { name: data.name }),
    ...(data.description && { description: data.description }),
    ...(data.price !== undefined && { price: data.price })
  })
}

// soft delete
export async function deactivateService(id: string) {
  await db('services').where('id', id).update({ is_active: false })
}

