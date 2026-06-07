export interface Processor {
  id?: number
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
  model?: DeviceProcessorModel
}
