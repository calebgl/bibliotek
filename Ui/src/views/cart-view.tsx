import { CartItem, CartItemSkeleton } from '../components/cart-item'
import { useCartBooks } from '../hooks/use-api'
import { assert } from '../lib/assert'
import { cn } from '../lib/utils'

export function CartView() {
	const { isFetching, isStale } = useCartBooks()
	return (
		<div className="container mx-auto space-y-4">
			<h2 className="text-3xl font-bold">Cart</h2>
			<div
				className={cn('space-y-12', {
					'opacity-50': isFetching && isStale,
				})}
			>
				<List />
			</div>
		</div>
	)
}

function List() {
	const { data, isLoading } = useCartBooks()
	if (isLoading) {
		return Array.from({ length: 4 }, (_, index) => (
			<CartItemSkeleton key={'cart-book-skeleton-' + index} />
		))
	}

	assert(data)

	const { books } = data

	return (
		<>
			{books.length === 0 && 'There are not books in your cart!'}
			{books.map((book) => (
				<CartItem key={'saved-' + book.id} {...book} />
			))}
		</>
	)
}
