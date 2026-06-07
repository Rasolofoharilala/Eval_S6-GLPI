import type { GlpiReferenceConfig } from './glpiReferenceTypes'

export const referenceConfig = {
  status: {
    endpoint: '/Dropdowns/State',
    autoCreate: true,
  },

  location: {
    endpoint: '/Dropdowns/Location',
    autoCreate: true,
  },

  manufacturer: {
    endpoint: '/Dropdowns/Manufacturer',
    autoCreate: true,
  },

  computerModel: {
    endpoint: '/Dropdowns/ComputerModel',
    autoCreate: true,
  },

  monitorModel: {
    endpoint: '/Dropdowns/MonitorModel',
    autoCreate: true,
  },

  user: {
    endpoint: '/Administration/User',
    autoCreate: false,
  },
} satisfies Record<string, GlpiReferenceConfig>