import { authService } from '../services/api/authService'

function parseJwtPayload(token) {
  try {
    const base64 = token.split('.')[1]
    if (!base64) return null
    const json = atob(base64.replace(/-/g, '+').replace(/_/g, '/'))
    return JSON.parse(json)
  } catch {
    return null
  }
}

export function useAuth() {
  const token = localStorage.getItem('adminToken')
  let role = localStorage.getItem('adminRole')
  let username = localStorage.getItem('adminDisplayName') || 'کاربر'

  if (token) {
    const payload = parseJwtPayload(token)
    if (payload) {
      if (payload.role) role = payload.role
      if (payload.username) username = payload.username
    }
  }

  const isAuthenticated =
    !!token && localStorage.getItem('adminLoggedIn') === 'true'

  const isGroupManager = role === 'department_manager'
  const isScientificAssociation = role === 'scientific_association'

  const logout = async () => {
    try {
      await authService.logout()
    } catch (error) {
      console.error('خطا در خروج از سرور:', error)
    } finally {
      localStorage.removeItem('adminToken')
      localStorage.removeItem('adminRole')
      localStorage.removeItem('adminDisplayName')
      localStorage.removeItem('adminLoggedIn')
    }
  }

  return {
    isAuthenticated,
    role,
    displayName: username,
    isGroupManager,
    isScientificAssociation,
    canApproveOrReject: isGroupManager,
    canManageAdmins: isGroupManager,
    logout,
  }
}
