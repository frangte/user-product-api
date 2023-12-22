import bcrypt from "bcrypt"
import { PrismaClient } from '@prisma/client';
import { InternalException } from '../common/exceptions'
import { User } from '../models/user.model';

const prisma = new PrismaClient()
const serviceName = 'user-service'

export interface RegisterInput {
  email: string;
  username: string;
  password: string;
  image?: string;
  bio?: string;
}

export const createUser = async (input: RegisterInput): Promise<User> => {
  const email = input.email?.trim();
  const username = input.username?.trim();
  const password = input.password?.trim();
  const { image, bio } = input;

  if (!email) {
    throw new InternalException(serviceName, 422, { errors: { email: ["can't be blank"] } });
  }

  if (!username) {
    throw new InternalException(serviceName, 422, { errors: { username: ["can't be blank"] } });
  }

  if (!password) {
    throw new InternalException(serviceName, 422, { errors: { password: ["can't be blank"] } });
  }

  await checkUserUniqueness(email, username);

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
      ...(image ? { image } : {}),
      ...(bio ? { bio } : {}),
    },
    select: {
      id: true,
      email: true,
      username: true,
      bio: true,
      password: true,
    },
  });

  return user;
};

const checkUserUniqueness = async (email: string, username: string) => {
  const existingUserByEmail = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  const existingUserByUsername = await prisma.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });

  if (existingUserByEmail || existingUserByUsername) {
    throw new InternalException(serviceName ,422, {
      errors: {
        ...(existingUserByEmail ? { email: ['has already been taken'] } : {}),
        ...(existingUserByUsername ? { username: ['has already been taken'] } : {}),
      },
    });
  }
};
