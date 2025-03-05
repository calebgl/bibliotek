import useSWR from 'swr'

import { BookDetails } from '../components/book-details'
import { BookImagePreview } from '../components/book-image-preview'
import { BookPurchaseInfo } from '../components/book-purchase-info'
import { BookReview } from '../components/book-review'
import { RatingLine } from '../components/rating-line'
import { fetchBook, fetchReviews } from '../lib/api'

export function Book() {
	const bookId = '1'

	const { data: book } = useSWR('/api/book/' + bookId, () =>
		fetchBook(bookId),
	)

	const { data: reviews } = useSWR('/api/reviews/' + bookId, () =>
		fetchReviews(bookId),
	)

	return (
		<>
			<div>
				<div className="space-y-16 p-4">
					<div className="flex gap-8">
						<div className="basis-1/2">
							{book?.coverUrl && (
								<BookImagePreview coverUrl={book?.coverUrl} />
							)}
						</div>
						<div className="flex basis-1/2 flex-col">
							<BookPurchaseInfo
								title={book?.title ?? ''}
								averageRating={book?.averageRating ?? 0}
								totalReviews={book?.totalReviews ?? 0}
								price={book?.price ?? 0}
							/>
						</div>
					</div>
					<div>
						<BookDetails description={book?.description ?? ''} />
					</div>
					<div className="flex gap-16">
						<div className="basis-2/3 space-y-16">
							{reviews?.length === 0 && 'no reviews found'}
							{reviews?.map((review) => (
								<BookReview
									key={review.id}
									username={review.username}
									comment={review.comment}
									createdAt={review.createdAt}
								/>
							))}
						</div>
						<div className="basis-1/3">
							<div className="flex justify-between">
								<div>★★★★☆</div>
								<div>{book?.averageRating}</div>
							</div>
							<div>
								<RatingLine
									rating={5}
									count={book?.stars.five ?? 0}
									progress={
										(book?.stars.five ?? 0) /
										(book?.totalReviews ?? 1)
									}
								/>

								<RatingLine
									rating={4}
									count={book?.stars.four ?? 0}
									progress={
										(book?.stars.four ?? 0) /
										(book?.totalReviews ?? 1)
									}
								/>

								<RatingLine
									rating={3}
									count={book?.stars.three ?? 0}
									progress={
										(book?.stars.three ?? 0) /
										(book?.totalReviews ?? 1)
									}
								/>

								<RatingLine
									rating={2}
									count={book?.stars.two ?? 0}
									progress={
										(book?.stars.two ?? 0) /
										(book?.totalReviews ?? 1)
									}
								/>

								<RatingLine
									rating={1}
									count={book?.stars.one ?? 0}
									progress={
										(book?.stars.one ?? 0) /
										(book?.totalReviews ?? 1)
									}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
