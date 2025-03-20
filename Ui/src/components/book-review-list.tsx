import { useMutationState } from '@tanstack/react-query'
import { useParams } from 'react-router'

import { useReviews } from '../hooks/use-api'
import { assert } from '../lib/assert'
import { Review } from '../types'
import { BookReview } from './book-review'

export function BookReviewList() {
	const { bookId } = useParams()
	assert(bookId)

	// TODO: implement useSession
	const username = 'calebgl' // useSession();

	// TODO: refactor into custom hook
	const [variables] = useMutationState<
		Pick<Review, 'userId' | 'comment' | 'rate'>
	>({
		filters: { mutationKey: ['postReview'], status: 'pending' },
		select: (mutation) =>
			mutation.state.variables as Pick<
				Review,
				'userId' | 'comment' | 'rate'
			>,
	})

	const { data: reviews, isLoading, error } = useReviews(bookId)
	if (error) {
		throw error
	}
	if (isLoading) {
		return (
			<>
				{Array.from({ length: 5 }, (_, index) => (
					<BookReview.Skeleton key={'review-skeleton-' + index} />
				))}
			</>
		)
	}

	assert(reviews)

	return (
		<>
			{variables && (
				<BookReview
					className="opacity-50"
					username={username}
					comment={variables.comment}
					createdAt={new Date().toISOString()}
				/>
			)}

			{reviews.length === 0 && !variables && <div>no reviews found</div>}
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
