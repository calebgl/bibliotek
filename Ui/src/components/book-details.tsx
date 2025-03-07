import { useParams } from 'react-router'

import { useBook } from '../hooks/use-api'
import { assert } from '../lib/assert'

export function BookDetails() {
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

	return <div className="max-w-prose">{book.description}</div>
}
