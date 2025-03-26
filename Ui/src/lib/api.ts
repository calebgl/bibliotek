import { Book, Review } from '../types'
import { AdminBook, CreateBook } from '../types/book'
import { MimeType } from '../types/utils'
import { HttpError, HttpStatus } from './http'
import { sleep } from './utils'

enum Method {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
}

export async function fetchAdminBooks(): Promise<AdminBook[]> {
	const resp = await fetch('/api/admin/books')
	await sleep()
	if (!resp.ok) {
		throw new HttpError(resp.status as HttpStatus, 'error fetching books')
	}

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
	await sleep()
	if (!resp.ok) {
		throw new HttpError(resp.status as HttpStatus, 'error creating book')
	}

	return resp.json()
}

export async function putAdminBook(
	id: string,
	book: CreateBook,
): Promise<AdminBook> {
	const resp = await fetch('/api/admin/books/' + id, {
		method: Method.PUT,
		headers: {
			'Content-Type': MimeType.JSON,
		},
		body: JSON.stringify(book),
	})
	await sleep()
	if (!resp.ok) {
		throw new HttpError(
			resp.status as HttpStatus,
			'error updating book' + id,
		)
	}

	return resp.json()
}

export async function fetchAdminBook(id: string): Promise<AdminBook> {
	const resp = await fetch('/api/admin/books/' + id)
	await sleep()
	if (!resp.ok) {
		throw new HttpError(
			resp.status as HttpStatus,
			'error fetching book ' + id,
		)
	}

	return resp.json()
}

export async function fetchBooks(): Promise<Omit<Book, 'stars'>[]> {
	const resp = await fetch('/api/books')
	await sleep()
	if (!resp.ok) {
		throw new HttpError(resp.status as HttpStatus, 'error fetching books')
	}

	return resp.json()
}

export async function fetchBook(id: string): Promise<Book> {
	const resp = await fetch('/api/books/' + id)
	await sleep()
	if (!resp.ok) {
		throw new HttpError(
			resp.status as HttpStatus,
			'error fetching book ' + id,
		)
	}

	return resp.json()
}

export async function fetchReviews(bookId: string): Promise<Review[]> {
	const resp = await fetch('/api/reviews/' + bookId)
	await sleep()
	if (!resp.ok) {
		throw new HttpError(
			resp.status as HttpStatus,
			'error fetching reviews for book ' + bookId,
		)
	}

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
	await sleep()
	if (!resp.ok) {
		throw new HttpError(
			resp.status as HttpStatus,
			'error posting review for book ' + bookId,
		)
	}

	return resp.json()
}
