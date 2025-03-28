export type Book = {
	id: string
	title: string
	subtitle: string | null
	author: string
	coverUrl: string | null
	description: string | null
	price: number
	totalReviews: number
	averageRating: number
	stars: {
		one: number
		two: number
		three: number
		four: number
		five: number
	}
}

export type SavedBook = {
	id: string
	title: string
	author: string
	coverUrl: string | null
	price: number
	totalReviews: number
	averageRating: number
}

export type AdminBook = Omit<Book, 'stars'> & {
	stockQuantity: number
}

export type CreateBook = Pick<Book, 'title' | 'author' | 'price'> &
	Partial<Pick<Book, 'description' | 'subtitle'>> & {
		stockQuantity: number
		coverImage: File | null
	}
