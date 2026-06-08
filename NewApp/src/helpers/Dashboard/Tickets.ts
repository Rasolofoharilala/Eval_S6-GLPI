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

export function getTicketPriorityLabel(priority?: number): string {
  if (!priority) {
    return 'Non renseigné'
  }

  if (priority === 1) {
    return 'Très basse'
  }

  if (priority === 2) {
    return 'Basse'
  }

  if (priority === 3) {
    return 'Moyenne'
  }

  if (priority === 4) {
    return 'Haute'
  }

  if (priority === 5) {
    return 'Très haute'
  }

  return `Priorité ${priority}`
}

export function getTicketUrgencyLabel(urgency?: number): string {
  if (!urgency) {
    return 'Non renseigné'
  }

  if (urgency === 1) {
    return 'Très basse'
  }

  if (urgency === 2) {
    return 'Basse'
  }

  if (urgency === 3) {
    return 'Moyenne'
  }

  if (urgency === 4) {
    return 'Haute'
  }

  if (urgency === 5) {
    return 'Très haute'
  }

  return `Urgence ${urgency}`
}

export function getTicketImpactLabel(impact?: number): string {
  if (!impact) {
    return 'Non renseigné'
  }

  if (impact === 1) {
    return 'Très bas'
  }

  if (impact === 2) {
    return 'Bas'
  }

  if (impact === 3) {
    return 'Moyen'
  }

  if (impact === 4) {
    return 'Haut'
  }

  if (impact === 5) {
    return 'Très haut'
  }

  return `Impact ${impact}`
}

export function removeHtmlTags(value?: string | null): string {
  if (!value) {
    return 'Non renseigné'
  }

  return value.replace(/<[^>]*>/g, '').trim()
}
