export function sleep(ms: number = 1000) {
	return new Promise((r) => setTimeout(r, ms))
}

export const formatCurrency = new Intl.NumberFormat('es-mx', {
	style: 'currency',
	currency: 'MXN',
}).format
