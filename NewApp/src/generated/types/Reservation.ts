export interface Reservation {
  id?: number
  reservable_item?: ReservationItem
  comment?: string
  user?: User
  group?: number
  date_begin?: string
  date_end?: string
}
