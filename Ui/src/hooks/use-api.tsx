import { useQuery } from '@tanstack/react-query'

import { fetchBook, fetchReviews } from '../lib/api'

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
