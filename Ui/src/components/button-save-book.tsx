import { Heart, HeartOff } from 'lucide-react'
import type { ButtonHTMLAttributes } from 'react'
import { useState } from 'react'

import { useAddSavedBook, useRemoveSavedBook } from '../hooks/use-api'
import { cn } from '../lib/utils'
import type { SavedBook } from '../types'
import { Button } from './button'

type SaveButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	book: SavedBook
	isSaved?: boolean
}

export function ButtonSaveBook(props: SaveButtonProps) {
	const { isSaved, ...rest } = props

	const [Icon, setIcon] = useState<typeof Heart>(Heart)

	const add = useAddSavedBook()
	const remove = useRemoveSavedBook()

	async function handleClick() {
		if (isSaved !== undefined) {
			const variables = { bookId: props.book.id }
			const fn = isSaved ? remove.mutateAsync : add.mutateAsync
			await fn(variables)

			if (isSaved) {
				setIcon(Heart)
			}
		}
	}

	function handleMouseEnter() {
		if (isSaved) {
			setIcon(HeartOff)
		}
	}

	function handleMouseLeave() {
		setIcon(Heart)
	}

	return (
		<Button
			disabled={add.isPending || remove.isPending}
			onClick={handleClick}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...rest}
			className="group grid aspect-square size-10 place-content-center"
		>
			<Icon
				className={cn('stroke-red-600 stroke-1 transition-colors', {
					'fill-red-600': isSaved,
					'fill-gray-100 group-hover:fill-red-600': !isSaved,
					'stroke-red-600': Icon === HeartOff,
				})}
			/>
		</Button>
	)
}

export function ButtonSaveBookSkeleton() {
	return (
		<Button className="grid aspect-square size-10 animate-pulse place-content-center p-0" />
	)
}
