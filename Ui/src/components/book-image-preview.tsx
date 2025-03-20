import { useParams } from 'react-router'

import { useBook } from '../hooks/use-api'
import { assert } from '../lib/assert'

export function BookImagePreview() {
	return (
		<div className="bg-gray-100 p-16">
			<div className="mx-auto aspect-[2/3] max-w-64">
				<Image />
			</div>
		</div>
	)
}

function Image() {
	const { bookId } = useParams()
	assert(bookId)

	const { data: book, isLoading, error } = useBook(bookId)
	if (error) {
		throw error
	}
	if (isLoading) {
		return <div className="size-full animate-pulse bg-gray-200" />
	}

	assert(book)

	return (
		<img
			src={book.coverUrl ?? undefined}
			alt="book-cover"
			className="mx-auto object-fill"
		/>
	)
}
