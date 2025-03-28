import { useAtom } from 'jotai'
import { Suspense, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { NavLink } from 'react-router'

import { openAtom } from '../stores/cart'
import { Cart } from './cart'
import { NavbarActions } from './navbar-actions'

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
	}, [open])

	return (
		<>
			{open &&
				createPortal(
					<Cart
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
				<div className="grid grid-cols-3 justify-between p-4">
					<div>
						<NavLink to="/">logo</NavLink>
					</div>
					<div className="justify-self-center">searchbar</div>
					<div className="flex items-center gap-2 justify-self-end">
						<Suspense
							fallback={
								<div className="h-5 w-32 animate-pulse bg-gray-200" />
							}
						>
							<NavbarActions
								onCloseCart={() => setOpen((prev) => !prev)}
							/>
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
