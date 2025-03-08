import { useQuery } from '@tanstack/react-query'

import {
	fetchAdminBooks,
	fetchBook,
	fetchBooks,
	fetchReviews,
} from '../lib/api'

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

export function useAdminBooks() {
	return useQuery({
		queryKey: ['admin', 'books'],
		queryFn: () => fetchAdminBooks(),
	})
}
