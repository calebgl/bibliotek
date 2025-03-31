import type { ButtonHTMLAttributes } from 'react'

import { Button } from './button'

type SaveButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	bookId?: string
}

export function ButtonSaveBook(props: SaveButtonProps) {
	return (
		<Button {...props}>
			<span className="size-4">❤</span>
		</Button>
	)
}
