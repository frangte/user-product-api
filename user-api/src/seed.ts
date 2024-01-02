import { faker } from '@faker-js/faker'
import * as userService from './services/user.service'
import type { RegisterInput } from './services/user.service'

(async () => {
  faker.seed(Date.now())
  for (let i = 0; i < 10; i++) {
    const user = await userService.createUser({
      username: faker.internet.userName(),
      password: faker.internet.password(),
      bio: faker.person.bio(),
      email: faker.internet.email(),
    } as RegisterInput)
    console.log('Created user: ', user.username, user.email)
  }
})()
