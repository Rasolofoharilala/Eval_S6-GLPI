export interface GraphicCard {
  id?: number
  designation?: string
  comment?: string
  manufacturer?: Manufacturer
  entity?: Entity
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
  chipset?: string
  memory_default?: number
  interface?: InterfaceType
  model?: DeviceGraphicCardModel
}
