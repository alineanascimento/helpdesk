import { Knex } from "knex";
import bcrypt from 'bcryptjs';  

export async function seed(knex: Knex): Promise<void> {

   const technicians = await knex('users').insert([
  {
    name: 'João Silva',
    email: 'joao@helpdesk.com',
    password: await bcrypt.hash('tecnico123', 10),  // ← SENHA AQUI!
    role: 'technician'  // ← marca que é técnico
  },
  {
    name: 'Maria Santos',
    email: 'maria@helpdesk.com',
    password: await bcrypt.hash('tecnico123', 10),  
    role: 'technician'
  },
  {
    name: 'Pedro Costa',
    email: 'pedro@helpdesk.com',
    password: await bcrypt.hash('tecnico123', 10),  
    role: 'technician'
  }
]).returning('*')  // ← pega os dados de volta (incluindo os IDs gerados)
};
