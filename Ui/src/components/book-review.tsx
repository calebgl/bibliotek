import dayjs from 'dayjs'
import { HTMLAttributes } from 'react'

type BookReviewProps = HTMLAttributes<HTMLDivElement> & {
	username: string
	createdAt: string
	comment: string
}

export function BookReview(props: BookReviewProps) {
	return (
		<div className={props.className + ' grid grid-cols-[auto_1fr] gap-2'}>
			<div className="size-12 bg-violet-200" />
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

BookReview.Skeleton = () => {
	return (
		<div className="grid grid-cols-[auto_1fr] gap-2">
			<div className="size-12 animate-pulse bg-violet-200" />
			<div className="max-w-prose space-y-1">
				<div className="flex justify-between">
					<div className="h-3 w-32 animate-pulse bg-gray-200" />
					<div className="h-3 w-16 animate-pulse bg-gray-100" />
				</div>
				<div className="flex max-w-prose flex-wrap gap-1">
					{Array.from({ length: 5 }, (_, index) => (
						<div
							key={'review-comment-' + index}
							className="h-3 animate-pulse bg-gray-100"
							style={{
								width: Math.max(0.2, Math.random()) * 100 + '%',
							}}
						/>
					))}
				</div>
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
