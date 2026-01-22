import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('technicians', (table) => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid())
    table.uuid('user_id')
      .references('id').inTable('users')
      .onDelete('CASCADE') 
      .notNullable()
    table.boolean('must_change_password').defaultTo(true)  
    table.json('availability').notNullable()
    table.timestamps(true, true) 
  })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('technicians')
}

