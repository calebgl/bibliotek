import dayjs from 'dayjs'

export function BookReviewForm() {
	return (
		<div className="grid grid-cols-[auto_1fr] gap-2">
			<div className="size-12 bg-violet-200"></div>
			<div className="max-w-prose">
				<div className="flex justify-between">
					<div>calebgl</div>
					<div>{dayjs().format('LLL')}</div>
				</div>
				<textarea
					placeholder="Leave a review..."
					className="w-full max-w-prose resize-none bg-white"
					rows={5}
				></textarea>
			</div>
		</div>
	)
}
