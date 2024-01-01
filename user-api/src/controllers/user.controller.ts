import { NextFunction, Request, Response, Router } from 'express';
import * as contract from './contract/contract'
import * as userService from '../services/user.service';

const router = Router();

router.get('/users', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.createUser(req.body);
    res.json(contract.UserResponse(user));
  } catch (error) {
    next(error);
  }
});

router.get('/users/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id
    const user = await userService.getUserByID(parseInt(id))
    res.json(contract.UserResponse(user));
  } catch (err) {
    next(err)
  } 
})

router.put('/users/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id
    const user = await userService.getUserByID(parseInt(id))
    res.json(contract.UserResponse(user));
  } catch (err) {
    next(err)
  } 
})
export default router;
