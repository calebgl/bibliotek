import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router'

import { Cart } from './cart'
import { createPortal } from 'react-dom'

export function Navbar() {
	const [toggleCart, setToggleCart] = useState<boolean>(false)
	const modalRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		function ev(e: KeyboardEvent) {
			if (toggleCart && e.code === 'Escape') {
				setToggleCart(false)
			}
		}

		window.addEventListener('keyup', ev)

		return () => {
			window.removeEventListener('keyup', ev)
		}
	}, [toggleCart])

	return (
		<>
			{toggleCart &&
				createPortal(
					<Cart
						ref={modalRef}
						onClose={(event) => {
							if (event.target === modalRef.current) {
								setToggleCart(false)
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
					<div className="flex gap-2 justify-self-end">
						<button onClick={() => setToggleCart((prev) => !prev)}>
							cart
						</button>
						<button>saved</button>
						<button>profile</button>
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
