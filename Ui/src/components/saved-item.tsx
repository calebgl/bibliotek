import { memo } from 'react'
import { Link } from 'react-router'

import { formatCurrency } from '../lib/utils'
import type { SavedBook } from '../types'
import { ButtonAddToCart, ButtonAddToCartSkeleton } from './button-add-to-cart'
import { ButtonSaveBook, ButtonSaveBookSkeleton } from './button-save-book'

type SavedItemProps = SavedBook & { isSaved?: boolean }

export const SavedItem = memo((props: SavedItemProps) => {
	const to = '/books/' + props.id
	const coverUrl = props.coverUrl ?? undefined

	return (
		<div className="flex gap-8">
			<Link to={to} className="aspect-2/3 w-40 max-w-40">
				<img src={coverUrl} alt={props.title} className="aspect-2/3" />
			</Link>
			<div className="flex grow flex-col">
				<Link to={to} className="text-2xl font-semibold">
					{props.title}
				</Link>
				<div className="flex items-center gap-1">
					<span>★★★★☆</span>
					<span className="text-sm">{props.averageRating}</span>
					<span className="text-xs">({props.totalReviews})</span>
				</div>
				<div className="text-base">{props.author}</div>
				<div className="text-xl">{formatCurrency(props.price)}</div>
				<div className="mt-auto flex gap-4">
					<ButtonAddToCart book={{ ...props, quantity: 1 }} />
					<ButtonSaveBook
						book={{ ...props }}
						isSaved={props.isSaved}
					/>
				</div>
			</div>
		</div>
	)
})

export function SavedItemSkeleton() {
	return (
		<div className="flex gap-8">
			<div className="aspect-2/3 w-40 animate-pulse bg-gray-200" />
			<div className="flex grow flex-col gap-1">
				<div className="h-7 w-64 animate-pulse bg-gray-200" />
				<div className="h-4 w-32 animate-pulse bg-gray-100" />
				<div className="h-5 w-48 animate-pulse bg-gray-100" />
				<div className="h-6 w-24 animate-pulse bg-gray-200" />
				<div className="mt-auto flex items-center gap-4">
					<ButtonAddToCartSkeleton />
					<ButtonSaveBookSkeleton />
				</div>
			</div>
		</div>
	)
}
