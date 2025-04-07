import { FormEvent, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router'

import { Button } from '../components/button'
import { useAuth } from '../hooks/use-auth'
import { assert } from '../lib/assert'
import { cn } from '../lib/utils'

export function LoginView() {
	const navigate = useNavigate()
	const [disabled, setDisabled] = useState<boolean>(false)
	const { user, login, signInGitHub } = useAuth()

	const location = useLocation()
	const from = location.state?.from?.pathname || '/'

	if (user) {
		return <Navigate to={from} replace />
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
			navigate(from, { replace: true })
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
		<div className="container mx-auto">
			<div className="max-w-96 space-y-4">
				<form
					onSubmit={handleSubmit}
					className="grid grid-cols-1 gap-2"
				>
					<input
						type="email"
						name="email"
						placeholder="Email"
						className="px-2 py-1"
					/>
					<input
						type="password"
						name="password"
						placeholder="Password"
						className="px-2 py-1"
					/>
					<Button
						type="submit"
						disabled={disabled}
						className={cn('mt-4', { 'bg-red-500': disabled })}
					>
						login
					</Button>
				</form>

				<div className="grid grid-cols-[1fr_auto_1fr] items-center justify-between">
					<div className="h-0 overflow-hidden border-t border-gray-400" />
					<span className="w-8 text-center">or</span>
					<div className="h-0 overflow-hidden border-t border-gray-400" />
				</div>

				<div className="grid grid-cols-1">
					<Button
						type="button"
						disabled={disabled}
						onClick={handleSignInGitHub}
					>
						sign in with github
					</Button>
				</div>
			</div>
		</div>
	)
}
