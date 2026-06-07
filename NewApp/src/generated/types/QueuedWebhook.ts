export interface QueuedWebhook {
  id?: number
  itemtype?: string
  items_id?: number
  entity?: Entity
  is_deleted?: boolean
  sent_try?: number
  webhook?: Webhook
  url?: string
  create_time?: string
  send_time?: string
  sent_time?: string
  headers?: string
  body?: string
  event?: string
  last_status_code?: number
  http_method?: string
}
