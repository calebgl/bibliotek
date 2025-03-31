import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../lib/utils'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function Button(props: ButtonProps) {
	const { className, children, ...rest } = props
	return (
		<button
			{...rest}
			className={cn(
				'cursor-pointer bg-gray-300 px-4 py-2 active:bg-amber-500 disabled:animate-pulse disabled:cursor-not-allowed disabled:bg-gray-100',
				className,
			)}
		>
			{children}
		</button>
	)
}
