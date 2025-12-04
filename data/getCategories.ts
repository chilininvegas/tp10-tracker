import 'server-only'
import { db } from '@/db'
import { cats } from '@/db/schema'

const getCategories = async () => {
  const categories = await db.select().from(cats)
  return categories
}

export { getCategories }
