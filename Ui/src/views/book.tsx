import { useParams } from 'react-router'

import { BookDetails } from '../components/book-details'
import { BookImagePreview } from '../components/book-image-preview'
import { BookPurchaseInfo } from '../components/book-purchase-info'
import { BookRating } from '../components/book-rating'
import { BookReviewForm } from '../components/book-review-form'
import { BookReviewList } from '../components/book-review-list'
import { assert } from '../lib/assert'

export function Book() {
	const { bookId } = useParams()
	assert(bookId)

	window.scrollTo({ top: 0 })

	return (
		<div className="container mx-auto">
			<div className="space-y-16 p-4">
				<div className="flex gap-8">
					<div className="basis-1/2">
						<BookImagePreview
							key={`book-${bookId}-image-preview`}
						/>
					</div>
					<div className="flex basis-1/2 flex-col">
						<BookPurchaseInfo
							key={`book-${bookId}-purchase-info`}
						/>
					</div>
				</div>
				<div>
					<BookDetails />
				</div>
				<div className="flex gap-16">
					<div className="basis-2/3 space-y-16">
						<BookReviewForm key={`book-${bookId}review-form`} />
						<BookReviewList key={`book-${bookId}review-list`} />
					</div>
					<div className="basis-1/3">
						<BookRating key={`book-${bookId}rating`} />
					</div>
				</div>
			</div>
		</div>
	)
}
