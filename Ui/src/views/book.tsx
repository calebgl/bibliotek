import dayjs from 'dayjs'
import { useEffect, useRef, useState } from 'react'

async function fetchBook(id: string) {
	const resp = await fetch('/api/books/' + id)
	if (!resp.ok) {
		throw new Error('error fetching book ' + id)
	}

	return resp.json()
}

async function fetchReviews(bookId: string): Promise<Review[]> {
	const resp = await fetch('/api/reviews/' + bookId)
	if (!resp.ok) {
		throw new Error('error fetching reviews for book ' + bookId)
	}

	return resp.json()
}

type Book = {
	id: string
	title: string
	author: string
	coverUrl: string
	description: string
	price: number
	totalReviews: number
	averageRating: number
	stars: {
		one: number
		two: number
		three: number
		four: number
		five: number
	}
}

type Review = {
	id: number
	rate: number
	userId: number
	username: string
	comment: string
	createdAt: string | Date
	updatedAt: string | Date
}

const format = new Intl.NumberFormat('es-mx', {
	style: 'currency',
	currency: 'MXN',
}).format

function sleep(ms: number = 1000) {
	return new Promise((r) => setTimeout(r, ms))
}

export function Book() {
	const [toggleCart, setToggleCart] = useState<boolean>(false)
	const modalRef = useRef<HTMLDivElement>(null)

	const [book, setBook] = useState<Book | null>(null)
	const [reviews, setReviews] = useState<Review[]>([])

	useEffect(() => {
		;(async () => {
			await sleep()
			setBook(await fetchBook('1'))
		})()
		;(async () => {
			await sleep()
			setReviews(await fetchReviews('1'))
		})()
	}, [])

	useEffect(() => {
		function ev(e: KeyboardEvent) {
			if (toggleCart && e.code === 'Escape') {
				setToggleCart(false)
			}
		}

		window.addEventListener('keyup', ev)

		return () => {
			window.removeEventListener('keyup', ev)
		}
	}, [toggleCart])

	return (
		<>
			{toggleCart && (
				<div
					ref={modalRef}
					className="fixed inset-0 z-50 overflow-y-hidden bg-gray-900/30 backdrop-blur-xs"
					onClick={(e) => {
						if (e.target === modalRef.current) {
							setToggleCart(false)
						}
					}}
				>
					<div className="fixed top-0 right-0 h-full w-1/3 bg-white"></div>
				</div>
			)}
			<div className="sticky top-0 left-0">
				<div className="grid grid-cols-3 justify-between p-4">
					<div>logo</div>
					<div className="justify-self-center">searchbar</div>
					<div className="flex gap-2 justify-self-end">
						<button onClick={() => setToggleCart((prev) => !prev)}>
							cart
						</button>
						<button>saved</button>
						<button>profile</button>
					</div>
				</div>
				<div className="p-4 pt-0">
					<nav className="flex justify-stretch gap-2">
						<span>1</span>
						<span>2</span>
						<span>3</span>
						<span>4</span>
						<span>5</span>
					</nav>
				</div>
			</div>
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
									{book?.price ? format(book.price) : '-'}
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
							{reviews.map((r) => (
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
