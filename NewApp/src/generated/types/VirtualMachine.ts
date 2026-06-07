export interface VirtualMachine {
  id?: number
  itemtype?: string
  items_id?: number
  entity?: Entity
  name?: string
  state?: VirtualMachineState
  system?: VirtualMachineSystem
  type?: VirtualMachineType
  uuid?: string
  vcpu?: number
  ram?: number
  is_deleted?: boolean
  is_dynamic?: boolean
  comment?: string
  date_creation?: string
  date_mod?: string
}
