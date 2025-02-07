import { Outlet } from 'react-router'
import './app.css'

import { ThemeProvider } from './theme-context'
import { useEffect, useState } from 'react'

export default function App() {
  const [books, setBooks] = useState([])

  async function fetchBooks() {
    const resp = await fetch('/api/books')
    const json = await resp.json()
    setBooks(json)
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  const bookItems = books.map((book: any) => {
    return (
      <div className="h-[90%] space-y-2 text-center" key={book.id}>
        <div className="aspect-square">
          <img className="mx-auto h-full object-cover" src={book.coverUrl} />
        </div>
        <div>
          <p className="font-bold">{book.title}</p>
          <p className="text-sm">{book.author}</p>
        </div>
      </div>
    )
  })

  return (
    <ThemeProvider>
      <div className="flex h-svh bg-blue-100">
        {/*sidebar*/}
        <div className="min-w-12 basis-[5%] overflow-y-auto">
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

        <div className="grow overflow-y-auto">
          {/*navbar*/}
          <div className="bg-fuchsia-100">
            <div className="flex gap-4 p-8 [&>div]:px-4 [&>div]:py-2">
              <div className="mr-auto basis-[50%] bg-emerald-100">
                search bar
              </div>
              <div className="bg-indigo-100">profile</div>
              <div className="bg-rose-100">cart</div>
            </div>
          </div>
          {/*navbarend*/}
          <div className="bg-amber-100">
            <div className="px-16 py-8">
              <div className="grid grid-cols-4">{bookItems}</div>
            </div>
            <div className="px-16">
              <code>
                <pre>{JSON.stringify(books, null, 2)}</pre>
              </code>
            </div>
            <div className="h-90 px-16 py-8">Hello from App</div>
            <div className="h-90 px-16 py-8">Hello from App</div>
            <div className="h-90 px-16 py-8">Hello from App</div>
            <div className="h-90 px-16 py-8">Hello from App</div>
            <div className="h-90 px-16 py-8">Hello from App</div>
          </div>
          <Outlet />
        </div>
      </div>
    </ThemeProvider>
  )
}
