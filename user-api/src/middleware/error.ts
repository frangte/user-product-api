import { NextFunction, Request, Response } from 'express'
import { InternalException } from '../common/exceptions';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof InternalException) {
    const internalError = (err as InternalException)
    res.status(internalError.httpStatusCode).send(internalError.message)
    return
  }
  res.status(500).send({ errors: [{ message: "Something went wrong" }] });
}
