import { Request, Response } from 'express'
import { createServiceSchema, updateServiceSchema } from '../schemas/service-schema'
import {
  createService,
  listServices,
  getServiceById,
  updateService,
  deactivateService
} from '../services/service-service'



export async function createServiceController(req: Request, res: Response) {
  try {
    const data = createServiceSchema.parse(req.body)
    const service = await createService(data)
    
    return res.status(201).json({
      message: 'Service created successfully',
      service
    })
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}


export async function listServicesController(req: Request, res: Response) {
  try {
    // Pega query param opcional: ?activeOnly=true
    const activeOnly = req.query.activeOnly === 'true'
    
    const services = await listServices(activeOnly)
    
    return res.status(200).json(services)
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}

export async function getServiceController(req: Request, res: Response) {
  try {
    const { id } = req.params
    const service = await getServiceById(id as string)
    
    return res.status(200).json(service)
  } catch (error: any) {
    return res.status(404).json({ error: error.message })
  }
}

export async function updateServiceController(req: Request, res: Response) {
  try {
    const { id } = req.params
    const data = updateServiceSchema.parse(req.body)
    
    await updateService(id as string, data)
    
    return res.status(200).json({ message: 'Service updated successfully' })
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}

export async function deactivateServiceController(req: Request, res: Response) {
  try {
    const { id } = req.params
    
    await deactivateService(id as string)
    
    return res.status(200).json({ message: 'Service deactivated successfully' })
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}