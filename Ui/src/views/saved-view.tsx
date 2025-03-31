import { Link } from 'react-router'

import { ButtonAddToCart } from '../components/button-add-to-cart'
import { ButtonSaveBook } from '../components/button-save-book'
import { useSavedBooks } from '../hooks/use-api'
import { assert } from '../lib/assert'
import { formatCurrency } from '../lib/utils'

export function SavedView() {
	const { data: books, isLoading } = useSavedBooks()
	if (isLoading) {
		return 'loading...'
	}

	assert(books)

	return (
		<div className="container mx-auto">
			<div className="grid grid-cols-1 gap-12">
				{books.map((book) => (
					<div key={'favorite-' + book.id} className="flex gap-8">
						<Link to={'/books/' + book.id} className="max-w-40">
							<img
								src={book.coverUrl ?? undefined}
								alt={book.title}
							/>
						</Link>
						<div className="flex grow flex-col">
							<Link
								to={'/books/' + book.id}
								className="text-2xl font-semibold"
							>
								{book.title}
							</Link>
							<div className="flex items-center gap-1">
								<span>★★★★☆</span>
								<span className="text-sm">
									{book.averageRating}
								</span>
								<span className="text-xs">
									({book.totalReviews})
								</span>
							</div>
							<div className="text-base">{book.author}</div>
							<div className="text-xl">
								{formatCurrency(book.price)}
							</div>
							<div className="mt-auto flex gap-4">
								<ButtonAddToCart bookId={book.id} />
								<ButtonSaveBook bookId={book.id} />
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
