export interface Appliance_Item {
  id?: number
  appliance?: Appliance
  itemtype?: string
  items_id?: number
  environment?: Record<string, unknown>[]
  domain?: Record<string, unknown>[]
  location?: Record<string, unknown>[]
  network?: Record<string, unknown>[]
}
