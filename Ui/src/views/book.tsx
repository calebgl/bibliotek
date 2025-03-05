import dayjs from 'dayjs'
import useSWR from 'swr'

import { Navbar } from '../components/navbar'
import { fetchBook, fetchReviews } from '../lib/api'
import { formatCurrency } from '../lib/utils'

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
			<Navbar />
			<div>
				<div className="space-y-16 p-4">
					<div className="flex gap-8">
						<div className="basis-1/2">
							<div className="bg-gray-100 p-16">
								<img
									src={book?.coverUrl}
									className="mx-auto max-w-64"
								/>
							</div>
						</div>
						<div className="flex basis-1/2 flex-col">
							<div className="text-4xl font-semibold">
								<h1>{book?.title}</h1>
							</div>
							<div className="flex items-center gap-1">
								<span>★★★★☆</span>{' '}
								<span className="text-sm">
									{book?.averageRating}
								</span>{' '}
								<span className="text-xs">
									({book?.totalReviews ?? 0})
								</span>
							</div>
							<div className="text-xl">
								<span>
									{book?.price
										? formatCurrency(book.price)
										: '-'}
								</span>
							</div>
							<div className="mt-auto flex gap-2">
								<button className="grow cursor-pointer bg-gray-300 px-4 py-2 active:bg-amber-500">
									Add to cart
								</button>
								<button className="cursor-pointer bg-gray-300 px-4 py-2 active:bg-amber-500">
									<span className="size-4">❤</span>
								</button>
							</div>
							<div className="">
								<p className="text-sm">
									Free delivery on orders over $30.00
								</p>
							</div>
						</div>
					</div>
					<div className="max-w-prose">{book?.description}</div>
					<div className="flex gap-16">
						<div className="basis-2/3 space-y-16">
							{reviews?.length === 0 && 'no reviews found'}
							{reviews?.map((r) => (
								<div
									key={r.id}
									className="grid grid-cols-[auto_1fr] gap-2"
								>
									<div className="size-12 bg-violet-200"></div>
									<div className="">
										<div className="flex justify-between">
											<div>{r.username}</div>
											<div>
												{dayjs(r.createdAt).format(
													'LLL',
												)}
											</div>
										</div>
										<div className="max-w-prose">
											{r.comment}
										</div>
										<div className="mt-12 flex gap-2">
											<button className="size-8 cursor-pointer bg-gray-300 px-2 py-1">
												<span className="">l</span>
											</button>
											<button className="size-8 cursor-pointer bg-gray-300 px-2 py-1">
												<span className="">d</span>
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
						<div className="basis-1/3">
							<div className="flex justify-between">
								<div>★★★★☆</div>
								<div>{book?.averageRating}</div>
							</div>
							<div>
								<div className="flex items-center justify-between gap-2">
									<div>5</div>
									<div className="h-2 grow">
										<div
											className="jiji relative size-full bg-gray-200"
											style={{
												['--width' as any]:
													(book?.stars.five ?? 0) /
													(book?.totalReviews ?? 1),
											}}
										></div>
									</div>
									<div>{book?.stars.five ?? 0}</div>
								</div>
								<div className="flex items-center justify-between gap-2">
									<div>4</div>
									<div className="h-2 grow">
										<div
											className="jiji relative size-full bg-gray-200"
											style={{
												['--width' as any]:
													(book?.stars.four ?? 0) /
													(book?.totalReviews ?? 1),
											}}
										></div>
									</div>
									<div>{book?.stars.four ?? 0}</div>
								</div>
								<div className="flex items-center justify-between gap-2">
									<div>3</div>
									<div className="h-2 grow">
										<div className="jiji relative size-full bg-gray-200"></div>
									</div>
									<div>{book?.stars.three ?? 0}</div>
								</div>
								<div className="flex items-center justify-between gap-2">
									<div>2</div>
									<div className="h-2 grow">
										<div className="jiji relative size-full bg-gray-200"></div>
									</div>
									<div>{book?.stars.two ?? 0}</div>
								</div>
								<div className="flex items-center justify-between gap-2">
									<div>1</div>
									<div className="h-2 grow">
										<div className="jiji relative size-full bg-gray-200"></div>
									</div>
									<div>{book?.stars.one ?? 0}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
