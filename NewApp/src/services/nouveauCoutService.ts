import axios from 'axios'
import type { ItemTicketLink } from '@/api/glpiV1Client'

export type CoutCree = {
  id: number
  ticketId: number
  itemId: number
  itemType: string
  cout: number
}

export type CoutParItem = {
  itemId: number
  itemType: string
  cout: number
}

const backendUrl = import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:8080'
// const URL = `${backendUrl}/api/couts`
// const URL_suppress = `${backendUrl}/api/couts/idTickets/{id}`

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

export async function getCoutsParItem(): Promise<CoutParItem[]> {
  const response = await axios.get<CoutParItem[]>(`${URL}/items`)
  return response.data
}

export async function getTousLesCouts(): Promise<CoutCree[]> {
  const response = await axios.get<CoutCree[]>(URL)
  return response.data
}

/** Vide la table SQLite des nouveaux coûts (appelé à la réinitialisation). */
export async function supprimerTousLesCouts(): Promise<void> {
  await axios.delete(URL)
}

export async function supprimerCoutByIdTickets(id: number): Promise<void> {
  console.log(`http://localhost:8080/api/couts/${id}`);
  await axios.delete(`http://localhost:8080/api/couts/${id}`)
}
