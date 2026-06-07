export interface Solution {
  id?: number
  itemtype?: string
  items_id?: number
  type?: SolutionType
  content?: string
  user?: User
  user_editor?: User
  approver?: User
  status?: number
  approval_followup?: ITILFollowup
  date_creation?: string
  date_mod?: string
  date_approval?: string
}
