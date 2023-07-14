 
import app from './app'
import config from './config'
import mongoose from 'mongoose'
import  { errorlogger, logger } from './shared/looger'
import {Server} from 'http'

process.on('uncaughtException', error => {
  errorlogger.log(error)
  process.exit(1)
})

let server: Server;

async function boostrap() {  
  try {
    await mongoose.connect(config.database_url as string) 
   
    // eslint-disable-next-line no-console
    console.log("Database connected");

    server = app.listen(config.port, () => {
      // logger.info(`UM app listening on port ${config.port}`)

      // eslint-disable-next-line no-console
      console.log(`UM app listening on port ${config.port}`)

    })
  } catch (err) {
    // errorlogger.error('Faild to connected DB', err)
    // eslint-disable-next-line no-console
    console.log('Faild to connected DB', err)
  }

  process.on('unhandledRejection', error => {
     if(server){
      server.close( () => {
        errorlogger.error(error)
        process.exit(1);
      })
    }else{
    process.exit(1)
    }
  })

 
}
boostrap()

 

process.on("SIGTERM", () => {
  logger.info("SIGTERM is received")
  if(server){
    server.close()
  }
})