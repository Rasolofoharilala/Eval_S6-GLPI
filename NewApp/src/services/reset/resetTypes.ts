export type ResetPreviewItem = {
  id: number
  name?: string
  displayName: string
}

export type ResetPreview = {
  endpoint: string
  count: number
  items: ResetPreviewItem[]
  failed?: boolean
  error?: string
}

export type ResetResultItem = {
  id: number
  name?: string
  status: 'deleted' | 'failed'
  error?: string
  statusCode?: number
}

export type ResetResult = {
  endpoint: string
  total: number
  deleted: number
  failed: number
  results: ResetResultItem[]
}
