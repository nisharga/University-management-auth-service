 
import cors from 'cors'
import express, { Application, NextFunction, Request, Response } from 'express' 
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import routes from './app/routes'
import httpStatus from 'http-status'
import { errorlogger, logger } from './shared/looger'


const app: Application = express()
// const port = 3000

app.use(cors())
// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/v1', routes); 


//global error handler
app.use(globalErrorHandler);


//handle not found
app.use((req : Request, res : Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not found',
    errormessages: [{
      path: req.originalUrl,
      message: 'API Not Found'
    }]
  })
  next();
})  


export default app 