import { Request, Response } from 'express'
import { createTechnicianSchema, updateTechnicianSchema } from '../schemas/technician-schema'
import {
  createTechnician,
  listTechnicians,
  getTechnicianById,
  updateTechnician
} from '../services/technician-service'

export async function createTechnicianController(req: Request, res: Response) {
  try {
    // 1. Valida com Zod
    const data = createTechnicianSchema.parse(req.body)

    // 2. Chama o service
    const result = await createTechnician(data)

    // 3. Retorna sucesso (201 = Created)
    return res.status(201).json({
      message: 'Technician created successfully',
      technician: {
        id: result.id,
        provisionalPassword: result.provisionalPassword
      }
    })
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}

export async function listTechniciansController(req: Request, res: Response) {
  try {
    const technicians = await listTechnicians()

    return res.status(200).json(technicians)

  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}

export async function getTechnicianController(req: Request, res: Response) {
  try {
   const { id } = req.params
   
   const technician = await getTechnicianById(id as string)
   
   return res.status(200).json(technician)

  } catch (error: any) {

    return res.status(404).json({ error: error.message })
  }
}

export async function updateTechnicianController(req: Request, res: Response) {
  try {
    const { id } = req.params
    const data = updateTechnicianSchema.parse(req.body)

    await updateTechnician(id as string, data)

    return res.status(200).json({ message: 'Technician updated successfully' })

  } catch (error: any) {

    return res.status(400).json({ error: error.message })
  }
}
