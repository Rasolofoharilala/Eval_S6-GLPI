export interface Camera {
  id?: number
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
  model?: DeviceCameraModel
  support?: string
}
