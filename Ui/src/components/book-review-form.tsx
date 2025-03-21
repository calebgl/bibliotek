import dayjs from 'dayjs'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useParams } from 'react-router'

import { useCreateReview, useCreateReviewState } from '../hooks/use-api'
import { assert } from '../lib/assert'

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
	assert(bookId)

	const [form, setForm] = useState<typeof formInitialState>(formInitialState)

	const { mutate } = useCreateReview(bookId)
	const [variables] = useCreateReviewState(bookId)

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
						disabled={Boolean(variables)}
						className="ml-auto cursor-pointer bg-gray-300 px-4 py-2 active:bg-amber-500 disabled:cursor-not-allowed disabled:bg-gray-100"
					>
						comment
					</button>
				</form>
			</div>
		</div>
	)
}
