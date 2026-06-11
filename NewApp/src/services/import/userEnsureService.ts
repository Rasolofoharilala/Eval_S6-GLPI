import { httpClient } from '@/api/httpClient'
import type { GlpiReferenceItem } from './glpiReferenceTypes'

// Le CSV 1 contient des noms complets (« Rakoto Jean »). On recherche
// l'utilisateur GLPI correspondant (nom + prénom ou login), et on le crée
// s'il n'existe pas. L'API v2 attend le champ "username" (login).

type GlpiUser = {
  id: number
  username: string
  realname: string
  firstname: string
}

let usersCache: GlpiUser[] | null = null

function normalize(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, ' ')
}

/** « Rakoto Jean » → login « rakoto.jean » (sans accents ni caractères spéciaux). */
function toLogin(fullName: string): string {
  return normalize(fullName)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/ /g, '.')
}

async function loadUsers(): Promise<GlpiUser[]> {
  if (usersCache) {
    return usersCache
  }

  const res = await httpClient.get('/Administration/User')
  const data: unknown = res.data

  usersCache = (Array.isArray(data) ? data : [])
    .filter((item) => item && typeof item === 'object')
    .map((item) => {
      const record = item as Record<string, unknown>
      return {
        id: Number(record.id),
        username: String(record.username ?? ''),
        realname: String(record.realname ?? ''),
        firstname: String(record.firstname ?? ''),
      }
    })
    .filter((user) => user.id)

  return usersCache
}

function matchUser(users: GlpiUser[], fullName: string): GlpiUser | undefined {
  const key = normalize(fullName)

  return users.find(
    (u) =>
      normalize(`${u.realname} ${u.firstname}`) === key ||
      normalize(`${u.firstname} ${u.realname}`) === key ||
      normalize(u.username) === key,
  )
}

/**
 * Retrouve ou crée l'utilisateur GLPI correspondant au nom complet du CSV.
 * Convention CSV : « Nom Prénom » (premier mot = nom, reste = prénom).
 */
export async function ensureUserByFullName(fullName: string): Promise<GlpiReferenceItem | null> {
  if (!fullName || fullName.trim() === '') {
    return null
  }

  const users = await loadUsers()
  const existing = matchUser(users, fullName)

  if (existing) {
    return { id: existing.id, name: existing.username }
  }

  const parts = fullName.trim().split(/\s+/)
  const realname = parts[0] ?? fullName.trim()
  const firstname = parts.slice(1).join(' ')
  const username = toLogin(fullName)

  const res = await httpClient.post<{ id: number }>('/Administration/User', {
    username,
    realname,
    firstname,
  })

  const id = res.data?.id

  if (!id) {
    throw new Error(`Impossible de créer l'utilisateur « ${fullName} »`)
  }

  const created: GlpiUser = { id, username, realname, firstname }
  users.push(created)

  return { id, name: username }
}
