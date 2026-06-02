import { glpiConfig } from './glpiConfig'

type TokenResponse = {
  token_type: string
  expires_in: number
  access_token: string
  refresh_token?: string
}

let accessToken: string | null = null
let refreshToken: string | null = null
let expiresAt = 0

export async function generateToken(): Promise<string> {
  const body = new URLSearchParams()

  body.append('grant_type', 'password')
  body.append('client_id', glpiConfig.clientId)
  body.append('client_secret', glpiConfig.clientSecret)
  body.append('username', glpiConfig.username)
  body.append('password', glpiConfig.password)
  body.append('scope', glpiConfig.scope)

  const response = await fetch(glpiConfig.tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  })

  if (!response.ok) {
    throw new Error('Impossible de générer le token GLPI')
  }

  const data: TokenResponse = await response.json()

  accessToken = data.access_token
  refreshToken = data.refresh_token ?? null
  expiresAt = Date.now() + data.expires_in * 1000

  return accessToken
}

export async function getValidToken(): Promise<string> {
  const isExpired = Date.now() >= expiresAt - 30_000

  if (!accessToken || isExpired) {
    return await generateToken()
  }

  return accessToken
}

export function clearToken() {
  accessToken = null
  refreshToken = null
  expiresAt = 0
}