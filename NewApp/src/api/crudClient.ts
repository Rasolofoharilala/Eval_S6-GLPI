import { httpClient } from './httpClient'

export async function getAll<T>(endpoint: string): Promise<T[]> {
  const response = await httpClient.get<T[]>(endpoint)
  return response.data
}

export async function getById<T>(endpoint: string, id: number): Promise<T> {
  const response = await httpClient.get<T>(`${endpoint}/${id}`)
  return response.data
}

export async function create<T, Payload>(endpoint: string, payload: Payload): Promise<T> {
  const response = await httpClient.post<T>(endpoint, payload)
  return response.data
}

export async function update<T, Payload>(
  endpoint: string,
  id: number,
  payload: Payload,
): Promise<T> {
  const response = await httpClient.patch<T>(`${endpoint}/${id}`, payload)
  return response.data
}

export async function remove<T>(endpoint: string, id: number): Promise<T> {
  const response = await httpClient.delete<T>(`${endpoint}/${id}`)
  return response.data
}
