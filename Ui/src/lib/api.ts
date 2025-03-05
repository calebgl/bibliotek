import { Book, Review } from '../types'
import { sleep } from './utils'

enum Method {
	GET = 'GET',
	POST = 'POST',
}

enum MimeType {
	JSON = 'application/json',
}

export async function fetchBook(id: string): Promise<Book> {
	const resp = await fetch('/api/books/' + id)
	if (!resp.ok) {
		throw new Error('error fetching book ' + id)
	}

	await sleep()

	return resp.json()
}

export async function fetchReviews(bookId: string): Promise<Review[]> {
	const resp = await fetch('/api/reviews/' + bookId)
	if (!resp.ok) {
		throw new Error('error fetching reviews for book ' + bookId)
	}

	await sleep()

	return resp.json()
}

export async function postReview(
	userId: number,
	bookId: number,
	rate: number,
	comment: string,
): Promise<Review> {
	const resp = await fetch('/api/reviews', {
		method: Method.POST,
		headers: {
			'Content-Type': MimeType.JSON,
			'Bibliotek-User-Id': String(userId),
		},
		body: JSON.stringify({
			bookId,
			rate,
			comment,
		}),
	})
	if (!resp.ok) {
		throw new Error('error posting review for book ' + bookId)
	}

	return resp.json()
}
