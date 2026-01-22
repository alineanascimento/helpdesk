import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('tickets', (table) => {
        table.uuid('id').primary().defaultTo(knex.fn.uuid())
        table.uuid('customer_id')
            .references('id').inTable('users')
            .onDelete('CASCADE')
            .notNullable()
        table.uuid('technician_id')
            .references('id').inTable('users')
            .onDelete('SET NULL')
            .nullable()
        table.enum('status', ['open', 'in_progress', 'closed']).defaultTo('open')
        table.decimal('total_price', 10, 2).notNullable().defaultTo(0)
        table.timestamps(true, true)
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('tickets')
}

