type BaseBook = {
	id: string
	title: string
	subtitle: string | null
	author: string
	coverUrl: string | null
	price: number
	totalReviews: number
	averageRating: number
}

export type Book = BaseBook & {
	description: string | null
	stars: {
		one: number
		two: number
		three: number
		four: number
		five: number
	}
}

export type CartBook = Omit<BaseBook, 'totalReviews' | 'averageRating'> & {
	quantity: number
}

export type SavedBook = BaseBook

export type AdminBook = BaseBook & {
	description: string | null
	stockQuantity: number
}

export type CreateBook = Pick<Book, 'title' | 'author' | 'price'> &
	Partial<Pick<Book, 'description' | 'subtitle'>> & {
		stockQuantity: number
		coverImage: File | null
	}
