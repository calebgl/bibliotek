import { Link } from 'react-router'

import { Button } from '../components/button'
import { ButtonAddToCart } from '../components/button-add-to-cart'
import { ButtonSaveBook } from '../components/button-save-book'
import { useSavedBooks } from '../hooks/use-api'
import { assert } from '../lib/assert'
import { formatCurrency } from '../lib/utils'

export function SavedView() {
	return (
		<div className="container mx-auto space-y-4">
			<h1 className="text-3xl font-bold">Saved</h1>
			<div className="grid grid-cols-1 gap-12">
				<List />
			</div>
		</div>
	)
}

function List() {
	const { data: books, isLoading } = useSavedBooks()

	if (isLoading) {
		return Array.from({ length: 3 }, (_, index) => {
			return (
				<div key={'skeleton-book-' + index} className="flex gap-8">
					<div className="aspect-2/3 w-40 animate-pulse bg-gray-200" />
					<div className="flex grow flex-col gap-1">
						<div className="h-7 w-64 animate-pulse bg-gray-200" />
						<div className="h-4 w-32 animate-pulse bg-gray-100" />
						<div className="h-5 w-48 animate-pulse bg-gray-100" />
						<div className="h-6 w-24 animate-pulse bg-gray-200" />
						<div className="mt-auto flex gap-4">
							<Button
								className="h-12 min-w-32 animate-pulse bg-gray-200"
								disabled
							/>
							<Button
								className="h-12 min-w-16 animate-pulse bg-gray-200"
								disabled
							/>
						</div>
					</div>
				</div>
			)
		})
	}

	assert(books)

	return books.map((book) => {
		const to = '/books/' + book.id
		const coverUrl = book.coverUrl ?? undefined
		return (
			<div key={'saved-' + book.id} className="flex gap-8">
				<Link to={to} className="aspect-2/3 w-40 max-w-40">
					<img src={coverUrl} alt={book.title} />
				</Link>
				<div className="flex grow flex-col">
					<Link to={to} className="text-2xl font-semibold">
						{book.title}
					</Link>
					<div className="flex items-center gap-1">
						<span>★★★★☆</span>
						<span className="text-sm">{book.averageRating}</span>
						<span className="text-xs">({book.totalReviews})</span>
					</div>
					<div className="text-base">{book.author}</div>
					<div className="text-xl">{formatCurrency(book.price)}</div>
					<div className="mt-auto flex gap-4">
						<ButtonAddToCart book={book} />
						<ButtonSaveBook bookId={book.id} />
					</div>
				</div>
			</div>
		)
	})
}
