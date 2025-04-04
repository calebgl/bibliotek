import { memo, useState } from 'react'
import { Link } from 'react-router'

import { useRemoveCartBook, useUpdateCartBook } from '../hooks/use-api'
import { formatCurrency } from '../lib/utils'
import type { CartBook } from '../types'
import { Button } from './button'

type CartItemProps = CartBook

export const CartItem = memo((props: CartItemProps) => {
	const [quantity, setQuantity] = useState(props.quantity)

	const update = useUpdateCartBook()
	const remove = useRemoveCartBook()

	function handleIncrement() {
		const newQuantity = quantity + 1
		setQuantity(newQuantity)
		update.mutate({ bookId: props.id, quantity: newQuantity })
	}

	function handleDecrement() {
		const newQuantity = Math.max(1, quantity - 1)
		setQuantity(newQuantity)
		update.mutate({ bookId: props.id, quantity: newQuantity })
	}

	function handleRemove() {
		remove.mutate({ bookId: props.id })
	}

	const to = '/books/' + props.id
	const coverUrl = props.coverUrl ?? undefined

	return (
		<div className="flex gap-8">
			<Link
				to={to}
				className="grid aspect-2/3 w-full max-w-40 place-content-center"
			>
				<img src={coverUrl} alt={props.title} className="aspect-2/3" />
			</Link>
			<div className="flex grow flex-col">
				<Link to={to} className="text-2xl font-semibold">
					{props.title}
				</Link>
				<div className="text-base">{props.author}</div>
				<div className="text-xl">{formatCurrency(props.price)}</div>
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
