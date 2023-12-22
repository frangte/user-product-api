import { NextFunction, Request, Response, Router } from 'express';
import { createUser } from '../services/user.service';

const router = Router();

/**
 * Create an user
 * @auth none
 * @route {POST} /users
 * @bodyparam user User
 * @returns user User
 */
router.post('/users', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await createUser(req.body);
    res.json({ user });
  } catch (error) {
    next(error);
  }
});

export default router;
