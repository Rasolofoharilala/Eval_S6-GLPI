export interface GraphicCardItem {
  id?: number
  itemtype?: string
  items_id?: number
  entity?: Entity
  is_recursive?: boolean
  serial?: string
  otherserial?: string
  location?: Location
  status?: State
  is_deleted?: boolean
  is_dynamic?: boolean
  graphic_card?: DeviceGraphicCard
  busID?: string
  memory?: number
}
