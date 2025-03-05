import { formatCurrency } from '../lib/utils'

type BookPurchaseInfo = {
	title: string
	averageRating: number
	totalReviews: number
	price: number
}

export function BookPurchaseInfo(props: BookPurchaseInfo) {
	return (
		<>
			<div className="text-4xl font-semibold">
				<h1>{props.title}</h1>
			</div>
			<div className="flex items-center gap-1">
				<span>★★★★☆</span>
				<span className="text-sm">{props.averageRating}</span>
				<span className="text-xs">({props.totalReviews})</span>
			</div>
			<div className="text-xl">
				<span>{formatCurrency(props.price)}</span>
			</div>
			<div className="mt-auto flex gap-2">
				<button className="grow cursor-pointer bg-gray-300 px-4 py-2 active:bg-amber-500">
					Add to cart
				</button>
				<button className="cursor-pointer bg-gray-300 px-4 py-2 active:bg-amber-500">
					<span className="size-4">❤</span>
				</button>
			</div>
			<div className="">
				<p className="text-sm">Free delivery on orders over $30.00</p>
			</div>
		</>
	)
}
