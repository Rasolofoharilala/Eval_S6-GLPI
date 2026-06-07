export interface Socket {
  id?: number
  name?: string
  comment?: string
  location?: Location
  model?: Glpi\SocketModel
  wiring_side?: number
  itemtype?: string
  items_id?: number
  network_port?: NetworkPort
  date_creation?: string
  date_mod?: string
}
