import { atom } from 'jotai'

export const booksAtom = atom<Record<string, any>>({})

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
	books: Record<string, any>
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
