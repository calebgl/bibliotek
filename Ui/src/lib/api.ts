import { Book, Review } from '../types'

export async function fetchBook(id: string): Promise<Book> {
	const resp = await fetch('/api/books/' + id)
	if (!resp.ok) {
		throw new Error('error fetching book ' + id)
	}

	return resp.json()
}

export async function fetchReviews(bookId: string): Promise<Review[]> {
	const resp = await fetch('/api/reviews/' + bookId)
	if (!resp.ok) {
		throw new Error('error fetching reviews for book ' + bookId)
	}

	return resp.json()
}
