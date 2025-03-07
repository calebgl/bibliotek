import { atom } from 'jotai'

import { Book } from '../types'

type CartBook = Omit<
	Book,
	'stars' | 'totalReviews' | 'averageRating' | 'description'
> & { quantity: number }

export const booksAtom = atom<Record<string, CartBook>>({})

export const countAtom = atom<number>((get) => {
	const books = Object.values(get(booksAtom))

	let count = 0
	for (const book of books) {
		count += book.quantity
	}

	return count
})

export const totalAtom = atom<number>((get) => {
	const books = Object.values(get(booksAtom))

	let total = 0
	for (const book of books) {
		total += book.quantity * book.price
	}

	return 0
})

type Cart = {
	books: Record<string, CartBook>
	count: number
	total: number
}

export const cartAtom = atom<Cart>((get) => {
	return {
		books: get(booksAtom),
		count: get(countAtom),
		total: get(totalAtom),
	}
})
