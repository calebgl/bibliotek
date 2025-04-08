import type {
	AddCartBookRequest,
	AddCartBookResponse,
	AdminBook,
	Book,
	CreateBook,
	Credentials,
	FetchCartBooksResponse,
	Review,
	SaveBookRequest,
	SavedBook,
	UpdateCartBookRequest,
	UpdateCartBookResponse,
	User,
} from '../types'
import { MimeType } from '../types/utils'
import { HttpError, HttpStatus, isHttpError } from './http'
import { sleep } from './utils'

enum Method {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
}

type Fetch = <T>(input: RequestInfo | URL, init?: RequestInit) => Promise<T>

function createFetch(defaultConfig?: RequestInit): Fetch {
	return async function <T>(input: RequestInfo | URL, init?: RequestInit) {
		const [resp] = await Promise.all([
			fetch(input, {
				...defaultConfig,
				...init,
			}) as Promise<Response>,
			sleep(),
		])
		if (!resp.ok) {
			throw new HttpError(
				resp.status as HttpStatus,
				'error in ' + input.toString(),
			)
		}

		return resp.json() as Promise<T>
	}
}

const fetchWithCredentials = createFetch({
	headers: {
		'Content-Type': MimeType.JSON,
	},
	credentials: 'include',
})

export async function login(provider: 'github'): Promise<void>
export async function login(credentials: Credentials): Promise<void>
export async function login(
	credentials: Credentials | 'github',
): Promise<void> {
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

	await fetchWithCredentials('/authz/login?' + searchParams.toString(), {
		method: Method.POST,
		body: JSON.stringify({
			...credentials,
			twoFactorCode: null,
			twoFactorRecoveryCode: null,
		}),
	})
}

export async function logout(): Promise<void> {
	await fetch('/authz/logout', {
		method: Method.POST,
		credentials: 'include',
	})
}

export async function validateSession(): Promise<User | null> {
	try {
		return await fetchWithCredentials('/api/auth/session')
	} catch (error) {
		if (isHttpError(error) && error.status === HttpStatus.Unauthorized) {
			return null
		}

		throw error
	}
}

export async function fetchAdminBooks(): Promise<AdminBook[]> {
	return fetchWithCredentials('/api/admin/books')
}

// TODO: handle image upload
export async function createAdminBook(book: CreateBook): Promise<AdminBook> {
	return fetchWithCredentials('/api/admin/books', {
		method: Method.POST,
		body: JSON.stringify(book),
	})
}

export async function putAdminBook(
	id: string,
	book: CreateBook,
): Promise<AdminBook> {
	return fetchWithCredentials('/api/admin/books/' + id, {
		method: Method.PUT,
		body: JSON.stringify(book),
	})
}

export async function fetchAdminBook(id: string): Promise<AdminBook> {
	return fetchWithCredentials('/api/admin/books/' + id)
}

export async function fetchBooks(): Promise<Omit<Book, 'stars'>[]> {
	return fetchWithCredentials('/api/books')
}

export async function fetchBook(id: string): Promise<Book> {
	return fetchWithCredentials('/api/books/' + id)
}

export async function fetchReviews(bookId: string): Promise<Review[]> {
	return fetchWithCredentials('/api/reviews/' + bookId)
}

export async function postReview(
	bookId: number,
	rate: number,
	comment: string,
): Promise<Review> {
	return fetchWithCredentials('/api/reviews', {
		method: Method.POST,
		body: JSON.stringify({
			bookId,
			rate,
			comment,
		}),
	})
}

export async function fetchSavedBooks(): Promise<SavedBook[]> {
	return fetchWithCredentials('/api/saved-books')
}

export async function addBookToSaved(request: SaveBookRequest) {
	return fetchWithCredentials('/api/saved-books', {
		method: Method.POST,
		body: JSON.stringify(request),
	})
}

export async function removeBookFromSaved(bookId: string) {
	return fetchWithCredentials('/api/saved-books/' + bookId, {
		method: Method.DELETE,
	})
}

export async function fetchCartBooks(): Promise<FetchCartBooksResponse> {
	return fetchWithCredentials('/api/cart')
}

export async function addBookToCart(
	request: AddCartBookRequest,
): Promise<AddCartBookResponse> {
	return fetchWithCredentials('/api/cart/books', {
		method: Method.POST,
		body: JSON.stringify(request),
	})
}

export async function updateBookInCart(
	bookId: string,
	request: UpdateCartBookRequest,
): Promise<UpdateCartBookResponse> {
	return fetchWithCredentials('/api/cart/books/' + bookId, {
		method: Method.PUT,
		body: JSON.stringify(request),
	})
}

export async function removeBookFromCart(bookId: string): Promise<void> {
	return fetchWithCredentials('/api/cart/books/' + bookId, {
		method: Method.DELETE,
	})
}

export async function clearCart(): Promise<void> {
	return fetchWithCredentials('/api/cart/books', {
		method: Method.DELETE,
	})
}
