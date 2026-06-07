export interface Monitor {
  id?: number
  name?: string
  comment?: string
  status?: State
  entity?: Entity
  is_recursive?: boolean
  manufacturer?: Manufacturer
  user?: User
  user_tech?: User
  contact?: string
  contact_num?: string
  serial?: string
  otherserial?: string
  is_deleted?: boolean
  date_creation?: string
  date_mod?: string
  location?: Location
  type?: MonitorType
  model?: MonitorModel
  group?: Record<string, unknown>[]
  group_tech?: Record<string, unknown>[]
  uuid?: string
  autoupdatesystem?: AutoUpdateSystem
  size?: number
  has_microphone?: boolean
  has_speaker?: boolean
  has_subd?: boolean
  has_bnc?: boolean
  has_dvi?: boolean
  has_pivot?: boolean
  has_hdmi?: boolean
  has_displayport?: boolean
  is_global?: boolean
  is_template?: boolean
  template_name?: string
  ticket_tco?: number
  is_dynamic?: boolean
}
