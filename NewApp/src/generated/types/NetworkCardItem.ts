export interface NetworkCardItem {
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
  network_card?: DeviceNetworkCard
  busID?: string
  mac?: string
}
