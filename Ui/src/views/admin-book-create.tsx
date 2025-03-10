import { ChangeEvent, useState } from 'react'
import { NavLink } from 'react-router'

export function AdminBookCreate() {
	const [form, setForm] = useState<object>({
		title: '',
		subtitle: '',
		author: '',
		description: '',
		price: '',
		stockQuantity: 0,
		coverImage: '',
		releasedAt: new Date(),
	})

	function handleChange(
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) {
		setForm({
			...form,
			[event.target.name]: event.target.value,
		})
	}

	return (
		<div>
			<NavLink to="/admin/books">back</NavLink>
			<form>
				<label>
					Title
					<input type="text" onChange={handleChange} />
				</label>
				<label>
					Author
					<input type="text" onChange={handleChange} />
				</label>
				<label>
					Description
					<textarea onChange={handleChange} className="resize-none" />
				</label>
			</form>
		</div>
	)
}
