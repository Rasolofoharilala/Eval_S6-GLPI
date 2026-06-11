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

// Tables de correspondance numéro GLPI → libellé français.
// GLPI utilise 1 à 5 partout, plus 6 (« Majeure ») pour la priorité.

const PRIORITY_LABELS: Record<number, string> = {
  1: 'Très basse',
  2: 'Basse',
  3: 'Moyenne',
  4: 'Haute',
  5: 'Très haute',
  6: 'Majeure',
}

const URGENCY_LABELS: Record<number, string> = {
  1: 'Très basse',
  2: 'Basse',
  3: 'Moyenne',
  4: 'Haute',
  5: 'Très haute',
}

const IMPACT_LABELS: Record<number, string> = {
  1: 'Très bas',
  2: 'Bas',
  3: 'Moyen',
  4: 'Haut',
  5: 'Très haut',
}

export function getTicketPriorityLabel(priority?: number): string {
  if (!priority) {
    return 'Non renseigné'
  }
  return PRIORITY_LABELS[priority] ?? `Priorité ${priority}`
}

export function getTicketUrgencyLabel(urgency?: number): string {
  if (!urgency) {
    return 'Non renseigné'
  }
  return URGENCY_LABELS[urgency] ?? `Urgence ${urgency}`
}

export function getTicketImpactLabel(impact?: number): string {
  if (!impact) {
    return 'Non renseigné'
  }
  return IMPACT_LABELS[impact] ?? `Impact ${impact}`
}

export function removeHtmlTags(value?: string | null): string {
  if (!value) {
    return 'Non renseigné'
  }

  return value.replace(/<[^>]*>/g, '').trim()
}
