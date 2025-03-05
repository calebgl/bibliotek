export type Book = {
	id: string
	title: string
	author: string
	coverUrl: string
	description: string
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
