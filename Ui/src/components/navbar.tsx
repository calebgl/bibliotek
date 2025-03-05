import { useEffect, useRef, useState } from 'react'

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
			{toggleCart && (
				<div
					ref={modalRef}
					className="fixed inset-0 z-50 overflow-y-hidden bg-gray-900/30 backdrop-blur-xs"
					onClick={(e) => {
						if (e.target === modalRef.current) {
							setToggleCart(false)
						}
					}}
				>
					<div className="fixed top-0 right-0 h-full w-1/3 bg-white"></div>
				</div>
			)}
			<div className="sticky top-0 left-0">
				<div className="grid grid-cols-3 justify-between p-4">
					<div>logo</div>
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
					<nav className="flex justify-stretch gap-2">
						<span>1</span>
						<span>2</span>
						<span>3</span>
						<span>4</span>
						<span>5</span>
					</nav>
				</div>
			</div>
		</>
	)
}
