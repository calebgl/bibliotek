import { useParams } from 'react-router'

import { useBook } from '../hooks/use-api'
import { assert } from '../lib/assert'

export function BookImagePreview() {
	const { bookId } = useParams()
	assert(bookId)

	const { data: book, isLoading, error } = useBook(bookId)
	if (error) {
		throw error
	}
	if (isLoading) {
		return 'loading...'
	}

	assert(book)

	return (
		<div className="bg-gray-100 p-16">
			<img
				src={book.coverUrl}
				alt="book-cover"
				className="mx-auto max-w-64"
			/>
		</div>
	)
}
