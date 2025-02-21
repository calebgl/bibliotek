import { useEffect, useRef, useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router'
import { format } from '../lib/intl'
import dayjs from 'dayjs'

export function BookDetails() {
  const book = useLoaderData()
  const navigate = useNavigate()

  const [reviews, setReviews] = useState<any[]>([])
  const formRef = useRef<HTMLFormElement>(null)

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
          <p className="mt-4 w-[65ch]">
            {book.description?.slice(0, 1024).trim()}
            {book.description?.length > 1024 && '...'}
          </p>
        </div>
      </div>
      <section className="mx-auto max-w-2xl py-16">
        <h3 className="mb-8 text-xl font-semibold">Comments</h3>
        <ul className="space-y-8">
          <form
            ref={formRef}
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault()

              const formData = new FormData(formRef.current ?? undefined)

              console.log(Array.from(formData.entries()))

              formRef.current?.reset()
            }}
          >
            <textarea
              className="line w-full resize-none bg-slate-100 px-3 py-2 placeholder:italic"
              rows={4}
              placeholder="Leave a review..."
              name="comment"
            />
            <button className="ml-auto bg-violet-100 p-2">Comment</button>
          </form>
          {reviews.length === 0 && <div>No comments yet!</div>}
          {reviews.map((r: any) => {
            return (
              <li className="relative" key={r.id}>
                <div className="">{r.username}</div>
                <div className="">☆☆☆☆☆</div>
                <div className="absolute top-0 right-0 text-xs">
                  {dayjs(r.updatedAt).format('LLL')}
                </div>
                <div></div>
                <div className="">Good!</div>
                <div className="">{r.comment}</div>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}
