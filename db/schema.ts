import {integer, numeric, pgTable, timestamp, varchar} from 'drizzle-orm/pg-core'

export const cats = pgTable('cats', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar('name', {length: 50}).notNull(),
  type: varchar({enum: ['Income', 'Expense']}).notNull()
})

export const xactions = pgTable('xactions', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: varchar('user_id', {length: 100}).notNull(),
  description: varchar('description', {length: 100}).notNull(),
  amount: numeric('amount', {precision: 12, scale: 2}).notNull(),
  transactionDate: timestamp('xaction_date').notNull(),
  categoryId: integer('category_id').references(() => cats.id).notNull()
})
