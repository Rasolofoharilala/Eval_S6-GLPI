export interface FollowupTemplate {
  id?: number
  name?: string
  content?: string
  comment?: string
  entity?: Entity
  is_recursive?: boolean
  is_private?: boolean
  request_type?: RequestType
  date_creation?: string
  date_mod?: string
}
