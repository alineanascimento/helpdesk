import { Knex } from 'knex';
import bcrypt from 'bcryptjs';

export async function seed(knex: Knex): Promise<void> {
  await knex('users').del();

  const hashedPassword = await bcrypt.hash('admin123', 10);

  await knex('users').insert({
    name: 'Administrador',
    email: 'admin@helpdesk.com',
    password: hashedPassword,
    role: 'admin',
  });
}
