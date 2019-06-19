import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import logger from 'morgan'
import { dataBaseConnect } from './database'
import config from './config'
import { router } from './router'
// import {logger} from './middlewares'
import {notFound, logErrors} from './middlewares'

const app = express()
dataBaseConnect() 
app.use(express.static(path.join(__dirname, 'assets')))
app.use(bodyParser.json()) // read json
app.use(bodyParser.urlencoded({extended:true})) //used for extracting certain data from url e.g url,hostname,protocol, query, port etc
// app.use( logger )
if (app.get('env') === 'development'){
    app.use(logger('dev'))
}
app.use('/', router)
app.use(notFound)
app.use(logErrors)
const port = config.port
app.listen(port,() => console.log(`Server is running on http://localhost:${port}`))
 