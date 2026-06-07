export interface Group {
  id?: number
  name?: string
  comment?: string
  completename?: string
  parent?: Group
  level?: number
  entity?: Entity
  code?: string
  ldap_field?: string
  ldap_value?: string
  ldap_group_dn?: string
  maybe_requester?: boolean
  maybe_observer?: boolean
  maybe_assigned?: boolean
  maybe_assigned_task?: boolean
  maybe_notified?: boolean
  may_contain_items?: boolean
  may_contain_users?: boolean
  maybe_manager?: boolean
  recursive_membership?: boolean
  mfa_enforced?: boolean
  date_creation?: string
  date_mod?: string
}
