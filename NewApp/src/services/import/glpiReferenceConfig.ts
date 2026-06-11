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

  // Les utilisateurs ont une logique dédiée (nom complet du CSV, login généré,
  // création automatique) : voir userEnsureService.ts
} satisfies Record<string, GlpiReferenceConfig>
