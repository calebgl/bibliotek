import { memo } from 'react'
import { formatCurrency } from '../lib/utils'
import type { CartBook } from '../types'

export const CartItem = memo(
	(
		props: CartBook & {
			onIncrement(bookId: string): void
			onDecrement(bookId: string): void
		},
	) => {
		return (
			<div className="flex gap-4">
				<div className="basis-1/3">
					<img src={props.coverUrl} alt={props.title} />
				</div>
				<div>
					<h3 className="text-xl font-semibold">{props.title}</h3>
					<p>{formatCurrency(props.price)}</p>
					<div className="mt-auto">
						<button onClick={() => props.onDecrement(props.id)}>
							-
						</button>
						<span>{props.quantity}</span>
						<button onClick={() => props.onIncrement(props.id)}>
							+
						</button>
					</div>
				</div>
			</div>
		)
	},
)
