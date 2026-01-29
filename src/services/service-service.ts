import {
  createService as createServiceRepo,
  findAllServices,
  findServiceById as findServiceByIdRepo,
  updateService as updateServiceRepo,
  deactivateService as deactivateServiceRepo
} from '../repositories/service-repository'


async function checkServiceNameExists(name: string, excludeId?: string): Promise<boolean> {
  const services = await findAllServices()
  
  return services.some(service => 
    service.name.toLowerCase() === name.toLowerCase() && 
    service.id !== excludeId
  )
}


export async function createService(data: {
  name: string
  description: string
  price: number
}) {
  // Verifica se nome já existe
  const nameExists = await checkServiceNameExists(data.name)
  
  if (nameExists) {
    throw new Error('Service name already exists')
  }

  return createServiceRepo(data)
}


export async function listServices(activeOnly: boolean = false) {
  return findAllServices(activeOnly)
}


export async function getServiceById(id: string) {
  const service = await findServiceByIdRepo(id)
  
  if (!service) {
    throw new Error('Service not found')
  }
  
  return service
}

export async function updateService(id: string, data: {
  name?: string
  description?: string
  price?: number
}) {
  // Verifica se serviço existe
  const service = await findServiceByIdRepo(id)
  
  if (!service) {
    throw new Error('Service not found')
  }

  // Se tiver novo nome, verifica duplicação
  if (data.name && data.name !== service.name) {
    const nameExists = await checkServiceNameExists(data.name, id)
    
    if (nameExists) {
      throw new Error('Service name already exists')
    }
  }

  await updateServiceRepo(id, data)
}

export async function deactivateService(id: string) {
  const service = await findServiceByIdRepo(id)
  
  if (!service) {
    throw new Error('Service not found')
  }

  if (!service.is_active) {
    throw new Error('Service is already inactive')
  }

  await deactivateServiceRepo(id)
}