export interface Cable {
  id?: number
  name?: string
  comment?: string
  entity?: Entity
  is_recursive?: boolean
  otherserial?: string
  state?: State
  user?: User
  group?: Record<string, unknown>[]
  user_tech?: User
  group_tech?: Record<string, unknown>[]
  is_deleted?: boolean
  itemtype_endpoint_a?: string
  items_id_endpoint_a?: number
  socketmodel_endpoint_a?: Glpi\SocketModel
  sockets_id_endpoint_a?: number
  itemtype_endpoint_b?: string
  items_id_endpoint_b?: number
  socketmodel_endpoint_b?: Glpi\SocketModel
  sockets_id_endpoint_b?: number
  date_creation?: string
  date_mod?: string
  cable_strand?: CableStrand
  type?: CableType
  is_template?: boolean
  template_name?: string
  color?: string
}
