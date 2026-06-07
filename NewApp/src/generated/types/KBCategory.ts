export interface KBCategory {
  id?: number
  name?: string
  completename?: string
  comment?: string
  entity?: Entity
  is_recursive?: boolean
  parent?: KnowbaseItemCategory
  level?: number
  date_creation?: string
  date_mod?: string
}
