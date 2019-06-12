import express from 'express'
import { dataBaseConnect } from './database'
import config from './config'
const app = express()
dataBaseConnect() 
app.get('/', (req,res) => res.send("Yes it works"))
const port = config.port
app.listen(port,() => console.log(`Server is running on http://localhost:${port}`))
var f = "as"
if (f){
 console.log("ds")
}