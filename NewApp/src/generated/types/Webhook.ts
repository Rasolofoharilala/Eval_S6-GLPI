export interface Webhook {
  id?: number
  entity?: Entity
  is_recursive?: boolean
  name?: string
  comment?: string
  category?: WebhookCategory
  itemtype?: string
  event?: string
  payload?: string
  use_default_payload?: boolean
  custom_headers?: string
  url?: string
  secret?: string
  use_cra_challenge?: boolean
  http_method?: string
  sent_try?: number
  is_active?: boolean
  save_response_body?: boolean
  log_in_item_history?: boolean
  date_creation?: string
  date_mod?: string
  use_oauth?: boolean
  oauth_url?: string
  clientid?: string
  clientsecret?: string
}
