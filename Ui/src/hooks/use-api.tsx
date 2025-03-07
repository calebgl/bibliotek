import { useQuery } from '@tanstack/react-query'
import { fetchBook } from '../lib/api'

export function useBook(id: string) {
	return useQuery({
		queryKey: ['books', id],
		queryFn: () => fetchBook(id),
	})
}
