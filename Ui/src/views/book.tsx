import { BookDetails } from '../components/book-details'
import { BookImagePreview } from '../components/book-image-preview'
import { BookPurchaseInfo } from '../components/book-purchase-info'
import { BookRating } from '../components/book-rating'
import { BookReviewForm } from '../components/book-review-form'
import { BookReviewList } from '../components/book-review-list'

export function Book() {
	return (
		<div className="space-y-16 p-4">
			<div className="flex gap-8">
				<div className="basis-1/2">
					<BookImagePreview />
				</div>
				<div className="flex basis-1/2 flex-col">
					<BookPurchaseInfo />
				</div>
			</div>
			<div>
				<BookDetails />
			</div>
			<div className="flex gap-16">
				<div className="basis-2/3 space-y-16">
					<BookReviewForm />
					<BookReviewList />
				</div>
				<div className="basis-1/3">
					<BookRating />
				</div>
			</div>
		</div>
	)
}
