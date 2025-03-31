import { CartList } from '../components/cart-list'

export function CartView() {
	return (
		<div className="container mx-auto space-y-4">
			<h2 className="text-3xl font-bold">Cart</h2>
			<CartList />
		</div>
	)
}
