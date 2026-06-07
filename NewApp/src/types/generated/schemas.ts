// Auto-generated file. Do not edit manually.
// Generated from GLPI swagger schemas using docs/find_schema.py.

export type JsonPrimitive = string | number | boolean | null

export type APIInformation = {
  message?: string
  api_versions?: {
    api_version?: string
    version?: string
    endpoint?: string
  }[]
}

export type APIInformationInput = {
  message?: string
  api_versions?: {
    api_version?: string
    version?: string
    endpoint?: string
  }[]
}

export type Agent = {
  readonly id?: number
  readonly type?: AgentType
  readonly deviceid?: string
  readonly name?: string
  readonly entity?: Entity
  readonly is_recursive?: boolean
  readonly last_contact?: string
  readonly version?: string
  locked?: boolean
  readonly itemtype?: string
  readonly items_id?: number
  readonly useragent?: string
  readonly tag?: string
  port?: number
  readonly remote_address?: string
  threads_network_discovery?: number
  threads_network_inventory?: number
  timeout_network_discovery?: number
  timeout_network_inventory?: number
  readonly use_module_wake_on_lan?: boolean
  readonly use_module_computer_inventory?: boolean
  readonly use_module_esx_remote_inventory?: boolean
  readonly use_module_remote_inventory?: boolean
  readonly use_module_network_inventory?: boolean
  readonly use_module_network_discovery?: boolean
  readonly use_module_package_deployment?: boolean
  readonly use_module_collect_data?: boolean
}

export type AgentInput = {
  locked?: boolean
  port?: number
  threads_network_discovery?: number
  threads_network_inventory?: number
  timeout_network_discovery?: number
  timeout_network_inventory?: number
}

export type AgentType = {
  readonly id?: number
  name?: string
}

export type AgentTypeInput = {
  name?: string
}

export type Antivirus = {
  readonly id?: number
  itemtype?: string
  items_id?: number
  name?: string
  manufacturer?: Manufacturer
  antivirus_version?: string
  signature_version?: string
  is_active?: boolean
  is_deleted?: boolean
  is_up_to_date?: boolean
  is_dynamic?: boolean
  date_expiration?: string
  date_creation?: string
  date_mod?: string
}

export type AntivirusInput = {
  itemtype?: string
  items_id?: number
  name?: string
  manufacturer?: ManufacturerInput
  antivirus_version?: string
  signature_version?: string
  is_active?: boolean
  is_deleted?: boolean
  is_up_to_date?: boolean
  is_dynamic?: boolean
  date_expiration?: string
  date_creation?: string
  date_mod?: string
}

export type Appliance = {
  readonly id?: number
  name?: string
  comment?: string
  status?: State
  entity?: Entity
  is_recursive?: boolean
  manufacturer?: Manufacturer
  user?: User
  user_tech?: User
  contact?: string
  contact_num?: string
  serial?: string
  otherserial?: string
  is_deleted?: boolean
  date_creation?: string
  date_mod?: string
  location?: Location
  type?: ApplianceType
  group?: Group[]
  group_tech?: Group[]
  environment?: ApplianceEnvironment
  external_id?: string
  is_helpdesk_visible?: boolean
}

export type ApplianceInput = {
  name?: string
  comment?: string
  status?: StateInput
  entity?: EntityInput
  is_recursive?: boolean
  manufacturer?: ManufacturerInput
  user?: UserInput
  user_tech?: UserInput
  contact?: string
  contact_num?: string
  serial?: string
  otherserial?: string
  is_deleted?: boolean
  date_creation?: string
  date_mod?: string
  location?: LocationInput
  type?: ApplianceTypeInput
  group?: GroupInput[]
  group_tech?: GroupInput[]
  environment?: ApplianceEnvironmentInput
  external_id?: string
  is_helpdesk_visible?: boolean
}

export type ApplianceEnvironment = {
  readonly id?: number
  name?: string
  comment?: string
}

export type ApplianceEnvironmentInput = {
  name?: string
  comment?: string
}

export type ApplianceType = {
  readonly id?: number
  name?: string
  comment?: string
  entity?: Entity
  is_recursive?: boolean
  external_id?: string
}

export type ApplianceTypeInput = {
  name?: string
  comment?: string
  entity?: EntityInput
  is_recursive?: boolean
  external_id?: string
}

export type ApplianceItem = {
  readonly id?: number
  appliance?: Appliance
  itemtype?: string
  items_id?: number
  environment?: ApplianceEnvironment[]
  domain?: Domain[]
  location?: Location[]
  network?: Network[]
}

export type ApplianceItemInput = {
  appliance?: ApplianceInput
  itemtype?: string
  items_id?: number
  environment?: ApplianceEnvironmentInput[]
  domain?: DomainInput[]
  location?: LocationInput[]
  network?: NetworkInput[]
}

export type ApprovalStep = {
  readonly id?: number
  name: string
  comment?: string
  is_default?: boolean
  min_required_approval_percent?: number
}

export type ApprovalStepInput = {
  name: string
  comment?: string
  is_default?: boolean
  min_required_approval_percent?: number
}

export type ApprovalSubstitute = {
  readonly id?: number
  user?: User
  substitute?: User
}

export type ApprovalSubstituteInput = {
  user?: UserInput
  substitute?: UserInput
}

export type AssetCharacteristicsStats = {
  characteristic?: string
  number_open?: number
  number_solved?: number
  number_late?: number
  number_closed?: number
  satisfaction_surveys_open?: number
  satisfaction_surveys_answered?: number
  satisfaction_surveys_avg_rating?: number
  time_take_into_account_avg?: number
  time_solve_avg?: number
  time_close_avg?: number
  time_treatment_avg?: number
  time_treatment_total?: number
}

export type AssetCharacteristicsStatsInput = {
  characteristic?: string
  number_open?: number
  number_solved?: number
  number_late?: number
  number_closed?: number
  satisfaction_surveys_open?: number
  satisfaction_surveys_answered?: number
  satisfaction_surveys_avg_rating?: number
  time_take_into_account_avg?: number
  time_solve_avg?: number
  time_close_avg?: number
  time_treatment_avg?: number
  time_treatment_total?: number
}

export type AssetStats = {
  item?: {
    itemtype?: string
    readonly id?: number
    name?: string
    entity?: Entity
    is_deleted?: boolean
  }
  number_open?: number
}

export type AssetStatsInput = {
  item?: {
    itemtype?: string
    name?: string
    entity?: EntityInput
    is_deleted?: boolean
  }
  number_open?: number
}

export type AutoUpdateSystem = {
  readonly id?: number
  name?: string
  comment?: string
}

export type AutoUpdateSystemInput = {
  name?: string
  comment?: string
}

