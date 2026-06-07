export interface Document {
  id?: number
  name?: string
  comment?: string
  entity?: Entity
  date_creation?: string
  date_mod?: string
  is_deleted?: boolean
  filename?: string
  filepath?: string
  download_url?: string
  mime?: string
  sha1sum?: string
  category?: DocumentCategory
  link?: string
  user?: User
  checksum_sha1?: string
  is_import_denied?: boolean
  tag?: string
}
