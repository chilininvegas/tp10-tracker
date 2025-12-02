import dotenv from 'dotenv'
import {drizzle} from 'drizzle-orm/neon-http'
import {cats} from './db/schema'

dotenv.config({path: '.env.local'})

// Environment variable is not defined when running from the command line
const db = drizzle(process.env.DATABASE_URL!)

const categoriesSeedData: (typeof cats.$inferInsert)[] = [
  {name: 'Salary', type: 'Income'},
  {name: 'Rental Income', type: 'Income'},
  {name: 'Business Income', type: 'Income'},
  {name: 'Investments', type: 'Income'},
  {name: 'Other', type: 'Income'},
  {name: 'Housing', type: 'Expense'},
  {name: 'Transport', type: 'Expense'},
  {name: 'Food & Groceries', type: 'Expense'},
  {name: 'Health', type: 'Expense'},
  {name: 'Entertainment & Leisure', type: 'Expense'},
  {name: 'Other', type: 'Expense'}
]


async function main() {
  await db.insert(cats).values(categoriesSeedData)
}

main()
