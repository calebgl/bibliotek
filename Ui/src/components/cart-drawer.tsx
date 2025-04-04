import { useSetAtom } from 'jotai'
import { MouseEvent, RefObject } from 'react'
import { useNavigate } from 'react-router'

import { useCartBooks } from '../hooks/use-api'
import { assert } from '../lib/assert'
import { openAtom } from '../stores/cart'
import { CartDrawerItem, CartDrawerItemSkeleton } from './cart-drawer-item'

export function CartDrawer(props: {
	ref: RefObject<HTMLDivElement | null>
	onClose(event: MouseEvent<HTMLElement>): void
}) {
	const navigate = useNavigate()

	const setOpen = useSetAtom(openAtom)

	function handleBuy() {
		navigate('/cart')
		setOpen(false)
	}

	return (
		<div
			ref={props.ref}
			className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs"
			onClick={props.onClose}
		>
			<div className="fixed top-0 right-0 h-full w-1/3 bg-white">
				<div className="relative flex h-full flex-col gap-4 p-8">
					<Title />
					<div className="shrink grow overflow-y-auto">
						<div className="space-y-8">
							<List />
						</div>
					</div>
					<button
						onClick={handleBuy}
						className="cursor-pointer bg-gray-300 px-4 py-2 active:bg-amber-500"
					>
						Buy
					</button>
				</div>
			</div>
		</div>
	)
}

function Title() {
	const { data } = useCartBooks()
	return (
		<h2 className="text-3xl font-bold">
			Cart{data?.total ? <span>({data.total})</span> : null}
		</h2>
	)
}

function List() {
	const { data, isLoading } = useCartBooks()
	if (isLoading) {
		return Array.from({ length: 4 }, (_, index) => (
			<CartDrawerItemSkeleton
				key={'cart-drawer-book-skeleton-' + index}
			/>
		))
	}

	assert(data)

	const { books, total } = data
	return (
		<>
			{total === 0 && 'There are no books in your cart!'}
			{books.map((book) => (
				<CartDrawerItem key={book.id} {...book} />
			))}
		</>
	)
}
