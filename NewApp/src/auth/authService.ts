const AUTH_TOKEN_KEY = 'backoffice_token'

export function login(password: string): boolean {
  const defaultPassword = 'pass'

  if (password !== defaultPassword) {
    return false
  }

  localStorage.setItem(AUTH_TOKEN_KEY, 'connected')

  return true
}

export function logout() {
  localStorage.removeItem(AUTH_TOKEN_KEY)
}

export function isAuthenticated(): boolean {
  return localStorage.getItem(AUTH_TOKEN_KEY) !== null
}