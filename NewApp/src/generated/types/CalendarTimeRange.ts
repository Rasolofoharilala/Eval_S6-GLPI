export interface CalendarTimeRange {
  id?: number
  calendar?: Calendar
  entity?: Entity
  is_recursive?: boolean
  day_of_week?: number
  begin_time?: string
  end_time?: string
}
