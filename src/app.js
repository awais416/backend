import express from 'express'
import bodyParser from 'body-parser'
import { dataBaseConnect } from './database'
import config from './config'
import { router } from './router'
const app = express()
dataBaseConnect() 
app.use(bodyParser.json()) // read json
app.use(bodyParser.urlencoded({extended:true})) //used for extracting certain data from url e.g url,hostname,protocol, query, port etc
app.use('/', router)
const port = config.port
app.listen(port,() => console.log(`Server is running on http://localhost:${port}`))
 