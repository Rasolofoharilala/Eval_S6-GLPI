import axios from 'axios'

// Réglages du tableau Kanban stockés dans SQLite via le backend Spring Boot.
// Échanges au format JSON (cf. Backend/README.md).

export type KanbanStatusKey = 'nouveau' | 'in_progress' | 'termine'

export type KanbanSetting = {
  id: number
  statusKey: KanbanStatusKey
  position: number
  labelFr: string
  labelMg: string
  color: string
}

export type KanbanSettingUpdate = {
  statusKey: KanbanStatusKey
  labelFr?: string
  labelMg?: string
  color?: string
}

const backendUrl = import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:8080'

const SETTINGS_URL = `${backendUrl}/api/kanban/settings`

export const DEFAULT_KANBAN_SETTINGS: KanbanSetting[] = [
  {
    id: 0,
    statusKey: 'nouveau',
    position: 1,
    labelFr: 'Nouveau',
    labelMg: 'Vaovao',
    color: '#dbeafe',
  },
  {
    id: 0,
    statusKey: 'in_progress',
    position: 2,
    labelFr: 'In progress',
    labelMg: 'Efa manao',
    color: '#ffedd5',
  },
  {
    id: 0,
    statusKey: 'termine',
    position: 3,
    labelFr: 'Terminé',
    labelMg: 'Vita',
    color: '#dcfce7',
  },
]

export async function getKanbanSettings(): Promise<KanbanSetting[]> {
  const res = await axios.get<KanbanSetting[]>(SETTINGS_URL)
  return res.data
}

export async function updateKanbanSettings(
  updates: KanbanSettingUpdate[],
): Promise<KanbanSetting[]> {
  const res = await axios.put<KanbanSetting[]>(SETTINGS_URL, updates)
  return res.data
}

export async function resetKanbanSettings(): Promise<KanbanSetting[]> {
  const res = await axios.post<KanbanSetting[]>(`${SETTINGS_URL}/reset`)
  return res.data
}
