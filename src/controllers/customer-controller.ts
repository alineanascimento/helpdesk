import { Request, Response } from 'express'
import { createCustomerSchema, updateCustomerSchema } from '../schemas/customer-schema'
import {
  createCustomer,
  listCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer
} from '../services/customer-service'


export async function createCustomerController(req: Request, res: Response) {
  try {
    const data = createCustomerSchema.parse(req.body)
    const customer = await createCustomer(data)
    
    // Não retorna a senha!
    const { password, ...customerWithoutPassword } = customer
    
    return res.status(201).json({
      message: 'Customer created successfully',
      customer: customerWithoutPassword
    })
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}

export async function listCustomersController(req: Request, res: Response) {
  try {
    const customers = await listCustomers()
    
    return res.status(200).json(customers)
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}


export async function getCustomerController(req: Request, res: Response) {
  try {
    const { id } = req.params
    
    // Verifica permissão: só admin OU o próprio cliente
    if (req.user?.role !== 'admin' && req.user?.id !== id) {
      return res.status(403).json({ error: 'Forbidden' })
    }
    
    const customer = await getCustomerById(id as string)
    
    return res.status(200).json(customer)
  } catch (error: any) {
    return res.status(404).json({ error: error.message })
  }
}


export async function updateCustomerController(req: Request, res: Response) {
  try {
    const { id } = req.params
    
    // Verifica permissão: só admin OU o próprio cliente
    if (req.user?.role !== 'admin' && req.user?.id !== id) {
      return res.status(403).json({ error: 'Forbidden' })
    }
    
    const data = updateCustomerSchema.parse(req.body)
    
    await updateCustomer(id as string, data)
    
    return res.status(200).json({ message: 'Customer updated successfully' })
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}


export async function deleteCustomerController(req: Request, res: Response) {
  try {
    const { id } = req.params
    
    // Verifica permissão: só admin OU o próprio cliente
    if (req.user?.role !== 'admin' && req.user?.id !== id) {
      return res.status(403).json({ error: 'Forbidden' })
    }
    
    await deleteCustomer(id as string)  
    
    return res.status(200).json({ message: 'Customer deleted successfully' })
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}