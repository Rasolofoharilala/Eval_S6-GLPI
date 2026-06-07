export interface OAuthClient {
  id?: number
  name?: string
  comment?: string
  identifier?: string
  secret?: string
  redirect_uri?: string
  grants?: string
  scopes?: string
  is_active?: boolean
  is_confidential?: boolean
  allowed_ips?: string
}
