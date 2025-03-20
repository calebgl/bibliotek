import { useMutationState } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'

import { useReviews } from '../hooks/use-api'
import { assert } from '../lib/assert'
import { Review } from '../types'
import { BookReview } from './book-review'

export function BookReviewList() {
	const ref = useRef<HTMLDivElement>(null)
	let reviewsVisible = false

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

	const {
		data: reviews,
		isLoading,
		error,
		refetch,
	} = useReviews(bookId, { enabled: false })

	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting && !reviewsVisible) {
				reviewsVisible = true
				refetch()
			}
		})

		if (ref.current) {
			observer.observe(ref.current)
		}

		return () => {
			observer.disconnect()
		}
	}, [refetch, bookId])

	if (error) {
		throw error
	}
	if (isLoading) {
		return (
			<>
				{Array.from({ length: 1 }, (_, index) => (
					<BookReview.Skeleton key={'review-skeleton-' + index} />
				))}
			</>
		)
	}

	return (
		<div ref={ref}>
			{variables && (
				<BookReview
					className="opacity-50"
					username={username}
					comment={variables.comment}
					createdAt={new Date().toISOString()}
				/>
			)}

			{reviews?.length === 0 && !variables && <div>no reviews found</div>}
			{reviews?.map((review) => (
				<BookReview
					key={review.id}
					username={review.username}
					comment={review.comment}
					createdAt={review.createdAt}
				/>
			))}
		</div>
	)
}
