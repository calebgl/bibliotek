import { useSetAtom } from 'jotai'
import { memo, useState } from 'react'
import { useNavigate } from 'react-router'

import { useRemoveCartBook, useUpdateCartBook } from '../hooks/use-api'
import { formatCurrency } from '../lib/utils'
import { openAtom } from '../stores/cart'
import type { CartBook } from '../types'
import { Button } from './button'

type CartDrawerItemProps = CartBook

export const CartDrawerItem = memo((props: CartDrawerItemProps) => {
	const navigate = useNavigate()
	const setOpen = useSetAtom(openAtom)

	const [quantity, setQuantity] = useState(props.quantity)

	const update = useUpdateCartBook()
	const remove = useRemoveCartBook()

	function handleNavigateToBook() {
		navigate('/books/' + props.id)
		setOpen(false)
	}

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

	function handleDelete() {
		remove.mutate({ bookId: props.id })
	}

	const coverUrl = props.coverUrl ?? undefined

	return (
		<div className="flex gap-4">
			<button
				className="aspect-2/3 basis-1/3 bg-transparent outline-none active:bg-transparent"
				onClick={handleNavigateToBook}
			>
				<img src={coverUrl} alt={props.title} className="aspect-2/3" />
			</button>
			<div className="flex basis-2/3 flex-col">
				<h3 className="text-xl font-semibold">
					<Button
						className="line-clamp-3 cursor-pointer bg-transparent p-0 text-start active:bg-transparent"
						onClick={handleNavigateToBook}
					>
						{props.title}
					</Button>
				</h3>
				<p>{formatCurrency(props.price)}</p>
				<div className="mt-auto flex justify-between">
					<div className="flex gap-2">
						{quantity === 1 && (
							<Button
								onClick={handleDecrement}
								className="aspect-square px-2 py-1"
							>
								d
							</Button>
						)}
						{quantity > 1 && (
							<Button
								onClick={handleDecrement}
								className="aspect-square px-2 py-1"
							>
								-
							</Button>
						)}
						<span>{quantity}</span>
						<Button
							onClick={handleIncrement}
							className="aspect-square px-2 py-1"
						>
							+
						</Button>
					</div>
					<div>
						<Button
							onClick={handleDelete}
							className="bg-transparent px-2 py-1 underline active:bg-transparent"
						>
							delete
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
})

export function CartDrawerItemSkeleton() {
	return <div></div>
}
