import { useEffect } from 'react'

import { useLogin, useLogout, useSession, useSignInGitHub } from './use-api'

export function useAuth() {
	const login = useLogin()
	const logout = useLogout()

	const signInGitHub = useSignInGitHub()

	const session = useSession()

	// TODO: add toasts

	useEffect(() => {
		if (session.isSuccess) {
		}
	}, [session.isSuccess])

	useEffect(() => {
		if (session.isError) {
		}
	}, [session.isError])

	useEffect(() => {
		if (session.isSuccess) {
		}
	}, [logout.isSuccess])

	return {
		user: session.data,
		login: login.mutateAsync,
		logout: logout.mutateAsync,
		signInGitHub: signInGitHub.mutateAsync,
	}
}
