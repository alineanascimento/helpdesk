import bcrypt from 'bcryptjs'
import { findByEmail } from '../repositories/user-repository'
import {
  createCustomer as createCustomerRepo,
  findAllCustomers,
  findCustomerById as findCustomerByIdRepo,
  updateCustomer as updateCustomerRepo,
  deleteCustomer as deleteCustomerRepo
} from '../repositories/customer-repository'




export async function createCustomer(data: {
  name: string
  email: string
  password: string
}) {
  // 1. Verifica se email já existe
  const existingUser = await findByEmail(data.email)
  
  if (existingUser) {
    throw new Error('Email already in use')
  }

  // 2. Criptografa a senha
  const hashedPassword = await bcrypt.hash(data.password, 10)

  // 3. Cria o cliente
  return createCustomerRepo({
    name: data.name,
    email: data.email,
    password: hashedPassword
  })
}

export async function listCustomers() {
  return findAllCustomers()
}

export async function getCustomerById(id: string) {
  const customer = await findCustomerByIdRepo(id)
  
  if (!customer) {
    throw new Error('Customer not found')
  }
  
  return customer
}

export async function updateCustomer(id: string, data: {
  name?: string
  email?: string
  avatar?: string | null
}) {
  // 1. Verifica se cliente existe
  const customer = await findCustomerByIdRepo(id)
  
  if (!customer) {
    throw new Error('Customer not found')
  }

  // 2. Se tiver novo email, verifica duplicação
  if (data.email && data.email !== customer.email) {
    const existingUser = await findByEmail(data.email)
    
    if (existingUser) {
      throw new Error('Email already in use')
    }
  }

  // 3. Atualiza
  await updateCustomerRepo(id as string, data)
}


export async function deleteCustomer(id: string) {  
  // 1. Verifica se cliente existe
  const customer = await findCustomerByIdRepo(id)
  
  if (!customer) {
    throw new Error('Customer not found')
  }

  // 2. Deleta
  await deleteCustomerRepo(id)
}