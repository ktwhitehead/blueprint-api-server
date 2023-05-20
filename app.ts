import dotenv from 'dotenv'
import express from 'express'
// import helmet from 'helmet'
import serverless from 'serverless-http'
import cors from 'cors'
import { router } from './routes/router.js'

dotenv.config()

const app = express()

// app.use(helmet());
// should explicitly define origins
app.use(cors({ origin: '*' }))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', router)

if (process.env.ENVIRONMENT === 'dev') {
  const port = process.env.PORT || 3000
  app.listen(port, () => console.log(`App is listening on port ${port}.`))
}

export const sls = serverless(app)
