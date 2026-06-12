import axios from 'axios'
import type { ItemTicketLink } from '@/api/glpiV1Client'

export type CoutCree = {
  id: number
  ticketId: number
  itemId: number
  itemType: string
  cout: number
}

const backendUrl = import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:8080'
const URL = `${backendUrl}/api/couts`

export async function enregistrerNouveauCout(
  ticketId: number,
  nouveauCout: number,
  items: ItemTicketLink[],
): Promise<CoutCree[]> {
  const response = await axios.post<CoutCree[]>(URL, {
    ticketId,
    nouveauCout,
    items: items.map((item) => ({
      itemId: item.items_id,
      itemType: item.itemtype,
    })),
  })

  return response.data
}