export type AutomaticAction = {
  readonly id?: number
  readonly itemtype?: string
  readonly name?: string
  frequency?: number
  param?: number
  state?: '01' | 2
  mode?: 1 | 2
  readonly allow_mode?: 1 | 2 | 3
  min_hour?: number
  max_hour?: number
  logs_lifetime?: number
  readonly last_run?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type AutomaticActionInput = {
  frequency?: number
  param?: number
  state?: '01' | 2
  mode?: 1 | 2
  min_hour?: number
  max_hour?: number
  logs_lifetime?: number
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type AutomaticActionLog = {
  readonly id?: number
  readonly automatic_action?: AutomaticAction
  readonly previous?: {
    readonly id?: number
  }
  readonly date?: string
  readonly state?: 0 | 1 | 2 | 3
  readonly elapsed_time?: number
  readonly volume?: number
  readonly message?: string
}

export type AutomaticActionLogInput = {}

export type Battery = {
  readonly id?: number
  designation?: string
  comment?: string
  manufacturer?: Manufacturer
  entity?: Entity
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
  voltage?: number
  capacity?: number
  type?: BatteryType
  model?: BatteryModel
}

export type BatteryInput = {
  designation?: string
  comment?: string
  manufacturer?: ManufacturerInput
  entity?: EntityInput
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
  voltage?: number
  capacity?: number
  type?: BatteryTypeInput
  model?: BatteryModelInput
}

export type BatteryItem = {
  readonly id?: number
  itemtype?: string
  items_id?: number
  entity?: Entity
  is_recursive?: boolean
  serial?: string
  otherserial?: string
  location?: Location
  status?: State
  is_deleted?: boolean
  is_dynamic?: boolean
  battery?: Battery
  date_manufacture?: string
  real_capacity?: number
}

export type BatteryItemInput = {
  itemtype?: string
  items_id?: number
  entity?: EntityInput
  is_recursive?: boolean
  serial?: string
  otherserial?: string
  location?: LocationInput
  status?: StateInput
  is_deleted?: boolean
  is_dynamic?: boolean
  battery?: BatteryInput
  date_manufacture?: string
  real_capacity?: number
}

export type BatteryModel = {
  readonly id?: number
  name?: string
  comment?: string
  product_number?: string
}

export type BatteryModelInput = {
  name?: string
  comment?: string
  product_number?: string
}

export type BatteryType = {
  readonly id?: number
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type BatteryTypeInput = {
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type Budget = {
  readonly id?: number
  name?: string
  comment?: string
  location?: Location
  entity?: Entity
  type?: BudgetType
  is_deleted?: boolean
  value?: number
  date_begin?: string
  date_end?: string
  date_creation?: string
  date_mod?: string
}

export type BudgetInput = {
  name?: string
  comment?: string
  location?: LocationInput
  entity?: EntityInput
  type?: BudgetTypeInput
  is_deleted?: boolean
  value?: number
  date_begin?: string
  date_end?: string
  date_creation?: string
  date_mod?: string
}

export type BudgetType = {
  readonly id?: number
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type BudgetTypeInput = {
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type BusinessCriticity = {
  readonly id?: number
  name?: string
  readonly completename?: string
  readonly level?: number
  comment?: string
  entity?: Entity
  is_recursive?: boolean
  parent?: {
    id?: number
    readonly name?: string
  }
  date_creation?: string
  date_mod?: string
}

export type BusinessCriticityInput = {
  name?: string
  comment?: string
  entity?: EntityInput
  is_recursive?: boolean
  parent?: {
    id?: number
  }
  date_creation?: string
  date_mod?: string
}

export type Cable = {
  readonly id?: number
  name?: string
  comment?: string
  entity?: Entity
  is_recursive?: boolean
  otherserial?: string
  state?: State
  user?: User
  group?: Group[]
  user_tech?: User
  group_tech?: Group[]
  is_deleted?: boolean
  itemtype_endpoint_a?: string
  items_id_endpoint_a?: number
  socketmodel_endpoint_a?: SocketModel
  sockets_id_endpoint_a?: number
  itemtype_endpoint_b?: string
  items_id_endpoint_b?: number
  socketmodel_endpoint_b?: SocketModel
  sockets_id_endpoint_b?: number
  date_creation?: string
  date_mod?: string
  cable_strand?: CableStrand
  type?: CableType
  is_template?: boolean
  template_name?: string
  color?: string
}

export type CableInput = {
  name?: string
  comment?: string
  entity?: EntityInput
  is_recursive?: boolean
  otherserial?: string
  state?: StateInput
  user?: UserInput
  group?: GroupInput[]
  user_tech?: UserInput
  group_tech?: GroupInput[]
  is_deleted?: boolean
  itemtype_endpoint_a?: string
  items_id_endpoint_a?: number
  socketmodel_endpoint_a?: SocketModelInput
  sockets_id_endpoint_a?: number
  itemtype_endpoint_b?: string
  items_id_endpoint_b?: number
  socketmodel_endpoint_b?: SocketModelInput
  sockets_id_endpoint_b?: number
  date_creation?: string
  date_mod?: string
  cable_strand?: CableStrandInput
  type?: CableTypeInput
  is_template?: boolean
  template_name?: string
  color?: string
}

export type CableStrand = {
  readonly id?: number
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type CableStrandInput = {
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type CableType = {
  readonly id?: number
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type CableTypeInput = {
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type Calendar = {
  readonly id?: number
  name?: string
  comment?: string
  entity?: Entity
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
  close_times?: CloseTime[]
  time_ranges?: CalendarTimeRange[]
}

export type CalendarInput = {
  name?: string
  comment?: string
  entity?: EntityInput
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
  close_times?: CloseTimeInput[]
  time_ranges?: CalendarTimeRangeInput[]
}

export type CalendarTimeRange = {
  readonly id?: number
  calendar?: Calendar
  entity?: Entity
  is_recursive?: boolean
  day_of_week?: number
  begin_time?: string
  end_time?: string
}

export type CalendarTimeRangeInput = {
  calendar?: CalendarInput
  entity?: EntityInput
  is_recursive?: boolean
  day_of_week?: number
  begin_time?: string
  end_time?: string
}

export type Camera = {
  readonly id?: number
  designation?: string
  comment?: string
  manufacturer?: Manufacturer
  entity?: Entity
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
  flash?: boolean
  lens_facing?: string
  orientation?: string
  focal_length?: string
  sensor_size?: string
  model?: CameraModel
  support?: string
}

export type CameraInput = {
  designation?: string
  comment?: string
  manufacturer?: ManufacturerInput
  entity?: EntityInput
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
  flash?: boolean
  lens_facing?: string
  orientation?: string
  focal_length?: string
  sensor_size?: string
  model?: CameraModelInput
  support?: string
}

export type CameraImageFormat = {
  readonly id?: number
  name?: string
  comment?: string
  entity?: Entity
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
}

export type CameraImageFormatInput = {
  name?: string
  comment?: string
  entity?: EntityInput
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
}

export type CameraImageResolution = {
  readonly id?: number
  name?: string
  is_video?: boolean
  comment?: string
  entity?: Entity
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
}

export type CameraImageResolutionInput = {
  name?: string
  is_video?: boolean
  comment?: string
  entity?: EntityInput
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
}

export type CameraItem = {
  readonly id?: number
  itemtype?: string
  items_id?: number
  entity?: Entity
  is_recursive?: boolean
  is_deleted?: boolean
  is_dynamic?: boolean
  camera?: Camera
}

export type CameraItemInput = {
  itemtype?: string
  items_id?: number
  entity?: EntityInput
  is_recursive?: boolean
  is_deleted?: boolean
  is_dynamic?: boolean
  camera?: CameraInput
}

export type CameraModel = {
  readonly id?: number
  name?: string
  comment?: string
  product_number?: string
}

export type CameraModelInput = {
  name?: string
  comment?: string
  product_number?: string
}

export type Cartridge = {
  readonly id?: number
  entities_id?: Entity
  cartridgeitems_id?: CartridgeItem
  pages?: number
  readonly date_in?: string
  readonly date_use?: string
  readonly date_out?: string
  readonly date_creation?: string
  readonly date_mod?: string
}

export type CartridgeInput = {
  entities_id?: EntityInput
  cartridgeitems_id?: CartridgeItemInput
  pages?: number
}

export type CartridgeItem = {
  readonly id?: number
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
  user?: User
  user_tech?: User
  printer_models?: PrinterModel[]
  cartridges?: Cartridge[]
}

export type CartridgeItemInput = {
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
  user?: UserInput
  user_tech?: UserInput
  printer_models?: PrinterModelInput[]
  cartridges?: CartridgeInput[]
}

export type CartridgeItemType = {
  readonly id?: number
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type CartridgeItemTypeInput = {
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type Case = {
  readonly id?: number
  designation?: string
  comment?: string
  manufacturer?: Manufacturer
  entity?: Entity
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
  type?: CaseType
  model?: CaseModel
}

export type CaseInput = {
  designation?: string
  comment?: string
  manufacturer?: ManufacturerInput
  entity?: EntityInput
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
  type?: CaseTypeInput
  model?: CaseModelInput
}

export type CaseItem = {
  readonly id?: number
  itemtype?: string
  items_id?: number
  entity?: Entity
  is_recursive?: boolean
  serial?: string
  otherserial?: string
  location?: Location
  status?: State
  is_deleted?: boolean
  is_dynamic?: boolean
  case?: Case
}

export type CaseItemInput = {
  itemtype?: string
  items_id?: number
  entity?: EntityInput
  is_recursive?: boolean
  serial?: string
  otherserial?: string
  location?: LocationInput
  status?: StateInput
  is_deleted?: boolean
  is_dynamic?: boolean
  case?: CaseInput
}

export type CaseModel = {
  readonly id?: number
  name?: string
  comment?: string
  product_number?: string
}

export type CaseModelInput = {
  name?: string
  comment?: string
  product_number?: string
}

export type CaseType = {
  readonly id?: number
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type CaseTypeInput = {
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type Certificate = {
  readonly id?: number
  name?: string
  comment?: string
  status?: State
  entity?: Entity
  is_recursive?: boolean
  manufacturer?: Manufacturer
  user?: User
  user_tech?: User
  contact?: string
  contact_num?: string
  serial?: string
  otherserial?: string
  is_deleted?: boolean
  date_creation?: string
  date_mod?: string
  location?: Location
  type?: CertificateType
  group?: Group[]
  group_tech?: Group[]
  template_name?: string
  is_template?: boolean
  dns_name?: string
  dns_suffix?: string
  is_selfsign?: boolean
  date_expiration?: string
  command?: string
  certificate_request?: string
  certificate_item?: string
}

export type CertificateInput = {
  name?: string
  comment?: string
  status?: StateInput
  entity?: EntityInput
  is_recursive?: boolean
  manufacturer?: ManufacturerInput
  user?: UserInput
  user_tech?: UserInput
  contact?: string
  contact_num?: string
  serial?: string
  otherserial?: string
  is_deleted?: boolean
  date_creation?: string
  date_mod?: string
  location?: LocationInput
  type?: CertificateTypeInput
  group?: GroupInput[]
  group_tech?: GroupInput[]
  template_name?: string
  is_template?: boolean
  dns_name?: string
  dns_suffix?: string
  is_selfsign?: boolean
  date_expiration?: string
  command?: string
  certificate_request?: string
  certificate_item?: string
}

export type CertificateType = {
  readonly id?: number
  name?: string
  comment?: string
  entity?: Entity
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
}

export type CertificateTypeInput = {
  name?: string
  comment?: string
  entity?: EntityInput
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
}

export type CertificateItem = {
  readonly id?: number
  certificate?: Certificate
  itemtype?: string
  items_id?: number
  date_creation?: string
  date_mod?: string
}

export type CertificateItemInput = {
  certificate?: CertificateInput
  itemtype?: string
  items_id?: number
  date_creation?: string
  date_mod?: string
}

export type Change = {
  readonly id?: number
  name?: string
  content?: string
  user_recipient?: User
  user_editor?: User
  is_deleted?: boolean
  category?: ITILCategory
  location?: Location
  urgency?: 1 | 2 | 3 | 4 | 5
  impact?: 1 | 2 | 3 | 4 | 5
  priority?: 1 | 2 | 3 | 4 | 5
  readonly actiontime?: number
  readonly begin_waiting_date?: string
  readonly waiting_duration?: number
  readonly resolution_duration?: number
  readonly close_duration?: number
  resolution_date?: string
  date_creation?: string
  date_mod?: string
  date?: string
  date_solve?: string
  date_close?: string
  global_validation?: 1 | 2 | 3 | 4
  status?: {
    readonly id?: 1 | 9 | 10 | 7 | 4 | 11 | 12 | 5 | 8 | 6 | 14 | 13
    readonly name?: string
  }
  entity?: Entity
  team?: TeamMember[]
  costs?: ChangeCost[]
}

export type ChangeInput = {
  name?: string
  content?: string
  user_recipient?: UserInput
  user_editor?: UserInput
  is_deleted?: boolean
  category?: ITILCategoryInput
  location?: LocationInput
  urgency?: 1 | 2 | 3 | 4 | 5
  impact?: 1 | 2 | 3 | 4 | 5
  priority?: 1 | 2 | 3 | 4 | 5
  resolution_date?: string
  date_creation?: string
  date_mod?: string
  date?: string
  date_solve?: string
  date_close?: string
  global_validation?: 1 | 2 | 3 | 4
  status?: {}
  entity?: EntityInput
  team?: TeamMemberInput[]
  costs?: ChangeCostInput[]
}

export type ChangeCost = {
  readonly id?: number
  change?: Change
  name?: string
  comment?: string
  date_begin?: string
  date_end?: string
  duration?: number
  cost_time?: number
  cost_fixed?: number
  cost_material?: number
  budget?: Budget
  entity?: Entity
}

export type ChangeCostInput = {
  change?: ChangeInput
  name?: string
  comment?: string
  date_begin?: string
  date_end?: string
  duration?: number
  cost_time?: number
  cost_fixed?: number
  cost_material?: number
  budget?: BudgetInput
  entity?: EntityInput
}

export type ChangeSatisfaction = {
  readonly id?: number
  change?: Change
  type?: 1 | 2
  date_begin?: string
  date_answered?: string
  rating?: number
  rating_scaled_5?: number
  comment?: string
}

export type ChangeSatisfactionInput = {
  change?: ChangeInput
  type?: 1 | 2
  date_begin?: string
  date_answered?: string
  rating?: number
  rating_scaled_5?: number
  comment?: string
}

export type ChangeTask = {
  readonly id?: number
  readonly uuid?: string
  content?: string
  is_private?: boolean
  user?: User
  user_editor?: User
  user_tech?: User
  group_tech?: Group
  date?: string
  date_creation?: string
  date_mod?: string
  duration?: number
  planned_begin?: string
  planned_end?: string
  state?: 0 | 1 | 2
  category?: TaskCategory
  timeline_position?: -1 | 0 | 1 | 2 | 3 | 4
  changes_id?: number
}

export type ChangeTaskInput = {
  content?: string
  is_private?: boolean
  user?: UserInput
  user_editor?: UserInput
  user_tech?: UserInput
  group_tech?: GroupInput
  date?: string
  date_creation?: string
  date_mod?: string
  duration?: number
  planned_begin?: string
  planned_end?: string
  state?: 0 | 1 | 2
  category?: TaskCategoryInput
  timeline_position?: -1 | 0 | 1 | 2 | 3 | 4
  changes_id?: number
}

export type ChangeTemplate = {
  readonly id?: number
  name?: string
  comment?: string
  entity?: Entity
  is_recursive?: boolean
}

export type ChangeTemplateInput = {
  name?: string
  comment?: string
  entity?: EntityInput
  is_recursive?: boolean
}

export type ChangeValidation = {
  readonly id?: number
  requester?: User
  approver?: User
  requested_approver_type?: 'User' | 'Group'
  requested_approver_id?: number
  submission_comment?: string
  approval_comment?: string
  status?: 1 | 2 | 3 | 4
  submission_date?: string
  approval_date?: string
  timeline_position?: -1 | 0 | 1 | 2 | 3 | 4
  changes_id?: number
}

export type ChangeValidationInput = {
  requester?: UserInput
  approver?: UserInput
  requested_approver_type?: 'User' | 'Group'
  requested_approver_id?: number
  submission_comment?: string
  approval_comment?: string
  status?: 1 | 2 | 3 | 4
  submission_date?: string
  approval_date?: string
  timeline_position?: -1 | 0 | 1 | 2 | 3 | 4
  changes_id?: number
}

export type ChangeChange = {
  readonly id?: number
  change_1?: Change
  change_2?: Change
  link?: 1 | 2 | 3 | 4
}

export type ChangeChangeInput = {
  change_1?: ChangeInput
  change_2?: ChangeInput
  link?: 1 | 2 | 3 | 4
}

export type ChangeItem = {
  readonly id?: number
  change?: Change
  itemtype?: string
  items_id?: number
}

export type ChangeItemInput = {
  change?: ChangeInput
  itemtype?: string
  items_id?: number
}

export type ChangeProblem = {
  readonly id?: number
  change?: Change
  problem?: Problem
  link?: 1 | 2 | 3 | 4
}

export type ChangeProblemInput = {
  change?: ChangeInput
  problem?: ProblemInput
  link?: 1 | 2 | 3 | 4
}

export type ChangeTicket = {
  readonly id?: number
  change?: Change
  ticket?: Ticket
  link?: 1 | 2 | 3 | 4
}

export type ChangeTicketInput = {
  change?: ChangeInput
  ticket?: TicketInput
  link?: 1 | 2 | 3 | 4
}

export type CloseTime = {
  readonly id?: number
  name?: string
  comment?: string
  entity?: Entity
  is_recursive?: boolean
  date_begin: string
  date_end: string
  is_perpetual?: boolean
  date_creation?: string
  date_mod?: string
}

export type CloseTimeInput = {
  name?: string
  comment?: string
  entity?: EntityInput
  is_recursive?: boolean
  date_begin: string
  date_end: string
  is_perpetual?: boolean
  date_creation?: string
  date_mod?: string
}

export type Cluster = {
  readonly id?: number
  name?: string
  comment?: string
  status?: State
  entity?: Entity
  date_creation?: string
  date_mod?: string
  type?: ClusterType
  user_tech?: User
  group_tech?: Group[]
  user?: User
  group?: Group[]
  readonly uuid?: string
  autoupdatesystem?: AutoUpdateSystem
  is_deleted?: boolean
}

export type ClusterInput = {
  name?: string
  comment?: string
  status?: StateInput
  entity?: EntityInput
  date_creation?: string
  date_mod?: string
  type?: ClusterTypeInput
  user_tech?: UserInput
  group_tech?: GroupInput[]
  user?: UserInput
  group?: GroupInput[]
  autoupdatesystem?: AutoUpdateSystemInput
  is_deleted?: boolean
}

export type ClusterType = {
  readonly id?: number
  name?: string
  comment?: string
  entity?: Entity
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
}

export type ClusterTypeInput = {
  name?: string
  comment?: string
  entity?: EntityInput
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
}

export type CommonAsset = {
  readonly id?: number
  name?: string
  comment?: string
  status?: State
  entity?: Entity
  is_recursive?: boolean
  manufacturer?: Manufacturer
  user?: User
  user_tech?: User
  contact?: string
  contact_num?: string
  serial?: string
  otherserial?: string
  is_deleted?: boolean
  date_creation?: string
  date_mod?: string
  group?: Group[]
  group_tech?: Group[]
}

export type CommonAssetInput = {
  name?: string
  comment?: string
  status?: StateInput
  entity?: EntityInput
  is_recursive?: boolean
  manufacturer?: ManufacturerInput
  user?: UserInput
  user_tech?: UserInput
  contact?: string
  contact_num?: string
  serial?: string
  otherserial?: string
  is_deleted?: boolean
  date_creation?: string
  date_mod?: string
  group?: GroupInput[]
  group_tech?: GroupInput[]
}

export type Computer = {
  readonly id?: number
  name?: string
  comment?: string
  status?: State
  entity?: Entity
  is_recursive?: boolean
  manufacturer?: Manufacturer
  user?: User
  user_tech?: User
  contact?: string
  contact_num?: string
  serial?: string
  otherserial?: string
  is_deleted?: boolean
  date_creation?: string
  date_mod?: string
  location?: Location
  type?: ComputerType
  model?: ComputerModel
  group?: Group[]
  group_tech?: Group[]
  readonly uuid?: string
  network?: Network
  autoupdatesystem?: AutoUpdateSystem
  is_template?: boolean
  template_name?: string
  is_dynamic?: boolean
  ticket_tco?: number
  readonly last_inventory_update?: string
  readonly last_boot?: string
}

export type ComputerInput = {
  name?: string
  comment?: string
  status?: StateInput
  entity?: EntityInput
  is_recursive?: boolean
  manufacturer?: ManufacturerInput
  user?: UserInput
  user_tech?: UserInput
  contact?: string
  contact_num?: string
  serial?: string
  otherserial?: string
  is_deleted?: boolean
  date_creation?: string
  date_mod?: string
  location?: LocationInput
  type?: ComputerTypeInput
  model?: ComputerModelInput
  group?: GroupInput[]
  group_tech?: GroupInput[]
  network?: NetworkInput
  autoupdatesystem?: AutoUpdateSystemInput
  is_template?: boolean
  template_name?: string
  is_dynamic?: boolean
  ticket_tco?: number
}

export type ComputerModel = {
  readonly id?: number
  name?: string
  comment?: string
  product_number?: string
  weight?: number
  rack_units?: number
  depth?: 0.25 | 0.33 | 0.5 | 1
  power_connections?: number
  power_consumption?: number
  is_half_rack?: boolean
  readonly picture_front?: string
  readonly picture_rear?: string
  pictures?: string[]
  date_creation?: string
  date_mod?: string
}

export type ComputerModelInput = {
  name?: string
  comment?: string
  product_number?: string
  weight?: number
  rack_units?: number
  depth?: 0.25 | 0.33 | 0.5 | 1
  power_connections?: number
  power_consumption?: number
  is_half_rack?: boolean
  pictures?: string[]
  date_creation?: string
  date_mod?: string
}

export type ComputerType = {
  readonly id?: number
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type ComputerTypeInput = {
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type Config = {
  readonly id?: number
  context?: string
  name?: string
  value?: string
}

export type ConfigInput = {
  context?: string
  name?: string
  value?: string
}

export type Consumable = {
  readonly id?: number
  entities_id?: Entity
  consumableitems_id?: ConsumableItem
  readonly date_in?: string
  readonly date_out?: string
  readonly date_creation?: string
  readonly date_mod?: string
  itemtype?: string
  items_id?: number
}

export type ConsumableInput = {
  entities_id?: EntityInput
  consumableitems_id?: ConsumableItemInput
  itemtype?: string
  items_id?: number
}

export type ConsumableItem = {
  readonly id?: number
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
  user?: User
  user_tech?: User
  consumables?: Consumable[]
}

export type ConsumableItemInput = {
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
  user?: UserInput
  user_tech?: UserInput
  consumables?: ConsumableInput[]
}

export type ConsumableItemType = {
  readonly id?: number
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type ConsumableItemTypeInput = {
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type Contact = {
  readonly id?: number
  name?: string
  comment?: string
  entity?: Entity
  date_creation?: string
  date_mod?: string
  type?: ContactType
  is_deleted?: boolean
}

export type ContactInput = {
  name?: string
  comment?: string
  entity?: EntityInput
  date_creation?: string
  date_mod?: string
  type?: ContactTypeInput
  is_deleted?: boolean
}

export type ContactType = {
  readonly id?: number
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type ContactTypeInput = {
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type Contract = {
  readonly id?: number
  name?: string
  comment?: string
  status?: State
  entity?: Entity
  date_creation?: string
  date_mod?: string
  type?: ContractType
  is_deleted?: boolean
  costs?: ContractCost[]
  number?: string
  location?: Location
  date_begin?: string
  duration?: number
  notice_period?: number
  renewal_period?: number
  invoice_period?: number
  accounting_number?: string
  week_begin_hour?: string
  week_end_hour?: string
  saturday_begin_hour?: string
  saturday_end_hour?: string
  sunday_begin_hour?: string
  sunday_end_hour?: string
  use_saturday?: boolean
  use_sunday?: boolean
  max_links_allowed?: number
  alert?: 0 | 4 | 8 | 12 | 64 | 72
  renewal_type?: 0 | 1 | 2
  template_name?: string
  is_template?: boolean
}

export type ContractInput = {
  name?: string
  comment?: string
  status?: StateInput
  entity?: EntityInput
  date_creation?: string
  date_mod?: string
  type?: ContractTypeInput
  is_deleted?: boolean
  costs?: ContractCostInput[]
  number?: string
  location?: LocationInput
  date_begin?: string
  duration?: number
  notice_period?: number
  renewal_period?: number
  invoice_period?: number
  accounting_number?: string
  week_begin_hour?: string
  week_end_hour?: string
  saturday_begin_hour?: string
  saturday_end_hour?: string
  sunday_begin_hour?: string
  sunday_end_hour?: string
  use_saturday?: boolean
  use_sunday?: boolean
  max_links_allowed?: number
  alert?: 0 | 4 | 8 | 12 | 64 | 72
  renewal_type?: 0 | 1 | 2
  template_name?: string
  is_template?: boolean
}

export type ContractCost = {
  readonly id?: number
  contract?: Contract
  name?: string
  comment?: string
  date_begin?: string
  date_end?: string
  cost?: number
  budget?: Budget
  entity?: Entity
  is_recursive?: boolean
}

export type ContractCostInput = {
  contract?: ContractInput
  name?: string
  comment?: string
  date_begin?: string
  date_end?: string
  cost?: number
  budget?: BudgetInput
  entity?: EntityInput
  is_recursive?: boolean
}

export type ContractType = {
  readonly id?: number
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type ContractTypeInput = {
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type ContractItem = {
  readonly id?: number
  contract?: Contract
  itemtype?: string
  items_id?: number
}

export type ContractItemInput = {
  contract?: ContractInput
  itemtype?: string
  items_id?: number
}

export type Controller = {
  readonly id?: number
  designation?: string
  comment?: string
  manufacturer?: Manufacturer
  entity?: Entity
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
  is_raid?: boolean
  interface?: InterfaceType
  model?: ControllerModel
}

export type ControllerInput = {
  designation?: string
  comment?: string
  manufacturer?: ManufacturerInput
  entity?: EntityInput
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
  is_raid?: boolean
  interface?: InterfaceTypeInput
  model?: ControllerModelInput
}

export type ControllerItem = {
  readonly id?: number
  itemtype?: string
  items_id?: number
  entity?: Entity
  is_recursive?: boolean
  serial?: string
  otherserial?: string
  location?: Location
  status?: State
  is_deleted?: boolean
  is_dynamic?: boolean
  controller?: Controller
  busID?: string
}

export type ControllerItemInput = {
  itemtype?: string
  items_id?: number
  entity?: EntityInput
  is_recursive?: boolean
  serial?: string
  otherserial?: string
  location?: LocationInput
  status?: StateInput
  is_deleted?: boolean
  is_dynamic?: boolean
  controller?: ControllerInput
  busID?: string
}

export type ControllerModel = {
  readonly id?: number
  name?: string
  comment?: string
  product_number?: string
}

export type ControllerModelInput = {
  name?: string
  comment?: string
  product_number?: string
}

export type DCRoom = {
  readonly id?: number
  name?: string
  entity?: Entity
  is_recursive?: boolean
  is_deleted?: boolean
  location?: Location
  datacenter?: DataCenter
  rows?: number
  cols?: number
  date_creation?: string
  date_mod?: string
}

export type DCRoomInput = {
  name?: string
  entity?: EntityInput
  is_recursive?: boolean
  is_deleted?: boolean
  location?: LocationInput
  datacenter?: DataCenterInput
  rows?: number
  cols?: number
  date_creation?: string
  date_mod?: string
}

export type Dashboard = {
  readonly id?: number
  readonly key?: string
  name?: string
  context?: 'core' | 'mini_core'
  user?: User
  filters?: DashboardFilter[]
  items?: DashboardItem[]
}

export type DashboardInput = {
  name?: string
  context?: 'core' | 'mini_core'
  user?: UserInput
  filters?: DashboardFilterInput[]
  items?: DashboardItemInput[]
}

export type DashboardCard = {
  card?: string
  widget?: string[]
  group?: string
  itemtype?: string
  label?: string
  filters?: (
    | 'dates'
    | 'dates_mod'
    | 'itilcategory'
    | 'location'
    | 'manufacturer'
    | 'requesttype'
    | 'state'
    | 'tickettype'
    | 'group_requester'
    | 'group_tech'
    | 'user_tech'
  )[]
}

export type DashboardCardInput = {
  card?: string
  widget?: string[]
  group?: string
  itemtype?: string
  label?: string
  filters?: (
    | 'dates'
    | 'dates_mod'
    | 'itilcategory'
    | 'location'
    | 'manufacturer'
    | 'requesttype'
    | 'state'
    | 'tickettype'
    | 'group_requester'
    | 'group_tech'
    | 'user_tech'
  )[]
}

export type DashboardFilter = {
  readonly id?: number
  dashboard?: Dashboard
  user?: User
  filter?: string
}

export type DashboardFilterInput = {
  dashboard?: DashboardInput
  user?: UserInput
  filter?: string
}

export type DashboardItem = {
  readonly id?: number
  dashboard?: Dashboard
  unique_key?: string
  card?: string
  x?: number
  y?: number
  width?: number
  height?: number
  card_options?: string
}

export type DashboardItemInput = {
  dashboard?: DashboardInput
  unique_key?: string
  card?: string
  x?: number
  y?: number
  width?: number
  height?: number
  card_options?: string
}

export type DashboardRight = {
  readonly id?: number
  dashboard?: Dashboard
  itemtype?: 'User' | 'Group' | 'Entity' | 'Profile'
  items_id?: number
}

export type DashboardRightInput = {
  dashboard?: DashboardInput
  itemtype?: 'User' | 'Group' | 'Entity' | 'Profile'
  items_id?: number
}

export type DataCenter = {
  readonly id?: number
  name?: string
  location?: Location
  entity?: Entity
  date_creation?: string
  date_mod?: string
  is_deleted?: boolean
}

export type DataCenterInput = {
  name?: string
  location?: LocationInput
  entity?: EntityInput
  date_creation?: string
  date_mod?: string
  is_deleted?: boolean
}

export type Database = {
  readonly id?: number
  name?: string
  entity?: Entity
  date_creation?: string
  date_mod?: string
  is_deleted?: boolean
  instance?: DatabaseInstance
}

export type DatabaseInput = {
  name?: string
  entity?: EntityInput
  date_creation?: string
  date_mod?: string
  is_deleted?: boolean
  instance?: DatabaseInstanceInput
}

export type DatabaseInstance = {
  readonly id?: number
  entity?: Entity
  is_recursive?: boolean
  name?: string
  comment?: string
  version?: string
  port?: string
  path?: string
  type?: DatabaseInstanceType
  category?: DatabaseInstanceCategory
  location?: Location
  manufacturer?: Manufacturer
  user?: User
  user_tech?: User
  state?: State
  itemtype?: string
  items_id?: number
  is_onbackup?: boolean
  is_active?: boolean
  is_deleted?: boolean
  is_dynamic?: boolean
  date_creation?: string
  date_mod?: string
  date_lastboot?: string
  date_lastbackup?: string
  database?: Database[]
}

export type DatabaseInstanceInput = {
  entity?: EntityInput
  is_recursive?: boolean
  name?: string
  comment?: string
  version?: string
  port?: string
  path?: string
  type?: DatabaseInstanceTypeInput
  category?: DatabaseInstanceCategoryInput
  location?: LocationInput
  manufacturer?: ManufacturerInput
  user?: UserInput
  user_tech?: UserInput
  state?: StateInput
  itemtype?: string
  items_id?: number
  is_onbackup?: boolean
  is_active?: boolean
  is_deleted?: boolean
  is_dynamic?: boolean
  date_creation?: string
  date_mod?: string
  date_lastboot?: string
  date_lastbackup?: string
  database?: DatabaseInput[]
}

export type DatabaseInstanceCategory = {
  readonly id?: number
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type DatabaseInstanceCategoryInput = {
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type DatabaseInstanceType = {
  readonly id?: number
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type DatabaseInstanceTypeInput = {
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type DeniedMailContent = {
  readonly id?: number
  name?: string
  content?: string
  date_creation?: string
  date_mod?: string
}

export type DeniedMailContentInput = {
  name?: string
  content?: string
  date_creation?: string
  date_mod?: string
}

export type DenyList = {
  readonly id?: number
  type?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
  name?: string
  value?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type DenyListInput = {
  type?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
  name?: string
  value?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type Document = {
  readonly id?: number
  name?: string
  comment?: string
  entity?: Entity
  date_creation?: string
  date_mod?: string
  is_deleted?: boolean
  filename?: string
  readonly filepath?: string
  readonly download_url?: string
  mime?: string
  sha1sum?: string
  category?: DocumentCategory
  link?: string
  user?: User
  checksum_sha1?: string
  is_import_denied?: boolean
  tag?: string
}

export type DocumentInput = {
  name?: string
  comment?: string
  entity?: EntityInput
  date_creation?: string
  date_mod?: string
  is_deleted?: boolean
  filename?: string
  mime?: string
  sha1sum?: string
  category?: DocumentCategoryInput
  link?: string
  user?: UserInput
  checksum_sha1?: string
  is_import_denied?: boolean
  tag?: string
}

export type DocumentCategory = {
  readonly id?: number
  name?: string
  readonly completename?: string
  readonly level?: number
  comment?: string
  parent?: {
    id?: number
    readonly name?: string
  }
  date_creation?: string
  date_mod?: string
}

export type DocumentCategoryInput = {
  name?: string
  comment?: string
  parent?: {
    id?: number
  }
  date_creation?: string
  date_mod?: string
}

export type DocumentType = {
  readonly id?: number
  name?: string
  comment?: string
  extension?: string
  icon?: string
  mime?: string
  is_uploadable?: boolean
  date_creation?: string
  date_mod?: string
}

export type DocumentTypeInput = {
  name?: string
  comment?: string
  extension?: string
  icon?: string
  mime?: string
  is_uploadable?: boolean
  date_creation?: string
  date_mod?: string
}

export type DocumentItem = {
  readonly id?: number
  readonly itemtype?: string
  readonly items_id?: number
  readonly documents_id?: number
  document?: Document
  readonly filepath?: string
  timeline_position?: -1 | 0 | 1 | 2 | 3 | 4
  date_creation?: string
  date?: string
}

export type DocumentItemInput = {
  document?: DocumentInput
  timeline_position?: -1 | 0 | 1 | 2 | 3 | 4
  date_creation?: string
  date?: string
}

export type Domain = {
  readonly id?: number
  name?: string
  comment?: string
  entity?: Entity
  date_creation?: string
  date_mod?: string
  type?: DomainType
  user_tech?: User
  group_tech?: Group[]
  user?: User
  group?: Group[]
  is_deleted?: boolean
  date_domain_creation?: string
  date_expiration?: string
  template_name?: string
  is_template?: boolean
  is_active?: boolean
  is_recursive?: boolean
}

export type DomainInput = {
  name?: string
  comment?: string
  entity?: EntityInput
  date_creation?: string
  date_mod?: string
  type?: DomainTypeInput
  user_tech?: UserInput
  group_tech?: GroupInput[]
  user?: UserInput
  group?: GroupInput[]
  is_deleted?: boolean
  date_domain_creation?: string
  date_expiration?: string
  template_name?: string
  is_template?: boolean
  is_active?: boolean
  is_recursive?: boolean
}

export type DomainRecord = {
  readonly id?: number
  name?: string
  comment?: string
  data?: string
  data_obj?: string
  entity?: Entity
  is_recursive?: boolean
  domain?: Domain
  type?: DomainRecordType
  ttl?: number
  user?: User
  user_tech?: User
  is_deleted?: boolean
  date_creation?: string
  date_mod?: string
}

export type DomainRecordInput = {
  name?: string
  comment?: string
  data?: string
  data_obj?: string
  entity?: EntityInput
  is_recursive?: boolean
  domain?: DomainInput
  type?: DomainRecordTypeInput
  ttl?: number
  user?: UserInput
  user_tech?: UserInput
  is_deleted?: boolean
  date_creation?: string
  date_mod?: string
}

export type DomainRecordType = {
  readonly id?: number
  name?: string
  comment?: string
  entity?: Entity
  is_recursive?: boolean
  fields?: string
}

export type DomainRecordTypeInput = {
  name?: string
  comment?: string
  entity?: EntityInput
  is_recursive?: boolean
  fields?: string
}

export type DomainRelation = {
  readonly id?: number
  name?: string
  comment?: string
  entity?: Entity
  is_recursive?: boolean
}

export type DomainRelationInput = {
  name?: string
  comment?: string
  entity?: EntityInput
  is_recursive?: boolean
}

export type DomainType = {
  readonly id?: number
  name?: string
  comment?: string
  entity?: Entity
  is_recursive?: boolean
}

export type DomainTypeInput = {
  name?: string
  comment?: string
  entity?: EntityInput
  is_recursive?: boolean
}

export type DomainItem = {
  readonly id?: number
  domain?: Domain
  itemtype?: string
  items_id?: number
  relation?: DomainRelation
  is_deleted?: boolean
  is_dynamic?: boolean
}

export type DomainItemInput = {
  domain?: DomainInput
  itemtype?: string
  items_id?: number
  relation?: DomainRelationInput
  is_deleted?: boolean
  is_dynamic?: boolean
}

export type Drive = {
  readonly id?: number
  designation?: string
  comment?: string
  manufacturer?: Manufacturer
  entity?: Entity
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
  is_writer?: boolean
  speed?: string
  interface?: InterfaceType
  model?: DriveModel
}

export type DriveInput = {
  designation?: string
  comment?: string
  manufacturer?: ManufacturerInput
  entity?: EntityInput
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
  is_writer?: boolean
  speed?: string
  interface?: InterfaceTypeInput
  model?: DriveModelInput
}

export type DriveItem = {
  readonly id?: number
  itemtype?: string
  items_id?: number
  entity?: Entity
  is_recursive?: boolean
  serial?: string
  otherserial?: string
  location?: Location
  status?: State
  is_deleted?: boolean
  is_dynamic?: boolean
  drive?: Drive
  busID?: string
}

export type DriveItemInput = {
  itemtype?: string
  items_id?: number
  entity?: EntityInput
  is_recursive?: boolean
  serial?: string
  otherserial?: string
  location?: LocationInput
  status?: StateInput
  is_deleted?: boolean
  is_dynamic?: boolean
  drive?: DriveInput
  busID?: string
}

export type DriveModel = {
  readonly id?: number
  name?: string
  comment?: string
  product_number?: string
}

export type DriveModelInput = {
  name?: string
  comment?: string
  product_number?: string
}

export type EmailAddress = {
  readonly id?: number
  email?: string
  is_default?: boolean
  is_dynamic?: boolean
}

export type EmailAddressInput = {
  email?: string
  is_default?: boolean
  is_dynamic?: boolean
}

export type EmailAuthServer = {
  readonly id?: number
  name?: string
  connection_string?: string
  domain?: string
  comment?: string
  is_active?: boolean
  is_default?: boolean
  date_creation?: string
  date_mod?: string
}

export type EmailAuthServerInput = {
  name?: string
  connection_string?: string
  domain?: string
  comment?: string
  is_active?: boolean
  is_default?: boolean
  date_creation?: string
  date_mod?: string
}

export type EmailCollector = {
  readonly id?: number
  name?: string
  host?: string
  login?: string
  max_filesize?: number
  comment?: string
  is_active?: boolean
  accepted_folder?: string
  rejected_folder?: string
  readonly errors?: number
  use_mail_date?: boolean
  requester_field?: boolean
  add_to_to_observer?: boolean
  add_cc_to_observer?: boolean
  collect_only_unread?: boolean
  create_user_from_email?: boolean
  readonly date_last_collect?: string
  date_creation?: string
  date_mod?: string
}

export type EmailCollectorInput = {
  name?: string
  host?: string
  login?: string
  password?: string
  max_filesize?: number
  comment?: string
  is_active?: boolean
  accepted_folder?: string
  rejected_folder?: string
  use_mail_date?: boolean
  requester_field?: boolean
  add_to_to_observer?: boolean
  add_cc_to_observer?: boolean
  collect_only_unread?: boolean
  create_user_from_email?: boolean
  date_creation?: string
  date_mod?: string
}

export type Enclosure = {
  readonly id?: number
  name?: string
  comment?: string
  entity?: Entity
  is_recursive?: boolean
  location?: Location
  serial?: string
  otherserial?: string
  model?: EnclosureModel
  manufacturer?: Manufacturer
  state?: State
  user?: User
  group?: Group[]
  user_tech?: User
  group_tech?: Group[]
  is_deleted?: boolean
  orientation?: number
  power_supplies?: number
  date_creation?: string
  date_mod?: string
  is_template?: boolean
  template_name?: string
}

export type EnclosureInput = {
  name?: string
  comment?: string
  entity?: EntityInput
  is_recursive?: boolean
  location?: LocationInput
  serial?: string
  otherserial?: string
  model?: EnclosureModelInput
  manufacturer?: ManufacturerInput
  state?: StateInput
  user?: UserInput
  group?: GroupInput[]
  user_tech?: UserInput
  group_tech?: GroupInput[]
  is_deleted?: boolean
  orientation?: number
  power_supplies?: number
  date_creation?: string
  date_mod?: string
  is_template?: boolean
  template_name?: string
}

export type EnclosureModel = {
  readonly id?: number
  name?: string
  comment?: string
  product_number?: string
  weight?: number
  rack_units?: number
  depth?: 0.25 | 0.33 | 0.5 | 1
  power_connections?: number
  power_consumption?: number
  is_half_rack?: boolean
  readonly picture_front?: string
  readonly picture_rear?: string
  pictures?: string[]
  date_creation?: string
  date_mod?: string
}

export type EnclosureModelInput = {
  name?: string
  comment?: string
  product_number?: string
  weight?: number
  rack_units?: number
  depth?: 0.25 | 0.33 | 0.5 | 1
  power_connections?: number
  power_consumption?: number
  is_half_rack?: boolean
  pictures?: string[]
  date_creation?: string
  date_mod?: string
}

export type Entity = {
  readonly id?: number
  name?: string
  comment?: string
  readonly completename?: string
  parent?: {
    id?: number
    name?: string
  }
  readonly level?: number
  registration_number?: string
  address?: string
  postcode?: string
  city?: string
  state?: string
  country?: string
  latitude?: string
  longitude?: string
  altitude?: string
  website?: string
  phone?: string
  fax?: string
  email?: string
  admin_email?: string
  admin_email_name?: string
  from_email?: string
  from_email_name?: string
  noreply_email?: string
  noreply_email_name?: string
  replyto_email?: string
  replyto_email_name?: string
  notification_subject_tag?: string
  ldap_dn?: string
  tag?: string
  authldap?: LDAPDirectory
  mail_domain?: string
  entity_ldapfilter?: string
  mailing_signature?: string
  url_base?: string
  date_creation?: string
  date_mod?: string
}

export type EntityInput = {
  name?: string
  comment?: string
  parent?: {
    id?: number
    name?: string
  }
  registration_number?: string
  address?: string
  postcode?: string
  city?: string
  state?: string
  country?: string
  latitude?: string
  longitude?: string
  altitude?: string
  website?: string
  phone?: string
  fax?: string
  email?: string
  admin_email?: string
  admin_email_name?: string
  from_email?: string
  from_email_name?: string
  noreply_email?: string
  noreply_email_name?: string
  replyto_email?: string
  replyto_email_name?: string
  notification_subject_tag?: string
  ldap_dn?: string
  tag?: string
  authldap?: LDAPDirectoryInput
  mail_domain?: string
  entity_ldapfilter?: string
  mailing_signature?: string
  url_base?: string
  date_creation?: string
  date_mod?: string
}

export type EntityTransferRecord = {
  itemtype?: string
  items_id?: number
  entity?: number
  options?: {
    keep_ticket?: 0 | 1 | 2
    keep_networklink?: 0 | 1 | 2
    keep_reservation?: 0 | 1
    keep_history?: 0 | 1
    keep_device?: 0 | 1
    keep_infocom?: 0 | 1
    keep_dc_monitor?: 0 | 1
    clean_dc_monitor?: 0 | 1 | 2
    keep_dc_phone?: 0 | 1
    clean_dc_phone?: 0 | 1 | 2
    keep_dc_peripheral?: 0 | 1
    clean_dc_peripheral?: 0 | 1 | 2
    keep_dc_printer?: 0 | 1
    clean_dc_printer?: 0 | 1 | 2
    keep_supplier?: 0 | 1
    clean_supplier?: 0 | 1 | 2
    keep_contact?: 0 | 1
    clean_contact?: 0 | 1 | 2
    keep_contract?: 0 | 1
    clean_contract?: 0 | 1 | 2
    keep_disk?: 0 | 1
    keep_software?: 0 | 1
    clean_software?: 0 | 1 | 2
    keep_document?: 0 | 1
    clean_document?: 0 | 1 | 2
    keep_cartridgeitem?: 0 | 1
    clean_cartridgeitem?: 0 | 1 | 2
    keep_cartridge?: 0 | 1
    keep_consumable?: 0 | 1
    keep_certificate?: 0 | 1
    clean_certificate?: 0 | 1 | 2
    lock_updated_fields?: boolean
    keep_location?: 0 | 1
  }
}

export type EntityTransferRecordInput = {
  itemtype?: string
  items_id?: number
  entity?: number
  options?: {
    keep_ticket?: 0 | 1 | 2
    keep_networklink?: 0 | 1 | 2
    keep_reservation?: 0 | 1
    keep_history?: 0 | 1
    keep_device?: 0 | 1
    keep_infocom?: 0 | 1
    keep_dc_monitor?: 0 | 1
    clean_dc_monitor?: 0 | 1 | 2
    keep_dc_phone?: 0 | 1
    clean_dc_phone?: 0 | 1 | 2
    keep_dc_peripheral?: 0 | 1
    clean_dc_peripheral?: 0 | 1 | 2
    keep_dc_printer?: 0 | 1
    clean_dc_printer?: 0 | 1 | 2
    keep_supplier?: 0 | 1
    clean_supplier?: 0 | 1 | 2
    keep_contact?: 0 | 1
    clean_contact?: 0 | 1 | 2
    keep_contract?: 0 | 1
    clean_contract?: 0 | 1 | 2
    keep_disk?: 0 | 1
    keep_software?: 0 | 1
    clean_software?: 0 | 1 | 2
    keep_document?: 0 | 1
    clean_document?: 0 | 1 | 2
    keep_cartridgeitem?: 0 | 1
    clean_cartridgeitem?: 0 | 1 | 2
    keep_cartridge?: 0 | 1
    keep_consumable?: 0 | 1
    keep_certificate?: 0 | 1
    clean_certificate?: 0 | 1 | 2
    lock_updated_fields?: boolean
    keep_location?: 0 | 1
  }
}

export type EventCategory = {
  readonly id?: number
  name?: string
  comment?: string
  color?: string
  date_creation?: string
  date_mod?: string
}

export type EventCategoryInput = {
  name?: string
  comment?: string
  color?: string
  date_creation?: string
  date_mod?: string
}

export type EventLog = {
  readonly id?: number
  readonly items_id?: number
  readonly type?: string
  readonly date?: string
  readonly service?: string
  readonly level?: 1 | 2 | 3 | 4 | 5
  readonly message?: string
}

export type EventLogInput = {}

export type ExternalEvent = {
  readonly id?: number
  readonly uuid?: string
  name?: string
  text?: string
  template?: ExternalEventTemplate
  category?: EventCategory
  entity?: Entity
  is_recursive?: boolean
  user?: User
  group?: Group
  date?: string
  date_begin?: string
  date_end?: string
  rrule?: string
  state?: number
  is_background?: boolean
  date_creation?: string
  date_mod?: string
}

export type ExternalEventInput = {
  name?: string
  text?: string
  template?: ExternalEventTemplateInput
  category?: EventCategoryInput
  entity?: EntityInput
  is_recursive?: boolean
  user?: UserInput
  group?: GroupInput
  date?: string
  date_begin?: string
  date_end?: string
  rrule?: string
  state?: number
  is_background?: boolean
  date_creation?: string
  date_mod?: string
}

export type ExternalEventTemplate = {
  readonly id?: number
  name?: string
  text?: string
  comment?: string
  duration?: number
  before_time?: number
  rrule?: string
  category?: EventCategory
  state?: 0 | 1 | 2
  is_background?: boolean
  date_creation?: string
  date_mod?: string
}

export type ExternalEventTemplateInput = {
  name?: string
  text?: string
  comment?: string
  duration?: number
  before_time?: number
  rrule?: string
  category?: EventCategoryInput
  state?: 0 | 1 | 2
  is_background?: boolean
  date_creation?: string
  date_mod?: string
}

export type ExternalLink = {
  readonly id?: number
  itemtype?: string[]
  name?: string
  link?: string
  data?: string
  open_window?: boolean
  entity?: Entity
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
}

export type ExternalLinkInput = {
  itemtype?: string[]
  name?: string
  link?: string
  data?: string
  open_window?: boolean
  entity?: EntityInput
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
}

export type FieldUnicity = {
  readonly id?: number
  name?: string
  entity?: Entity
  is_recursive?: boolean
  itemtype?: string
  fields?: string
  comment?: string
  is_active?: boolean
  action_refuse?: boolean
  action_notify?: boolean
  date_creation?: string
  date_mod?: string
}

export type FieldUnicityInput = {
  name?: string
  entity?: EntityInput
  is_recursive?: boolean
  itemtype?: string
  fields?: string
  comment?: string
  is_active?: boolean
  action_refuse?: boolean
  action_notify?: boolean
  date_creation?: string
  date_mod?: string
}

export type Filesystem = {
  readonly id?: number
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type FilesystemInput = {
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type Firmware = {
  readonly id?: number
  designation?: string
  comment?: string
  manufacturer?: Manufacturer
  entity?: Entity
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
  date?: string
  version?: string
  type?: FirmwareType
  model?: FirmwareModel
}

export type FirmwareInput = {
  designation?: string
  comment?: string
  manufacturer?: ManufacturerInput
  entity?: EntityInput
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
  date?: string
  version?: string
  type?: FirmwareTypeInput
  model?: FirmwareModelInput
}

export type FirmwareItem = {
  readonly id?: number
  itemtype?: string
  items_id?: number
  entity?: Entity
  is_recursive?: boolean
  serial?: string
  otherserial?: string
  location?: Location
  status?: State
  is_deleted?: boolean
  is_dynamic?: boolean
  firmware?: Firmware
}

export type FirmwareItemInput = {
  itemtype?: string
  items_id?: number
  entity?: EntityInput
  is_recursive?: boolean
  serial?: string
  otherserial?: string
  location?: LocationInput
  status?: StateInput
  is_deleted?: boolean
  is_dynamic?: boolean
  firmware?: FirmwareInput
}

export type FirmwareModel = {
  readonly id?: number
  name?: string
  comment?: string
  product_number?: string
}

export type FirmwareModelInput = {
  name?: string
  comment?: string
  product_number?: string
}

export type FirmwareType = {
  readonly id?: number
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type FirmwareTypeInput = {
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type Followup = {
  readonly id?: number
  itemtype?: string
  items_id?: number
  content?: string
  is_private?: boolean
  user?: User
  user_editor?: User
  request_type?: RequestType
  date?: string
  date_creation?: string
  date_mod?: string
  timeline_position?: -1 | 0 | 1 | 2 | 3 | 4
  source_item_id?: number
  source_of_item_id?: number
}

export type FollowupInput = {
  itemtype?: string
  items_id?: number
  content?: string
  is_private?: boolean
  user?: UserInput
  user_editor?: UserInput
  request_type?: RequestTypeInput
  date?: string
  date_creation?: string
  date_mod?: string
  timeline_position?: -1 | 0 | 1 | 2 | 3 | 4
  source_item_id?: number
  source_of_item_id?: number
}

export type FollowupTemplate = {
  readonly id?: number
  name?: string
  content?: string
  comment?: string
  entity?: Entity
  is_recursive?: boolean
  is_private?: boolean
  request_type?: RequestType
  date_creation?: string
  date_mod?: string
}

export type FollowupTemplateInput = {
  name?: string
  content?: string
  comment?: string
  entity?: EntityInput
  is_recursive?: boolean
  is_private?: boolean
  request_type?: RequestTypeInput
  date_creation?: string
  date_mod?: string
}

export type GenericDevice = {
  readonly id?: number
  designation?: string
  comment?: string
  manufacturer?: Manufacturer
  entity?: Entity
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
  type?: GenericDeviceType
  model?: GenericDeviceModel
  location?: Location
}

export type GenericDeviceInput = {
  designation?: string
  comment?: string
  manufacturer?: ManufacturerInput
  entity?: EntityInput
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
  type?: GenericDeviceTypeInput
  model?: GenericDeviceModelInput
  location?: LocationInput
}

export type GenericDeviceItem = {
  readonly id?: number
  itemtype?: string
  items_id?: number
  entity?: Entity
  is_recursive?: boolean
  serial?: string
  otherserial?: string
  location?: Location
  status?: State
  is_deleted?: boolean
  is_dynamic?: boolean
  generic_device?: GenericDevice
}

export type GenericDeviceItemInput = {
  itemtype?: string
  items_id?: number
  entity?: EntityInput
  is_recursive?: boolean
  serial?: string
  otherserial?: string
  location?: LocationInput
  status?: StateInput
  is_deleted?: boolean
  is_dynamic?: boolean
  generic_device?: GenericDeviceInput
}

export type GenericDeviceModel = {
  readonly id?: number
  name?: string
  comment?: string
  product_number?: string
}

export type GenericDeviceModelInput = {
  name?: string
  comment?: string
  product_number?: string
}

export type GenericDeviceType = {
  readonly id?: number
  name?: string
  comment?: string
}

export type GenericDeviceTypeInput = {
  name?: string
  comment?: string
}

export type GlobalStats = {
  sample_dates?: string[]
  number_open?: number[]
  number_solved?: number[]
  number_late?: number[]
  number_closed?: number[]
  satisfaction_surveys_open?: number[]
  satisfaction_surveys_answered?: number[]
  satisfaction_surveys_avg_rating?: number[]
  time_solve_avg?: number[]
  time_close_avg?: number[]
  time_treatment_avg?: number[]
}

export type GlobalStatsInput = {
  sample_dates?: string[]
  number_open?: number[]
  number_solved?: number[]
  number_late?: number[]
  number_closed?: number[]
  satisfaction_surveys_open?: number[]
  satisfaction_surveys_answered?: number[]
  satisfaction_surveys_avg_rating?: number[]
  time_solve_avg?: number[]
  time_close_avg?: number[]
  time_treatment_avg?: number[]
}

export type GraphicCard = {
  readonly id?: number
  designation?: string
  comment?: string
  manufacturer?: Manufacturer
  entity?: Entity
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
  chipset?: string
  memory_default?: number
  interface?: InterfaceType
  model?: GraphicCardModel
}

export type GraphicCardInput = {
  designation?: string
  comment?: string
  manufacturer?: ManufacturerInput
  entity?: EntityInput
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
  chipset?: string
  memory_default?: number
  interface?: InterfaceTypeInput
  model?: GraphicCardModelInput
}

export type GraphicCardItem = {
  readonly id?: number
  itemtype?: string
  items_id?: number
  entity?: Entity
  is_recursive?: boolean
  serial?: string
  otherserial?: string
  location?: Location
  status?: State
  is_deleted?: boolean
  is_dynamic?: boolean
  graphic_card?: GraphicCard
  busID?: string
  memory?: number
}

export type GraphicCardItemInput = {
  itemtype?: string
  items_id?: number
  entity?: EntityInput
  is_recursive?: boolean
  serial?: string
  otherserial?: string
  location?: LocationInput
  status?: StateInput
  is_deleted?: boolean
  is_dynamic?: boolean
  graphic_card?: GraphicCardInput
  busID?: string
  memory?: number
}

export type GraphicCardModel = {
  readonly id?: number
  name?: string
  comment?: string
  product_number?: string
}

export type GraphicCardModelInput = {
  name?: string
  comment?: string
  product_number?: string
}

export type Group = {
  readonly id?: number
  name?: string
  comment?: string
  readonly completename?: string
  parent?: {
    id?: number
    name?: string
  }
  readonly level?: number
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

export type GroupInput = {
  name?: string
  comment?: string
  parent?: {
    id?: number
    name?: string
  }
  entity?: EntityInput
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

export type HardDrive = {
  readonly id?: number
  designation?: string
  comment?: string
  manufacturer?: Manufacturer
  entity?: Entity
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
  rpm?: string
  cache?: string
  capacity_default?: number
  interface?: InterfaceType
  model?: HardDriveModel
}

export type HardDriveInput = {
  designation?: string
  comment?: string
  manufacturer?: ManufacturerInput
  entity?: EntityInput
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
  rpm?: string
  cache?: string
  capacity_default?: number
  interface?: InterfaceTypeInput
  model?: HardDriveModelInput
}

export type HardDriveItem = {
  readonly id?: number
  itemtype?: string
  items_id?: number
  entity?: Entity
  is_recursive?: boolean
  serial?: string
  otherserial?: string
  location?: Location
  status?: State
  is_deleted?: boolean
  is_dynamic?: boolean
  hard_drive?: HardDrive
  busID?: string
  capacity?: number
}

export type HardDriveItemInput = {
  itemtype?: string
  items_id?: number
  entity?: EntityInput
  is_recursive?: boolean
  serial?: string
  otherserial?: string
  location?: LocationInput
  status?: StateInput
  is_deleted?: boolean
  is_dynamic?: boolean
  hard_drive?: HardDriveInput
  busID?: string
  capacity?: number
}

export type HardDriveModel = {
  readonly id?: number
  name?: string
  comment?: string
  product_number?: string
}

export type HardDriveModelInput = {
  name?: string
  comment?: string
  product_number?: string
}

export type HardDriveType = {
  readonly id?: number
  name?: string
  comment?: string
}

export type HardDriveTypeInput = {
  name?: string
  comment?: string
}

export type ITILCategory = {
  readonly id?: number
  name?: string
  readonly completename?: string
  readonly level?: number
  comment?: string
  entity?: Entity
  is_recursive?: boolean
  parent?: {
    id?: number
    readonly name?: string
  }
  user?: User
  group?: Group
  code?: string
  is_helpdesk_visible?: boolean
  ticket_incident_template?: TicketTemplate
  ticket_request_template?: TicketTemplate
  change_template?: ChangeTemplate
  problem_template?: ProblemTemplate
  is_incident_visible?: boolean
  is_request_visible?: boolean
  is_change_visible?: boolean
  is_problem_visible?: boolean
  knowbase_category?: KBCategory
  date_creation?: string
  date_mod?: string
}

export type ITILCategoryInput = {
  name?: string
  comment?: string
  entity?: EntityInput
  is_recursive?: boolean
  parent?: {
    id?: number
  }
  user?: UserInput
  group?: GroupInput
  code?: string
  is_helpdesk_visible?: boolean
  ticket_incident_template?: TicketTemplateInput
  ticket_request_template?: TicketTemplateInput
  change_template?: ChangeTemplateInput
  problem_template?: ProblemTemplateInput
  is_incident_visible?: boolean
  is_request_visible?: boolean
  is_change_visible?: boolean
  is_problem_visible?: boolean
  knowbase_category?: KBCategoryInput
  date_creation?: string
  date_mod?: string
}

export type ITILReminder = {
  itemtype?: string
  items_id?: number
  pending_reason?: PendingReason
  name?: string
  content?: string
  date_creation?: string
  date_mod?: string
}

export type ITILReminderInput = {
  itemtype?: string
  items_id?: number
  pending_reason?: PendingReasonInput
  name?: string
  content?: string
  date_creation?: string
  date_mod?: string
}

export type ITILStats = {
  item?: {
    readonly id?: number
    name?: string
  }
  number_open?: number
  number_solved?: number
  number_late?: number
  number_closed?: number
  satisfaction_surveys_open?: number
  satisfaction_surveys_answered?: number
  satisfaction_surveys_avg_rating?: number
  time_take_into_account_avg?: number
  time_solve_avg?: number
  time_close_avg?: number
  time_treatment_avg?: number
  time_treatment_total?: number
}

export type ITILStatsInput = {
  item?: {
    name?: string
  }
  number_open?: number
  number_solved?: number
  number_late?: number
  number_closed?: number
  satisfaction_surveys_open?: number
  satisfaction_surveys_answered?: number
  satisfaction_surveys_avg_rating?: number
  time_take_into_account_avg?: number
  time_solve_avg?: number
  time_close_avg?: number
  time_treatment_avg?: number
  time_treatment_total?: number
}

export type ITILProject = {
  readonly id?: number
  project?: Project
  itemtype?: 'Ticket' | 'Change' | 'Problem'
  items_id?: number
}

export type ITILProjectInput = {
  project?: ProjectInput
  itemtype?: 'Ticket' | 'Change' | 'Problem'
  items_id?: number
}

export type Infocom = {
  readonly id?: number
  readonly itemtype?: string
  readonly items_id?: number
  comment?: string
  entity?: Entity
  is_recursive?: boolean
  date_buy?: string
  date_use?: string
  date_order?: string
  date_delivery?: string
  date_inventory?: string
  date_warranty?: string
  date_decommission?: string
  warranty_info?: string
  warranty_value?: number
  warranty_duration?: number
  budget?: Budget
  supplier?: Supplier
  order_number?: string
  delivery_number?: string
  immo_number?: string
  invoice_number?: string
  value?: number
  amortization_type?: 0 | 1 | 2
  amortization_time?: number
  amortization_coeff?: number
  business_criticity?: BusinessCriticity
}

export type InfocomInput = {
  comment?: string
  entity?: EntityInput
  is_recursive?: boolean
  date_buy?: string
  date_use?: string
  date_order?: string
  date_delivery?: string
  date_inventory?: string
  date_warranty?: string
  date_decommission?: string
  warranty_info?: string
  warranty_value?: number
  warranty_duration?: number
  budget?: BudgetInput
  supplier?: SupplierInput
  order_number?: string
  delivery_number?: string
  immo_number?: string
  invoice_number?: string
  value?: number
  amortization_type?: 0 | 1 | 2
  amortization_time?: number
  amortization_coeff?: number
  business_criticity?: BusinessCriticityInput
}

export type InterfaceType = {
  readonly id?: number
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type InterfaceTypeInput = {
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type ItemLine = {
  readonly id?: number
  line?: Line
  itemtype?: string
  items_id?: number
}

export type ItemLineInput = {
  line?: LineInput
  itemtype?: string
  items_id?: number
}

export type ItemPlug = {
  readonly id?: number
  plug: Plug
  itemtype: string
  items_id: number
  number_plugs: number
  readonly date_creation?: string
  readonly date_mod?: string
}

export type ItemPlugInput = {
  plug: PlugInput
  itemtype: string
  items_id: number
  number_plugs: number
}

export type ItemProject = {
  readonly id?: number
  project?: Project
  itemtype?: string
  items_id?: number
}

export type ItemProjectInput = {
  project?: ProjectInput
  itemtype?: string
  items_id?: number
}

export type KBArticle = {
  readonly id?: number
  name?: string
  content?: string
  categories?: KBCategory[]
  is_faq?: boolean
  entity?: Entity
  is_recursive?: boolean
  user?: User
  views?: number
  show_in_service_catalog?: boolean
  description?: string
  illustration?:
    | 'advanced-dashboards'
    | 'advanced-forms'
    | 'agent-config'
    | 'alert'
    | 'anonymise'
    | 'anonymize-alt'
    | 'ansible'
    | 'antivirus'
    | 'application'
    | 'application-altenative'
    | 'application-edit'
    | 'approval-by-mail'
    | 'approve-requests'
    | 'asset-cartridge'
    | 'asset-desktop-1'
    | 'asset-desktop-2'
    | 'asset-laptop'
    | 'asset-lost'
    | 'asset-network-equipment'
    | 'asset-peripheral'
    | 'asset-phone'
    | 'asset-printer'
    | 'asset-server'
    | 'asset-smartphone'
    | 'backup-restoration-1'
    | 'backup-restoration-2'
    | 'bank'
    | 'bi-reporting-1'
    | 'bi-reporting-2'
    | 'bi-reporting-3'
    | 'bi-reporting-4'
    | 'bookmark'
    | 'branding'
    | 'browse-kb'
    | 'building'
    | 'calendar'
    | 'car'
    | 'carbon'
    | 'centreon'
    | 'chart-area'
    | 'chart-bar'
    | 'chart-donut'
    | 'chart-line'
    | 'chart-multiple'
    | 'chart-pie'
    | 'chart-search'
    | 'chat-1'
    | 'chat-2'
    | 'cloud'
    | 'cloud-instance'
    | 'cloud-inventory'
    | 'cloud-network-1'
    | 'cloud-network-2'
    | 'cloud-usage'
    | 'collaborative-tools'
    | 'connectivity-issue'
    | 'container'
    | 'containers'
    | 'contract-signing-1'
    | 'contract-signing-2'
    | 'credit'
    | 'data-export'
    | 'data-injection'
    | 'database'
    | 'database-add'
    | 'delivery'
    | 'diagnostic'
    | 'doc-developer'
    | 'documentation'
    | 'download'
    | 'error-404'
    | 'escalade'
    | 'factory'
    | 'faq'
    | 'fields'
    | 'file-sheet'
    | 'firewall'
    | 'fixing-bug'
    | 'fixing-bug-2'
    | 'folder'
    | 'formcreator'
    | 'gantt'
    | 'gdpr-tools'
    | 'gear'
    | 'gear-hand'
    | 'generic-objects'
    | 'glpi-ai'
    | 'glpi-cloud-support-1'
    | 'glpi-cloud-support-2'
    | 'group'
    | 'group-alternative-1'
    | 'group-alternative-2'
    | 'group-web'
    | 'helpdesk'
    | 'hierarchy'
    | 'holiday'
    | 'inbox'
    | 'inventory'
    | 'inventory-numbers'
    | 'items-export'
    | 'kb-faq'
    | 'ldap-diagnostic'
    | 'ldap-inventory'
    | 'ldap-manage'
    | 'legal'
    | 'license'
    | 'location-1'
    | 'location-2'
    | 'locations'
    | 'lock'
    | 'mobility'
    | 'monitoring'
    | 'more-options'
    | 'more-satisfaction'
    | 'network-inventory'
    | 'new-user-1'
    | 'new-user-2'
    | 'new-user-3'
    | 'new-user-4'
    | 'newspaper'
    | 'notes'
    | 'oauth-imap'
    | 'oauth-sso'
    | 'on-premise'
    | 'order-management'
    | 'order-supplies'
    | 'partner'
    | 'pdf-export'
    | 'phone-inventory'
    | 'presentation'
    | 'print-job'
    | 'printer-inventory'
    | 'question'
    | 'rename-glpi-strings'
    | 'report-issue'
    | 'request-service'
    | 'request-support'
    | 'reservation'
    | 'reset-password-1'
    | 'reset-password-2'
    | 'reset-password-3'
    | 'rss-feeds'
    | 'scim'
    | 'security'
    | 'settings'
    | 'settings-search'
    | 'shaking-hands'
    | 'shared-folder'
    | 'shared-inbox'
    | 'software-deployment'
    | 'splitcat'
    | 'tag'
    | 'technical-assistance-1'
    | 'technical-assistance-2'
    | 'ticket'
    | 'tickets'
    | 'time'
    | 'training'
    | 'translation'
    | 'tutorial'
    | 'uninstall'
    | 'unread-messages'
    | 'update-1'
    | 'update-2'
    | 'user-laptop'
    | 'user-offboarding'
    | 'virus'
    | 'vpn'
    | 'web'
    | 'webinar'
    | 'wharehouse'
    | 'world'
    | 'youtube'
  is_pinned?: boolean
  date_creation?: string
  date_mod?: string
  date_begin?: string
  date_end?: string
  revisions?: KBArticleRevision[]
  translations?: KBArticleTranslation[]
}

export type KBArticleInput = {
  name?: string
  content?: string
  categories?: KBCategoryInput[]
  is_faq?: boolean
  entity?: EntityInput
  is_recursive?: boolean
  user?: UserInput
  views?: number
  show_in_service_catalog?: boolean
  description?: string
  illustration?:
    | 'advanced-dashboards'
    | 'advanced-forms'
    | 'agent-config'
    | 'alert'
    | 'anonymise'
    | 'anonymize-alt'
    | 'ansible'
    | 'antivirus'
    | 'application'
    | 'application-altenative'
    | 'application-edit'
    | 'approval-by-mail'
    | 'approve-requests'
    | 'asset-cartridge'
    | 'asset-desktop-1'
    | 'asset-desktop-2'
    | 'asset-laptop'
    | 'asset-lost'
    | 'asset-network-equipment'
    | 'asset-peripheral'
    | 'asset-phone'
    | 'asset-printer'
    | 'asset-server'
    | 'asset-smartphone'
    | 'backup-restoration-1'
    | 'backup-restoration-2'
    | 'bank'
    | 'bi-reporting-1'
    | 'bi-reporting-2'
    | 'bi-reporting-3'
    | 'bi-reporting-4'
    | 'bookmark'
    | 'branding'
    | 'browse-kb'
    | 'building'
    | 'calendar'
    | 'car'
    | 'carbon'
    | 'centreon'
    | 'chart-area'
    | 'chart-bar'
    | 'chart-donut'
    | 'chart-line'
    | 'chart-multiple'
    | 'chart-pie'
    | 'chart-search'
    | 'chat-1'
    | 'chat-2'
    | 'cloud'
    | 'cloud-instance'
    | 'cloud-inventory'
    | 'cloud-network-1'
    | 'cloud-network-2'
    | 'cloud-usage'
    | 'collaborative-tools'
    | 'connectivity-issue'
    | 'container'
    | 'containers'
    | 'contract-signing-1'
    | 'contract-signing-2'
    | 'credit'
    | 'data-export'
    | 'data-injection'
    | 'database'
    | 'database-add'
    | 'delivery'
    | 'diagnostic'
    | 'doc-developer'
    | 'documentation'
    | 'download'
    | 'error-404'
    | 'escalade'
    | 'factory'
    | 'faq'
    | 'fields'
    | 'file-sheet'
    | 'firewall'
    | 'fixing-bug'
    | 'fixing-bug-2'
    | 'folder'
    | 'formcreator'
    | 'gantt'
    | 'gdpr-tools'
    | 'gear'
    | 'gear-hand'
    | 'generic-objects'
    | 'glpi-ai'
    | 'glpi-cloud-support-1'
    | 'glpi-cloud-support-2'
    | 'group'
    | 'group-alternative-1'
    | 'group-alternative-2'
    | 'group-web'
    | 'helpdesk'
    | 'hierarchy'
    | 'holiday'
    | 'inbox'
    | 'inventory'
    | 'inventory-numbers'
    | 'items-export'
    | 'kb-faq'
    | 'ldap-diagnostic'
    | 'ldap-inventory'
    | 'ldap-manage'
    | 'legal'
    | 'license'
    | 'location-1'
    | 'location-2'
    | 'locations'
    | 'lock'
    | 'mobility'
    | 'monitoring'
    | 'more-options'
    | 'more-satisfaction'
    | 'network-inventory'
    | 'new-user-1'
    | 'new-user-2'
    | 'new-user-3'
    | 'new-user-4'
    | 'newspaper'
    | 'notes'
    | 'oauth-imap'
    | 'oauth-sso'
    | 'on-premise'
    | 'order-management'
    | 'order-supplies'
    | 'partner'
    | 'pdf-export'
    | 'phone-inventory'
    | 'presentation'
    | 'print-job'
    | 'printer-inventory'
    | 'question'
    | 'rename-glpi-strings'
    | 'report-issue'
    | 'request-service'
    | 'request-support'
    | 'reservation'
    | 'reset-password-1'
    | 'reset-password-2'
    | 'reset-password-3'
    | 'rss-feeds'
    | 'scim'
    | 'security'
    | 'settings'
    | 'settings-search'
    | 'shaking-hands'
    | 'shared-folder'
    | 'shared-inbox'
    | 'software-deployment'
    | 'splitcat'
    | 'tag'
    | 'technical-assistance-1'
    | 'technical-assistance-2'
    | 'ticket'
    | 'tickets'
    | 'time'
    | 'training'
    | 'translation'
    | 'tutorial'
    | 'uninstall'
    | 'unread-messages'
    | 'update-1'
    | 'update-2'
    | 'user-laptop'
    | 'user-offboarding'
    | 'virus'
    | 'vpn'
    | 'web'
    | 'webinar'
    | 'wharehouse'
    | 'world'
    | 'youtube'
  is_pinned?: boolean
  date_creation?: string
  date_mod?: string
  date_begin?: string
  date_end?: string
  revisions?: KBArticleRevisionInput[]
  translations?: KBArticleTranslationInput[]
}

export type KBArticleComment = {
  readonly id?: number
  kbarticle?: KBArticle
  user?: User
  language?: string
  comment?: string
  parent?: {
    readonly id?: number
  }
  date_creation?: string
  date_mod?: string
}

export type KBArticleCommentInput = {
  kbarticle?: KBArticleInput
  user?: UserInput
  language?: string
  comment?: string
  parent?: {}
  date_creation?: string
  date_mod?: string
}

export type KBArticleRevision = {
  readonly id?: number
  kbarticle?: KBArticle
  revision?: number
  name?: string
  content?: string
  language?: string
  user?: User
  date?: string
}

export type KBArticleRevisionInput = {
  kbarticle?: KBArticleInput
  revision?: number
  name?: string
  content?: string
  language?: string
  user?: UserInput
  date?: string
}

export type KBArticleTranslation = {
  readonly id?: number
  kbarticle?: KBArticle
  language?: string
  name?: string
  content?: string
  user?: User
  date_creation?: string
  date_mod?: string
}

export type KBArticleTranslationInput = {
  kbarticle?: KBArticleInput
  language?: string
  name?: string
  content?: string
  user?: UserInput
  date_creation?: string
  date_mod?: string
}

export type KBArticleEntityTarget = {
  readonly id?: number
  kbarticle?: KBArticle
  entity?: Entity
  is_recursive?: boolean
}

export type KBArticleEntityTargetInput = {
  kbarticle?: KBArticleInput
  entity?: EntityInput
  is_recursive?: boolean
}

export type KBArticleGroupTarget = {
  readonly id?: number
  kbarticle?: KBArticle
  group?: Group
  entity?: Entity
  is_recursive?: boolean
}

export type KBArticleGroupTargetInput = {
  kbarticle?: KBArticleInput
  group?: GroupInput
  entity?: EntityInput
  is_recursive?: boolean
}

export type KBArticleItem = {
  readonly id?: number
  kbarticle?: KBArticle
  itemtype?: string
  items_id?: number
  date_creation?: string
  date_mod?: string
}

export type KBArticleItemInput = {
  kbarticle?: KBArticleInput
  itemtype?: string
  items_id?: number
  date_creation?: string
  date_mod?: string
}

export type KBArticleProfileTarget = {
  readonly id?: number
  kbarticle?: KBArticle
  profile?: Profile
  entity?: Entity
  is_recursive?: boolean
}

export type KBArticleProfileTargetInput = {
  kbarticle?: KBArticleInput
  profile?: ProfileInput
  entity?: EntityInput
  is_recursive?: boolean
}

export type KBArticleUserTarget = {
  readonly id?: number
  kbarticle?: KBArticle
  user?: User
}

export type KBArticleUserTargetInput = {
  kbarticle?: KBArticleInput
  user?: UserInput
}

export type KBCategory = {
  readonly id?: number
  name?: string
  readonly completename?: string
  comment?: string
  entity?: Entity
  is_recursive?: boolean
  parent?: {
    id?: number
    readonly name?: string
  }
  readonly level?: number
  date_creation?: string
  date_mod?: string
}

export type KBCategoryInput = {
  name?: string
  comment?: string
  entity?: EntityInput
  is_recursive?: boolean
  parent?: {
    id?: number
  }
  date_creation?: string
  date_mod?: string
}

export type LDAPDirectory = {
  readonly id?: number
  name?: string
  host?: string
  port?: number
  is_default?: boolean
  is_active?: boolean
  comment?: string
  connection_filter?: string
  basedn?: string
  use_bind?: boolean
  rootdn?: string
  login_field?: string
  sync_field?: string
}

export type LDAPDirectoryInput = {
  name?: string
  host?: string
  port?: number
  is_default?: boolean
  is_active?: boolean
  comment?: string
  connection_filter?: string
  basedn?: string
  use_bind?: boolean
  rootdn?: string
  rootdn_password?: string
  login_field?: string
  sync_field?: string
}

export type LDAPDirectoryReplicate = {
  readonly id?: number
  ldap_directory?: LDAPDirectory
  host?: string
  port?: number
  name?: string
  timeout?: number
}

export type LDAPDirectoryReplicateInput = {
  ldap_directory?: LDAPDirectoryInput
  host?: string
  port?: number
  name?: string
  timeout?: number
}

export type License = {
  readonly id?: number
  name?: string
  comment?: string
  status?: State
  location?: Location
  entity?: Entity
  readonly is_recursive?: boolean
  date_creation?: string
  date_mod?: string
  type?: LicenseType
  manufacturer?: Manufacturer
  user_tech?: User
  group_tech?: Group[]
  user?: User
  group?: Group[]
  contact?: string
  contact_num?: string
  serial?: string
  otherserial?: string
  is_deleted?: boolean
  readonly completename?: string
  readonly level?: number
}

export type LicenseInput = {
  name?: string
  comment?: string
  status?: StateInput
  location?: LocationInput
  entity?: EntityInput
  date_creation?: string
  date_mod?: string
  type?: LicenseTypeInput
  manufacturer?: ManufacturerInput
  user_tech?: UserInput
  group_tech?: GroupInput[]
  user?: UserInput
  group?: GroupInput[]
  contact?: string
  contact_num?: string
  serial?: string
  otherserial?: string
  is_deleted?: boolean
}

export type LicenseType = {
  readonly id?: number
  name?: string
  comment?: string
  entity?: Entity
  is_recursive?: boolean
  parent?: {
    id?: number
    readonly name?: string
  }
  readonly level?: number
  readonly completename?: string
  date_creation?: string
  date_mod?: string
}

export type LicenseTypeInput = {
  name?: string
  comment?: string
  entity?: EntityInput
  is_recursive?: boolean
  parent?: {
    id?: number
  }
  date_creation?: string
  date_mod?: string
}

export type Line = {
  readonly id?: number
  name?: string
  comment?: string
  status?: State
  location?: Location
  entity?: Entity
  date_creation?: string
  date_mod?: string
  type?: LineType
  user_tech?: User
  group_tech?: Group[]
  user?: User
  group?: Group[]
  is_deleted?: boolean
  caller_num?: string
  caller_name?: string
  operator?: LineOperator
}

export type LineInput = {
  name?: string
  comment?: string
  status?: StateInput
  location?: LocationInput
  entity?: EntityInput
  date_creation?: string
  date_mod?: string
  type?: LineTypeInput
  user_tech?: UserInput
  group_tech?: GroupInput[]
  user?: UserInput
  group?: GroupInput[]
  is_deleted?: boolean
  caller_num?: string
  caller_name?: string
  operator?: LineOperatorInput
}

export type LineOperator = {
  readonly id?: number
  name?: string
  comment?: string
  entity?: Entity
  is_recursive?: boolean
  mcc?: number
  mnc?: number
  date_creation?: string
  date_mod?: string
}

export type LineOperatorInput = {
  name?: string
  comment?: string
  entity?: EntityInput
  is_recursive?: boolean
  mcc?: number
  mnc?: number
  date_creation?: string
  date_mod?: string
}

export type LineType = {
  readonly id?: number
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type LineTypeInput = {
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type Location = {
  readonly id?: number
  name?: string
  readonly completename?: string
  code?: string
  alias?: string
  comment?: string
  entity?: Entity
  is_recursive?: boolean
  parent?: {
    id?: number
    readonly name?: string
  }
  readonly level?: number
  room?: string
  building?: string
  address?: string
  town?: string
  postcode?: string
  state?: string
  country?: string
  latitude?: string
  longitude?: string
  altitude?: string
  date_creation?: string
  date_mod?: string
}

export type LocationInput = {
  name?: string
  code?: string
  alias?: string
  comment?: string
  entity?: EntityInput
  is_recursive?: boolean
  parent?: {
    id?: number
  }
  room?: string
  building?: string
  address?: string
  town?: string
  postcode?: string
  state?: string
  country?: string
  latitude?: string
  longitude?: string
  altitude?: string
  date_creation?: string
  date_mod?: string
}

export type LockedField = {
  readonly id?: number
  itemtype?: string
  items_id?: number
  field?: string
  value?: string
  is_global?: boolean
  readonly date_creation?: string
  readonly date_mod?: string
}

export type LockedFieldInput = {
  itemtype?: string
  items_id?: number
  field?: string
  value?: string
  is_global?: boolean
}

export type ManualLink = {
  readonly id?: number
  itemtype?: string
  items_id?: number
  name?: string
  url?: string
  open_window?: boolean
  icon?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type ManualLinkInput = {
  itemtype?: string
  items_id?: number
  name?: string
  url?: string
  open_window?: boolean
  icon?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type Manufacturer = {
  readonly id?: number
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type ManufacturerInput = {
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type Memory = {
  readonly id?: number
  designation?: string
  comment?: string
  manufacturer?: Manufacturer
  entity?: Entity
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
  frequency?: string
  size_default?: number
  type?: MemoryType
  model?: MemoryModel
}

export type MemoryInput = {
  designation?: string
  comment?: string
  manufacturer?: ManufacturerInput
  entity?: EntityInput
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
  frequency?: string
  size_default?: number
  type?: MemoryTypeInput
  model?: MemoryModelInput
}

export type MemoryItem = {
  readonly id?: number
  itemtype?: string
  items_id?: number
  entity?: Entity
  is_recursive?: boolean
  serial?: string
  otherserial?: string
  location?: Location
  status?: State
  is_deleted?: boolean
  is_dynamic?: boolean
  memory?: Memory
  busID?: string
  size?: number
}

export type MemoryItemInput = {
  itemtype?: string
  items_id?: number
  entity?: EntityInput
  is_recursive?: boolean
  serial?: string
  otherserial?: string
  location?: LocationInput
  status?: StateInput
  is_deleted?: boolean
  is_dynamic?: boolean
  memory?: MemoryInput
  busID?: string
  size?: number
}

export type MemoryModel = {
  readonly id?: number
  name?: string
  comment?: string
  product_number?: string
}

export type MemoryModelInput = {
  name?: string
  comment?: string
  product_number?: string
}

export type MemoryType = {
  readonly id?: number
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type MemoryTypeInput = {
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type Monitor = {
  readonly id?: number
  name?: string
  comment?: string
  status?: State
  entity?: Entity
  is_recursive?: boolean
  manufacturer?: Manufacturer
  user?: User
  user_tech?: User
  contact?: string
  contact_num?: string
  serial?: string
  otherserial?: string
  is_deleted?: boolean
  date_creation?: string
  date_mod?: string
  location?: Location
  type?: MonitorType
  model?: MonitorModel
  group?: Group[]
  group_tech?: Group[]
  readonly uuid?: string
  autoupdatesystem?: AutoUpdateSystem
  size?: number
  has_microphone?: boolean
  has_speaker?: boolean
  has_subd?: boolean
  has_bnc?: boolean
  has_dvi?: boolean
  has_pivot?: boolean
  has_hdmi?: boolean
  has_displayport?: boolean
  is_global?: boolean
  is_template?: boolean
  template_name?: string
  ticket_tco?: number
  is_dynamic?: boolean
}

export type MonitorInput = {
  name?: string
  comment?: string
  status?: StateInput
  entity?: EntityInput
  is_recursive?: boolean
  manufacturer?: ManufacturerInput
  user?: UserInput
  user_tech?: UserInput
  contact?: string
  contact_num?: string
  serial?: string
  otherserial?: string
  is_deleted?: boolean
  date_creation?: string
  date_mod?: string
  location?: LocationInput
  type?: MonitorTypeInput
  model?: MonitorModelInput
  group?: GroupInput[]
  group_tech?: GroupInput[]
  autoupdatesystem?: AutoUpdateSystemInput
  size?: number
  has_microphone?: boolean
  has_speaker?: boolean
  has_subd?: boolean
  has_bnc?: boolean
  has_dvi?: boolean
  has_pivot?: boolean
  has_hdmi?: boolean
  has_displayport?: boolean
  is_global?: boolean
  is_template?: boolean
  template_name?: string
  ticket_tco?: number
  is_dynamic?: boolean
}

export type MonitorModel = {
  readonly id?: number
  name?: string
  comment?: string
  product_number?: string
  weight?: number
  rack_units?: number
  depth?: 0.25 | 0.33 | 0.5 | 1
  power_connections?: number
  power_consumption?: number
  is_half_rack?: boolean
  readonly picture_front?: string
  readonly picture_rear?: string
  pictures?: string[]
  date_creation?: string
  date_mod?: string
}

export type MonitorModelInput = {
  name?: string
  comment?: string
  product_number?: string
  weight?: number
  rack_units?: number
  depth?: 0.25 | 0.33 | 0.5 | 1
  power_connections?: number
  power_consumption?: number
  is_half_rack?: boolean
  pictures?: string[]
  date_creation?: string
  date_mod?: string
}

export type MonitorType = {
  readonly id?: number
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type MonitorTypeInput = {
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type Network = {
  readonly id?: number
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type NetworkInput = {
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type NetworkCard = {
  readonly id?: number
  designation?: string
  comment?: string
  manufacturer?: Manufacturer
  entity?: Entity
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
  bandwidth?: string
  mac_default?: string
  model?: NetworkCardModel
}

export type NetworkCardInput = {
  designation?: string
  comment?: string
  manufacturer?: ManufacturerInput
  entity?: EntityInput
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
  bandwidth?: string
  mac_default?: string
  model?: NetworkCardModelInput
}

export type NetworkCardItem = {
  readonly id?: number
  itemtype?: string
  items_id?: number
  entity?: Entity
  is_recursive?: boolean
  serial?: string
  otherserial?: string
  location?: Location
  status?: State
  is_deleted?: boolean
  is_dynamic?: boolean
  network_card?: NetworkCard
  busID?: string
  mac?: string
}

export type NetworkCardItemInput = {
  itemtype?: string
  items_id?: number
  entity?: EntityInput
  is_recursive?: boolean
  serial?: string
  otherserial?: string
  location?: LocationInput
  status?: StateInput
  is_deleted?: boolean
  is_dynamic?: boolean
  network_card?: NetworkCardInput
  busID?: string
  mac?: string
}

export type NetworkCardModel = {
  readonly id?: number
  name?: string
  comment?: string
  product_number?: string
}

export type NetworkCardModelInput = {
  name?: string
  comment?: string
  product_number?: string
}

export type NetworkEquipment = {
  readonly id?: number
  name?: string
  comment?: string
  status?: State
  entity?: Entity
  is_recursive?: boolean
  manufacturer?: Manufacturer
  user?: User
  user_tech?: User
  contact?: string
  contact_num?: string
  serial?: string
  otherserial?: string
  is_deleted?: boolean
  date_creation?: string
  date_mod?: string
  location?: Location
  type?: NetworkEquipmentType
  model?: NetworkEquipmentModel
  group?: Group[]
  group_tech?: Group[]
  readonly uuid?: string
  network?: Network
  autoupdatesystem?: AutoUpdateSystem
  ram?: number
  is_template?: boolean
  template_name?: string
  ticket_tco?: number
  is_dynamic?: boolean
  sysdescr?: string
  cpu?: number
  readonly last_inventory_update?: string
  snmp_credential?: SNMPCredential
}

export type NetworkEquipmentInput = {
  name?: string
  comment?: string
  status?: StateInput
  entity?: EntityInput
  is_recursive?: boolean
  manufacturer?: ManufacturerInput
  user?: UserInput
  user_tech?: UserInput
  contact?: string
  contact_num?: string
  serial?: string
  otherserial?: string
  is_deleted?: boolean
  date_creation?: string
  date_mod?: string
  location?: LocationInput
  type?: NetworkEquipmentTypeInput
  model?: NetworkEquipmentModelInput
  group?: GroupInput[]
  group_tech?: GroupInput[]
  network?: NetworkInput
  autoupdatesystem?: AutoUpdateSystemInput
  ram?: number
  is_template?: boolean
  template_name?: string
  ticket_tco?: number
  is_dynamic?: boolean
  sysdescr?: string
  cpu?: number
  snmp_credential?: SNMPCredentialInput
}

export type NetworkEquipmentModel = {
  readonly id?: number
  name?: string
  comment?: string
  product_number?: string
  weight?: number
  rack_units?: number
  depth?: 0.25 | 0.33 | 0.5 | 1
  power_connections?: number
  power_consumption?: number
  is_half_rack?: boolean
  readonly picture_front?: string
  readonly picture_rear?: string
  pictures?: string[]
  date_creation?: string
  date_mod?: string
}

export type NetworkEquipmentModelInput = {
  name?: string
  comment?: string
  product_number?: string
  weight?: number
  rack_units?: number
  depth?: 0.25 | 0.33 | 0.5 | 1
  power_connections?: number
  power_consumption?: number
  is_half_rack?: boolean
  pictures?: string[]
  date_creation?: string
  date_mod?: string
}

export type NetworkEquipmentType = {
  readonly id?: number
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type NetworkEquipmentTypeInput = {
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type NetworkPort = {
  readonly id?: number
  name?: string
  comment?: string
  entity?: Entity
  is_recursive?: boolean
  readonly itemtype?: string
  readonly items_id?: number
  instantiation_type?:
    | 'NetworkPortEthernet'
    | 'NetworkPortWifi'
    | 'NetworkPortAggregate'
    | 'NetworkPortAlias'
    | 'NetworkPortDialup'
    | 'NetworkPortLocal'
    | 'NetworkPortFiberchannel'
  logical_number?: number
  mac?: string
  is_deleted?: boolean
  is_dynamic?: boolean
  if_mtu?: number
  if_speed?: number
  if_internal_status?: string
  if_connection_status?: number
  if_last_change?: string
  if_in_bytes?: number
  if_out_bytes?: number
  if_in_errors?: number
  if_out_errors?: number
  if_status?: string
  if_description?: string
  if_alias?: string
  port_duplex?: string
  trunk?: number
  date_creation?: string
  date_mod?: string
}

export type NetworkPortInput = {
  name?: string
  comment?: string
  entity?: EntityInput
  is_recursive?: boolean
  instantiation_type?:
    | 'NetworkPortEthernet'
    | 'NetworkPortWifi'
    | 'NetworkPortAggregate'
    | 'NetworkPortAlias'
    | 'NetworkPortDialup'
    | 'NetworkPortLocal'
    | 'NetworkPortFiberchannel'
  logical_number?: number
  mac?: string
  is_deleted?: boolean
  is_dynamic?: boolean
  if_mtu?: number
  if_speed?: number
  if_internal_status?: string
  if_connection_status?: number
  if_last_change?: string
  if_in_bytes?: number
  if_out_bytes?: number
  if_in_errors?: number
  if_out_errors?: number
  if_status?: string
  if_description?: string
  if_alias?: string
  port_duplex?: string
  trunk?: number
  date_creation?: string
  date_mod?: string
}

export type NetworkPortAggregate = {
  readonly id?: number
  network_port?: NetworkPort
  network_port_list?: string
  date_creation?: string
  date_mod?: string
}

export type NetworkPortAggregateInput = {
  network_port?: NetworkPortInput
  network_port_list?: string
  date_creation?: string
  date_mod?: string
}

export type NetworkPortAlias = {
  readonly id?: number
  network_port?: NetworkPort
  aliased_network_port?: NetworkPort
  date_creation?: string
  date_mod?: string
}

export type NetworkPortAliasInput = {
  network_port?: NetworkPortInput
  aliased_network_port?: NetworkPortInput
  date_creation?: string
  date_mod?: string
}

export type NetworkPortDialup = {
  readonly id?: number
  network_port?: NetworkPort
  date_creation?: string
  date_mod?: string
}

export type NetworkPortDialupInput = {
  network_port?: NetworkPortInput
  date_creation?: string
  date_mod?: string
}

export type NetworkPortEthernet = {
  readonly id?: number
  network_port?: NetworkPort
  network_card?: NetworkCardItem
  type?: '' | 'T' | 'SX' | 'LX'
  speed?: number
  date_creation?: string
  date_mod?: string
}

export type NetworkPortEthernetInput = {
  network_port?: NetworkPortInput
  network_card?: NetworkCardItemInput
  type?: '' | 'T' | 'SX' | 'LX'
  speed?: number
  date_creation?: string
  date_mod?: string
}

export type NetworkPortFiberchannel = {
  readonly id?: number
  network_port?: NetworkPort
  network_card?: NetworkCardItem
  type?: NetworkPortFiberchannelType
  wwn?: string
  speed?: number
  date_creation?: string
  date_mod?: string
}

export type NetworkPortFiberchannelInput = {
  network_port?: NetworkPortInput
  network_card?: NetworkCardItemInput
  type?: NetworkPortFiberchannelTypeInput
  wwn?: string
  speed?: number
  date_creation?: string
  date_mod?: string
}

export type NetworkPortFiberchannelType = {
  readonly id?: number
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type NetworkPortFiberchannelTypeInput = {
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type NetworkPortLocal = {
  readonly id?: number
  network_port?: NetworkPort
  date_creation?: string
  date_mod?: string
}

export type NetworkPortLocalInput = {
  network_port?: NetworkPortInput
  date_creation?: string
  date_mod?: string
}

export type NetworkPortType = {
  readonly id?: number
  name?: string
  comment?: string
  entity?: Entity
  is_recursive?: boolean
  iftype: number
  is_importable?: boolean
  instantiation_type?:
    | 'NetworkPortEthernet'
    | 'NetworkPortWifi'
    | 'NetworkPortAggregate'
    | 'NetworkPortAlias'
    | 'NetworkPortDialup'
    | 'NetworkPortLocal'
    | 'NetworkPortFiberchannel'
  date_creation?: string
  date_mod?: string
}

export type NetworkPortTypeInput = {
  name?: string
  comment?: string
  entity?: EntityInput
  is_recursive?: boolean
  iftype: number
  is_importable?: boolean
  instantiation_type?:
    | 'NetworkPortEthernet'
    | 'NetworkPortWifi'
    | 'NetworkPortAggregate'
    | 'NetworkPortAlias'
    | 'NetworkPortDialup'
    | 'NetworkPortLocal'
    | 'NetworkPortFiberchannel'
  date_creation?: string
  date_mod?: string
}

export type NetworkPortWifi = {
  readonly id?: number
  network_port?: NetworkPort
  network_card?: NetworkCardItem
  wifinetwork?: WifiNetwork
  version?: '' | 'a' | 'b' | 'a/b' | 'a/b/g' | 'a/b/g/n' | 'a/b/g/n/y' | 'ac' | 'ax' | 'be' | 'bn'
  mode?: '' | 'ad-hoc' | 'managed' | 'master' | 'repeater' | 'secondary' | 'monitor' | 'auto'
  date_creation?: string
  date_mod?: string
}

export type NetworkPortWifiInput = {
  network_port?: NetworkPortInput
  network_card?: NetworkCardItemInput
  wifinetwork?: WifiNetworkInput
  version?: '' | 'a' | 'b' | 'a/b' | 'a/b/g' | 'a/b/g/n' | 'a/b/g/n/y' | 'ac' | 'ax' | 'be' | 'bn'
  mode?: '' | 'ad-hoc' | 'managed' | 'master' | 'repeater' | 'secondary' | 'monitor' | 'auto'
  date_creation?: string
  date_mod?: string
}

export type NotImportedEmail = {
  readonly id?: number
  readonly from?: string
  readonly to?: string
  readonly mail_collector?: EmailCollector
  readonly date?: string
  readonly subject?: string
  readonly messageid?: string
  readonly reason?: 0 | 1 | 2 | 3
  readonly user?: User
}

export type NotImportedEmailInput = {}

export type Note = {
  readonly id?: number
  itemtype?: string
  items_id?: number
  user?: User
  user_editor?: User
  content?: string
  visible_from_ticket?: boolean
  date_creation?: string
  date_mod?: string
}

export type NoteInput = {
  itemtype?: string
  items_id?: number
  user?: UserInput
  user_editor?: UserInput
  content?: string
  visible_from_ticket?: boolean
  date_creation?: string
  date_mod?: string
}

export type Notification = {
  readonly id?: number
  name?: string
  entity?: Entity
  is_recursive?: boolean
  is_active?: boolean
  itemtype?: string
  event?: string
  comment?: string
  allow_reply?: boolean
  attach_documents?: -2 | 0 | 1 | 2
  readonly date_creation?: string
  readonly date_mod?: string
  recipients?: NotificationRecipient[]
}

export type NotificationInput = {
  name?: string
  entity?: EntityInput
  is_recursive?: boolean
  is_active?: boolean
  itemtype?: string
  event?: string
  comment?: string
  allow_reply?: boolean
  attach_documents?: -2 | 0 | 1 | 2
  recipients?: NotificationRecipientInput[]
}

export type NotificationRecipient = {
  readonly id?: number
  notification?: Notification
  type?: 1 | 2 | 3 | 4 | 5 | 6
  items_id?: number
  is_exclusion?: boolean
}

export type NotificationRecipientInput = {
  notification?: NotificationInput
  type?: 1 | 2 | 3 | 4 | 5 | 6
  items_id?: number
  is_exclusion?: boolean
}

export type NotificationTemplate = {
  readonly id?: number
  name?: string
  itemtype?: string
  comment?: string
  css?: string
  readonly date_creation?: string
  readonly date_mod?: string
  translations?: NotificationTemplateTranslation[]
}

export type NotificationTemplateInput = {
  name?: string
  itemtype?: string
  comment?: string
  css?: string
  translations?: NotificationTemplateTranslationInput[]
}

export type NotificationTemplateTranslation = {
  readonly id?: number
  notification_template?: NotificationTemplate
  language?: string
  subject?: string
  content_text?: string
  content_html?: string
}

export type NotificationTemplateTranslationInput = {
  notification_template?: NotificationTemplateInput
  language?: string
  subject?: string
  content_text?: string
  content_html?: string
}

export type NotificationNotificationTemplate = {
  readonly id?: number
  notification?: Notification
  notification_template?: NotificationTemplate
  mode?: 'mailing' | 'ajax' | 'websocket' | 'sms' | 'xmpp' | 'irc'
}

export type NotificationNotificationTemplateInput = {
  notification?: NotificationInput
  notification_template?: NotificationTemplateInput
  mode?: 'mailing' | 'ajax' | 'websocket' | 'sms' | 'xmpp' | 'irc'
}

export type OAuthClient = {
  readonly id?: number
  name?: string
  comment?: string
  readonly identifier?: string
  readonly secret?: string
  redirect_uri?: string
  grants?: string
  scopes?: string
  is_active?: boolean
  is_confidential?: boolean
  allowed_ips?: string
}

export type OAuthClientInput = {
  name?: string
  comment?: string
  redirect_uri?: string
  grants?: string
  scopes?: string
  is_active?: boolean
  is_confidential?: boolean
  allowed_ips?: string
}

export type OLA = {
  readonly id?: number
  name?: string
  slm?: SLM
  entity?: Entity
  is_recursive?: boolean
  type?: 0 | 1
  comment?: string
  time?: number
  time_unit?: 'minute' | 'hour' | 'day' | 'month'
  use_ticket_calendar?: boolean
  calendar?: Calendar
  end_of_working_day?: boolean
  date_creation?: string
  date_mod?: string
}

export type OLAInput = {
  name?: string
  slm?: SLMInput
  entity?: EntityInput
  is_recursive?: boolean
  type?: 0 | 1
  comment?: string
  time?: number
  time_unit?: 'minute' | 'hour' | 'day' | 'month'
  use_ticket_calendar?: boolean
  calendar?: CalendarInput
  end_of_working_day?: boolean
  date_creation?: string
  date_mod?: string
}

export type OLALevel = {
  readonly id?: number
  readonly uuid?: string
  name?: string
  entity?: Entity
  is_recursive?: boolean
  execution_time?: number
  operator?: 'AND' | 'OR'
  ola?: OLA
}

export type OLALevelInput = {
  name?: string
  entity?: EntityInput
  is_recursive?: boolean
  execution_time?: number
  operator?: 'AND' | 'OR'
  ola?: OLAInput
}

export type OSInstallation = {
  readonly id?: number
  itemtype?: string
  items_id?: number
  operatingsystem?: OperatingSystem
  version?: OperatingSystemVersion
  edition?: OperatingSystemEdition
  servicepack?: OperatingSystemServicePack
  architecture?: OperatingSystemArchitecture
  kernel_version?: OperatingSystemKernelVersion
  license_number?: string
  licenseid?: string
  company?: string
  owner?: string
  hostid?: string
  date_install?: string
  date_creation?: string
  date_mod?: string
  is_deleted?: boolean
  entity?: Entity
  is_recursive?: boolean
}

export type OSInstallationInput = {
  itemtype?: string
  items_id?: number
  operatingsystem?: OperatingSystemInput
  version?: OperatingSystemVersionInput
  edition?: OperatingSystemEditionInput
  servicepack?: OperatingSystemServicePackInput
  architecture?: OperatingSystemArchitectureInput
  kernel_version?: OperatingSystemKernelVersionInput
  license_number?: string
  licenseid?: string
  company?: string
  owner?: string
  hostid?: string
  date_install?: string
  date_creation?: string
  date_mod?: string
  is_deleted?: boolean
  entity?: EntityInput
  is_recursive?: boolean
}

export type OperatingSystem = {
  readonly id?: number
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type OperatingSystemInput = {
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type OperatingSystemArchitecture = {
  readonly id?: number
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type OperatingSystemArchitectureInput = {
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type OperatingSystemEdition = {
  readonly id?: number
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type OperatingSystemEditionInput = {
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type OperatingSystemKernel = {
  readonly id?: number
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type OperatingSystemKernelInput = {
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type OperatingSystemKernelVersion = {
  readonly id?: number
  name?: string
  comment?: string
  kernel?: OperatingSystemKernel
  date_creation?: string
  date_mod?: string
}

export type OperatingSystemKernelVersionInput = {
  name?: string
  comment?: string
  kernel?: OperatingSystemKernelInput
  date_creation?: string
  date_mod?: string
}

export type OperatingSystemServicePack = {
  readonly id?: number
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type OperatingSystemServicePackInput = {
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type OperatingSystemVersion = {
  readonly id?: number
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type OperatingSystemVersionInput = {
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type PCIDevice = {
  readonly id?: number
  designation?: string
  comment?: string
  manufacturer?: Manufacturer
  entity?: Entity
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
  model?: PCIModel
}

export type PCIDeviceInput = {
  designation?: string
  comment?: string
  manufacturer?: ManufacturerInput
  entity?: EntityInput
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
  model?: PCIModelInput
}

export type PCIDeviceItem = {
  readonly id?: number
  itemtype?: string
  items_id?: number
  entity?: Entity
  is_recursive?: boolean
  serial?: string
  otherserial?: string
  location?: Location
  status?: State
  is_deleted?: boolean
  is_dynamic?: boolean
  pci_device?: PCIDevice
  busID?: string
}

export type PCIDeviceItemInput = {
  itemtype?: string
  items_id?: number
  entity?: EntityInput
  is_recursive?: boolean
  serial?: string
  otherserial?: string
  location?: LocationInput
  status?: StateInput
  is_deleted?: boolean
  is_dynamic?: boolean
  pci_device?: PCIDeviceInput
  busID?: string
}

export type PCIModel = {
  readonly id?: number
  name?: string
  comment?: string
  product_number?: string
}

export type PCIModelInput = {
  name?: string
  comment?: string
  product_number?: string
}

export type PCIVendor = {
  readonly id?: number
  name?: string
  comment?: string
  vendorid?: string
  deviceid?: string
  entity?: Entity
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
}

export type PCIVendorInput = {
  name?: string
  comment?: string
  vendorid?: string
  deviceid?: string
  entity?: EntityInput
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
}

export type PDU = {
  readonly id?: number
  name?: string
  comment?: string
  entity?: Entity
  is_recursive?: boolean
  location?: Location
  serial?: string
  otherserial?: string
  model?: PDUModel
  manufacturer?: Manufacturer
  type?: PDUType
  state?: State
  user?: User
  group?: Group[]
  user_tech?: User
  group_tech?: Group[]
  is_deleted?: boolean
  date_creation?: string
  date_mod?: string
  is_template?: boolean
  template_name?: string
}

export type PDUInput = {
  name?: string
  comment?: string
  entity?: EntityInput
  is_recursive?: boolean
  location?: LocationInput
  serial?: string
  otherserial?: string
  model?: PDUModelInput
  manufacturer?: ManufacturerInput
  type?: PDUTypeInput
  state?: StateInput
  user?: UserInput
  group?: GroupInput[]
  user_tech?: UserInput
  group_tech?: GroupInput[]
  is_deleted?: boolean
  date_creation?: string
  date_mod?: string
  is_template?: boolean
  template_name?: string
}

export type PDUModel = {
  readonly id?: number
  name?: string
  comment?: string
  product_number?: string
  weight?: number
  rack_units?: number
  depth?: number
  power_connections?: number
  max_power?: number
  is_half_rack?: boolean
  is_rackable?: boolean
  date_creation?: string
  date_mod?: string
}

export type PDUModelInput = {
  name?: string
  comment?: string
  product_number?: string
  weight?: number
  rack_units?: number
  depth?: number
  power_connections?: number
  max_power?: number
  is_half_rack?: boolean
  is_rackable?: boolean
  date_creation?: string
  date_mod?: string
}

export type PDUType = {
  readonly id?: number
  name?: string
  comment?: string
  entity?: Entity
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
}

export type PDUTypeInput = {
  name?: string
  comment?: string
  entity?: EntityInput
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
}

export type PassiveDCEquipment = {
  readonly id?: number
  name?: string
  comment?: string
  entity?: Entity
  is_recursive?: boolean
  location?: Location
  serial?: string
  otherserial?: string
  model?: PassiveDCEquipmentModel
  manufacturer?: Manufacturer
  type?: PassiveDCEquipmentType
  state?: State
  user?: User
  group?: Group[]
  user_tech?: User
  group_tech?: Group[]
  is_deleted?: boolean
  date_creation?: string
  date_mod?: string
  is_template?: boolean
  template_name?: string
}

export type PassiveDCEquipmentInput = {
  name?: string
  comment?: string
  entity?: EntityInput
  is_recursive?: boolean
  location?: LocationInput
  serial?: string
  otherserial?: string
  model?: PassiveDCEquipmentModelInput
  manufacturer?: ManufacturerInput
  type?: PassiveDCEquipmentTypeInput
  state?: StateInput
  user?: UserInput
  group?: GroupInput[]
  user_tech?: UserInput
  group_tech?: GroupInput[]
  is_deleted?: boolean
  date_creation?: string
  date_mod?: string
  is_template?: boolean
  template_name?: string
}

export type PassiveDCEquipmentModel = {
  readonly id?: number
  name?: string
  comment?: string
  product_number?: string
  weight?: number
  rack_units?: number
  depth?: number
  power_connections?: number
  power_consumption?: number
  is_half_rack?: boolean
  date_creation?: string
  date_mod?: string
}

export type PassiveDCEquipmentModelInput = {
  name?: string
  comment?: string
  product_number?: string
  weight?: number
  rack_units?: number
  depth?: number
  power_connections?: number
  power_consumption?: number
  is_half_rack?: boolean
  date_creation?: string
  date_mod?: string
}

export type PassiveDCEquipmentType = {
  readonly id?: number
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type PassiveDCEquipmentTypeInput = {
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type PendingReason = {
  readonly id?: number
  entity?: Entity
  is_recursive?: boolean
  is_default?: boolean
  name?: string
  followup_frequency?: number
  followups_before_resolution?: number
  followup_template?: FollowupTemplate
  solution_template?: SolutionTemplate
  calendar?: Calendar
  comment?: string
}

export type PendingReasonInput = {
  entity?: EntityInput
  is_recursive?: boolean
  is_default?: boolean
  name?: string
  followup_frequency?: number
  followups_before_resolution?: number
  followup_template?: FollowupTemplateInput
  solution_template?: SolutionTemplateInput
  calendar?: CalendarInput
  comment?: string
}

export type PendingReasonItem = {
  readonly id?: number
  itemtype?: string
  items_id?: number
  followup_frequency?: number
  followups_before_resolution?: number
  bump_count?: number
  last_bump_date?: string
  previous_status?: number
}

export type PendingReasonItemInput = {
  itemtype?: string
  items_id?: number
  followup_frequency?: number
  followups_before_resolution?: number
  bump_count?: number
  last_bump_date?: string
  previous_status?: number
}

export type Peripheral = {
  readonly id?: number
  name?: string
  comment?: string
  status?: State
  entity?: Entity
  is_recursive?: boolean
  manufacturer?: Manufacturer
  user?: User
  user_tech?: User
  contact?: string
  contact_num?: string
  serial?: string
  otherserial?: string
  is_deleted?: boolean
  date_creation?: string
  date_mod?: string
  location?: Location
  type?: PeripheralType
  model?: PeripheralModel
  group?: Group[]
  group_tech?: Group[]
  readonly uuid?: string
  autoupdatesystem?: AutoUpdateSystem
  brand?: string
  is_global?: boolean
  is_template?: boolean
  template_name?: string
  ticket_tco?: number
  is_dynamic?: boolean
}

export type PeripheralInput = {
  name?: string
  comment?: string
  status?: StateInput
  entity?: EntityInput
  is_recursive?: boolean
  manufacturer?: ManufacturerInput
  user?: UserInput
  user_tech?: UserInput
  contact?: string
  contact_num?: string
  serial?: string
  otherserial?: string
  is_deleted?: boolean
  date_creation?: string
  date_mod?: string
  location?: LocationInput
  type?: PeripheralTypeInput
  model?: PeripheralModelInput
  group?: GroupInput[]
  group_tech?: GroupInput[]
  autoupdatesystem?: AutoUpdateSystemInput
  brand?: string
  is_global?: boolean
  is_template?: boolean
  template_name?: string
  ticket_tco?: number
  is_dynamic?: boolean
}

export type PeripheralConnection = {
  readonly id?: number
  itemtype_asset?: string
  items_id_asset?: number
  itemtype_peripheral?: string
  items_id_peripheral?: number
  is_deleted?: boolean
  is_dynamic?: boolean
}

export type PeripheralConnectionInput = {
  itemtype_asset?: string
  items_id_asset?: number
  itemtype_peripheral?: string
  items_id_peripheral?: number
  is_deleted?: boolean
  is_dynamic?: boolean
}

export type PeripheralModel = {
  readonly id?: number
  name?: string
  comment?: string
  product_number?: string
  weight?: number
  rack_units?: number
  depth?: 0.25 | 0.33 | 0.5 | 1
  power_connections?: number
  power_consumption?: number
  is_half_rack?: boolean
  readonly picture_front?: string
  readonly picture_rear?: string
  pictures?: string[]
  date_creation?: string
  date_mod?: string
}

export type PeripheralModelInput = {
  name?: string
  comment?: string
  product_number?: string
  weight?: number
  rack_units?: number
  depth?: 0.25 | 0.33 | 0.5 | 1
  power_connections?: number
  power_consumption?: number
  is_half_rack?: boolean
  pictures?: string[]
  date_creation?: string
  date_mod?: string
}

export type PeripheralType = {
  readonly id?: number
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type PeripheralTypeInput = {
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type Phone = {
  readonly id?: number
  name?: string
  comment?: string
  status?: State
  entity?: Entity
  is_recursive?: boolean
  manufacturer?: Manufacturer
  user?: User
  user_tech?: User
  contact?: string
  contact_num?: string
  serial?: string
  otherserial?: string
  is_deleted?: boolean
  date_creation?: string
  date_mod?: string
  location?: Location
  type?: PhoneType
  model?: PhoneModel
  group?: Group[]
  group_tech?: Group[]
  readonly uuid?: string
  autoupdatesystem?: AutoUpdateSystem
  brand?: string
  power_supply?: PhonePowerSupply
  number_line?: string
  have_headset?: boolean
  have_hp?: boolean
  is_global?: boolean
  is_template?: boolean
  template_name?: string
  ticket_tco?: number
  is_dynamic?: boolean
  last_inventory_update?: string
}

export type PhoneInput = {
  name?: string
  comment?: string
  status?: StateInput
  entity?: EntityInput
  is_recursive?: boolean
  manufacturer?: ManufacturerInput
  user?: UserInput
  user_tech?: UserInput
  contact?: string
  contact_num?: string
  serial?: string
  otherserial?: string
  is_deleted?: boolean
  date_creation?: string
  date_mod?: string
  location?: LocationInput
  type?: PhoneTypeInput
  model?: PhoneModelInput
  group?: GroupInput[]
  group_tech?: GroupInput[]
  autoupdatesystem?: AutoUpdateSystemInput
  brand?: string
  power_supply?: PhonePowerSupplyInput
  number_line?: string
  have_headset?: boolean
  have_hp?: boolean
  is_global?: boolean
  is_template?: boolean
  template_name?: string
  ticket_tco?: number
  is_dynamic?: boolean
  last_inventory_update?: string
}

export type PhoneModel = {
  readonly id?: number
  name?: string
  comment?: string
  product_number?: string
  readonly picture_front?: string
  readonly picture_rear?: string
  pictures?: string[]
  date_creation?: string
  date_mod?: string
}

export type PhoneModelInput = {
  name?: string
  comment?: string
  product_number?: string
  pictures?: string[]
  date_creation?: string
  date_mod?: string
}

export type PhonePowerSupply = {
  readonly id?: number
  name?: string
  comment?: string
  readonly date_creation?: string
  readonly date_mod?: string
}

export type PhonePowerSupplyInput = {
  name?: string
  comment?: string
}

export type PhoneType = {
  readonly id?: number
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type PhoneTypeInput = {
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type PlanningReminder = {
  readonly id?: number
  itemtype?: string
  items_id?: number
  user?: User
  date?: string
  before_time?: number
}

export type PlanningReminderInput = {
  itemtype?: string
  items_id?: number
  user?: UserInput
  date?: string
  before_time?: number
}

export type Plug = {
  readonly id?: number
  name?: string
  comment?: string
  readonly date_creation?: string
  readonly date_mod?: string
}

export type PlugInput = {
  name?: string
  comment?: string
}

export type Plugin = {
  readonly id?: number
  readonly internal_name?: string
  readonly name?: string
  readonly version?: string
  readonly state?: -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
  readonly author?: string
  readonly homepage?: string
  readonly license?: string
}

export type PluginInput = {}

export type PowerSupply = {
  readonly id?: number
  designation?: string
  comment?: string
  manufacturer?: Manufacturer
  entity?: Entity
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
  power?: string
  is_atx?: boolean
  model?: PowerSupplyModel
}

export type PowerSupplyInput = {
  designation?: string
  comment?: string
  manufacturer?: ManufacturerInput
  entity?: EntityInput
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
  power?: string
  is_atx?: boolean
  model?: PowerSupplyModelInput
}

export type PowerSupplyItem = {
  readonly id?: number
  itemtype?: string
  items_id?: number
  entity?: Entity
  is_recursive?: boolean
  serial?: string
  otherserial?: string
  location?: Location
  status?: State
  is_deleted?: boolean
  is_dynamic?: boolean
  power_supply?: PowerSupply
}

export type PowerSupplyItemInput = {
  itemtype?: string
  items_id?: number
  entity?: EntityInput
  is_recursive?: boolean
  serial?: string
  otherserial?: string
  location?: LocationInput
  status?: StateInput
  is_deleted?: boolean
  is_dynamic?: boolean
  power_supply?: PowerSupplyInput
}

export type PowerSupplyModel = {
  readonly id?: number
  name?: string
  comment?: string
  product_number?: string
}

export type PowerSupplyModelInput = {
  name?: string
  comment?: string
  product_number?: string
}

export type Printer = {
  readonly id?: number
  name?: string
  comment?: string
  status?: State
  entity?: Entity
  is_recursive?: boolean
  manufacturer?: Manufacturer
  user?: User
  user_tech?: User
  contact?: string
  contact_num?: string
  serial?: string
  otherserial?: string
  is_deleted?: boolean
  date_creation?: string
  date_mod?: string
  location?: Location
  type?: PrinterType
  model?: PrinterModel
  group?: Group[]
  group_tech?: Group[]
  readonly uuid?: string
  network?: Network
  autoupdatesystem?: AutoUpdateSystem
  has_serial?: boolean
  has_parallel?: boolean
  has_usb?: boolean
  has_wifi?: boolean
  has_ethernet?: boolean
  is_global?: boolean
  is_template?: boolean
  template_name?: string
  ticket_tco?: number
  is_dynamic?: boolean
  sysdescr?: string
  readonly last_inventory_update?: string
  snmp_credential?: SNMPCredential
}

export type PrinterInput = {
  name?: string
  comment?: string
  status?: StateInput
  entity?: EntityInput
  is_recursive?: boolean
  manufacturer?: ManufacturerInput
  user?: UserInput
  user_tech?: UserInput
  contact?: string
  contact_num?: string
  serial?: string
  otherserial?: string
  is_deleted?: boolean
  date_creation?: string
  date_mod?: string
  location?: LocationInput
  type?: PrinterTypeInput
  model?: PrinterModelInput
  group?: GroupInput[]
  group_tech?: GroupInput[]
  network?: NetworkInput
  autoupdatesystem?: AutoUpdateSystemInput
  has_serial?: boolean
  has_parallel?: boolean
  has_usb?: boolean
  has_wifi?: boolean
  has_ethernet?: boolean
  is_global?: boolean
  is_template?: boolean
  template_name?: string
  ticket_tco?: number
  is_dynamic?: boolean
  sysdescr?: string
  snmp_credential?: SNMPCredentialInput
}

export type PrinterModel = {
  readonly id?: number
  name?: string
  comment?: string
  product_number?: string
  readonly picture_front?: string
  readonly picture_rear?: string
  pictures?: string[]
  date_creation?: string
  date_mod?: string
}

export type PrinterModelInput = {
  name?: string
  comment?: string
  product_number?: string
  pictures?: string[]
  date_creation?: string
  date_mod?: string
}

export type PrinterType = {
  readonly id?: number
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type PrinterTypeInput = {
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type Problem = {
  readonly id?: number
  name?: string
  content?: string
  user_recipient?: User
  user_editor?: User
  is_deleted?: boolean
  category?: ITILCategory
  location?: Location
  urgency?: 1 | 2 | 3 | 4 | 5
  impact?: 1 | 2 | 3 | 4 | 5
  priority?: 1 | 2 | 3 | 4 | 5
  readonly actiontime?: number
  readonly begin_waiting_date?: string
  readonly waiting_duration?: number
  readonly resolution_duration?: number
  readonly close_duration?: number
  resolution_date?: string
  date_creation?: string
  date_mod?: string
  date?: string
  date_solve?: string
  date_close?: string
  status?: {
    readonly id?: 1 | 7 | 2 | 3 | 4 | 5 | 8 | 6
    readonly name?: string
  }
  entity?: Entity
  team?: TeamMember[]
  costs?: ProblemCost[]
}

export type ProblemInput = {
  name?: string
  content?: string
  user_recipient?: UserInput
  user_editor?: UserInput
  is_deleted?: boolean
  category?: ITILCategoryInput
  location?: LocationInput
  urgency?: 1 | 2 | 3 | 4 | 5
  impact?: 1 | 2 | 3 | 4 | 5
  priority?: 1 | 2 | 3 | 4 | 5
  resolution_date?: string
  date_creation?: string
  date_mod?: string
  date?: string
  date_solve?: string
  date_close?: string
  status?: {}
  entity?: EntityInput
  team?: TeamMemberInput[]
  costs?: ProblemCostInput[]
}

export type ProblemCost = {
  readonly id?: number
  problem?: Problem
  name?: string
  comment?: string
  date_begin?: string
  date_end?: string
  duration?: number
  cost_time?: number
  cost_fixed?: number
  cost_material?: number
  budget?: Budget
  entity?: Entity
}

export type ProblemCostInput = {
  problem?: ProblemInput
  name?: string
  comment?: string
  date_begin?: string
  date_end?: string
  duration?: number
  cost_time?: number
  cost_fixed?: number
  cost_material?: number
  budget?: BudgetInput
  entity?: EntityInput
}

export type ProblemTask = {
  readonly id?: number
  readonly uuid?: string
  content?: string
  is_private?: boolean
  user?: User
  user_editor?: User
  user_tech?: User
  group_tech?: Group
  date?: string
  date_creation?: string
  date_mod?: string
  duration?: number
  planned_begin?: string
  planned_end?: string
  state?: 0 | 1 | 2
  category?: TaskCategory
  timeline_position?: -1 | 0 | 1 | 2 | 3 | 4
  problems_id?: number
}

export type ProblemTaskInput = {
  content?: string
  is_private?: boolean
  user?: UserInput
  user_editor?: UserInput
  user_tech?: UserInput
  group_tech?: GroupInput
  date?: string
  date_creation?: string
  date_mod?: string
  duration?: number
  planned_begin?: string
  planned_end?: string
  state?: 0 | 1 | 2
  category?: TaskCategoryInput
  timeline_position?: -1 | 0 | 1 | 2 | 3 | 4
  problems_id?: number
}

export type ProblemTemplate = {
  readonly id?: number
  name?: string
  comment?: string
  entity?: Entity
  is_recursive?: boolean
}

export type ProblemTemplateInput = {
  name?: string
  comment?: string
  entity?: EntityInput
  is_recursive?: boolean
}

export type ProblemItem = {
  readonly id?: number
  problem?: Problem
  itemtype?: string
  items_id?: number
}

export type ProblemItemInput = {
  problem?: ProblemInput
  itemtype?: string
  items_id?: number
}

export type ProblemProblem = {
  readonly id?: number
  problem_1?: Problem
  problem_2?: Problem
  link?: 1 | 2 | 3 | 4
}

export type ProblemProblemInput = {
  problem_1?: ProblemInput
  problem_2?: ProblemInput
  link?: 1 | 2 | 3 | 4
}

export type ProblemTicket = {
  readonly id?: number
  problem?: Problem
  ticket?: Ticket
  link?: 1 | 2 | 3 | 4
}

export type ProblemTicketInput = {
  problem?: ProblemInput
  ticket?: TicketInput
  link?: 1 | 2 | 3 | 4
}

export type Processor = {
  readonly id?: number
  designation?: string
  comment?: string
  manufacturer?: Manufacturer
  entity?: Entity
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
  frequency?: string
  frequency_default?: string
  nbcores_default?: number
  nbthreads_default?: number
  model?: ProcessorModel
}

export type ProcessorInput = {
  designation?: string
  comment?: string
  manufacturer?: ManufacturerInput
  entity?: EntityInput
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
  frequency?: string
  frequency_default?: string
  nbcores_default?: number
  nbthreads_default?: number
  model?: ProcessorModelInput
}

export type ProcessorItem = {
  readonly id?: number
  itemtype?: string
  items_id?: number
  entity?: Entity
  is_recursive?: boolean
  serial?: string
  otherserial?: string
  location?: Location
  status?: State
  is_deleted?: boolean
  is_dynamic?: boolean
  processor?: Processor
  busID?: string
  frequency?: string
  nbcores?: number
  nbthreads?: number
}

export type ProcessorItemInput = {
  itemtype?: string
  items_id?: number
  entity?: EntityInput
  is_recursive?: boolean
  serial?: string
  otherserial?: string
  location?: LocationInput
  status?: StateInput
  is_deleted?: boolean
  is_dynamic?: boolean
  processor?: ProcessorInput
  busID?: string
  frequency?: string
  nbcores?: number
  nbthreads?: number
}

export type ProcessorModel = {
  readonly id?: number
  name?: string
  comment?: string
  product_number?: string
}

export type ProcessorModelInput = {
  name?: string
  comment?: string
  product_number?: string
}

export type Profile = {
  readonly id?: number
  name?: string
  comment?: string
  is_default?: boolean
  helpdesk_hardware?: 0 | 1 | 2 | 3
  helpdesk_item_type?: string
  managed_domainrecordtypes?: string
  mfa_enforced?: boolean
}

export type ProfileInput = {
  name?: string
  comment?: string
  is_default?: boolean
  helpdesk_hardware?: 0 | 1 | 2 | 3
  helpdesk_item_type?: string
  managed_domainrecordtypes?: string
  mfa_enforced?: boolean
}

export type Project = {
  readonly id?: number
  name?: string
  comment?: string
  content?: string
  code?: string
  priority?: 1 | 2 | 3 | 4 | 5 | 6
  entity?: Entity
  tasks?: ProjectTask[]
  costs?: ProjectCost[]
  status?: ProjectState
  is_recursive?: boolean
  parent?: {
    id?: number
    readonly name?: string
  }
  type?: ProjectType
  date?: string
  date_creation?: string
  date_mod?: string
  user?: User
  group?: Group
  plan_start_date?: string
  plan_end_date?: string
  real_start_date?: string
  real_end_date?: string
  percent_done?: number
  auto_percent_done?: boolean
  show_on_global_gantt?: boolean
  is_deleted?: boolean
  template_name?: string
  is_template?: boolean
  tickets?: Ticket[]
  changes?: Change[]
  problems?: Problem[]
  team?: ProjectTeamMember[]
}

export type ProjectInput = {
  name?: string
  comment?: string
  content?: string
  code?: string
  priority?: 1 | 2 | 3 | 4 | 5 | 6
  entity?: EntityInput
  tasks?: ProjectTaskInput[]
  costs?: ProjectCostInput[]
  status?: ProjectStateInput
  is_recursive?: boolean
  parent?: {
    id?: number
  }
  type?: ProjectTypeInput
  date?: string
  date_creation?: string
  date_mod?: string
  user?: UserInput
  group?: GroupInput
  plan_start_date?: string
  plan_end_date?: string
  real_start_date?: string
  real_end_date?: string
  percent_done?: number
  auto_percent_done?: boolean
  show_on_global_gantt?: boolean
  is_deleted?: boolean
  template_name?: string
  is_template?: boolean
  tickets?: TicketInput[]
  changes?: ChangeInput[]
  problems?: ProblemInput[]
  team?: ProjectTeamMemberInput[]
}

export type ProjectCost = {
  readonly id?: number
  project?: Project
  name?: string
  comment?: string
  date_begin?: string
  date_end?: string
  cost?: number
  budget?: Budget
  entity?: Entity
  is_recursive?: boolean
}

export type ProjectCostInput = {
  project?: ProjectInput
  name?: string
  comment?: string
  date_begin?: string
  date_end?: string
  cost?: number
  budget?: BudgetInput
  entity?: EntityInput
  is_recursive?: boolean
}

export type ProjectState = {
  readonly id?: number
  name?: string
  comment?: string
  color?: string
  is_finished?: boolean
  date_creation?: string
  date_mod?: string
}

export type ProjectStateInput = {
  name?: string
  comment?: string
  color?: string
  is_finished?: boolean
  date_creation?: string
  date_mod?: string
}

export type ProjectTask = {
  readonly id?: number
  name?: string
  comment?: string
  content?: string
  project?: Project
  parent_task?: {
    id?: number
    readonly name?: string
  }
  status?: ProjectState
  entity?: Entity
  is_recursive?: boolean
  is_deleted?: boolean
  date_creation?: string
  date_mod?: string
  plan_start_date?: string
  plan_end_date?: string
  real_start_date?: string
  real_end_date?: string
  planned_duration?: number
  real_duration?: number
  auto_status?: boolean
  type?: ProjectTaskType
  user?: User
  percent_done?: number
  auto_percent_done?: boolean
  is_milestone?: boolean
  team?: ProjectTaskTeamMember[]
}

export type ProjectTaskInput = {
  name?: string
  comment?: string
  content?: string
  project?: ProjectInput
  parent_task?: {
    id?: number
  }
  status?: ProjectStateInput
  entity?: EntityInput
  is_recursive?: boolean
  is_deleted?: boolean
  date_creation?: string
  date_mod?: string
  plan_start_date?: string
  plan_end_date?: string
  real_start_date?: string
  real_end_date?: string
  planned_duration?: number
  real_duration?: number
  auto_status?: boolean
  type?: ProjectTaskTypeInput
  user?: UserInput
  percent_done?: number
  auto_percent_done?: boolean
  is_milestone?: boolean
  team?: ProjectTaskTeamMemberInput[]
}

export type ProjectTaskTeamMember = {
  readonly id?: number
  task: ProjectTask
  itemtype: 'User' | 'Group' | 'Supplier' | 'Contact'
  items_id: number
}

export type ProjectTaskTeamMemberInput = {
  task: ProjectTaskInput
  itemtype: 'User' | 'Group' | 'Supplier' | 'Contact'
  items_id: number
}

export type ProjectTaskType = {
  readonly id?: number
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type ProjectTaskTypeInput = {
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type ProjectTeamMember = {
  readonly id?: number
  project: Project
  itemtype: 'User' | 'Group' | 'Supplier' | 'Contact'
  items_id: number
}

export type ProjectTeamMemberInput = {
  project: ProjectInput
  itemtype: 'User' | 'Group' | 'Supplier' | 'Contact'
  items_id: number
}

export type ProjectType = {
  readonly id?: number
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type ProjectTypeInput = {
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type QueuedNotification = {
  readonly id?: number
  itemtype?: string
  items_id?: number
  notification_template?: NotificationTemplate
  entity?: Entity
  is_deleted?: boolean
  sent_try?: number
  readonly create_time?: string
  readonly expected_send_date?: string
  readonly send_date?: string
  name?: string
  sender?: string
  sender_name?: string
  recipient?: string
  recipient_name?: string
  replyto?: string
  replyto_name?: string
  headers?: string
  body_text?: string
  body_html?: string
  message_id?: string
  documents?: string
  mode?: 'mailing' | 'ajax' | 'websocket' | 'sms' | 'xmpp' | 'irc'
  event?: string
  attach_documents?: 0 | 1 | 2
  itemtype_trigger?: string
  items_id_trigger?: number
}

export type QueuedNotificationInput = {
  itemtype?: string
  items_id?: number
  notification_template?: NotificationTemplateInput
  entity?: EntityInput
  is_deleted?: boolean
  sent_try?: number
  name?: string
  sender?: string
  sender_name?: string
  recipient?: string
  recipient_name?: string
  replyto?: string
  replyto_name?: string
  headers?: string
  body_text?: string
  body_html?: string
  message_id?: string
  documents?: string
  mode?: 'mailing' | 'ajax' | 'websocket' | 'sms' | 'xmpp' | 'irc'
  event?: string
  attach_documents?: 0 | 1 | 2
  itemtype_trigger?: string
  items_id_trigger?: number
}

export type QueuedWebhook = {
  readonly id?: number
  readonly itemtype?: string
  readonly items_id?: number
  entity?: Entity
  is_deleted?: boolean
  readonly sent_try?: number
  readonly webhook?: Webhook
  readonly url?: string
  readonly create_time?: string
  readonly send_time?: string
  readonly sent_time?: string
  readonly headers?: string
  readonly body?: string
  readonly event?: string
  readonly last_status_code?: number
  readonly http_method?: 'POST' | 'GET' | 'PUT' | 'PATCH'
}

export type QueuedWebhookInput = {
  entity?: EntityInput
  is_deleted?: boolean
}

export type RSSFeed = {
  readonly id?: number
  comment?: string
  url: string
  refresh_interval?: number
  max_items?: number
  readonly have_error?: boolean
  is_active?: boolean
  user?: User
  date_creation?: string
  date_mod?: string
}

export type RSSFeedInput = {
  comment?: string
  url: string
  refresh_interval?: number
  max_items?: number
  is_active?: boolean
  user?: UserInput
  date_creation?: string
  date_mod?: string
}

export type Rack = {
  readonly id?: number
  name?: string
  comment?: string
  entity?: Entity
  is_recursive?: boolean
  location?: Location
  serial?: string
  otherserial?: string
  model?: RackModel
  manufacturer?: Manufacturer
  type?: RackType
  state?: State
  user?: User
  group?: Group[]
  user_tech?: User
  group_tech?: Group[]
  width?: number
  height?: number
  depth?: number
  number_units?: number
  is_deleted?: boolean
  room?: DCRoom
  room_orientation?: number
  position?: string
  bgcolor?: string
  max_power?: number
  measured_power?: number
  max_weight?: number
  items?: RackItem[]
  date_creation?: string
  date_mod?: string
}

export type RackInput = {
  name?: string
  comment?: string
  entity?: EntityInput
  is_recursive?: boolean
  location?: LocationInput
  serial?: string
  otherserial?: string
  model?: RackModelInput
  manufacturer?: ManufacturerInput
  type?: RackTypeInput
  state?: StateInput
  user?: UserInput
  group?: GroupInput[]
  user_tech?: UserInput
  group_tech?: GroupInput[]
  width?: number
  height?: number
  depth?: number
  number_units?: number
  is_deleted?: boolean
  room?: DCRoomInput
  room_orientation?: number
  position?: string
  bgcolor?: string
  max_power?: number
  measured_power?: number
  max_weight?: number
  items?: RackItemInput[]
  date_creation?: string
  date_mod?: string
}

export type RackItem = {
  readonly id?: number
  rack?: Rack
  itemtype?: string
  items_id?: number
  position?: number
  orientation?: 0 | 1
  bgcolor?: string
  position_horizontal?: number
  is_reserved?: boolean
}

export type RackItemInput = {
  rack?: RackInput
  itemtype?: string
  items_id?: number
  position?: number
  orientation?: 0 | 1
  bgcolor?: string
  position_horizontal?: number
  is_reserved?: boolean
}

export type RackModel = {
  readonly id?: number
  name?: string
  comment?: string
  product_number?: string
  date_creation?: string
  date_mod?: string
}

export type RackModelInput = {
  name?: string
  comment?: string
  product_number?: string
  date_creation?: string
  date_mod?: string
}

export type RackType = {
  readonly id?: number
  name?: string
  comment?: string
  entity?: Entity
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
}

export type RackTypeInput = {
  name?: string
  comment?: string
  entity?: EntityInput
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
}

export type RecurringChange = {
  readonly id?: number
  name?: string
  comment?: string
  entity?: Entity
  is_recursive?: boolean
  is_active?: boolean
  template?: ChangeTemplate
  date_begin?: string
  date_end?: string
  periodicity?: number
  create_before?: number
  date_next_creation?: string
  calendar?: Calendar
}

export type RecurringChangeInput = {
  name?: string
  comment?: string
  entity?: EntityInput
  is_recursive?: boolean
  is_active?: boolean
  template?: ChangeTemplateInput
  date_begin?: string
  date_end?: string
  periodicity?: number
  create_before?: number
  date_next_creation?: string
  calendar?: CalendarInput
}

export type RecurringTicket = {
  readonly id?: number
  name?: string
  comment?: string
  entity?: Entity
  is_active?: boolean
  template?: TicketTemplate
  date_begin?: string
  date_end?: string
  periodicity?: number
  create_before?: number
  date_next_creation?: string
  calendar?: Calendar
  ticket_per_item?: boolean
}

export type RecurringTicketInput = {
  name?: string
  comment?: string
  entity?: EntityInput
  is_active?: boolean
  template?: TicketTemplateInput
  date_begin?: string
  date_end?: string
  periodicity?: number
  create_before?: number
  date_next_creation?: string
  calendar?: CalendarInput
  ticket_per_item?: boolean
}

export type Reminder = {
  readonly id?: number
  readonly uuid?: string
  name?: string
  text?: string
  date?: string
  user?: User
  date_begin?: string
  date_end?: string
  is_planned?: boolean
  state?: 0 | 1 | 2
  date_view_begin?: string
  date_view_end?: string
  date_creation?: string
  date_mod?: string
}

export type ReminderInput = {
  name?: string
  text?: string
  date?: string
  user?: UserInput
  date_begin?: string
  date_end?: string
  is_planned?: boolean
  state?: 0 | 1 | 2
  date_view_begin?: string
  date_view_end?: string
  date_creation?: string
  date_mod?: string
}

export type RemoteManagement = {
  readonly id?: number
  itemtype?: string
  items_id?: number
  remoteid?: string
  type?: 'teamviewer' | 'litemanager' | 'anydesk' | 'meshcentral' | 'supremo' | 'rustdesk'
  is_deleted?: boolean
  is_dynamic?: boolean
}

export type RemoteManagementInput = {
  itemtype?: string
  items_id?: number
  remoteid?: string
  type?: 'teamviewer' | 'litemanager' | 'anydesk' | 'meshcentral' | 'supremo' | 'rustdesk'
  is_deleted?: boolean
  is_dynamic?: boolean
}

export type RequestType = {
  readonly id?: number
  name?: string
  comment?: string
  is_helpdesk_default?: boolean
  is_followup_default?: boolean
  is_mail_default?: boolean
  is_mailfollowup_default?: boolean
  is_active?: boolean
  is_visible_ticket?: boolean
  is_visible_followup?: boolean
  date_creation?: string
  date_mod?: string
}

export type RequestTypeInput = {
  name?: string
  comment?: string
  is_helpdesk_default?: boolean
  is_followup_default?: boolean
  is_mail_default?: boolean
  is_mailfollowup_default?: boolean
  is_active?: boolean
  is_visible_ticket?: boolean
  is_visible_followup?: boolean
  date_creation?: string
  date_mod?: string
}

export type ReservableItem = {
  readonly id?: number
  itemtype?: string
  items_id?: number
  comment?: string
  entity?: Entity
  is_recursive?: boolean
  is_active?: boolean
}

export type ReservableItemInput = {
  itemtype?: string
  items_id?: number
  comment?: string
  entity?: EntityInput
  is_recursive?: boolean
  is_active?: boolean
}

export type Reservation = {
  readonly id?: number
  reservable_item?: {
    readonly id?: number
    itemtype?: string
    items_id?: number
  }
  comment?: string
  user?: User
  group?: number
  date_begin?: string
  date_end?: string
}

export type ReservationInput = {
  reservable_item?: {
    itemtype?: string
    items_id?: number
  }
  comment?: string
  user?: UserInput
  group?: number
  date_begin?: string
  date_end?: string
}

export type Rule = {
  readonly id?: number
  readonly uuid?: string
  entity?: Entity
  is_recursive?: boolean
  name?: string
  description?: string
  comment?: string
  is_active?: boolean
  match?: 'AND' | 'OR'
  condition?: number
  ranking?: number
  readonly criteria?: RuleCriteria[]
  readonly actions?: RuleAction[]
  readonly date_creation?: string
  readonly date_mod?: string
}

export type RuleInput = {
  sub_type?: string
  entity?: EntityInput
  is_recursive?: boolean
  name?: string
  description?: string
  comment?: string
  is_active?: boolean
  match?: 'AND' | 'OR'
  condition?: number
  ranking?: number
}

export type RuleAction = {
  readonly id?: number
  action_type?: string
  field?: string
  value?: string
}

export type RuleActionInput = {
  rule?: RuleInput
  action_type?: string
  field?: string
  value?: string
}

export type RuleActionField = {
  readonly id?: string
  name?: string
  action_types?: string[]
}

export type RuleActionFieldInput = {
  name?: string
  action_types?: string[]
}

export type RuleActionType = {
  readonly id?: string
  name?: string
  fields?: string[]
}

export type RuleActionTypeInput = {
  name?: string
  fields?: string[]
}

export type RuleCriteria = {
  readonly id?: number
  criteria?: string
  condition?: number
  pattern?: string
}

export type RuleCriteriaInput = {
  rule?: RuleInput
  criteria?: string
  condition?: number
  pattern?: string
}

export type RuleCriteriaCondition = {
  readonly id?: number
  description?: string
  fields?: string[]
}

export type RuleCriteriaConditionInput = {
  description?: string
  fields?: string[]
}

export type RuleCriteriaCriteria = {
  readonly id?: string
  name?: string
}

export type RuleCriteriaCriteriaInput = {
  name?: string
}

export type SIMCard = {
  readonly id?: number
  designation?: string
  comment?: string
  manufacturer?: Manufacturer
  entity?: Entity
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
  voltage?: number
  allow_voip?: boolean
  type?: SIMCardType
}

export type SIMCardInput = {
  designation?: string
  comment?: string
  manufacturer?: ManufacturerInput
  entity?: EntityInput
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
  voltage?: number
  allow_voip?: boolean
  type?: SIMCardTypeInput
}

export type SIMCardItem = {
  readonly id?: number
  itemtype?: string
  items_id?: number
  entity?: Entity
  is_recursive?: boolean
  serial?: string
  otherserial?: string
  location?: Location
  status?: State
  is_deleted?: boolean
  is_dynamic?: boolean
  sim_card?: SIMCard
  pin?: string
  pin2?: string
  puk?: string
  puk2?: string
  msin?: string
  line?: Line
  user?: User
  user_tech?: User
  group?: Group
}

export type SIMCardItemInput = {
  itemtype?: string
  items_id?: number
  entity?: EntityInput
  is_recursive?: boolean
  serial?: string
  otherserial?: string
  location?: LocationInput
  status?: StateInput
  is_deleted?: boolean
  is_dynamic?: boolean
  sim_card?: SIMCardInput
  pin?: string
  pin2?: string
  puk?: string
  puk2?: string
  msin?: string
  line?: LineInput
  user?: UserInput
  user_tech?: UserInput
  group?: GroupInput
}

export type SIMCardType = {
  readonly id?: number
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type SIMCardTypeInput = {
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type SLA = {
  readonly id?: number
  name?: string
  slm?: SLM
  entity?: Entity
  is_recursive?: boolean
  type?: 0 | 1
  comment?: string
  time?: number
  time_unit?: 'minute' | 'hour' | 'day' | 'month'
  use_ticket_calendar?: boolean
  calendar?: Calendar
  end_of_working_day?: boolean
  date_creation?: string
  date_mod?: string
}

export type SLAInput = {
  name?: string
  slm?: SLMInput
  entity?: EntityInput
  is_recursive?: boolean
  type?: 0 | 1
  comment?: string
  time?: number
  time_unit?: 'minute' | 'hour' | 'day' | 'month'
  use_ticket_calendar?: boolean
  calendar?: CalendarInput
  end_of_working_day?: boolean
  date_creation?: string
  date_mod?: string
}

export type SLALevel = {
  readonly id?: number
  readonly uuid?: string
  name?: string
  entity?: Entity
  is_recursive?: boolean
  execution_time?: number
  operator?: 'AND' | 'OR'
  sla?: SLA
}

export type SLALevelInput = {
  name?: string
  entity?: EntityInput
  is_recursive?: boolean
  execution_time?: number
  operator?: 'AND' | 'OR'
  sla?: SLAInput
}

export type SLM = {
  readonly id?: number
  name?: string
  entity?: Entity
  is_recursive?: boolean
  comment?: string
  use_ticket_calendar?: boolean
  calendar?: Calendar
  date_creation?: string
  date_mod?: string
}

export type SLMInput = {
  name?: string
  entity?: EntityInput
  is_recursive?: boolean
  comment?: string
  use_ticket_calendar?: boolean
  calendar?: CalendarInput
  date_creation?: string
  date_mod?: string
}

export type SNMPCredential = {
  readonly id?: number
  name?: string
  snmp_version: '1' | '2c' | '3'
  community?: string
  username?: string
  authentication?: 1 | 2 | 3 | 4 | 5 | 6
  encryption?: 1 | 2 | 3 | 4 | 5 | 6 | 7
  is_deleted?: boolean
}

export type SNMPCredentialInput = {
  name?: string
  snmp_version: '1' | '2c' | '3'
  community?: string
  username?: string
  authentication?: 1 | 2 | 3 | 4 | 5 | 6
  auth_passphrase?: string
  encryption?: 1 | 2 | 3 | 4 | 5 | 6 | 7
  priv_passphrase?: string
  is_deleted?: boolean
}

export type Sensor = {
  readonly id?: number
  designation?: string
  comment?: string
  manufacturer?: Manufacturer
  entity?: Entity
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
  type?: SensorType
  model?: SensorModel
  location?: Location
}

export type SensorInput = {
  designation?: string
  comment?: string
  manufacturer?: ManufacturerInput
  entity?: EntityInput
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
  type?: SensorTypeInput
  model?: SensorModelInput
  location?: LocationInput
}

export type SensorItem = {
  readonly id?: number
  itemtype?: string
  items_id?: number
  entity?: Entity
  is_recursive?: boolean
  serial?: string
  otherserial?: string
  location?: Location
  status?: State
  is_deleted?: boolean
  is_dynamic?: boolean
  sensor?: Sensor
}

export type SensorItemInput = {
  itemtype?: string
  items_id?: number
  entity?: EntityInput
  is_recursive?: boolean
  serial?: string
  otherserial?: string
  location?: LocationInput
  status?: StateInput
  is_deleted?: boolean
  is_dynamic?: boolean
  sensor?: SensorInput
}

export type SensorModel = {
  readonly id?: number
  name?: string
  comment?: string
  product_number?: string
}

export type SensorModelInput = {
  name?: string
  comment?: string
  product_number?: string
}

export type SensorType = {
  readonly id?: number
  name?: string
  comment?: string
}

export type SensorTypeInput = {
  name?: string
  comment?: string
}

export type Session = {
  current_time?: string
  user_id?: number
  use_mode?: number
  friendly_name?: string
  name?: string
  real_name?: string
  first_name?: string
  default_entity?: number
  profiles?: number[]
  active_entities?: number[]
  active_profile?: {
    readonly id?: number
    name?: string
    interface?: string
    rights?: {
      agent?: 1 | 2 | 16
      appliance?: 1 | 2 | 4 | 8 | 16 | 32 | 64 | 256 | 512 | 1024 | 2048
      backup?: number
      bookmark_public?: 1 | 2 | 4 | 16
      budget?: 1 | 2 | 4 | 8 | 16 | 32 | 64
      cable_management?: 1 | 2 | 4 | 8 | 16 | 256 | 512 | 1024 | 2048
      calendar?: 1 | 2 | 4 | 16
      cartridge?: 1 | 2 | 4 | 8 | 16 | 32 | 64 | 256 | 512 | 1024 | 2048
      certificate?: 1 | 2 | 4 | 8 | 16 | 32 | 64 | 256 | 512 | 1024 | 2048
      change?: 1 | 2 | 4 | 8 | 16 | 32 | 64 | 1024 | 131072
      changevalidation?: 4 | 16 | 1024
      cluster?: 1 | 2 | 4 | 8 | 16 | 256 | 512 | 1024 | 2048
      computer?: 1 | 2 | 4 | 8 | 16 | 32 | 64 | 256 | 512 | 1024 | 2048
      config?: 1 | 2
      consumable?: 1 | 2 | 4 | 8 | 16 | 32 | 64 | 256 | 512 | 1024 | 2048
      contact_enterprise?: 1 | 2 | 4 | 8 | 16 | 32 | 64
      contract?: 1 | 2 | 4 | 8 | 16 | 32 | 64
      dashboard?: 1 | 2 | 4 | 16
      database?: 1 | 2 | 4 | 8 | 16 | 32 | 64 | 256 | 512 | 1024 | 2048
      datacenter?: 1 | 2 | 4 | 8 | 16
      device?: 1 | 2 | 4 | 16
      devicesimcard_pinpuk?: 1 | 2
      document?: 1 | 2 | 4 | 8 | 16 | 32 | 64
      domain?: 1 | 2 | 4 | 8 | 16 | 32 | 64 | 256 | 512 | 1024 | 2048
      dropdown?: 1 | 2 | 4 | 16
      entity?: 1 | 2 | 4 | 16 | 32 | 64 | 1024 | 2048
      externalevent?: 1 | 2 | 4 | 16 | 1024
      followup?: 1 | 2 | 4 | 16 | 1024 | 2048 | 4096 | 8192 | 16384 | 32768 | 65536
      form?: 1 | 2 | 4 | 8 | 16
      global_validation?: number
      group?: 1 | 2 | 4 | 16 | 32 | 64
      infocom?: 1 | 2 | 4 | 16
      internet?: 1 | 2 | 4 | 8 | 16
      inventory?: 1 | 1024 | 2048
      itilcategory?: 1 | 2 | 4 | 16
      itilfollowuptemplate?: 1 | 2 | 4 | 16
      itiltemplate?: 1 | 2 | 4 | 16
      itilvalidationtemplate?: 1 | 2 | 4 | 16
      knowbase?: 1 | 2 | 4 | 16 | 1024 | 2048 | 4096 | 8192
      knowbasecategory?: 1 | 2 | 4 | 16
      license?: 1 | 2 | 4 | 8 | 16 | 32 | 64 | 256 | 512 | 1024 | 2048
      line?: 1 | 2 | 4 | 8 | 16 | 32 | 64 | 256 | 512 | 1024 | 2048
      lineoperator?: 1 | 2 | 4 | 16
      link?: 1 | 2 | 4 | 16
      location?: 1 | 2 | 4 | 16
      locked_field?: 2 | 4
      logs?: 1
      monitor?: 1 | 2 | 4 | 8 | 16 | 32 | 64 | 256 | 512 | 1024 | 2048
      networking?: 1 | 2 | 4 | 8 | 16 | 32 | 64 | 256 | 512 | 1024 | 2048
      notification?: 1 | 2 | 4 | 16
      oauth_client?: 1 | 2 | 4 | 16
      password_update?: number
      pendingreason?: 1 | 2 | 4 | 16
      peripheral?: 1 | 2 | 4 | 8 | 16 | 32 | 64 | 256 | 512 | 1024 | 2048
      personalization?: 1 | 2
      phone?: 1 | 2 | 4 | 8 | 16 | 32 | 64 | 256 | 512 | 1024 | 2048
      planning?: 1 | 1024 | 2048
      printer?: 1 | 2 | 4 | 8 | 16 | 32 | 64 | 256 | 512 | 1024 | 2048
      problem?: 1 | 2 | 4 | 8 | 16 | 32 | 64 | 1024
      profile?: 1 | 2 | 4 | 16
      project?: 1 | 2 | 4 | 8 | 16 | 32 | 64 | 1024
      projecttask?: 1 | 8 | 16 | 32 | 64 | 1024
      queuednotification?: 1 | 2 | 4 | 8 | 16
      recurrentchange?: 1 | 2 | 4 | 16
      refusedequipment?: 1 | 2 | 16
      reminder_public?: 1 | 2 | 4 | 16 | 128
      reports?: 1
      reservation?: 1 | 2 | 4 | 16 | 1024
      rssfeed_public?: 1 | 2 | 4 | 16 | 128
      rule_asset?: 1 | 2 | 4 | 16 | 1024
      rule_change?: 1 | 2 | 4 | 16 | 1024
      rule_dictionnary_dropdown?: 1 | 2 | 4 | 16
      rule_dictionnary_printer?: 1 | 2 | 4 | 16
      rule_dictionnary_software?: 1 | 2 | 4 | 16
      rule_import?: 1 | 2 | 4 | 16
      rule_ldap?: 1 | 2 | 4 | 16
      rule_location?: 1 | 2 | 4 | 16
      rule_mailcollector?: 1 | 2 | 4 | 16
      rule_problem?: 1 | 2 | 4 | 16 | 1024
      rule_softwarecategories?: 1 | 2 | 4 | 16
      rule_ticket?: 1 | 2 | 4 | 16 | 1024
      search_config?: 1024 | 2048
      show_group_hardware?: number
      slm?: 1 | 2 | 4 | 16 | 256
      snmpcredential?: 1 | 2 | 4 | 8 | 16
      software?: 1 | 2 | 4 | 8 | 16 | 32 | 64 | 256 | 512 | 1024 | 2048
      solutiontemplate?: 1 | 2 | 4 | 16
      state?: 1 | 2 | 4 | 16
      statistic?: 1
      system_logs?: 1
      task?: 1 | 2 | 4 | 16 | 1024 | 2048 | 4096 | 8192 | 16384 | 32768 | 65536
      taskcategory?: 1 | 2 | 4 | 16
      tasktemplate?: 1 | 2 | 4 | 16
      ticket?:
        | 1
        | 2
        | 4
        | 8
        | 16
        | 1024
        | 2048
        | 4096
        | 8192
        | 16384
        | 32768
        | 65536
        | 131072
        | 262144
      ticketcost?: 1 | 2 | 4 | 16
      ticketrecurrent?: 1 | 2 | 4 | 16
      ticketvalidation?: 16 | 1024 | 2048 | 4096 | 8192
      transfer?: 1 | 2 | 4 | 16
      typedoc?: 1 | 2 | 4 | 16
      unmanaged?: 1 | 2 | 8 | 16
      user?: 1 | 2 | 4 | 8 | 16 | 1024 | 2048 | 4096 | 8192
    }
    helpdesk_hardware?: 0 | 1 | 2 | 3
    helpdesk_item_type?: string
    managed_domainrecordtypes?: string
    ticket_status?: string
    change_status?: string
    problem_status?: string
  }
  active_entity?: {
    readonly id?: number
    short_name?: string
    complete_name?: string
    recursive?: number
  }
  groups?: number[]
}

export type SessionInput = {
  current_time?: string
  user_id?: number
  use_mode?: number
  friendly_name?: string
  name?: string
  real_name?: string
  first_name?: string
  default_entity?: number
  profiles?: number[]
  active_entities?: number[]
  active_profile?: {
    name?: string
    interface?: string
    rights?: {
      agent?: 1 | 2 | 16
      appliance?: 1 | 2 | 4 | 8 | 16 | 32 | 64 | 256 | 512 | 1024 | 2048
      backup?: number
      bookmark_public?: 1 | 2 | 4 | 16
      budget?: 1 | 2 | 4 | 8 | 16 | 32 | 64
      cable_management?: 1 | 2 | 4 | 8 | 16 | 256 | 512 | 1024 | 2048
      calendar?: 1 | 2 | 4 | 16
      cartridge?: 1 | 2 | 4 | 8 | 16 | 32 | 64 | 256 | 512 | 1024 | 2048
      certificate?: 1 | 2 | 4 | 8 | 16 | 32 | 64 | 256 | 512 | 1024 | 2048
      change?: 1 | 2 | 4 | 8 | 16 | 32 | 64 | 1024 | 131072
      changevalidation?: 4 | 16 | 1024
      cluster?: 1 | 2 | 4 | 8 | 16 | 256 | 512 | 1024 | 2048
      computer?: 1 | 2 | 4 | 8 | 16 | 32 | 64 | 256 | 512 | 1024 | 2048
      config?: 1 | 2
      consumable?: 1 | 2 | 4 | 8 | 16 | 32 | 64 | 256 | 512 | 1024 | 2048
      contact_enterprise?: 1 | 2 | 4 | 8 | 16 | 32 | 64
      contract?: 1 | 2 | 4 | 8 | 16 | 32 | 64
      dashboard?: 1 | 2 | 4 | 16
      database?: 1 | 2 | 4 | 8 | 16 | 32 | 64 | 256 | 512 | 1024 | 2048
      datacenter?: 1 | 2 | 4 | 8 | 16
      device?: 1 | 2 | 4 | 16
      devicesimcard_pinpuk?: 1 | 2
      document?: 1 | 2 | 4 | 8 | 16 | 32 | 64
      domain?: 1 | 2 | 4 | 8 | 16 | 32 | 64 | 256 | 512 | 1024 | 2048
      dropdown?: 1 | 2 | 4 | 16
      entity?: 1 | 2 | 4 | 16 | 32 | 64 | 1024 | 2048
      externalevent?: 1 | 2 | 4 | 16 | 1024
      followup?: 1 | 2 | 4 | 16 | 1024 | 2048 | 4096 | 8192 | 16384 | 32768 | 65536
      form?: 1 | 2 | 4 | 8 | 16
      global_validation?: number
      group?: 1 | 2 | 4 | 16 | 32 | 64
      infocom?: 1 | 2 | 4 | 16
      internet?: 1 | 2 | 4 | 8 | 16
      inventory?: 1 | 1024 | 2048
      itilcategory?: 1 | 2 | 4 | 16
      itilfollowuptemplate?: 1 | 2 | 4 | 16
      itiltemplate?: 1 | 2 | 4 | 16
      itilvalidationtemplate?: 1 | 2 | 4 | 16
      knowbase?: 1 | 2 | 4 | 16 | 1024 | 2048 | 4096 | 8192
      knowbasecategory?: 1 | 2 | 4 | 16
      license?: 1 | 2 | 4 | 8 | 16 | 32 | 64 | 256 | 512 | 1024 | 2048
      line?: 1 | 2 | 4 | 8 | 16 | 32 | 64 | 256 | 512 | 1024 | 2048
      lineoperator?: 1 | 2 | 4 | 16
      link?: 1 | 2 | 4 | 16
      location?: 1 | 2 | 4 | 16
      locked_field?: 2 | 4
      logs?: 1
      monitor?: 1 | 2 | 4 | 8 | 16 | 32 | 64 | 256 | 512 | 1024 | 2048
      networking?: 1 | 2 | 4 | 8 | 16 | 32 | 64 | 256 | 512 | 1024 | 2048
      notification?: 1 | 2 | 4 | 16
      oauth_client?: 1 | 2 | 4 | 16
      password_update?: number
      pendingreason?: 1 | 2 | 4 | 16
      peripheral?: 1 | 2 | 4 | 8 | 16 | 32 | 64 | 256 | 512 | 1024 | 2048
      personalization?: 1 | 2
      phone?: 1 | 2 | 4 | 8 | 16 | 32 | 64 | 256 | 512 | 1024 | 2048
      planning?: 1 | 1024 | 2048
      printer?: 1 | 2 | 4 | 8 | 16 | 32 | 64 | 256 | 512 | 1024 | 2048
      problem?: 1 | 2 | 4 | 8 | 16 | 32 | 64 | 1024
      profile?: 1 | 2 | 4 | 16
      project?: 1 | 2 | 4 | 8 | 16 | 32 | 64 | 1024
      projecttask?: 1 | 8 | 16 | 32 | 64 | 1024
      queuednotification?: 1 | 2 | 4 | 8 | 16
      recurrentchange?: 1 | 2 | 4 | 16
      refusedequipment?: 1 | 2 | 16
      reminder_public?: 1 | 2 | 4 | 16 | 128
      reports?: 1
      reservation?: 1 | 2 | 4 | 16 | 1024
      rssfeed_public?: 1 | 2 | 4 | 16 | 128
      rule_asset?: 1 | 2 | 4 | 16 | 1024
      rule_change?: 1 | 2 | 4 | 16 | 1024
      rule_dictionnary_dropdown?: 1 | 2 | 4 | 16
      rule_dictionnary_printer?: 1 | 2 | 4 | 16
      rule_dictionnary_software?: 1 | 2 | 4 | 16
      rule_import?: 1 | 2 | 4 | 16
      rule_ldap?: 1 | 2 | 4 | 16
      rule_location?: 1 | 2 | 4 | 16
      rule_mailcollector?: 1 | 2 | 4 | 16
      rule_problem?: 1 | 2 | 4 | 16 | 1024
      rule_softwarecategories?: 1 | 2 | 4 | 16
      rule_ticket?: 1 | 2 | 4 | 16 | 1024
      search_config?: 1024 | 2048
      show_group_hardware?: number
      slm?: 1 | 2 | 4 | 16 | 256
      snmpcredential?: 1 | 2 | 4 | 8 | 16
      software?: 1 | 2 | 4 | 8 | 16 | 32 | 64 | 256 | 512 | 1024 | 2048
      solutiontemplate?: 1 | 2 | 4 | 16
      state?: 1 | 2 | 4 | 16
      statistic?: 1
      system_logs?: 1
      task?: 1 | 2 | 4 | 16 | 1024 | 2048 | 4096 | 8192 | 16384 | 32768 | 65536
      taskcategory?: 1 | 2 | 4 | 16
      tasktemplate?: 1 | 2 | 4 | 16
      ticket?:
        | 1
        | 2
        | 4
        | 8
        | 16
        | 1024
        | 2048
        | 4096
        | 8192
        | 16384
        | 32768
        | 65536
        | 131072
        | 262144
      ticketcost?: 1 | 2 | 4 | 16
      ticketrecurrent?: 1 | 2 | 4 | 16
      ticketvalidation?: 16 | 1024 | 2048 | 4096 | 8192
      transfer?: 1 | 2 | 4 | 16
      typedoc?: 1 | 2 | 4 | 16
      unmanaged?: 1 | 2 | 8 | 16
      user?: 1 | 2 | 4 | 8 | 16 | 1024 | 2048 | 4096 | 8192
    }
    helpdesk_hardware?: 0 | 1 | 2 | 3
    helpdesk_item_type?: string
    managed_domainrecordtypes?: string
    ticket_status?: string
    change_status?: string
    problem_status?: string
  }
  active_entity?: {
    short_name?: string
    complete_name?: string
    recursive?: number
  }
  groups?: number[]
}

export type Socket = {
  readonly id?: number
  name?: string
  comment?: string
  location?: Location
  model?: SocketModel
  wiring_side?: number
  itemtype?: string
  items_id?: number
  network_port?: NetworkPort
  date_creation?: string
  date_mod?: string
}

export type SocketInput = {
  name?: string
  comment?: string
  location?: LocationInput
  model?: SocketModelInput
  wiring_side?: number
  itemtype?: string
  items_id?: number
  network_port?: NetworkPortInput
  date_creation?: string
  date_mod?: string
}

export type SocketModel = {
  readonly id?: number
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type SocketModelInput = {
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type Software = {
  readonly id?: number
  name?: string
  comment?: string
  entity?: Entity
  is_recursive?: boolean
  location?: Location
  category?: SoftwareCategory
  manufacturer?: Manufacturer
  parent?: {
    id?: number
    readonly name?: string
  }
  is_helpdesk_visible?: boolean
  user?: User
  group?: Group[]
  user_tech?: User
  group_tech?: Group[]
  is_deleted?: boolean
  is_update?: boolean
  readonly is_valid?: boolean
  date_creation?: string
  date_mod?: string
  is_template?: boolean
  template_name?: string
  ticket_tco?: number
}

export type SoftwareInput = {
  name?: string
  comment?: string
  entity?: EntityInput
  is_recursive?: boolean
  location?: LocationInput
  category?: SoftwareCategoryInput
  manufacturer?: ManufacturerInput
  parent?: {
    id?: number
  }
  is_helpdesk_visible?: boolean
  user?: UserInput
  group?: GroupInput[]
  user_tech?: UserInput
  group_tech?: GroupInput[]
  is_deleted?: boolean
  is_update?: boolean
  date_creation?: string
  date_mod?: string
  is_template?: boolean
  template_name?: string
  ticket_tco?: number
}

export type SoftwareCategory = {
  readonly id?: number
  name?: string
  readonly completename?: string
  comment?: string
  parent?: {
    id?: number
    readonly name?: string
  }
  readonly level?: number
}

export type SoftwareCategoryInput = {
  name?: string
  comment?: string
  parent?: {
    id?: number
  }
}

export type SoftwareInstallation = {
  readonly id?: number
  itemtype?: string
  items_id?: number
  softwareversion?: SoftwareVersion
  date_install?: string
  entity?: Entity
  is_dynamic?: boolean
}

export type SoftwareInstallationInput = {
  itemtype?: string
  items_id?: number
  softwareversion?: SoftwareVersionInput
  date_install?: string
  entity?: EntityInput
  is_dynamic?: boolean
}

export type SoftwareLicense = {
  readonly id?: number
  name?: string
  comment?: string
  status?: State
  entity?: Entity
  is_recursive?: boolean
  manufacturer?: Manufacturer
  user?: User
  user_tech?: User
  contact?: string
  contact_num?: string
  serial?: string
  otherserial?: string
  is_deleted?: boolean
  date_creation?: string
  date_mod?: string
  location?: Location
  type?: LicenseType
  group?: Group[]
  group_tech?: Group[]
  readonly completename?: string
  readonly level?: number
}

export type SoftwareLicenseInput = {
  name?: string
  comment?: string
  status?: StateInput
  entity?: EntityInput
  is_recursive?: boolean
  manufacturer?: ManufacturerInput
  user?: UserInput
  user_tech?: UserInput
  contact?: string
  contact_num?: string
  serial?: string
  otherserial?: string
  is_deleted?: boolean
  date_creation?: string
  date_mod?: string
  location?: LocationInput
  type?: LicenseTypeInput
  group?: GroupInput[]
  group_tech?: GroupInput[]
}

export type SoftwareVersion = {
  readonly id?: number
  name?: string
  arch?: string
  comment?: string
  entity?: Entity
  is_recursive?: boolean
  software?: Software
  state?: State
  operating_system?: OperatingSystem
  date_creation?: string
  date_mod?: string
}

export type SoftwareVersionInput = {
  name?: string
  arch?: string
  comment?: string
  entity?: EntityInput
  is_recursive?: boolean
  software?: SoftwareInput
  state?: StateInput
  operating_system?: OperatingSystemInput
  date_creation?: string
  date_mod?: string
}

export type Solution = {
  readonly id?: number
  itemtype?: string
  items_id?: number
  type?: SolutionType
  content?: string
  user?: User
  user_editor?: User
  approver?: User
  status?: 1 | 2 | 3 | 4
  approval_followup?: Followup
  date_creation?: string
  date_mod?: string
  date_approval?: string
}

export type SolutionInput = {
  itemtype?: string
  items_id?: number
  type?: SolutionTypeInput
  content?: string
  user?: UserInput
  user_editor?: UserInput
  approver?: UserInput
  status?: 1 | 2 | 3 | 4
  approval_followup?: FollowupInput
  date_creation?: string
  date_mod?: string
  date_approval?: string
}

export type SolutionTemplate = {
  readonly id?: number
  name?: string
  content?: string
  comment?: string
  entity?: Entity
  is_recursive?: boolean
  type?: SolutionType
  date_creation?: string
  date_mod?: string
}

export type SolutionTemplateInput = {
  name?: string
  content?: string
  comment?: string
  entity?: EntityInput
  is_recursive?: boolean
  type?: SolutionTypeInput
  date_creation?: string
  date_mod?: string
}

export type SolutionType = {
  readonly id?: number
  name?: string
  comment?: string
  entity?: Entity
  is_recursive?: boolean
  is_incident?: boolean
  is_request?: boolean
  is_problem?: boolean
  is_change?: boolean
  date_creation?: string
  date_mod?: string
}

export type SolutionTypeInput = {
  name?: string
  comment?: string
  entity?: EntityInput
  is_recursive?: boolean
  is_incident?: boolean
  is_request?: boolean
  is_problem?: boolean
  is_change?: boolean
  date_creation?: string
  date_mod?: string
}

export type SoundCard = {
  readonly id?: number
  designation?: string
  comment?: string
  manufacturer?: Manufacturer
  entity?: Entity
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
  model?: SoundCardModel
}

export type SoundCardInput = {
  designation?: string
  comment?: string
  manufacturer?: ManufacturerInput
  entity?: EntityInput
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
  model?: SoundCardModelInput
}

export type SoundCardItem = {
  readonly id?: number
  itemtype?: string
  items_id?: number
  entity?: Entity
  is_recursive?: boolean
  serial?: string
  otherserial?: string
  location?: Location
  status?: State
  is_deleted?: boolean
  is_dynamic?: boolean
  sound_card?: SoundCard
  busID?: string
}

export type SoundCardItemInput = {
  itemtype?: string
  items_id?: number
  entity?: EntityInput
  is_recursive?: boolean
  serial?: string
  otherserial?: string
  location?: LocationInput
  status?: StateInput
  is_deleted?: boolean
  is_dynamic?: boolean
  sound_card?: SoundCardInput
  busID?: string
}

export type SoundCardModel = {
  readonly id?: number
  name?: string
  comment?: string
  product_number?: string
}

export type SoundCardModelInput = {
  name?: string
  comment?: string
  product_number?: string
}

export type StatReport = {
  assistance_type?: string
  report_type?: string
  report_title?: string
  report_group_fields?: string[]
}

export type StatReportInput = {
  assistance_type?: string
  report_type?: string
  report_title?: string
  report_group_fields?: string[]
}

export type State = {
  readonly id?: number
  name?: string
  readonly completename?: string
  comment?: string
  entity?: Entity
  is_recursive?: boolean
  parent?: {
    id?: number
    readonly name?: string
  }
  readonly level?: number
  is_visible_helpdesk?: boolean
  date_creation?: string
  date_mod?: string
  visibilities?: StateVisibilities
}

export type StateInput = {
  name?: string
  comment?: string
  entity?: EntityInput
  is_recursive?: boolean
  parent?: {
    id?: number
  }
  is_visible_helpdesk?: boolean
  date_creation?: string
  date_mod?: string
  visibilities?: StateVisibilitiesInput
}

export type StateVisibilities = {
  computer?: boolean
  monitor?: boolean
  networkequipment?: boolean
  peripheral?: boolean
  phone?: boolean
  printer?: boolean
  softwarelicense?: boolean
  certificate?: boolean
  enclosure?: boolean
  pdu?: boolean
  line?: boolean
  rack?: boolean
  softwareversion?: boolean
  cluster?: boolean
  contract?: boolean
  appliance?: boolean
  databaseinstance?: boolean
  cable?: boolean
  unmanaged?: boolean
  passivedcequipment?: boolean
}

export type StateVisibilitiesInput = {
  computer?: boolean
  monitor?: boolean
  networkequipment?: boolean
  peripheral?: boolean
  phone?: boolean
  printer?: boolean
  softwarelicense?: boolean
  certificate?: boolean
  enclosure?: boolean
  pdu?: boolean
  line?: boolean
  rack?: boolean
  softwareversion?: boolean
  cluster?: boolean
  contract?: boolean
  appliance?: boolean
  databaseinstance?: boolean
  cable?: boolean
  unmanaged?: boolean
  passivedcequipment?: boolean
}

export type Stencil = {
  readonly id?: number
  itemtype: string
  items_id: number
  number_zones?: number
  zones?: string
  date_creation?: string
  date_mod?: string
}

export type StencilInput = {
  itemtype: string
  items_id: number
  number_zones?: number
  zones?: string
  date_creation?: string
  date_mod?: string
}

export type Supplier = {
  readonly id?: number
  name?: string
  comment?: string
  entity?: Entity
  date_creation?: string
  date_mod?: string
  type?: SupplierType
  is_deleted?: boolean
}

export type SupplierInput = {
  name?: string
  comment?: string
  entity?: EntityInput
  date_creation?: string
  date_mod?: string
  type?: SupplierTypeInput
  is_deleted?: boolean
}

export type SupplierType = {
  readonly id?: number
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type SupplierTypeInput = {
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type Systemboard = {
  readonly id?: number
  designation?: string
  comment?: string
  manufacturer?: Manufacturer
  entity?: Entity
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
  chipset?: string
  model?: SystemboardModel
}

export type SystemboardInput = {
  designation?: string
  comment?: string
  manufacturer?: ManufacturerInput
  entity?: EntityInput
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
  chipset?: string
  model?: SystemboardModelInput
}

export type SystemboardItem = {
  readonly id?: number
  itemtype?: string
  items_id?: number
  entity?: Entity
  is_recursive?: boolean
  serial?: string
  otherserial?: string
  location?: Location
  status?: State
  is_deleted?: boolean
  is_dynamic?: boolean
  systemboard?: Systemboard
}

export type SystemboardItemInput = {
  itemtype?: string
  items_id?: number
  entity?: EntityInput
  is_recursive?: boolean
  serial?: string
  otherserial?: string
  location?: LocationInput
  status?: StateInput
  is_deleted?: boolean
  is_dynamic?: boolean
  systemboard?: SystemboardInput
}

export type SystemboardModel = {
  readonly id?: number
  name?: string
  comment?: string
  product_number?: string
}

export type SystemboardModelInput = {
  name?: string
  comment?: string
  product_number?: string
}

export type TaskCategory = {
  readonly id?: number
  name?: string
  is_active?: boolean
  entity?: Entity
  is_recursive?: boolean
  readonly completename?: string
  parent?: {
    id?: number
    readonly name?: string
  }
  readonly level?: number
  is_helpdesk_visible?: boolean
  date_creation?: string
  date_mod?: string
}

export type TaskCategoryInput = {
  name?: string
  is_active?: boolean
  entity?: EntityInput
  is_recursive?: boolean
  parent?: {
    id?: number
  }
  is_helpdesk_visible?: boolean
  date_creation?: string
  date_mod?: string
}

export type TaskTemplate = {
  readonly id?: number
  name?: string
  content?: string
  comment?: string
  category?: TaskCategory
  entity?: Entity
  is_recursive?: boolean
  is_private?: boolean
  duration?: number
  state?: 0 | 1 | 2
  user_tech?: User
  group_tech?: Group
  use_current_user?: boolean
  date_creation?: string
  date_mod?: string
}

export type TaskTemplateInput = {
  name?: string
  content?: string
  comment?: string
  category?: TaskCategoryInput
  entity?: EntityInput
  is_recursive?: boolean
  is_private?: boolean
  duration?: number
  state?: 0 | 1 | 2
  user_tech?: UserInput
  group_tech?: GroupInput
  use_current_user?: boolean
  date_creation?: string
  date_mod?: string
}

export type TeamMember = {
  readonly id?: number
  name?: string
  type?: string
  role?: string
}

export type TeamMemberInput = {
  name?: string
  type?: string
  role?: string
}

export type Ticket = {
  readonly id?: number
  name?: string
  content?: string
  user_recipient?: User
  user_editor?: User
  is_deleted?: boolean
  category?: ITILCategory
  location?: Location
  urgency?: 1 | 2 | 3 | 4 | 5
  impact?: 1 | 2 | 3 | 4 | 5
  priority?: 1 | 2 | 3 | 4 | 5
  readonly actiontime?: number
  readonly begin_waiting_date?: string
  readonly waiting_duration?: number
  readonly resolution_duration?: number
  readonly close_duration?: number
  resolution_date?: string
  date_creation?: string
  date_mod?: string
  date?: string
  date_solve?: string
  date_close?: string
  type?: 1 | 2
  external_id?: string
  request_type?: RequestType
  take_into_account_date?: string
  readonly take_into_account_duration?: number
  sla_ttr?: SLA
  sla_tto?: SLA
  ola_ttr?: OLA
  ola_tto?: OLA
  sla_level_ttr?: SLALevel
  ola_level_ttr?: OLALevel
  readonly sla_waiting_duration?: number
  readonly ola_waiting_duration?: number
  readonly ola_ttr_begin_date?: string
  readonly ola_tto_begin_date?: string
  internal_resolution_date?: string
  internal_take_into_account_date?: string
  global_validation?: 1 | 2 | 3 | 4
  status?: {
    readonly id?: 1 | 10 | 2 | 3 | 4 | 5 | 6
    readonly name?: string
  }
  entity?: Entity
  team?: TeamMember[]
  costs?: TicketCost[]
}

export type TicketInput = {
  name?: string
  content?: string
  user_recipient?: UserInput
  user_editor?: UserInput
  is_deleted?: boolean
  category?: ITILCategoryInput
  location?: LocationInput
  urgency?: 1 | 2 | 3 | 4 | 5
  impact?: 1 | 2 | 3 | 4 | 5
  priority?: 1 | 2 | 3 | 4 | 5
  resolution_date?: string
  date_creation?: string
  date_mod?: string
  date?: string
  date_solve?: string
  date_close?: string
  type?: 1 | 2
  external_id?: string
  request_type?: RequestTypeInput
  take_into_account_date?: string
  sla_ttr?: SLAInput
  sla_tto?: SLAInput
  ola_ttr?: OLAInput
  ola_tto?: OLAInput
  sla_level_ttr?: SLALevelInput
  ola_level_ttr?: OLALevelInput
  internal_resolution_date?: string
  internal_take_into_account_date?: string
  global_validation?: 1 | 2 | 3 | 4
  status?: {}
  entity?: EntityInput
  team?: TeamMemberInput[]
  costs?: TicketCostInput[]
}

export type TicketCost = {
  readonly id?: number
  ticket?: Ticket
  name?: string
  comment?: string
  date_begin?: string
  date_end?: string
  duration?: number
  cost_time?: number
  cost_fixed?: number
  cost_material?: number
  budget?: Budget
  entity?: Entity
}

export type TicketCostInput = {
  ticket?: TicketInput
  name?: string
  comment?: string
  date_begin?: string
  date_end?: string
  duration?: number
  cost_time?: number
  cost_fixed?: number
  cost_material?: number
  budget?: BudgetInput
  entity?: EntityInput
}

export type TicketSatisfaction = {
  readonly id?: number
  ticket?: Ticket
  type?: 1 | 2
  date_begin?: string
  date_answered?: string
  rating?: number
  rating_scaled_5?: number
  comment?: string
}

export type TicketSatisfactionInput = {
  ticket?: TicketInput
  type?: 1 | 2
  date_begin?: string
  date_answered?: string
  rating?: number
  rating_scaled_5?: number
  comment?: string
}

export type TicketTask = {
  readonly id?: number
  readonly uuid?: string
  content?: string
  is_private?: boolean
  user?: User
  user_editor?: User
  user_tech?: User
  group_tech?: Group
  date?: string
  date_creation?: string
  date_mod?: string
  duration?: number
  planned_begin?: string
  planned_end?: string
  state?: 0 | 1 | 2
  category?: TaskCategory
  timeline_position?: -1 | 0 | 1 | 2 | 3 | 4
  tickets_id?: number
  source_item_id?: number
  source_of_item_id?: number
}

export type TicketTaskInput = {
  content?: string
  is_private?: boolean
  user?: UserInput
  user_editor?: UserInput
  user_tech?: UserInput
  group_tech?: GroupInput
  date?: string
  date_creation?: string
  date_mod?: string
  duration?: number
  planned_begin?: string
  planned_end?: string
  state?: 0 | 1 | 2
  category?: TaskCategoryInput
  timeline_position?: -1 | 0 | 1 | 2 | 3 | 4
  tickets_id?: number
  source_item_id?: number
  source_of_item_id?: number
}

export type TicketTemplate = {
  readonly id?: number
  name?: string
  comment?: string
  entity?: Entity
  is_recursive?: boolean
}

export type TicketTemplateInput = {
  name?: string
  comment?: string
  entity?: EntityInput
  is_recursive?: boolean
}

export type TicketValidation = {
  readonly id?: number
  requester?: User
  approver?: User
  requested_approver_type?: 'User' | 'Group'
  requested_approver_id?: number
  submission_comment?: string
  approval_comment?: string
  status?: 1 | 2 | 3 | 4
  submission_date?: string
  approval_date?: string
  timeline_position?: -1 | 0 | 1 | 2 | 3 | 4
  tickets_id?: number
}

export type TicketValidationInput = {
  requester?: UserInput
  approver?: UserInput
  requested_approver_type?: 'User' | 'Group'
  requested_approver_id?: number
  submission_comment?: string
  approval_comment?: string
  status?: 1 | 2 | 3 | 4
  submission_date?: string
  approval_date?: string
  timeline_position?: -1 | 0 | 1 | 2 | 3 | 4
  tickets_id?: number
}

export type TicketItem = {
  readonly id?: number
  ticket?: Ticket
  itemtype?: string
  items_id?: number
}

export type TicketItemInput = {
  ticket?: TicketInput
  itemtype?: string
  items_id?: number
}

export type TicketTicket = {
  readonly id?: number
  ticket_1?: Ticket
  ticket_2?: Ticket
  link?: 1 | 2 | 3 | 4
}

export type TicketTicketInput = {
  ticket_1?: TicketInput
  ticket_2?: TicketInput
  link?: 1 | 2 | 3 | 4
}

export type USBVendor = {
  readonly id?: number
  name?: string
  comment?: string
  vendorid?: string
  deviceid?: string
  entity?: Entity
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
}

export type USBVendorInput = {
  name?: string
  comment?: string
  vendorid?: string
  deviceid?: string
  entity?: EntityInput
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
}

export type Unmanaged = {
  readonly id?: number
  name?: string
  comment?: string
  status?: State
  entity?: Entity
  is_recursive?: boolean
  manufacturer?: Manufacturer
  user?: User
  user_tech?: User
  contact?: string
  contact_num?: string
  serial?: string
  otherserial?: string
  is_deleted?: boolean
  date_creation?: string
  date_mod?: string
  group?: Group[]
  group_tech?: Group[]
  network?: Network
  autoupdatesystem?: AutoUpdateSystem
  is_dynamic?: boolean
  sysdescr?: string
  agent?: Agent
  itemtype?: string
  accepted?: boolean
  is_hub?: boolean
  ip?: string
  snmp_credential?: SNMPCredential
  readonly last_inventory_update?: string
}

export type UnmanagedInput = {
  name?: string
  comment?: string
  status?: StateInput
  entity?: EntityInput
  is_recursive?: boolean
  manufacturer?: ManufacturerInput
  user?: UserInput
  user_tech?: UserInput
  contact?: string
  contact_num?: string
  serial?: string
  otherserial?: string
  is_deleted?: boolean
  date_creation?: string
  date_mod?: string
  group?: GroupInput[]
  group_tech?: GroupInput[]
  network?: NetworkInput
  autoupdatesystem?: AutoUpdateSystemInput
  is_dynamic?: boolean
  sysdescr?: string
  agent?: AgentInput
  itemtype?: string
  accepted?: boolean
  is_hub?: boolean
  ip?: string
  snmp_credential?: SNMPCredentialInput
}

export type User = {
  readonly id?: number
  username?: string
  realname?: string
  firstname?: string
  phone?: string
  phone2?: string
  mobile?: string
  emails?: EmailAddress[]
  comment?: string
  is_active?: boolean
  is_deleted?: boolean
  readonly picture?: string
  readonly date_password_change?: string
  location?: Location
  authtype?: 1 | 2 | 3 | 4 | 5 | 6
  last_login?: string
  default_profile?: Profile
  default_entity?: Entity
  date_creation?: string
  date_mod?: string
  readonly date_sync?: string
  title?: UserTitle
  category?: UserCategory
  registration_number?: string
  begin_date?: string
  end_date?: string
  nickname?: string
  substitution_start_date?: string
  substitution_end_date?: string
}

export type UserInput = {
  username?: string
  realname?: string
  firstname?: string
  phone?: string
  phone2?: string
  mobile?: string
  emails?: EmailAddressInput[]
  comment?: string
  is_active?: boolean
  is_deleted?: boolean
  password?: string
  password2?: string
  location?: LocationInput
  authtype?: 1 | 2 | 3 | 4 | 5 | 6
  last_login?: string
  default_profile?: ProfileInput
  default_entity?: EntityInput
  date_creation?: string
  date_mod?: string
  title?: UserTitleInput
  category?: UserCategoryInput
  registration_number?: string
  begin_date?: string
  end_date?: string
  nickname?: string
  substitution_start_date?: string
  substitution_end_date?: string
}

export type UserCategory = {
  readonly id?: number
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type UserCategoryInput = {
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type UserPreferences = {
  readonly id?: number
  language?: string
  use_mode?: 0 | 2
  list_limit?: number
  date_format?: 0 | 1 | 2
  number_format?: 0 | 1 | 2 | 3 | 4
  name_format?: 0 | 1
  csv_delimiter?: ';' | ','
  is_ids_visible?: boolean
  use_flat_dropdowntree?: boolean
  use_flat_dropdowntree_on_search_result?: boolean
  show_new_tickets_on_home?: boolean
  priority_color_verylow?: string
  priority_color_low?: string
  priority_color_medium?: string
  priority_color_high?: string
  priority_color_veryhigh?: string
  priority_color_major?: string
  private_followups_by_default?: boolean
  private_tasks_by_default?: boolean
  default_requesttype?: RequestType
  show_count_on_tabs?: boolean
  refresh_view_interval?: number
  set_default_tech?: boolean
  set_default_requester?: boolean
  set_followup_tech?: boolean
  set_solution_tech?: boolean
  home_list_limit?: number
  notification_to_myself?: boolean
  duedate_color_ok?: string
  duedate_color_warning?: string
  duedate_color_critical?: string
  duedate_threshold_warning?: number
  duedate_threshold_warning_unit?: '%' | 'hours' | 'days'
  duedate_threshold_critical?: number
  duedate_threshold_critical_unit?: '%' | 'hours' | 'days'
  pdf_font?:
    | 'aealarabiya'
    | 'aefurat'
    | 'cid0cs'
    | 'cid0ct'
    | 'cid0jp'
    | 'cid0kr'
    | 'courier'
    | 'dejavusans'
    | 'dejavusanscondensed'
    | 'dejavusansextralight'
    | 'dejavusansmono'
    | 'dejavuserif'
    | 'dejavuserifcondensed'
    | 'freemono'
    | 'freesans'
    | 'freeserif'
    | 'helvetica'
    | 'hysmyeongjostdmedium'
    | 'kozgopromedium'
    | 'kozminproregular'
    | 'msungstdlight'
    | 'pdfacourier'
    | 'pdfahelvetica'
    | 'pdfasymbol'
    | 'pdfatimes'
    | 'pdfazapfdingbats'
    | 'stsongstdlight'
    | 'symbol'
    | 'times'
    | 'zapfdingbats'
  keep_devices_when_purging_item?: boolean
  show_new_item_after_creation?: boolean
  default_task_state?: 0 | 1 | 2
  default_task_state_planned?: 0 | 1 | 2
  palette?:
    | 'aerialgreen'
    | 'auror'
    | 'auror_dark'
    | 'automn'
    | 'classic'
    | 'clockworkorange'
    | 'dark'
    | 'darker'
    | 'flood'
    | 'greenflat'
    | 'hipster'
    | 'icecream'
    | 'lightblue'
    | 'midnight'
    | 'premiumred'
    | 'purplehaze'
    | 'teclib'
    | 'vintage'
  page_layout?: 'horizontal' | 'vertical'
  timeline_order?: 'natural' | 'reverse'
  richtext_layout?: 'inline' | 'classic'
  autolock_mode?: boolean
  directunlock_notification?: boolean
  highcontrast_css?: boolean
  default_homepage_tab?: 0 | 1 | 2 | 3 | 4
  toast_location?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  timeline_action_button_layout?: 0 | 1
  timeline_date_format?: 0 | 1
  default_is_notifications_enabled?: boolean
  show_search_form?: boolean
  search_pagination_on_top?: boolean
  timezone?: string
}

export type UserPreferencesInput = {
  language?: string
  use_mode?: 0 | 2
  list_limit?: number
  date_format?: 0 | 1 | 2
  number_format?: 0 | 1 | 2 | 3 | 4
  name_format?: 0 | 1
  csv_delimiter?: ';' | ','
  is_ids_visible?: boolean
  use_flat_dropdowntree?: boolean
  use_flat_dropdowntree_on_search_result?: boolean
  show_new_tickets_on_home?: boolean
  priority_color_verylow?: string
  priority_color_low?: string
  priority_color_medium?: string
  priority_color_high?: string
  priority_color_veryhigh?: string
  priority_color_major?: string
  private_followups_by_default?: boolean
  private_tasks_by_default?: boolean
  default_requesttype?: RequestTypeInput
  show_count_on_tabs?: boolean
  refresh_view_interval?: number
  set_default_tech?: boolean
  set_default_requester?: boolean
  set_followup_tech?: boolean
  set_solution_tech?: boolean
  home_list_limit?: number
  notification_to_myself?: boolean
  duedate_color_ok?: string
  duedate_color_warning?: string
  duedate_color_critical?: string
  duedate_threshold_warning?: number
  duedate_threshold_warning_unit?: '%' | 'hours' | 'days'
  duedate_threshold_critical?: number
  duedate_threshold_critical_unit?: '%' | 'hours' | 'days'
  pdf_font?:
    | 'aealarabiya'
    | 'aefurat'
    | 'cid0cs'
    | 'cid0ct'
    | 'cid0jp'
    | 'cid0kr'
    | 'courier'
    | 'dejavusans'
    | 'dejavusanscondensed'
    | 'dejavusansextralight'
    | 'dejavusansmono'
    | 'dejavuserif'
    | 'dejavuserifcondensed'
    | 'freemono'
    | 'freesans'
    | 'freeserif'
    | 'helvetica'
    | 'hysmyeongjostdmedium'
    | 'kozgopromedium'
    | 'kozminproregular'
    | 'msungstdlight'
    | 'pdfacourier'
    | 'pdfahelvetica'
    | 'pdfasymbol'
    | 'pdfatimes'
    | 'pdfazapfdingbats'
    | 'stsongstdlight'
    | 'symbol'
    | 'times'
    | 'zapfdingbats'
  keep_devices_when_purging_item?: boolean
  show_new_item_after_creation?: boolean
  default_task_state?: 0 | 1 | 2
  default_task_state_planned?: 0 | 1 | 2
  palette?:
    | 'aerialgreen'
    | 'auror'
    | 'auror_dark'
    | 'automn'
    | 'classic'
    | 'clockworkorange'
    | 'dark'
    | 'darker'
    | 'flood'
    | 'greenflat'
    | 'hipster'
    | 'icecream'
    | 'lightblue'
    | 'midnight'
    | 'premiumred'
    | 'purplehaze'
    | 'teclib'
    | 'vintage'
  page_layout?: 'horizontal' | 'vertical'
  timeline_order?: 'natural' | 'reverse'
  richtext_layout?: 'inline' | 'classic'
  autolock_mode?: boolean
  directunlock_notification?: boolean
  highcontrast_css?: boolean
  default_homepage_tab?: 0 | 1 | 2 | 3 | 4
  toast_location?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  timeline_action_button_layout?: 0 | 1
  timeline_date_format?: 0 | 1
  default_is_notifications_enabled?: boolean
  show_search_form?: boolean
  search_pagination_on_top?: boolean
  timezone?: string
}

export type UserTitle = {
  readonly id?: number
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type UserTitleInput = {
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type ValidationTemplate = {
  readonly id?: number
  name?: string
  content?: string
  comment?: string
  entity?: Entity
  is_recursive?: boolean
  approval_step?: ApprovalStep
  date_creation?: string
  date_mod?: string
}

export type ValidationTemplateInput = {
  name?: string
  content?: string
  comment?: string
  entity?: EntityInput
  is_recursive?: boolean
  approval_step?: ApprovalStepInput
  date_creation?: string
  date_mod?: string
}

export type VirtualMachine = {
  readonly id?: number
  itemtype?: string
  items_id?: number
  entity?: Entity
  name?: string
  state?: VirtualMachineState
  system?: VirtualMachineModel
  type?: VirtualMachineType
  uuid?: string
  vcpu?: number
  ram?: number
  is_deleted?: boolean
  is_dynamic?: boolean
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type VirtualMachineInput = {
  itemtype?: string
  items_id?: number
  entity?: EntityInput
  name?: string
  state?: VirtualMachineStateInput
  system?: VirtualMachineModelInput
  type?: VirtualMachineTypeInput
  uuid?: string
  vcpu?: number
  ram?: number
  is_deleted?: boolean
  is_dynamic?: boolean
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type VirtualMachineModel = {
  readonly id?: number
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type VirtualMachineModelInput = {
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type VirtualMachineState = {
  readonly id?: number
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type VirtualMachineStateInput = {
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type VirtualMachineType = {
  readonly id?: number
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type VirtualMachineTypeInput = {
  name?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type Volume = {
  readonly id?: number
  itemtype?: string
  items_id?: number
  entity?: Entity
  name?: string
  device?: string
  mount_point?: string
  filesystem?: Filesystem
  total_size?: number
  free_size?: number
  is_deleted?: boolean
  is_dynamic?: boolean
  encryption_status?: 0 | 1 | 2
  encryption_tool?: string
  encryption_algorithm?: string
  encryption_type?: string
  date_creation?: string
  date_mod?: string
}

export type VolumeInput = {
  itemtype?: string
  items_id?: number
  entity?: EntityInput
  name?: string
  device?: string
  mount_point?: string
  filesystem?: FilesystemInput
  total_size?: number
  free_size?: number
  is_deleted?: boolean
  is_dynamic?: boolean
  encryption_status?: 0 | 1 | 2
  encryption_tool?: string
  encryption_algorithm?: string
  encryption_type?: string
  date_creation?: string
  date_mod?: string
}

export type Webhook = {
  readonly id?: number
  entity?: Entity
  is_recursive?: boolean
  name?: string
  comment?: string
  category?: WebhookCategory
  itemtype?: string
  event?: string
  payload?: string
  use_default_payload?: boolean
  custom_headers?: string
  url?: string
  secret?: string
  use_cra_challenge?: boolean
  http_method?: 'POST' | 'GET' | 'PUT' | 'PATCH'
  sent_try?: number
  is_active?: boolean
  save_response_body?: boolean
  log_in_item_history?: boolean
  date_creation?: string
  date_mod?: string
  use_oauth?: boolean
  oauth_url?: string
  clientid?: string
}

export type WebhookInput = {
  entity?: EntityInput
  is_recursive?: boolean
  name?: string
  comment?: string
  category?: WebhookCategoryInput
  itemtype?: string
  event?: string
  payload?: string
  use_default_payload?: boolean
  custom_headers?: string
  url?: string
  secret?: string
  use_cra_challenge?: boolean
  http_method?: 'POST' | 'GET' | 'PUT' | 'PATCH'
  sent_try?: number
  is_active?: boolean
  save_response_body?: boolean
  log_in_item_history?: boolean
  date_creation?: string
  date_mod?: string
  use_oauth?: boolean
  oauth_url?: string
  clientid?: string
  clientsecret?: string
}

export type WebhookCategory = {
  readonly id?: number
  name?: string
  readonly completename?: string
  comment?: string
  parent?: {
    id?: number
    readonly name?: string
  }
  readonly level?: number
  date_creation?: string
  date_mod?: string
}

export type WebhookCategoryInput = {
  name?: string
  comment?: string
  parent?: {
    id?: number
  }
  date_creation?: string
  date_mod?: string
}

export type WifiNetwork = {
  readonly id?: number
  entity?: Entity
  is_recursive?: boolean
  name?: string
  essid?: string
  mode?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}

export type WifiNetworkInput = {
  entity?: EntityInput
  is_recursive?: boolean
  name?: string
  essid?: string
  mode?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}
