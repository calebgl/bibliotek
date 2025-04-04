import { useAtom } from 'jotai'
import { Suspense, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { NavLink } from 'react-router'

import { openAtom } from '../stores/cart'
import { CartDrawer } from './cart-drawer'
import { NavbarActions, NavbarActionsSkeleton } from './navbar-actions'

export function Navbar() {
	const [open, setOpen] = useAtom(openAtom)
	const modalRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		function ev(e: KeyboardEvent) {
			if (open && e.code === 'Escape') {
				setOpen(false)
			}
		}

		if (open) {
			document.body.style.overflowY = 'hidden'
		} else {
			document.body.style.overflowY = 'visible'
		}

		window.addEventListener('keyup', ev)

		return () => {
			window.removeEventListener('keyup', ev)
		}
	}, [open, setOpen])

	return (
		<>
			{open &&
				createPortal(
					<CartDrawer
						ref={modalRef}
						onClose={(event) => {
							if (event.target === modalRef.current) {
								setOpen(false)
							}
						}}
					/>,
					document.body,
				)}
			<div className="sticky top-0 left-0">
				<div className="grid h-16 grid-cols-3 justify-between p-4">
					<div>
						<NavLink to="/">logo</NavLink>
					</div>
					<div className="justify-self-center">searchbar</div>
					<div className="flex items-center gap-2 justify-self-end">
						<Suspense fallback={<NavbarActionsSkeleton />}>
							<NavbarActions />
						</Suspense>
					</div>
				</div>
				<div className="p-4 pt-0">
					<nav className="flex justify-start gap-2">
						{[1, 2, 3, 4, 15].map((index) => (
							<NavLink key={index} to={'/books/' + index}>
								{index}
							</NavLink>
						))}
					</nav>
				</div>
			</div>
		</>
	)
}
