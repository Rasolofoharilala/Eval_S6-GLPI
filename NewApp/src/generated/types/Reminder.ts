export interface Reminder {
  id?: number
  uuid?: string
  name?: string
  text?: string
  date?: string
  user?: User
  date_begin?: string
  date_end?: string
  is_planned?: boolean
  state?: number
  date_view_begin?: string
  date_view_end?: string
  date_creation?: string
  date_mod?: string
}
