import express from 'express'
import {sanitizeBody} from 'express-validator/filter'
import {catchErrors, authorization} from './middlewares'
export const router = express.Router()
import {
    userRouter
} from './resources/users/user.router'
import userController from './resources/users/user.controller'
router.get('/', (req, res) => res.send("Home Page"))
router.get('/about', (req, res) => res.send("About Page"))
router.get('/signin', (req, res) => res.send("signin"))
router.post('/signin',userController.signIn)
router.get('/me', authorization,userController.getDashboard)
router.post('/signup', [sanitizeBody('email').trim().escape()], catchErrors(userController.createUser))
router.use('/users', userRouter)