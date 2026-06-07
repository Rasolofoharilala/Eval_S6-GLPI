export interface FieldUnicity {
  id?: number
  name?: string
  entity?: Entity
  is_recursive?: boolean
  itemtype?: string
  fields?: string
  comment?: string
  is_active?: boolean
  action_refuse?: boolean
  action_notify?: boolean
  date_creation?: string
  date_mod?: string
}
