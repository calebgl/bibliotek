type BookDetailsProps = {
	description: string
}

export function BookDetails(props: BookDetailsProps) {
	return <div className="max-w-prose">{props.description}</div>
}
