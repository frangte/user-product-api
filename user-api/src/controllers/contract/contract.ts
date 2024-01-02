import type { User } from '../../models/user.model'

export interface ResponseData {
  data: any
}

export interface UserContract {
  id: number
  username: string
  email: string
  bio: string | null
}

export function UserResponse(user: User): ResponseData {
  return {
    data: {
      id: user.id,
      username: user.username,
      email: user.email,
      bio: user.bio,
    } as UserContract,
  } as ResponseData
}
