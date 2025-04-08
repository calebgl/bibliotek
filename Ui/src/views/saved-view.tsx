import { SavedItem, SavedItemSkeleton } from '../components/saved-item'
import { useSavedBooks } from '../hooks/use-api'
import { assert } from '../lib/assert'

export function SavedView() {
	return (
		<div className="container mx-auto space-y-4">
			<h1 className="text-3xl font-bold">Saved</h1>
			<div className="grid grid-cols-1 gap-12">
				<List />
			</div>
		</div>
	)
}

function List() {
	const { data, isLoading } = useSavedBooks()

	if (isLoading) {
		return Array.from({ length: 3 }, (_, index) => {
			return <SavedItemSkeleton key={'saved-book-skeleton-' + index} />
		})
	}

	assert(data)

	const { books } = data

	return books.map((book) => (
		<SavedItem key={'saved-book-' + book.id} {...book} isSaved={true} />
	))
}
