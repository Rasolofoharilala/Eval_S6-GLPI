export type RelationLike =
  | {
      id?: number
      name?: string
    }
  | null
  | undefined

export type TeamMemberLike =
  | {
      role?: string
      display_name?: string
      name?: string
    }
  | null
  | undefined

export function getRelationName(relation: RelationLike): string {
  if (!relation) {
    return 'Non renseigné'
  }

  if (relation.name) {
    return relation.name
  }

  return 'Non renseigné'
}

export function getTeamMemberName(team: TeamMemberLike[] | undefined, role: string): string {
  if (!team) {
    return 'Non renseigné'
  }

  const member = team.find((item) => {
    if (!item) {
      return false
    }

    return item.role === role
  })

  if (!member) {
    return 'Non renseigné'
  }

  if (member.display_name) {
    return member.display_name
  }

  if (member.name) {
    return member.name
  }

  return 'Non renseigné'
}

export function getTicketStatusLabel(status: RelationLike): string {
  return getRelationName(status)
}

export function getTicketLocationLabel(location: RelationLike): string {
  return getRelationName(location)
}

export function getTicketRequestTypeLabel(requestType: RelationLike): string {
  return getRelationName(requestType)
}

export function getTicketCategoryLabel(category: RelationLike): string {
  return getRelationName(category)
}

export function getTicketRequesterName(team: TeamMemberLike[] | undefined): string {
  return getTeamMemberName(team, 'requester')
}

export function getTicketAssignedName(team: TeamMemberLike[] | undefined): string {
  return getTeamMemberName(team, 'assigned')
}

// Les libellés (statut, priorité, urgence, impact, type) sont centralisés dans
// src/config/tickets.ts. On ne fait ici que les ré-exporter pour ne pas casser
// les imports existants des pages.
import { libellePriorite, libelleUrgence, libelleImpact } from '@/config/tickets'

export function getTicketPriorityLabel(priority?: number): string {
  return libellePriorite(priority)
}

export function getTicketUrgencyLabel(urgency?: number): string {
  return libelleUrgence(urgency)
}

export function getTicketImpactLabel(impact?: number): string {
  return libelleImpact(impact)
}

export function removeHtmlTags(value?: string | null): string {
  if (!value) {
    return 'Non renseigné'
  }

  return value.replace(/<[^>]*>/g, '').trim()
}
