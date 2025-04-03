import type { ButtonHTMLAttributes } from 'react'

import { useAddCartBook } from '../hooks/use-api'
import { assert } from '../lib/assert'
import { cn } from '../lib/utils'
import { CartBook } from '../types'
import { Button } from './button'

type ButtonAddToCartProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	book?: CartBook
}

export function ButtonAddToCart(props: ButtonAddToCartProps) {
	const { book, className, ...rest } = props

	const { mutate } = useAddCartBook()

	function addToCart() {
		assert(book)
		mutate(book)
	}

	return (
		<Button
			{...rest}
			onClick={addToCart}
			className={cn(
				'cursor-pointer bg-gray-300 px-4 py-2 active:bg-amber-500 disabled:animate-pulse disabled:cursor-not-allowed disabled:bg-gray-100',
				className,
			)}
		>
			Add to cart
		</Button>
	)
}
