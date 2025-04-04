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
			className={cn('disabled:animate-pulse', className)}
		>
			Add to cart
		</Button>
	)
}

export function ButtonAddToCartSkeleton(props: ButtonAddToCartProps) {
	return <Button className={cn('h-10 w-32 animate-pulse', props.className)} />
}
