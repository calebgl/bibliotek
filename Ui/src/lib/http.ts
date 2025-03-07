export const HttpStatus = {
	OK: 200,
	Created: 201,
	NoContent: 204,
	BadRequest: 400,
	Unauthorized: 401,
	Forbidden: 403,
	NotFound: 404,
	InternalServerError: 500,
	NotImplemented: 501,
} as const

export type HttpStatus = (typeof HttpStatus)[keyof typeof HttpStatus]

export class HttpError extends Error {
	status: HttpStatus

	constructor(status: HttpStatus)
	constructor(status: HttpStatus, message: string)
	constructor(status: HttpStatus, message?: string) {
		super(message)
		this.status = status
	}
}
