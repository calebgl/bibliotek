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

// prettier-ignore
const queryKeys = {
	public: {
		books: {
			all: () => ['public', 'books'],
			list: () => [...queryKeys.public.books.all(), 'list'],
			detail: (id: string) => [...queryKeys.public.books.all(), 'detail', id],
			reviews: {
				all: (bookId: string) => [...queryKeys.public.books.detail(bookId), 'reviews'],
				list: (bookId: string) => [...queryKeys.public.books.reviews.all(bookId), 'list'],
			},
		},
	},
	admin: {
		books: {
			all: () => ['admin', 'books'],
			list: () => [...queryKeys.admin.books.all(), 'list'],
			detail: (id: string) => [...queryKeys.admin.books.all(), 'detail', id],
		},
	},
}

// prettier-ignore
const mutationKeys = {
	public: {
		books: {
			all: () => ['public', 'books'],
			reviews: {
				all: (bookId: string) => [...mutationKeys.public.books.all(), bookId, 'reviews'],
				create: (bookId:string) => [...mutationKeys.public.books.reviews.all(bookId), 'create'],
				update: (bookId:string, reviewId: string) => [...mutationKeys.public.books.reviews.all(bookId), 'update', reviewId],
			}
		}
	},
	admin: {
		books: {
			all: () => ['admin', 'books'],
			create: () => [...mutationKeys.admin.books.all(), 'create'],
			update: (id: string) => [...mutationKeys.admin.books.all(), 'update', id],
		},
	},
}

export function useBooks() {
	return useQuery({
		queryKey: queryKeys.public.books.list(),
		queryFn: () => fetchBooks(),
	})
}

export function useBook(id: string) {
	return useQuery({
		queryKey: queryKeys.public.books.detail(id),
		queryFn: () => fetchBook(id),
	})
}

export function useReviews(
	bookId: string,
	options: { enabled: boolean } = { enabled: true },
) {
	return useQuery({
		queryKey: queryKeys.public.books.reviews.list(bookId),
		queryFn: () => fetchReviews(bookId),
		enabled: options.enabled,
	})
}

export function useCreateReview(bookId: string) {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: mutationKeys.public.books.reviews.create(bookId),
		mutationFn: (review: Pick<Review, 'userId' | 'comment' | 'rate'>) =>
			postReview(
				review.userId!,
				parseInt(bookId),
				review.rate,
				review.comment,
			),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: queryKeys.public.books.detail(bookId),
			})
			queryClient.invalidateQueries({
				queryKey: queryKeys.public.books.reviews.list(bookId),
			})
		},
	})
}

export function useAdminBooks() {
	return useQuery({
		queryKey: queryKeys.admin.books.list(),
		queryFn: () => fetchAdminBooks(),
	})
}

export function useAdminBook(id: string) {
	return useQuery({
		queryKey: queryKeys.admin.books.detail(id),
		queryFn: () => fetchAdminBook(id),
	})
}

export function useCreateAdminBook() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: mutationKeys.admin.books.create(),
		mutationFn: (book: CreateBook) => createAdminBook(book),
		onSettled: () =>
			queryClient.invalidateQueries({
				queryKey: queryKeys.admin.books.list(),
			}),
	})
}

export function useUpdateAdminBook(id: string) {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: mutationKeys.admin.books.update(id),
		mutationFn: (book: CreateBook) => putAdminBook(id, book),
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: queryKeys.admin.books.detail(id),
			})
			queryClient.refetchQueries({
				queryKey: queryKeys.admin.books.list(),
			})
		},
	})
}
