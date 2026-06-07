export interface KBArticleComment {
  id?: number
  kbarticle?: KnowbaseItem
  user?: User
  language?: string
  comment?: string
  parent?: KnowbaseItem_Comment
  date_creation?: string
  date_mod?: string
}
