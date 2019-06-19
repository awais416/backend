import jwt from 'jsonwebtoken'
import config from './config'

/** check if user is admin */
export const isAdmin = (req,res,next) => {
    console.log({"req.user2":req.user})

    if (!req.user.isAdmin) {
        return res.status(403).send('No')
    }
    next()
}
/** validate access token */
export const authorization = (req, res, next) => {
    const token = req.header('x-access-token')
    if (!token) {
        return res.status(401).send("You must sign in first")
    }
    try {
        const userInfo = jwt.verify(token,config.secrets.JWT_SECRET)
        req.user = userInfo
        console.log({"req.user":req.user})
        next()
    } catch (err) {
        res.status(400).send("Token invalid of has expired")
    }
}
// export const logger = (req, res, next) => {
//     console.log(`Incoming ${req.method} :: with status ${res.statusCode} :: request to ${req.url}`)
//     next()
// }

/** Not found error handler */
export const notFound = (req, res, next) => {
    const error = new Error(`404 Page not found`)
    error.status = 404
    next(error)
}

export const catchErrors = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res)
        } catch (err) {
            next(err)
        }
    }
}

/** default error handler, we dont need next here because it is the last function in the middleware stack */
export const logErrors = (error, req, res) => {
    res.status(error.status || 500)
    res.send(error.message)
}