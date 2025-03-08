import { NavLink } from 'react-router'

import { useAdminBooks } from '../hooks/use-api'
import { assert } from '../lib/assert'
import { formatCurrency } from '../lib/utils'

export function AdminBooks() {
	const { data: books, isLoading, error } = useAdminBooks()
	if (error) {
		throw error
	}
	if (isLoading) {
		return 'loading...'
	}

	assert(books)

	return (
		<>
			<h2 className="text-xl font-bold">Books</h2>
			<NavLink to="/admin/books/create">add book</NavLink>
			<table className="w-full table-auto">
				<thead className="[&>tr]:mb-2">
					<tr className="bg-white text-left [&>th]:px-2 [&>th]:py-1 [&>th]:text-sm [&>th]:font-bold">
						<th></th>
						{/*<th>cover</th>*/}
						<th>Title</th>
						<th>Price</th>
						<th>Stock quantity</th>
						<th>Author</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody className="">
					{books.map((book) => (
						<tr
							key={book.id}
							className="odd:bg-neutral-100 even:bg-white/80 [&>td]:p-2"
						>
							<td className="w-4">
								<input type="checkbox" className="" />
							</td>
							{/*<td className="w-16">
							<img
								className="block h-full object-contain"
								src={book.coverUrl}
								alt={book.title}
							/>
						</td>*/}
							<td>{book.title}</td>
							<td>{formatCurrency(book.price)}</td>
							<td>{book.stockQuantity}</td>
							<td>{book.author}</td>
							<td className="flex gap-2">
								<button className="cursor-pointer">edit</button>
								<button className="cursor-pointer">
									delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	)
}
