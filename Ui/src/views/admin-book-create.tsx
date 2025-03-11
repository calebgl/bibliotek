import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ChangeEvent, FormEvent, useState } from 'react'
import { NavLink, useNavigate } from 'react-router'

import { createAdminBook } from '../lib/api'
import { assert } from '../lib/assert'
import { CreateBook } from '../types/book'

export function AdminBookCreate() {
	const navigate = useNavigate()
	const [coverImage, setCoverImage] = useState<File | null | undefined>()

	const queryClient = useQueryClient()
	const { mutateAsync } = useMutation({
		mutationKey: ['createAdminBook'],
		mutationFn: (book: CreateBook) => createAdminBook(book),
		onSettled: () =>
			queryClient.invalidateQueries({
				queryKey: ['admin', 'books'],
			}),
	})

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

		mutateAsync({
			title,
			subtitle,
			author,
			description,
			price: Number.parseInt(price),
			stockQuantity: Number.parseInt(stockQuantity),
			coverImage: null,
		})

		navigate('/admin/books')
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
						className="cursor-pointer bg-gray-300 px-4 py-2"
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
										type="text"
										name="title"
										className="border border-gray-200 px-2 py-1"
									/>
								</label>
								<label className="grid grid-rows-2">
									Subtitle
									<input
										type="text"
										name="subtitle"
										className="border border-gray-200 px-2 py-1"
									/>
								</label>
								<label className="grid grid-rows-2">
									Author
									<input
										type="text"
										name="author"
										className="border border-gray-200 px-2 py-1"
									/>
								</label>
								<label className="col-span-2 grid">
									Description
									<textarea
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
										type="number"
										name="stockQuantity"
										className="border border-gray-200 px-2 py-1"
									/>
								</label>
								<label className="grid grid-rows-2">
									Price
									<input
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
