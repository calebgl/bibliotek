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

export function debounce<
	Fn extends (...args: Parameters<Fn>) => Promise<Awaited<ReturnType<Fn>>>,
	Return = Awaited<ReturnType<Fn>>,
>(fn: Fn, waitFor: number = 300) {
	let timeout: ReturnType<typeof setTimeout>

	return (...args: Parameters<Fn>): Promise<Return> => {
		clearTimeout(timeout)
		return new Promise<Return>((resolve, reject) => {
			timeout = setTimeout(async () => {
				try {
					resolve(await fn(...args))
				} catch (error) {
					reject(error)
				}
			}, waitFor)
		})
	}
}
