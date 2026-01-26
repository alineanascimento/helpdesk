import { Knex } from 'knex';
import bcrypt from 'bcryptjs';

export async function seed(knex: Knex): Promise<void> {
  // Deleta técnicos antigos
  await knex('technicians').del();
  await knex('users').del().where('role', 'technician');

  const technicians = await knex('users')
    .insert([
      {
        name: 'João Silva',
        email: 'joao@helpdesk.com',
        password: await bcrypt.hash('tecnico123', 10),
        role: 'technician',
      },
      {
        name: 'Maria Santos',
        email: 'maria@helpdesk.com',
        password: await bcrypt.hash('tecnico123', 10),
        role: 'technician',
      },
      {
        name: 'Pedro Costa',
        email: 'pedro@helpdesk.com',
        password: await bcrypt.hash('tecnico123', 10),
        role: 'technician',
      },
    ])
    .returning('*');

  // Agora insere na tabela technicians com os horários
  await knex('technicians').insert([
    {
      user_id: technicians[0].id,
      availability: JSON.stringify([
        '08:00',
        '09:00',
        '10:00',
        '11:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
      ]),
      must_change_password: true,
    },
    {
      user_id: technicians[1].id,
      availability: JSON.stringify([
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '16:00',
        '17:00',
        '18:00',
        '19:00',
      ]),
      must_change_password: true,
    },
    {
      user_id: technicians[2].id,
      availability: JSON.stringify([
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '18:00',
        '19:00',
        '20:00',
        '21:00',
      ]),
      must_change_password: true,
    },
  ]);
}
