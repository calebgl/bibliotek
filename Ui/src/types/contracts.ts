import { CartBook, SavedBook } from './book'

export type FetchCartBooksResponse = {
	total: number
	books: CartBook[]
}

export type AddCartBookRequest = {
	bookId: string
	quantity?: number
}

export type AddCartBookResponse = {
	bookId: string
	quantity: number
	addedAt: string
}

export type UpdateCartBookRequest = {
	quantity: number
}

export type UpdateCartBookResponse = {
	bookId: string
	quantity: number
	updatedAt: string
}

export type FetchSavedBooksResponse = {
	books: SavedBook[]
	total: number
}

export type SaveBookRequest = {
	bookId: string
}
