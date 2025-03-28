import { useSetAtom } from 'jotai'
import { memo } from 'react'
import { useNavigate } from 'react-router'

import { formatCurrency } from '../lib/utils'
import { openAtom } from '../stores/cart'
import type { CartBook } from '../types'

export const CartDrawerItem = memo(
	(
		props: CartBook & {
			onIncrement(bookId: string): void
			onDecrement(bookId: string): void
			onDelete(bookId: string): void
		},
	) => {
		const navigate = useNavigate()
		const setOpen = useSetAtom(openAtom)

		function navigateToBook() {
			navigate('/books/' + props.id)
			setOpen(false)
		}

		return (
			<div className="flex gap-4">
				<button
					className="basis-1/3 cursor-pointer"
					onClick={navigateToBook}
				>
					<img src={props.coverUrl ?? undefined} alt={props.title} />
				</button>
				<div className="flex grow flex-col">
					<h3 className="text-xl font-semibold">
						<button
							className="cursor-pointer"
							onClick={navigateToBook}
						>
							{props.title}
						</button>
					</h3>
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
