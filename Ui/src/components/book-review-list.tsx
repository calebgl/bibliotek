import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'

import { useCreateReviewState, useReviews } from '../hooks/use-api'
import { assert } from '../lib/assert'
import { BookReview } from './book-review'

export function BookReviewList() {
	const ref = useRef<HTMLDivElement>(null)
	const [reviewsVisible, setReviewsVisible] = useState<boolean>(false)

	const { bookId } = useParams()
	assert(bookId)

	// TODO: implement useSession
	const username = 'calebgl' // useSession();

	const [variables] = useCreateReviewState(bookId)

	const {
		data: reviews,
		isLoading,
		error,
	} = useReviews(bookId, { enabled: reviewsVisible })

	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting && !reviewsVisible) {
				setReviewsVisible(true)
			}
		})

		if (ref.current) {
			observer.observe(ref.current)
		}

		return () => {
			observer.disconnect()
		}
	}, [reviewsVisible])

	if (error) {
		throw error
	}
	if (isLoading) {
		return Array.from({ length: 1 }, (_, index) => (
			<BookReview.Skeleton key={'review-skeleton-' + index} />
		))
	}

	return (
		<div ref={ref} className="space-y-12">
			{variables && (
				<BookReview
					username={username}
					comment={variables.comment}
					createdAt={new Date().toISOString()}
					className="opacity-50"
				/>
			)}
			{reviews?.length === 0 && !variables && <div>no reviews found</div>}
			{reviews?.map((review) => (
				<BookReview
					key={review.id}
					username={review.userName}
					comment={review.comment}
					createdAt={review.createdAt}
				/>
			))}
		</div>
	)
}
