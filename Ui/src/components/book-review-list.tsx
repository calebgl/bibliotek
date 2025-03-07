import { useParams } from 'react-router'
import useSWR from 'swr'

import { fetchReviews } from '../lib/api'
import { BookReview } from './book-review'

export function BookReviewList() {
	const params = useParams()
	const bookId = params.bookId
	if (!bookId) {
		throw new Error('bookId is required on books')
	}

	const {
		data: reviews,
		isLoading,
		error,
	} = useSWR('/api/reviews/' + bookId, () => fetchReviews(bookId))

	if (error) {
		throw error
	}

	if (isLoading) {
		return <div>loading reviews...</div>
	}

	if (!reviews) {
		throw new Error()
	}

	if (reviews.length === 0) {
		return <div>no reviews found</div>
	}

	return (
		<>
			{reviews.map((review) => (
				<BookReview
					key={review.id}
					username={review.username}
					comment={review.comment}
					createdAt={review.createdAt}
				/>
			))}
		</>
	)
}
