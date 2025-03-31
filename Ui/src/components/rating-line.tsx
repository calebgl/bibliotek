type RatingLineProps = {
	rating: number
	progress: number
	count: number
}

export function RatingLine(props: RatingLineProps) {
	return (
		<div className="flex items-center justify-between gap-2">
			<div>{props.rating}</div>
			<div className="h-2 grow">
				<div
					className="jiji relative size-full bg-gray-200"
					style={{
						['--width' as string]: props.progress,
					}}
				/>
			</div>
			<div>{props.count}</div>
		</div>
	)
}
