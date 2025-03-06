import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'

import { BookDetails } from '../components/book-details'
import { BookImagePreview } from '../components/book-image-preview'
import { BookPurchaseInfo } from '../components/book-purchase-info'
import { BookReviewForm } from '../components/book-review-form'
import { BookReviewList } from '../components/book-review-list'
import { RatingLine } from '../components/rating-line'
import { fetchBook } from '../lib/api'

export function Book() {
	const params = useParams()
	const bookId = params.bookId
	if (!bookId) {
		throw new Error('bookId is required on books')
	}

	const {
		data: book,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['books', bookId],
		queryFn: () => fetchBook(bookId),
	})

	if (error) {
		throw error
	}

	if (isLoading) {
		return <div>loading book...</div>
	}

	if (!book) {
		throw new Error()
	}

	const totalReviewsNormalized = book.totalReviews || 1

	return (
		<div className="space-y-16 p-4">
			<div className="flex gap-8">
				<div className="basis-1/2">
					<BookImagePreview coverUrl={book?.coverUrl} />
				</div>
				<div className="flex basis-1/2 flex-col">
					<BookPurchaseInfo
						title={book.title}
						averageRating={book.averageRating}
						totalReviews={book.totalReviews}
						price={book.price}
					/>
				</div>
			</div>
			<div>
				<BookDetails description={book.description} />
			</div>
			<div className="flex gap-16">
				<div className="basis-2/3 space-y-16">
					<BookReviewForm />
					<BookReviewList />
				</div>
				<div className="basis-1/3">
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
				</div>
			</div>
		</div>
	)
}
