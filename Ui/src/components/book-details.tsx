import { useParams } from 'react-router'

import { useBook } from '../hooks/use-api'
import { assert } from '../lib/assert'

export function BookDetails() {
	return (
		<div className="max-w-prose whitespace-pre-wrap">
			<BookDescription />
		</div>
	)
}

function BookDescription() {
	const { bookId } = useParams()
	assert(bookId)

	const { data: book, isLoading, error } = useBook(bookId)
	if (error) {
		throw error
	}
	if (isLoading) {
		return <div className="h-16 w-full animate-pulse bg-gray-100" />
	}

	assert(book)

	return book.description
}
