import dayjs from 'dayjs'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useParams } from 'react-router'

import { fetchReviews, postReview } from '../lib/api'
import useSWR from 'swr'

export function BookReviewForm() {
	const params = useParams()
	const bookId = params.bookId
	if (!bookId) {
		throw new Error('bookId is required on review form')
	}

	const { data: reviews, mutate } = useSWR('/api/reviews/' + bookId, () =>
		fetchReviews(bookId),
	)

	const [rate, setRate] = useState<number>(5)
	const [comment, setComment] = useState<string>('')

	const user = {
		id: 1,
		username: 'calebgl',
	}

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()

		if (!bookId) {
			throw new Error('bookId is required on review form')
		}

		const commentNew = await postReview(
			user.id,
			parseInt(bookId),
			rate,
			comment,
		)

		mutate([commentNew, ...(reviews ?? [])])
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
					<textarea
						placeholder="Leave a review..."
						className="w-full max-w-prose resize-none bg-white"
						rows={5}
						value={comment}
						onChange={handleChange}
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
