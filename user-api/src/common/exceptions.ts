export class InternalException extends Error {
  service: string
  errorCode: number

  constructor(service: string, errorCode: number, public readonly message: string | any) {
    super(message)
    this.errorCode = errorCode
    this.service = service
  }
}
