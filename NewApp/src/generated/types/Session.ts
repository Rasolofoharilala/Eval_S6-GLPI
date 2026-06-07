export interface Session {
  current_time?: string
  user_id?: number
  use_mode?: number
  friendly_name?: string
  name?: string
  real_name?: string
  first_name?: string
  default_entity?: number
  profiles?: number[]
  active_entities?: number[]
  active_profile?: Record<string, unknown>
  active_entity?: Record<string, unknown>
  groups?: number[]
}
