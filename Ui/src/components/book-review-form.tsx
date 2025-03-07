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

const formInitialState: { rate: number; comment: string } = {
	rate: 5,
	comment: '',
}

export function BookReviewForm() {
	const { bookId } = useParams()
	if (!bookId) {
		throw new Error('bookId is required on review form')
	}

	const [form, setForm] = useState<typeof formInitialState>(formInitialState)

	const queryClient = useQueryClient()
	const { mutate } = useMutation({
		mutationKey: ['postReview'],
		mutationFn: (review: Pick<Review, 'userId' | 'comment' | 'rate'>) =>
			postReview(
				review.userId!,
				parseInt(bookId),
				review.rate,
				review.comment,
			),
		onSettled: () =>
			queryClient.invalidateQueries({
				queryKey: ['reviews', bookId],
			}),
	})

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()

		mutate({
			userId: user.id,
			rate: form.rate,
			comment: form.comment,
		})

		setForm(formInitialState)
	}

	function handleChange(
		event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
	) {
		setForm({
			...form,
			[event.target.name]: event.target.value,
		})
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
					<input
						type="number"
						max={5}
						min={1}
						step={1}
						name="rate"
						value={form.rate}
						onChange={handleChange}
					/>
					<textarea
						placeholder="Leave a review..."
						rows={5}
						name="comment"
						value={form.comment}
						onChange={handleChange}
						className="w-full max-w-prose resize-none bg-white"
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
