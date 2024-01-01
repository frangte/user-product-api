import * as express from 'express'
import * as cors from 'cors'
import * as bodyParser from 'body-parser'
import 'express-async-errors'

import { errorHandler } from './middleware/error'
import routes from './routes'

const PORT = process.env.PORT || 9000;

(async () => {
  const app = express()

  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(routes);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.info(`user-api up on port ${PORT}`)
  })
})()
