import { memo, useState } from 'react'
import { Link } from 'react-router'

import { useRemoveCartBook, useUpdateCartBook } from '../hooks/use-api'
import { formatCurrency } from '../lib/utils'
import type { CartBook } from '../types'
import { Button } from './button'

type CartItemProps = CartBook

export const CartItem = memo((props: CartItemProps) => {
	const book = props
	const to = '/books/' + book.id

	const [quantity, setQuantity] = useState(book.quantity)

	const update = useUpdateCartBook()
	const remove = useRemoveCartBook()

	const handleIncrement = () => {
		setQuantity(quantity + 1)
		update.mutate({ bookId: book.id, quantity: quantity + 1 })
	}

	const handleDecrement = () => {
		setQuantity(Math.max(1, quantity - 1))
		update.mutate({ bookId: book.id, quantity: quantity - 1 })
	}

	const handleRemove = () => {
		remove.mutate({ bookId: book.id })
	}

	return (
		<div className="flex gap-8">
			{update.isError && 'ERROR'}
			<Link to={to} className="max-w-40">
				<img src={book.coverUrl ?? undefined} alt={book.title} />
			</Link>
			<div className="flex grow flex-col">
				<Link to={to} className="text-2xl font-semibold">
					{book.title}
				</Link>
				<div className="text-base">{book.author}</div>
				<div className="text-xl">{formatCurrency(book.price)}</div>
				<div className="mt-auto flex gap-4">
					<div className="flex gap-2">
						{quantity === 1 && (
							<Button
								onClick={handleRemove}
								className="bg-gray-300 px-2 py-1"
							>
								d
							</Button>
						)}
						{quantity > 1 && (
							<Button
								onClick={handleDecrement}
								className="bg-gray-300 px-2 py-1"
							>
								-
							</Button>
						)}
						<span>{quantity}</span>
						<Button
							onClick={handleIncrement}
							className="bg-gray-300 px-2 py-1"
						>
							+
						</Button>
					</div>
					<div>
						<Button
							onClick={handleRemove}
							className="bg-transparent px-2 py-1 underline"
						>
							delete
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
})

export function CartItemSkeleton() {
	return (
		<div className="flex gap-8">
			<div className="aspect-2/3 w-40 animate-pulse bg-gray-200" />
			<div className="flex grow flex-col gap-1">
				<div className="h-7 w-64 animate-pulse bg-gray-200" />
				<div className="h-5 w-48 animate-pulse bg-gray-100" />
				<div className="h-6 w-24 animate-pulse bg-gray-200" />
				<div className="mt-auto flex items-center gap-4">
					<div className="flex gap-2">
						<Button className="aspect-square size-6 animate-pulse bg-gray-200 p-0" />
						<div className="aspect-square size-6 animate-pulse bg-gray-100" />
						<Button className="aspect-square size-6 animate-pulse bg-gray-200 p-0" />
					</div>
					<div>
						<Button className="h-6 w-16 animate-pulse bg-gray-200 p-0" />
					</div>
				</div>
			</div>
		</div>
	)
}
