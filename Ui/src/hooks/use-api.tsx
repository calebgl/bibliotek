import {
	useMutation,
	useMutationState,
	useQuery,
	useQueryClient,
	useSuspenseQuery,
} from '@tanstack/react-query'

import {
	addBookToCart,
	addBookToSaved,
	clearCart,
	createAdminBook,
	fetchAdminBook,
	fetchAdminBooks,
	fetchBook,
	fetchBooks,
	fetchCartBooks,
	fetchReviews,
	fetchSavedBooks,
	login,
	logout,
	postReview,
	putAdminBook,
	removeBookFromCart,
	removeBookFromSaved,
	updateBookInCart,
	validateSession,
} from '../lib/api'
import { debounce } from '../lib/utils'
import type {
	CartBook,
	CreateBook,
	FetchCartBooksResponse,
	Review,
} from '../types'

const queryKeys = {
	public: {
		auth: {
			session: () => ['session'],
		},
		books: {
			all: () => ['public', 'books'],
			list: () => [...queryKeys.public.books.all(), 'list'],
			detail: (id: string) => [
				...queryKeys.public.books.all(),
				'detail',
				id,
			],
			reviews: {
				all: (bookId: string) => [
					...queryKeys.public.books.detail(bookId),
					'reviews',
				],
				list: (bookId: string) => [
					...queryKeys.public.books.reviews.all(bookId),
					'list',
				],
			},
		},
		cart: {
			list: () => ['cart'],
		},
		saved: {
			list: () => ['saved'],
		},
	},
	admin: {
		books: {
			all: () => ['admin', 'books'],
			list: () => [...queryKeys.admin.books.all(), 'list'],
			detail: (id: string) => [
				...queryKeys.admin.books.all(),
				'detail',
				id,
			],
		},
	},
}

const mutationKeys = {
	public: {
		auth: {
			login: () => ['login'],
			logout: () => ['logout'],
			signInGithub: () => ['signin', 'github'],
		},
		books: {
			all: () => ['public', 'books'],
			reviews: {
				all: (bookId: string) => [
					...mutationKeys.public.books.all(),
					bookId,
					'reviews',
				],
				create: (bookId: string) => [
					...mutationKeys.public.books.reviews.all(bookId),
					'create',
				],
				update: (bookId: string, reviewId: string) => [
					...mutationKeys.public.books.reviews.all(bookId),
					'update',
					reviewId,
				],
			},
		},
		cart: {
			all: () => ['public', 'cart'],
			add: () => [...mutationKeys.public.cart.all(), 'add'],
			update: () => [...mutationKeys.public.cart.all(), 'update'],
			remove: () => [...mutationKeys.public.cart.all(), 'remove'],
			clear: () => [...mutationKeys.public.cart.all(), 'clear'],
		},
		saved: {
			all: () => ['saved'],
			add: () => [...mutationKeys.public.saved.all(), 'add'],
			remove: () => [...mutationKeys.public.saved.all(), 'remove'],
		},
	},
	admin: {
		books: {
			all: () => ['admin', 'books'],
			create: () => [...mutationKeys.admin.books.all(), 'create'],
			update: (id: string) => [
				...mutationKeys.admin.books.all(),
				'update',
				id,
			],
		},
	},
}

export function useLogin() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: mutationKeys.public.auth.login(),
		mutationFn: login,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: queryKeys.public.auth.session(),
			})
		},
	})
}

export function useSignInGitHub() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: mutationKeys.public.auth.signInGithub(),
		mutationFn: () => login('github'),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: queryKeys.public.auth.session(),
			})
		},
	})
}

export function useSession() {
	return useSuspenseQuery({
		queryKey: queryKeys.public.auth.session(),
		queryFn: validateSession,
		retry: false,
		retryOnMount: false,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	})
}

export function useLogout() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: mutationKeys.public.auth.logout(),
		mutationFn: logout,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: queryKeys.public.auth.session(),
			})
		},
	})
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
		mutationFn: (review: Pick<Review, 'comment' | 'rate'>) =>
			postReview(parseInt(bookId), review.rate, review.comment),
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

export function useCreateReviewState(bookId: string) {
	return useMutationState({
		filters: {
			mutationKey: mutationKeys.public.books.reviews.create(bookId),
			status: 'pending',
		},
		select(mutation) {
			return mutation.state.variables as
				| Pick<Review, 'userId' | 'comment' | 'rate'>
				| undefined
		},
	})
}

