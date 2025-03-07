import { useParams } from 'react-router'

import { useBook } from '../hooks/use-api'

export function BookDetails() {
	const { bookId } = useParams()
	if (!bookId) {
		throw new Error()
	}

	const { data: book, isLoading, error } = useBook(bookId)
	if (error) {
		throw error
	}
	if (isLoading) {
		return 'loading...'
	}
	if (!book) {
		throw new Error()
	}

	return <div className="max-w-prose">{book.description}</div>
}
