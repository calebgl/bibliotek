import { useLocation } from 'react-router'

import { useSetAtom } from 'jotai'
import { ReactNode } from 'react'
import { useCartBooks } from '../hooks/use-api'
import { openAtom } from '../stores/cart'
import { Button } from './button'

export function ButtonToggleCart() {
	const location = useLocation()
	const isLocationCart = location.pathname !== '/cart'

	const setOpen = useSetAtom(openAtom)

	const { data } = useCartBooks()
	const handleCloseCart = isLocationCart
		? () => {
				setOpen((prev) => !prev)
			}
		: undefined

	const TotalCount: ReactNode | null = <span>({data?.total ?? '-'})</span>

	return (
		<Button
			key={'cart-toggle'}
			onClick={handleCloseCart}
			className="bg-transparent px-1 active:bg-transparent"
		>
			cart{TotalCount}
		</Button>
	)
}
