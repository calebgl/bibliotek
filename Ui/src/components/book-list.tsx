import { NavLink, useLoaderData, useViewTransitionState } from 'react-router'
import { format } from '../lib/intl'

export function BookList() {
  const books = useLoaderData()
  const bookItems = books.map((book: any) => {
    const to = `/${book.id}`
    const isTransitioning = useViewTransitionState(to)
    return (
      <NavLink
        className="h-[90%] cursor-pointer space-y-2 text-center"
        to={to}
        key={book.id}
        viewTransition
      >
        <div className="aspect-square">
          <img
            className="mx-auto h-full object-cover"
            src={book.coverUrl}
            style={{
              viewTransitionName: isTransitioning ? 'image-translate' : '',
            }}
          />
        </div>
        <div>
          <p className="line-clamp-2 font-bold" title={book.title}>
            {book.title}
          </p>
          <p className="text-sm">{book.author}</p>
          <p className="text-sm">{format(book.price)}</p>
        </div>
      </NavLink>
    )
  })

  return <div className="grid grid-cols-4 gap-8">{bookItems}</div>
}
