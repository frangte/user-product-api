import { StatusCodes } from 'http-status-codes'

export const ErrorCodes = {
  RecordNotfound: '11001',
  InvalidRequestParam: '11002',
  BadRequest: '11003',
}

export function NewInternalServerErr(service: string, errCode: string, message: string | any): InternalException {
  return new InternalException(service, errCode, StatusCodes.INTERNAL_SERVER_ERROR, message)
}

export function NewRecordNotfoundErr(service: string, message: string | any): InternalException {
  return new InternalException(service, ErrorCodes.RecordNotfound, StatusCodes.NOT_FOUND, message)
}

export function NewBadRequestErr(service: string, message: string | any): InternalException {
  return new InternalException(service, ErrorCodes.BadRequest, StatusCodes.BAD_REQUEST, message)
} 

export class InternalException extends Error {
  service: string
  errorCode: string
  httpStatusCode: number

  constructor(service: string, errorCode: string, httpStatusCode: number, public readonly message: string | any) {
    super(message)
    this.service = service
    this.errorCode = errorCode
    this.httpStatusCode = httpStatusCode
  }
}
