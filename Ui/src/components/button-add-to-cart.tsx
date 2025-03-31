import { useSetAtom } from 'jotai'
import type { ButtonHTMLAttributes, MouseEvent } from 'react'
import { useParams } from 'react-router'

import { useBook } from '../hooks/use-api'
import { assert } from '../lib/assert'
import { cn } from '../lib/utils'
import { booksAtom } from '../stores/cart'
import { Button } from './button'

type ButtonAddToCartProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	bookId?: string
}

export function ButtonAddToCart(props: ButtonAddToCartProps) {
	const { bookId: bookIdProps, disabled, className, ...rest } = props
	const { bookId: bookIdParams } = useParams()

	const bookId = bookIdProps || bookIdParams
	assert(bookId)

	const setBooksAtom = useSetAtom(booksAtom)

	const { data: book, isLoading, isError } = useBook(bookId)

	function addToCart(_: MouseEvent<HTMLButtonElement>) {
		assert(bookId)
		assert(book)

		setBooksAtom((prev) => {
			const cloned = { ...prev }
			if (!cloned[bookId]) {
				cloned[bookId] = {
					id: book.id,
					title: book.title,
					author: book.author,
					price: book.price,
					coverUrl: book.coverUrl,
					quantity: 0,
					subtitle: book.subtitle,
				}
			}

			cloned[bookId].quantity++

			return cloned
		})
	}

	return (
		<Button
			{...rest}
			disabled={disabled || isLoading || isError}
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
