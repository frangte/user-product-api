import type { NextFunction, Request, Response } from 'express'
import { Router } from 'express'
import * as userService from '../services/user.service'
import * as contract from './contract/contract'

const router = Router()

router.get('/users', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.createUser(req.body)
    res.json(contract.UserResponse(user))
  }
  catch (error) {
    next(error)
  }
})

router.get('/users/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id
    const user = await userService.getUserByID(Number.parseInt(id))
    res.json(contract.UserResponse(user))
  }
  catch (err) {
    next(err)
  }
})

router.put('/users/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id
    const user = await userService.updateUser(Number.parseInt(id), {
      bio: req.body.bio,
    })
    res.json(contract.UserResponse(user))
  }
  catch (err) {
    next(err)
  }
})

router.post('/user/validate', async (req: Request, res: Response, next: NextFunction) => {
  try {
    userService.validateUser(req.body.email, req.body.password)
  }
  catch (err) {
    next(err)
  }
})

export default router
