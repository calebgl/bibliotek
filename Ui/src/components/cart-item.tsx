import { memo, useState } from 'react'
import { Link } from 'react-router'

import { useRemoveCartBook, useUpdateCartBook } from '../hooks/use-api'
import { formatCurrency } from '../lib/utils'
import type { CartBook } from '../types'

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
							<button
								onClick={handleRemove}
								className="min-w-7 cursor-pointer bg-gray-300 px-2 py-1 leading-none"
								disabled={remove.isIdle}
							>
								d
							</button>
						)}
						{quantity > 1 && (
							<button
								onClick={handleDecrement}
								className="min-w-7 cursor-pointer bg-gray-300 px-2 py-1 leading-none"
							>
								-
							</button>
						)}
						<span>{quantity}</span>
						<button
							onClick={handleIncrement}
							className="min-w-7 cursor-pointer bg-gray-300 px-2 py-1 leading-none"
						>
							+
						</button>
					</div>
					<div>
						<button
							onClick={handleRemove}
							className="min-w-7 cursor-pointer px-2 py-1 leading-none underline"
						>
							delete
						</button>
					</div>
				</div>
			</div>
		</div>
	)
})
