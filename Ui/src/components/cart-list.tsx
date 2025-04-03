import { CartItem } from '../components/cart-item'
import { useCartBooks } from '../hooks/use-api'
import { assert } from '../lib/assert'
import { cn } from '../lib/utils'

export function CartList() {
	const { data, isLoading, isFetching, isStale } = useCartBooks()
	if (isLoading) {
		return 'loading...'
	}

	assert(data)

	const { books } = data

	return (
		<div
			className={cn('space-y-12', {
				'opacity-50': isFetching && isStale,
			})}
		>
			{books.length === 0 && 'There are not books in your cart!'}
			{books.map((book) => (
				<CartItem key={'saved-' + book.id} {...book} />
			))}
		</div>
	)
}
