import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
	createAdminBook,
	fetchAdminBook,
	fetchAdminBooks,
	fetchBook,
	fetchBooks,
	fetchReviews,
	postReview,
	putAdminBook,
} from '../lib/api'
import { CreateBook } from '../types/book'
import { Review } from '../types'

export function useBooks() {
	return useQuery({
		queryKey: ['books'],
		queryFn: () => fetchBooks(),
	})
}

export function useBook(id: string) {
	return useQuery({
		queryKey: ['books', id],
		queryFn: () => fetchBook(id),
	})
}

export function useReviews(bookId: string) {
	return useQuery({
		queryKey: ['reviews', bookId],
		queryFn: () => fetchReviews(bookId),
	})
}

export function useCreateReviewMutation(bookId: string) {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ['postReview'],
		mutationFn: (review: Pick<Review, 'userId' | 'comment' | 'rate'>) =>
			postReview(
				review.userId!,
				parseInt(bookId),
				review.rate,
				review.comment,
			),
		onSettled: () =>
			queryClient.invalidateQueries({
				queryKey: ['reviews', bookId],
			}),
	})
}

export function useAdminBooks() {
	return useQuery({
		queryKey: ['admin', 'books'],
		queryFn: () => fetchAdminBooks(),
	})
}

export function useAdminBook(id: string) {
	return useQuery({
		queryKey: ['admin', 'books', id],
		queryFn: () => fetchAdminBook(id),
	})
}

export function useCreateAdminBookMutation() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ['createAdminBook'],
		mutationFn: (book: CreateBook) => createAdminBook(book),
		onSettled: () =>
			queryClient.invalidateQueries({
				queryKey: ['admin', 'books'],
			}),
	})
}

export function useUpdateAdminBookMutation(bookId: string) {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ['updateAdminBook', bookId],
		mutationFn: (book: CreateBook) => putAdminBook(bookId, book),
		onSettled: () =>
			queryClient.invalidateQueries({
				queryKey: ['admin', 'books'],
			}),
	})
}
