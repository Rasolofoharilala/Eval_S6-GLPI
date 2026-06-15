const AUTH_TOKEN_KEY = 'backoffice_token'

// Code d'accès unique au back office (J1 : « code unique comme mot de passe »).
// Pré-rempli dans le formulaire de connexion. Modifier ici = modifier partout.
export const CODE_ACCES = 'pass'

export function login(password: string): boolean {
  if (password !== CODE_ACCES) {
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
