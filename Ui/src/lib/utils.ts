import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function sleep(ms: number = 500): Promise<void> {
	return new Promise((r) => setTimeout(r, ms))
}

export const formatCurrency = new Intl.NumberFormat('es-mx', {
	style: 'currency',
	currency: 'MXN',
}).format

export const formatDecimal = new Intl.NumberFormat('es-mx', {
	style: 'decimal',
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
}).format

export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs))
}
