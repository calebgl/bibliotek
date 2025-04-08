import type { ButtonHTMLAttributes } from 'react'

import { useAddSavedBook, useRemoveSavedBook } from '../hooks/use-api'
import { SavedBook } from '../types'
import { Button } from './button'
import { cn } from '../lib/utils'

type SaveButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	book: SavedBook
	isSaved?: boolean
}

export function ButtonSaveBook(props: SaveButtonProps) {
	const { isSaved, ...rest } = props

	const add = useAddSavedBook()
	const remove = useRemoveSavedBook()

	async function handleClick() {
		if (isSaved !== undefined) {
			const variables = { bookId: props.book.id }
			const fn = isSaved ? remove.mutateAsync : add.mutateAsync
			await fn(variables)
		}
	}

	return (
		<Button
			disabled={add.isPending}
			onClick={handleClick}
			{...rest}
			className={cn('grid aspect-square size-10 place-content-center', {
				'bg-red-400': isSaved,
			})}
		>
			❤
		</Button>
	)
}

export function ButtonSaveBookSkeleton() {
	return (
		<Button className="grid aspect-square size-10 animate-pulse place-content-center p-0" />
	)
}
