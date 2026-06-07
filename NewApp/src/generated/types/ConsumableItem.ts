export interface ConsumableItem {
  id?: number
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
  user?: User
  user_tech?: User
  consumables?: Record<string, unknown>[]
}
