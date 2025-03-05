export function BookImagePreview(props: { coverUrl: string }) {
	return (
		<div className="bg-gray-100 p-16">
			<img
				src={props.coverUrl}
				alt="book-cover"
				className="mx-auto max-w-64"
			/>
		</div>
	)
}
