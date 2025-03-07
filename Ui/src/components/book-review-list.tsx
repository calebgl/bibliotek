import { useMutationState } from '@tanstack/react-query'
import { useParams } from 'react-router'

import { useReviews } from '../hooks/use-api'
import { Review } from '../types'
import { BookReview } from './book-review'

export function BookReviewList() {
	const { bookId } = useParams()
	if (!bookId) {
		throw new Error('bookId is required on books')
	}

	const { data: reviews, isLoading, error } = useReviews(bookId)

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
			{variables && (
				<div className="grid grid-cols-[auto_1fr] gap-2 opacity-50">
					<div className="size-12 bg-violet-200"></div>
					<div className="max-w-prose">
						<div className="flex justify-between">
							<div>{variables.userId}</div>
							<div>today</div>
						</div>
						<div className="max-w-prose">{variables.comment}</div>
						<div className="mt-12 flex gap-2">
							<button className="size-8 cursor-pointer bg-gray-300 px-2 py-1">
								<span className="">l</span>
							</button>
							<button className="size-8 cursor-pointer bg-gray-300 px-2 py-1">
								<span className="">d</span>
							</button>
						</div>
					</div>
				</div>
			)}

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
