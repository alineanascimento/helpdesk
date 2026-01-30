import { z } from 'zod'


export const createCustomerSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
  email: z.email({ message: 'Invalid email format' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' })
})


export const updateCustomerSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters' }).optional(),
  email: z.email({ message: 'Invalid email format' }).optional(),
  avatar: z.url({ message: 'Avatar must be a valid URL' }).nullable().optional()
})


export type CreateCustomerInput = z.infer<typeof createCustomerSchema>
export type UpdateCustomerInput = z.infer<typeof updateCustomerSchema>