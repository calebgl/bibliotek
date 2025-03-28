export function SavedView() {
	return (
		<div>
			Saved books
			{[1, 2, 3, 4, 5].map((i) => (
				<div key={i} />
			))}
		</div>
	)
}
