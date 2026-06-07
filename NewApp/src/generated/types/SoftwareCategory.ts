export interface SoftwareCategory {
  id?: number
  name?: string
  completename?: string
  comment?: string
  parent?: SoftwareCategory
  level?: number
}
