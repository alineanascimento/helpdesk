import { z } from 'zod'


export const createTechnicianSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
  email: z.email({ message: 'Invalid email format' }),
  availability: z.array(z.string()).min(1, { message: 'At least one time slot is required' })
})


export const updateTechnicianSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters' }).optional(),
  email: z.email({ message: 'Invalid email format' }).optional(),
  avatar: z.url({ message: 'Avatar must be a valid URL' }).optional(),
  availability: z.array(z.string()).min(1, { message: 'At least one time slot is required' }).optional()
})


export type CreateTechnicianInput = z.infer<typeof createTechnicianSchema>
export type UpdateTechnicianInput = z.infer<typeof updateTechnicianSchema>