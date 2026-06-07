export interface DashboardItem {
  id?: number
  dashboard?: Glpi\Dashboard\Dashboard
  unique_key?: string
  card?: string
  x?: number
  y?: number
  width?: number
  height?: number
  card_options?: string
}
