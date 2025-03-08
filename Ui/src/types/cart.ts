import { Book } from './book'

export type CartBook = Omit<
	Book,
	'stars' | 'totalReviews' | 'averageRating' | 'description'
> & { quantity: number }
