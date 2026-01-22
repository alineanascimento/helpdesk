import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('ticket_services', (table) => {
        table.uuid('id').primary().defaultTo(knex.fn.uuid())
        table.uuid('ticket_id')
            .references('id').inTable('tickets')
            .onDelete('CASCADE')
            .notNullable()
        table.uuid('service_id')
            .references('id').inTable('services')
            .onDelete('CASCADE')
            .notNullable()
        table.decimal('price', 10, 2).notNullable()
        table.enum('added_by', ['customer', 'technician']).notNullable()
        table.timestamps(true, true)
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('ticket_services')
}

