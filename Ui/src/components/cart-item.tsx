import { memo } from 'react'
import { Link } from 'react-router'

import { formatCurrency } from '../lib/utils'
import type { CartBook } from '../types'

type CartItemProps = CartBook & {
	onIncrement(bookId: string): void
	onDecrement(bookId: string): void
	onDelete(bookId: string): void
}

export const CartItem = memo((props: CartItemProps) => {
	const book = props
	const to = '/books/' + book.id
	return (
		<div className="flex gap-8">
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
						<button
							onClick={() => props.onIncrement(book.id)}
							className="min-w-7 cursor-pointer bg-gray-300 px-2 py-1 leading-none"
						>
							{book.quantity > 1 ? '-' : 'd'}
						</button>
						<span>{book.quantity}</span>
						<button
							onClick={() => props.onDecrement(book.id)}
							className="min-w-7 cursor-pointer bg-gray-300 px-2 py-1 leading-none"
						>
							+
						</button>
					</div>
					<div>
						<button
							onClick={() => props.onDelete(book.id)}
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
