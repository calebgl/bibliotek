import { useSetAtom } from 'jotai'
import type { ButtonHTMLAttributes, MouseEvent } from 'react'

import { assert } from '../lib/assert'
import { cn } from '../lib/utils'
import { booksAtom } from '../stores/cart'
import { Book } from '../types'
import { Button } from './button'

type ButtonAddToCartProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	book?: Pick<Book, 'id' | 'title' | 'price'> &
		Partial<Pick<Book, 'coverUrl' | 'subtitle' | 'author'>>
}

export function ButtonAddToCart(props: ButtonAddToCartProps) {
	const { book, className, ...rest } = props

	const setBooksAtom = useSetAtom(booksAtom)

	function addToCart(_: MouseEvent<HTMLButtonElement>) {
		const bookId = book?.id
		assert(bookId)
		assert(book)

		setBooksAtom((prev) => {
			const cloned = { ...prev }
			if (!cloned[bookId]) {
				cloned[bookId] = {
					id: book.id,
					title: book.title,
					author: book.author ?? '',
					price: book.price,
					coverUrl: book.coverUrl ?? null,
					quantity: 0,
					subtitle: book.subtitle ?? '',
				}
			}

			cloned[bookId].quantity++

			return cloned
		})
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
