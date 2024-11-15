import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('task_history', (table) => {
    table.increments('id').primary().notNullable();
    table
      .integer('task_id')
      .notNullable()
      .references('id')
      .inTable('tasks')
      .onDelete('CASCADE');
    table.string('type').notNullable();
    table.dateTime('created_at').defaultTo(knex.fn.now()).notNullable();
    table.string('from_state').notNullable();
    table.string('to_state').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('task_history');
}
