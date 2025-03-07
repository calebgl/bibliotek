import { useParams } from 'react-router'
import { useBook } from '../hooks/use-api'
import { RatingLine } from './rating-line'

export function BookRating() {
	const { bookId } = useParams()
	if (!bookId) {
		throw new Error('')
	}

	const { data: book, isLoading, error } = useBook(bookId)
	if (error) {
		throw error
	}
	if (isLoading) {
		return 'loading...'
	}
	if (!book) {
		throw new Error()
	}

	const totalReviewsNormalized = book.totalReviews || 1

	return (
		<>
			<div className="flex justify-between">
				<div>★★★★☆</div>
				<div>{book.averageRating}</div>
			</div>
			<div>
				<RatingLine
					rating={5}
					count={book.stars.five}
					progress={book.stars.five / totalReviewsNormalized}
				/>

				<RatingLine
					rating={4}
					count={book.stars.four}
					progress={book.stars.four / totalReviewsNormalized}
				/>

				<RatingLine
					rating={3}
					count={book.stars.three}
					progress={book.stars.three / totalReviewsNormalized}
				/>

				<RatingLine
					rating={2}
					count={book.stars.two}
					progress={book.stars.two / totalReviewsNormalized}
				/>

				<RatingLine
					rating={1}
					count={book.stars.one}
					progress={book.stars.one / totalReviewsNormalized}
				/>
			</div>
		</>
	)
}
