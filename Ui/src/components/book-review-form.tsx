import { useMutation, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useParams } from 'react-router'

import { postReview } from '../lib/api'
import { Review } from '../types'

const user = {
	id: 1,
	username: 'calebgl',
}

export function BookReviewForm() {
	const params = useParams()
	const bookId = params.bookId
	if (!bookId) {
		throw new Error('bookId is required on review form')
	}

	const [rate, setRate] = useState<number>(5)
	const [comment, setComment] = useState<string>('')

	const queryClient = useQueryClient()
	const { mutate } = useMutation({
		mutationKey: ['postReview'],
		mutationFn: (review: Pick<Review, 'userId' | 'comment' | 'rate'>) =>
			postReview(review.userId!, parseInt(bookId), rate, comment),
		onSettled: () =>
			queryClient.invalidateQueries({
				queryKey: ['reviews', 'books', bookId],
			}),
	})

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		mutate({
			userId: user.id,
			rate,
			comment,
		})
	}

	function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
		setComment(event.currentTarget.value)
	}

	return (
		<div className="grid grid-cols-[auto_1fr] gap-2">
			<div className="size-12 bg-violet-200"></div>
			<div className="max-w-prose">
				<div className="flex justify-between">
					<div>calebgl</div>
					<div>{dayjs().format('LLL')}</div>
				</div>
				<form onSubmit={handleSubmit}>
					<input type="number" max={5} min={1} step={1} name="rate" />
					<textarea
						placeholder="Leave a review..."
						className="w-full max-w-prose resize-none bg-white"
						rows={5}
						value={comment}
						onChange={handleChange}
						name="comment"
					></textarea>
					<button
						type="submit"
						className="ml-auto cursor-pointer bg-gray-300 px-4 py-2 active:bg-amber-500"
					>
						comment
					</button>
				</form>
			</div>
		</div>
	)
}
