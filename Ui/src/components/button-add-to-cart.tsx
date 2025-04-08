import type { ButtonHTMLAttributes } from 'react'

import { useAddCartBook } from '../hooks/use-api'
import { assert } from '../lib/assert'
import { cn } from '../lib/utils'
import { CartBook } from '../types'
import { Button } from './button'
import { useAuth } from '../hooks/use-auth'
import { useLocation, useNavigate } from 'react-router'

type ButtonAddToCartProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	book?: CartBook
}

export function ButtonAddToCart(props: ButtonAddToCartProps) {
	const { book, className, ...rest } = props

	const { user } = useAuth()
	const navigate = useNavigate()
	const location = useLocation()

	const { mutate } = useAddCartBook()

	function addToCart() {
		if (!user) {
			navigate('/login', {
				state: {
					from: location,
				},
			})

			return
		}

		assert(book)
		mutate(book)
	}

	return (
		<Button
			{...rest}
			onClick={addToCart}
			className={cn('h-10 disabled:animate-pulse', className)}
		>
			Add to cart
		</Button>
	)
}

export function ButtonAddToCartSkeleton(props: ButtonAddToCartProps) {
	return <Button className={cn('h-10 w-32 animate-pulse', props.className)} />
}
