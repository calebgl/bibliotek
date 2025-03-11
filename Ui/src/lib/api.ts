import { Book, Review } from '../types'
import { AdminBook, CreateBook } from '../types/book'
import { MimeType } from '../types/utils'
import { HttpError, HttpStatus } from './http'
import { sleep } from './utils'

enum Method {
	GET = 'GET',
	POST = 'POST',
}

export async function fetchAdminBooks(): Promise<AdminBook[]> {
	const resp = await fetch('/api/admin/books')
	if (!resp.ok) {
		throw new HttpError(resp.status as HttpStatus, 'error fetching books')
	}

	await sleep()

	return resp.json()
}

// TODO: handle image upload
export async function createAdminBook(book: CreateBook): Promise<AdminBook> {
	const resp = await fetch('/api/admin/books', {
		method: Method.POST,
		headers: {
			'Content-Type': MimeType.JSON,
		},
		body: JSON.stringify(book),
	})
	if (!resp.ok) {
		throw new HttpError(resp.status as HttpStatus, 'error creating book')
	}

	await sleep(2000)

	return resp.json()
}

export async function fetchBooks(): Promise<Omit<Book, 'stars'>[]> {
	const resp = await fetch('/api/books')
	if (!resp.ok) {
		throw new HttpError(resp.status as HttpStatus, 'error fetching books')
	}

	await sleep()

	return resp.json()
}

export async function fetchBook(id: string): Promise<Book> {
	const resp = await fetch('/api/books/' + id)
	if (!resp.ok) {
		throw new HttpError(
			resp.status as HttpStatus,
			'error fetching book ' + id,
		)
	}

	await sleep()

	return resp.json()
}

export async function fetchReviews(bookId: string): Promise<Review[]> {
	const resp = await fetch('/api/reviews/' + bookId)
	if (!resp.ok) {
		throw new HttpError(
			resp.status as HttpStatus,
			'error fetching reviews for book ' + bookId,
		)
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
		throw new HttpError(
			resp.status as HttpStatus,
			'error posting review for book ' + bookId,
		)
	}

	return resp.json()
}
