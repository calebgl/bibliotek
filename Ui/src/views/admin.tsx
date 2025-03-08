import { useBooks } from '../hooks/use-api'

export function Admin() {
	const { data: books } = useBooks()
	return (
		<div>
			<pre>
				<code>{JSON.stringify(books, null, 2)}</code>
			</pre>
		</div>
	)
}