export function useSavedBooks() {
	return useQuery({
		queryKey: queryKeys.public.saved.list(),
		queryFn: () => fetchSavedBooks(),
	})
}

export function useAddSavedBook() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: mutationKeys.public.saved.add(),
		mutationFn: addBookToSaved,
		onSuccess: async (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: queryKeys.public.saved.list(),
			})

			queryClient.invalidateQueries({
				queryKey: queryKeys.public.books.detail(
					variables.bookId.toString(),
				),
			})
		},
	})
}

export function useRemoveSavedBook() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: mutationKeys.public.saved.remove(),
		mutationFn: (variables: { bookId: string }) =>
			removeBookFromSaved(variables.bookId),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: queryKeys.public.saved.list(),
			})

			queryClient.invalidateQueries({
				queryKey: queryKeys.public.books.detail(
					variables.bookId.toString(),
				),
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

export function useCartBooks() {
	return useQuery({
		queryKey: queryKeys.public.cart.list(),
		queryFn: () => fetchCartBooks(),
	})
}

export function useAddCartBook() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: mutationKeys.public.cart.add(),
		mutationFn: (book: CartBook) => addBookToCart({ bookId: book.id }),
		onSettled: () =>
			queryClient.invalidateQueries({
				queryKey: queryKeys.public.cart.list(),
			}),
	})
}

// export function useAddCartBookState() {
// 	return useMutationState({
// 		filters: {
// 			mutationKey: mutationKeys.public.cart.add(),
// 			status: 'pending',
// 		},
// 		select(mutation) {
// 			return mutation.state.variables as Book | undefined
// 		},
// 	})
// }
//
// export function useRemoveCartBookState() {
// 	return useMutationState({
// 		filters: {, variables
// 			mutationKey: mutationKeys.public.cart.remove(),
// 			status: 'pending',
// 		},
// 		select(mutation) {
// 			return mutation.state.variables as Book
// 		},
// 	})
// }

const updateBookInCartDebounced = debounce(updateBookInCart)

export function useUpdateCartBook() {
	const queryClient = useQueryClient()
	const queryKey = queryKeys.public.cart.list()
	return useMutation({
		mutationKey: mutationKeys.public.cart.update(),
		mutationFn: (data: { bookId: string; quantity: number }) =>
			updateBookInCartDebounced(data.bookId, { quantity: data.quantity }),
		onMutate: async (data) => {
			await queryClient.cancelQueries({ queryKey })

			const previousCart =
				queryClient.getQueryData<FetchCartBooksResponse>(queryKey)

			queryClient.setQueryData(
				queryKey,
				(prev: FetchCartBooksResponse) => {
					let quantityStale = 0

					const books = [...prev.books]
					for (const book of books) {
						if (book.id === data.bookId) {
							quantityStale = book.quantity
							book.quantity = data.quantity
						}
					}

					return {
						...prev,
						books,
						total: prev.total - quantityStale + data.quantity,
					}
				},
			)

			return previousCart
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey })
		},
	})
}

export function useRemoveCartBook() {
	const queryClient = useQueryClient()
	const queryKey = queryKeys.public.cart.list()
	return useMutation({
		mutationKey: mutationKeys.public.cart.remove(),
		mutationFn: (data: { bookId: string }) =>
			removeBookFromCart(data.bookId),
		onMutate: async (data) => {
			await queryClient.cancelQueries({ queryKey })

			const previousCart =
				queryClient.getQueryData<FetchCartBooksResponse>(queryKey)

			queryClient.setQueryData(
				queryKey,
				(prev: FetchCartBooksResponse) => {
					let quantityToRemove = 0

					const books = prev.books.filter((book) => {
						if (book.id === data.bookId) {
							quantityToRemove = book.quantity
							return false
						}

						return true
					})

					return {
						...prev,
						books,
						total: prev.total - quantityToRemove,
					}
				},
			)

			return previousCart
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey })
		},
	})
}

export function useClearCart() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: mutationKeys.public.cart.clear(),
		mutationFn: clearCart,
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: queryKeys.public.cart.list(),
			})
		},
	})
}
