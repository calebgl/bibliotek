import dayjs from 'dayjs'

type BookReviewProps = {
	username: string
	createdAt: string
	comment: string
}

export function BookReview(props: BookReviewProps) {
	return (
		<div className="grid grid-cols-[auto_1fr] gap-2">
			<div className="size-12 bg-violet-200"></div>
			<div className="max-w-prose">
				<div className="flex justify-between">
					<div>{props.username}</div>
					<div>{dayjs(props.createdAt).format('LLL')}</div>
				</div>
				<div className="max-w-prose">{props.comment}</div>
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
	)
}
