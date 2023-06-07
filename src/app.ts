import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import { createUserController } from './app/modules/user.controller'
 const app: Application = express()
// const port = 3000

app.use(cors())
// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/v1/users/', createUserController);


app.get('/', async (req: Request, res: Response) => {
  res.send('Hello World!')
 
})

export default app
