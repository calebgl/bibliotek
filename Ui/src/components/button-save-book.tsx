import type { ButtonHTMLAttributes } from 'react'

import { Button } from './button'

type SaveButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	bookId?: string
}

export function ButtonSaveBook(props: SaveButtonProps) {
	return (
		<Button
			{...props}
			className="grid aspect-square size-10 place-content-center"
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
