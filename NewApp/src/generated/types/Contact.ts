export interface Contact {
  id?: number
  name?: string
  comment?: string
  entity?: Entity
  date_creation?: string
  date_mod?: string
  type?: ContactType
  is_deleted?: boolean
}
