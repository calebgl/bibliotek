import { memo } from 'react'

import { formatCurrency } from '../lib/utils'
import type { CartBook } from '../types'

export const CartItem = memo(
	(
		props: CartBook & {
			onIncrement(bookId: string): void
			onDecrement(bookId: string): void
			onDelete(bookId: string): void
		},
	) => {
		return (
			<div className="flex gap-4">
				<div className="basis-1/3">
					<img src={props.coverUrl} alt={props.title} />
				</div>
				<div className="flex grow flex-col">
					<h3 className="text-xl font-semibold">{props.title}</h3>
					<p>{formatCurrency(props.price)}</p>
					<div className="mt-auto flex justify-between">
						<div className="flex gap-2">
							<button
								onClick={() => props.onDecrement(props.id)}
								className="min-w-7 cursor-pointer bg-gray-300 px-2 py-1 leading-none"
							>
								{props.quantity > 1 ? '-' : 'd'}
							</button>
							<span>{props.quantity}</span>
							<button
								onClick={() => props.onIncrement(props.id)}
								className="min-w-7 cursor-pointer bg-gray-300 px-2 py-1 leading-none"
							>
								+
							</button>
						</div>
						<div>
							<button
								onClick={() => props.onDelete(props.id)}
								className="min-w-7 cursor-pointer px-2 py-1 leading-none underline"
							>
								delete
							</button>
						</div>
					</div>
				</div>
			</div>
		)
	},
)
