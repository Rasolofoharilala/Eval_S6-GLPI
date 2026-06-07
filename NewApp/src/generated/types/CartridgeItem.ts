export interface CartridgeItem {
  id?: number
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
  user?: User
  user_tech?: User
  printer_models?: Record<string, unknown>[]
  cartridges?: Record<string, unknown>[]
}
