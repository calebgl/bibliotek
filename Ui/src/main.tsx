import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  NavLink,
  Outlet,
  RouterProvider,
  useLoaderData,
  useNavigate,
  useViewTransitionState,
} from 'react-router'
// import App from './app/app'
import './app/app.css'

async function sleep(ms: number = 500) {
  return new Promise((f) => setTimeout(f, ms))
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Err />,
    children: [
      {
        index: true,
        loader: async function () {
          const resp = await fetch('/api/books')
          // await sleep()
          return await resp.json()
        },
        element: <BookList />,
        errorElement: <Err />,
        hydrateFallbackElement: <div>loading books...</div>,
      },
      {
        path: '/:bookId',
        loader: async function ({ params }) {
          console.log(params)
          const resp = await fetch('/api/books/' + params.bookId)
          // await sleep()
          return await resp.json()
        },
        element: <BookDetails />,
        errorElement: <Err />,
        hydrateFallbackElement: <div>loading book...</div>,
      },
    ],
  },
])

const format = new Intl.NumberFormat('es-mx', {
  currency: 'MXN',
  notation: 'standard',
  style: 'currency',
}).format

function App() {
  return (
    <div className="flex h-svh">
      {/*sidebar*/}
      <div className="min-w-16 basis-[5%] overflow-y-auto bg-amber-50">
        <div className="flex h-full flex-col items-center justify-between gap-16 py-8 md:gap-32">
          <div>l</div>
          <nav className="flex flex-col gap-4">
            <p>h</p>
            <p>r</p>
            <p>s</p>
            <p>c</p>
          </nav>
          <div>b</div>
        </div>
      </div>
      {/*sidebarend*/}

      <div className="flex grow flex-col">
        {/*navbar*/}
        <div className="z-50 bg-fuchsia-100">
          <div className="flex gap-4 p-8 [&>div]:px-4 [&>div]:py-2">
            <div className="mr-auto basis-[50%] bg-emerald-100">search bar</div>
            <div className="bg-indigo-100">profile</div>
            <div className="bg-rose-100">cart</div>
          </div>
        </div>
        {/*navbarend*/}

        <div className="grow overflow-y-auto px-16 py-8">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

function BookList() {
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

  return <div className="grid grid-cols-4">{bookItems}</div>
}

function BookDetails() {
  const book = useLoaderData()
  const navigate = useNavigate()

  const [reviews, setReviews] = useState<any[]>([])
  useEffect(() => {
    ;(async function () {
      const resp = await fetch('/api/reviews/' + book.id)
      const json = await resp.json()
      setReviews(json)
    })()
  }, [])

  window.scrollTo({ top: 0 })

  return (
    <div className="relative" key={book.id}>
      <button onClick={() => navigate(-1)} className="absolute top-0 left-0">
        b
      </button>
      <div className="flex min-h-fit justify-center gap-8 p-8">
        <div className="basis-64">
          <img
            className="mx-auto object-cover duration-1000"
            src={book.coverUrl}
            style={{
              viewTransitionName: 'image-translate',
            }}
          />
        </div>
        <div className="basis-[65ch]">
          <p className="text-2xl font-bold">{book.title}</p>
          <p className="text-lg">{book.author}</p>
          <p className="text-lg">{format(book.price)}</p>
          <p className="mt-4 w-[65ch]">{book.description}</p>
        </div>
      </div>
      <ul>
        {reviews.map((r: any) => (
          <Review r={r} key={r.id} />
        ))}
      </ul>
    </div>
  )
}

const colors = [
  'bg-amber-100',
  'bg-blue-100',
  'bg-emerald-100',
  'bg-pink-100',
  'bg-green-100',
  'bg-red-100',
  'bg-gold-100',
  'bg-black',
]

let i = 0

function Review({ r }: any) {
  const color = colors[i++ % colors.length]
  return (
    <li className="review">
      <div className={`${color} review__image size-12 rounded-full`}></div>
      <div className="review__username my-auto">{r.username}</div>
      <div className="review__comment">{r.comment}</div>
    </li>
  )
}

function Err() {
  return <div>Somethign went wrong!</div>
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
