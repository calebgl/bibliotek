import { Book, Credentials, Review, User } from '../types'
import { AdminBook, CreateBook, SavedBook } from '../types/book'
import { MimeType } from '../types/utils'
import { HttpError, HttpStatus } from './http'
import { sleep } from './utils'

enum Method {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
}

export async function login(provider: 'github'): Promise<void>
export async function login(credentials: Credentials): Promise<void>
export async function login(
	credentials: Credentials | 'github',
): Promise<void> {
	await sleep()

	if (typeof credentials === 'string') {
		switch (credentials) {
			case 'github':
				window.location.href = 'http://localhost:5191/api/auth/github'
				break

			default:
				throw new Error()
		}

		return
	}

	const searchParams = new URLSearchParams()
	searchParams.set('useCookies', 'true')
	searchParams.set('useSessionCookies', 'true')

	const resp = await fetch('/authz/login?' + searchParams.toString(), {
		method: Method.POST,
		headers: {
			'Content-Type': MimeType.JSON,
		},
		body: JSON.stringify(
			Object.assign({}, credentials, {
				twoFactorCode: null,
				twoFactorRecoveryCode: null,
			}),
		),
	})
	if (!resp.ok) {
		throw new HttpError(resp.status as HttpStatus, 'error login in')
	}
}

export async function logout(): Promise<void> {
	await sleep()

	const resp = await fetch('/authz/logout', {
		credentials: 'include',
	})
	if (!resp.ok) {
		throw new HttpError(resp.status as HttpStatus, 'error login out')
	}
}

export async function validateSession(
	init?: RequestInit,
): Promise<User | null> {
	await sleep()
	const resp = await fetch(
		'/api/auth/session',
		Object.assign({}, init, {
			credentials: 'include',
		}),
	)

	if (!resp.ok) {
		if (resp.status !== HttpStatus.Unauthorized) {
			throw new HttpError(
				resp.status as HttpStatus,
				'error checking session',
			)
		}

		return null
	}

	return resp.json()
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

export async function fetchSavedBooks(): Promise<SavedBook[]> {
	const resp = await fetch('/api/saved-books', {
		credentials: 'include',
	})
	await sleep()
	if (!resp.ok) {
		throw new HttpError(
			resp.status as HttpStatus,
			'error fetching saved books',
		)
	}

	return resp.json()
}

// type Fetcher = (input: RequestInfo | URL, init?: RequestInit) => Promise<any>
//
// function createFetch(): Fetcher {
// 	return async function (input: RequestInfo | URL, init?: RequestInit) {
// 		const [resp] = await Promise.all([fetch(input, init), await sleep()])
// 		if (!resp.ok) {
// 			throw new HttpError(
// 				resp.status as HttpStatus,
// 				'error in ' + input.toString(),
// 			)
// 		}
// 		return resp.json()
// 	}
// }
//
// const fetch = createFetch()
