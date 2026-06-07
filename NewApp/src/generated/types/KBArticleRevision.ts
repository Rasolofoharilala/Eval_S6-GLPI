export interface KBArticleRevision {
  id?: number
  kbarticle?: KnowbaseItem
  revision?: number
  name?: string
  content?: string
  language?: string
  user?: User
  date?: string
}
