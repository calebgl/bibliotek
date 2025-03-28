import { useAtom } from 'jotai'

import { validateSession, login, logout } from '../lib/api'
import { assert } from '../lib/assert'
import { userAtom } from '../stores/auth'
import type { Credentials } from '../types'

export function useAuth() {
	const [user, setUser] = useAtom(userAtom)

	async function handleLogin(credentials: Credentials) {
		await login(credentials)
		const user = await validateSession()
		assert(user)
		setUser(user)
	}

	async function handleLogout() {
		await logout()
		const user = await validateSession()
		assert(!user)
		setUser(null)
	}

	return {
		user,
		login: handleLogin,
		logout: handleLogout,
		signInGitHub: () => login('github'),
	}
}
