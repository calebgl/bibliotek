import { ChangeEvent, FormEvent, useState } from 'react'
import { NavLink, useParams } from 'react-router'

import { useAdminBook, useUpdateAdminBook } from '../hooks/use-api'
import { assert } from '../lib/assert'

export function AdminBookUpdateView() {
	const { bookId } = useParams()
	assert(bookId)

	const [coverImage, setCoverImage] = useState<File | null | undefined>()

	const { data: book, isLoading, error } = useAdminBook(bookId)
	const { mutateAsync, isIdle, isPaused, isPending } =
		useUpdateAdminBook(bookId)

	if (isLoading) {
		return 'loading...'
	}
	if (error) {
		throw error
	}

	assert(book)

	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		setCoverImage(event.target.files?.[0])
	}

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()

		const formData = new FormData(event.currentTarget)
		const title = formData.get('title')
		const description = formData.get('description')
		const author = formData.get('author')
		const subtitle = formData.get('subtitle')
		const price = formData.get('price')
		const stockQuantity = formData.get('stockQuantity')

		assert(typeof title == 'string')
		assert(typeof description === 'string')
		assert(typeof author === 'string')
		assert(typeof subtitle === 'string')
		assert(typeof price === 'string')
		assert(typeof stockQuantity === 'string')

		assert(bookId)

		mutateAsync({
			title,
			subtitle,
			author,
			description,
			price: Number.parseInt(price),
			stockQuantity: Number.parseInt(stockQuantity),
			coverImage: null,
		})
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="flex items-center gap-4">
				<NavLink
					to="/admin/books"
					className="cursor-pointer bg-gray-300 px-4 py-2"
				>
					back
				</NavLink>
				<h2>Create book</h2>
				<div className="ml-auto flex gap-2">
					<NavLink
						to="/admin/books"
						className="cursor-pointer bg-gray-300 px-4 py-2"
					>
						cancel
					</NavLink>
					<button
						type="submit"
						className="cursor-pointer bg-gray-300 px-4 py-2 disabled:cursor-not-allowed disabled:bg-gray-200"
						disabled={isPending}
					>
						save
					</button>
				</div>
			</div>
			<div className="flex gap-4">
				<div className="basis-1/4">
					<fieldset className="">
						<label className="grid aspect-square size-full max-w-48 cursor-pointer place-content-center border border-dashed border-gray-300 bg-gray-50">
							<div className="">
								{coverImage ? (
									<img
										src={URL.createObjectURL(coverImage)}
									/>
								) : (
									<p>Click to upload</p>
								)}
							</div>
							<input
								type="file"
								accept="image/png"
								name="coverImage"
								onChange={handleChange}
								className="hidden"
							/>
						</label>
					</fieldset>
				</div>
				<div className="grow border border-gray-300">
					<div className="space-y-4 bg-white p-8 pb-12">
						<section className="space-y-4">
							<h3 className="text-xl font-semibold">
								Book details
							</h3>
							<fieldset className="grid grid-cols-2 gap-4">
								<label className="grid grid-rows-2">
									Title
									<input
										defaultValue={book.title}
										type="text"
										name="title"
										className="border border-gray-200 px-2 py-1"
									/>
								</label>
								<label className="grid grid-rows-2">
									Subtitle
									<input
										defaultValue={
											book.subtitle ?? undefined
										}
										type="text"
										name="subtitle"
										className="border border-gray-200 px-2 py-1"
									/>
								</label>
								<label className="grid grid-rows-2">
									Author
									<input
										defaultValue={book.author}
										type="text"
										name="author"
										className="border border-gray-200 px-2 py-1"
									/>
								</label>
								<label className="col-span-2 grid">
									Description
									<textarea
										defaultValue={
											book.description ?? undefined
										}
										name="description"
										className="resize-none border border-gray-200 px-2 py-1"
									/>
								</label>
							</fieldset>
						</section>
						<div className="my-8 h-[1px] w-full bg-gray-300" />
						<section className="space-y-4">
							<h3 className="text-xl font-semibold">
								Stock details
							</h3>
							<fieldset className="grid grid-cols-2 gap-4">
								<label className="grid grid-rows-2">
									Stock quantity
									<input
										defaultValue={book.stockQuantity}
										type="number"
										name="stockQuantity"
										className="border border-gray-200 px-2 py-1"
									/>
								</label>
								<label className="grid grid-rows-2">
									Price
									<input
										defaultValue={book.price}
										type="string"
										name="price"
										className="border border-gray-200 px-2 py-1"
									/>
								</label>
							</fieldset>
						</section>
					</div>
				</div>
			</div>
		</form>
	)
}
