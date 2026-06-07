import { httpClient } from '@/api/httpClient'

export type ExistingAsset = {
  id: number
  name: string
  otherserial?: string
}

function normalize(value: string): string {
  return value.trim().toLowerCase()
}

function normalizeAssets(data: unknown): ExistingAsset[] {
  if (!Array.isArray(data)) {
    return []
  }

  return data
    .filter((item) => item && typeof item === 'object')
    .map((item: any) => ({
      id: Number(item.id),
      name: String(item.name ?? ''),
      otherserial: item.otherserial ? String(item.otherserial) : undefined,
    }))
    .filter((item) => item.id && item.name)
}

export async function findAssetByName(
  endpoint: string,
  name: string,
): Promise<ExistingAsset | null> {
  const response = await httpClient.get(endpoint)

  const assets = normalizeAssets(response.data)

  const found = assets.find((asset) => normalize(asset.name) === normalize(name))

  return found ?? null
}

export async function findAssetByInventoryNumber(
  endpoint: string,
  inventoryNumber: string,
): Promise<ExistingAsset | null> {
  if (!inventoryNumber || inventoryNumber.trim() === '') {
    return null
  }

  const response = await httpClient.get(endpoint)

  const assets = normalizeAssets(response.data)

  const found = assets.find(
    (asset) => asset.otherserial && normalize(asset.otherserial) === normalize(inventoryNumber),
  )

  return found ?? null
}

export async function assetAlreadyExists(
  endpoint: string,
  name: string,
  inventoryNumber: string,
): Promise<ExistingAsset | null> {
  const foundByInventoryNumber = await findAssetByInventoryNumber(endpoint, inventoryNumber)

  if (foundByInventoryNumber) {
    return foundByInventoryNumber
  }

  const foundByName = await findAssetByName(endpoint, name)

  return foundByName
}
