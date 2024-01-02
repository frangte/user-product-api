import * as bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'
import { NewBadRequestErr, NewRecordNotfoundErr } from '../common/exceptions'
import type { User } from '../models/user.model'

const prisma = new PrismaClient()
const serviceName = 'user-service'

export interface RegisterInput {
  email: string
  username: string
  password: string
  bio?: string
}

export interface UpdateInput {
  bio: string
}

export async function createUser(input: RegisterInput): Promise<User> {
  const email = input.email?.trim()
  const username = input.username?.trim()
  const password = input.password?.trim()
  const { bio } = input

  if (!email)
    throw NewBadRequestErr(serviceName, { errors: { email: ['can\'t be blank'] } })

  if (!username)
    throw NewBadRequestErr(serviceName, { errors: { username: ['can\'t be blank'] } })

  if (!password)
    throw NewBadRequestErr(serviceName, { errors: { password: ['can\'t be blank'] } })

  await checkUserUniqueness(email, username)

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
      ...(bio ? { bio } : {}),
    },
    select: {
      id: true,
      email: true,
      username: true,
      bio: true,
      password: true,
    },
  })

  return user
}

export async function updateUser(id: number, update: UpdateInput): Promise<User> {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      bio: update.bio,
    },
  })
  return user
}

export async function validateUser(email: string, password: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      email: true,
      password: true,
    },
  })
  if (!user)
    return false

  return bcrypt.compareSync(password, user.password)
}

export async function getUserByID(id: number): Promise<User> {
  return getUserOrThrow(id)
}

async function getUserOrThrow(id: number): Promise<User> {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  })
  if (!user)
    throw NewRecordNotfoundErr(serviceName, { errors: { message: 'user not found' } })

  return user
}

async function checkUserUniqueness(email: string, username: string) {
  const existingUserByEmail = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  })

  const existingUserByUsername = await prisma.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  })

  if (existingUserByEmail || existingUserByUsername) {
    throw NewBadRequestErr(serviceName, {
      errors: {
        ...(existingUserByEmail ? { email: ['has already been taken'] } : {}),
        ...(existingUserByUsername ? { username: ['has already been taken'] } : {}),
      },
    })
  }
}
