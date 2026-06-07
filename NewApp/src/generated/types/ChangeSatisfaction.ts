export interface ChangeSatisfaction {
  id?: number
  change?: Change
  type?: number
  date_begin?: string
  date_answered?: string
  rating?: number
  rating_scaled_5?: number
  comment?: string
}
