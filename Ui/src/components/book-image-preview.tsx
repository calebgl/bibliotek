import { useParams } from 'react-router'

import { useBook } from '../hooks/use-api'

export function BookImagePreview() {
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
