import type { ButtonHTMLAttributes } from 'react'
import { useParams } from 'react-router'

import { useBook } from '../hooks/use-api'
import { assert } from '../lib/assert'
import { Button } from './button'

type SaveButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	bookId?: string
}

export function ButtonSaveBook(props: SaveButtonProps) {
	const { bookId: bookIdProps, disabled, ...rest } = props
	const { bookId: bookIdParams } = useParams()

	const bookId = bookIdProps || bookIdParams
	assert(bookId)

	const { isLoading, isError } = useBook(bookId)

	return (
		<Button {...rest} disabled={disabled || isLoading || isError}>
			<span className="size-4">❤</span>
		</Button>
	)
}
