export interface Supplier {
  id?: number
  name?: string
  comment?: string
  entity?: Entity
  date_creation?: string
  date_mod?: string
  type?: SupplierType
  is_deleted?: boolean
}
