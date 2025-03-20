import { useParams } from 'react-router'

import { useBook } from '../hooks/use-api'
import { assert } from '../lib/assert'

export function BookDetails() {
	return (
		<div className="max-w-prose whitespace-pre-wrap">
			<Description />
		</div>
	)
}

function Description() {
	const { bookId } = useParams()
	assert(bookId)

	const { data: book, isLoading, error } = useBook(bookId)
	if (error) {
		throw error
	}
	if (isLoading) {
		const length = 10
		return (
			<div className="flex flex-wrap gap-1">
				{Array.from({ length }, (_, index) => (
					<div
						key={'book-description-' + index}
						className="h-3 w-full animate-pulse bg-gray-200"
						style={{
							width: Math.max(0.2, Math.random()) * 100 + '%',
						}}
					/>
				))}
			</div>
		)
	}

	assert(book)

	return book.description
}
