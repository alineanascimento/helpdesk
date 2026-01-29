import { z } from 'zod'


export const createServiceSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  price: z.number().positive({ message: 'Price must be greater than 0' })
})


export const updateServiceSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters' }).optional(),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }).optional(),
  price: z.number().positive({ message: 'Price must be greater than 0' }).optional()
})


export type CreateServiceInput = z.infer<typeof createServiceSchema>
export type UpdateServiceInput = z.infer<typeof updateServiceSchema>