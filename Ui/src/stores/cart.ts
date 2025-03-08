import { atom } from 'jotai'

import { CartBook } from '../types'

export const booksAtom = atom<Record<string, CartBook>>({
	'1': {
		id: 1,
		title: '1984',
		author: 'Goerge Orwell',
		price: 10.99,
		coverUrl: 'http://localhost:5173/1984.jpg',
		quantity: 2,
	},
	'2': {
		id: 2,
		title: 'Words of Radiance',
		author: 'Brandon Sanderson',
		price: 8.99,
		coverUrl: 'http://localhost:5173/wor.jpg',
		quantity: 1,
	},
	'3': {
		id: 3,
		title: 'La Sombra del Viento',
		author: 'Carlos Zafon',
		price: 5.99,
		coverUrl: 'http://localhost:5173/sv.jpg',
		quantity: 1,
	},
})

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

	return total
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
