export { sourceSnapshots, type InsertSourceSnapshot } from './modules/sources/source-snapshot'
export { users, type InsertUser } from './modules/users/users'

import { sourceSnapshots } from './modules/sources/source-snapshot'
import { users } from './modules/users/users'

export const sqliteTableDefs = {
  users,
  sourceSnapshots,
} as const
