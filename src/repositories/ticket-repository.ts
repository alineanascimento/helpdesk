import { db } from '../config/database'

export interface Ticket {
  id: string
  customer_id: string
  technician_id: string
  status: 'open' | 'in_progress' | 'closed'
  total_price: number
  created_at: Date
  updated_at: Date
}

export interface TicketWithDetails extends Ticket {
  customer_name: string
  technician_name: string
  services: Array<{
    id: string
    service_id: string
    service_name: string
    service_description: string
    price: number
    added_by: 'customer' | 'technician'
  }>
}


export async function createTicket(data: {
  customer_id: string
  technician_id: string
  service_ids: string[]
}) {
  return db.transaction(async (trx) => {
    // 1. Cria o ticket
    const [ticket] = await trx('tickets')
      .insert({
        customer_id: data.customer_id,
        technician_id: data.technician_id,
        status: 'open',
        total_price: 0  // Vai calcular depois
      })
      .returning('*')
      // 2. Busca os preços dos serviços
    const services = await trx('services')
      .whereIn('id', data.service_ids)
      .select('id', 'price')
    // 3. Insere os serviços no ticket
    const ticketServices = services.map(service => ({
      ticket_id: ticket.id,
      service_id: service.id,
      price: service.price,  // Salva o preço do momento!
      added_by: 'customer' as const
    }))
    
    await trx('ticket_services').insert(ticketServices)
    // 4. Calcula o total
    const total = services.reduce((sum, s) => sum + Number(s.price), 0)
    
    await trx('tickets')
      .where('id', ticket.id)
      .update({ total_price: total })
    return ticket.id
  })
}