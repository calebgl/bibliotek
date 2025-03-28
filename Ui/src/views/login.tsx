import { FormEvent, useState } from 'react'
import { useNavigate, Navigate } from 'react-router'

import { useAuth } from '../hooks/use-auth'
import { assert } from '../lib/assert'

export function Login() {
	const navigate = useNavigate()
	const [disabled, setDisabled] = useState<boolean>(false)
	const { user, login, signInGitHub } = useAuth()

	if (user) {
		return <Navigate to="/" />
	}

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		setDisabled(true)

		const formData = new FormData(event.currentTarget)
		const email = formData.get('email')?.toString()
		const password = formData.get('password')?.toString()

		assert(email)
		assert(password)

		try {
			await login({ email, password })
			navigate('/')
		} catch (error) {
			console.error(error)
		} finally {
			setDisabled(false)
		}
	}

	function handleSignInGitHub() {
		setDisabled(true)
		signInGitHub()
	}

	return (
		<form onSubmit={handleSubmit}>
			<input type="text" name="email" />
			<input type="text" name="password" />
			<button
				type="submit"
				disabled={disabled}
				className={disabled ? 'bg-red-500' : undefined}
			>
				login
			</button>
			<button
				type="button"
				disabled={disabled}
				onClick={handleSignInGitHub}
			>
				sign in with github
			</button>
		</form>
	)
}
