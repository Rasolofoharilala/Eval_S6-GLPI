export interface NotImportedEmail {
  id?: number
  from?: string
  to?: string
  mail_collector?: MailCollector
  date?: string
  subject?: string
  messageid?: string
  reason?: number
  user?: User
}
