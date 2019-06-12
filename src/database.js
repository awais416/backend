import mongoose from 'mongoose'
import config from './config'
export const dataBaseConnect = () => {
    return mongoose.connect(config.database)
    .then(() => console.log("MongoDB is Ready"))
    .catch( err => console.error(`Something went wrong ${err}`))
}