import express from 'express'
import userController from './user.controller'
import {
    sanitizeBody
} from 'express-validator/filter'
import {
    catchErrors, isAdmin ,authorization
} from '../../middlewares'

export const userRouter = express.Router()
userRouter
    .route('/')
    .get(catchErrors(userController.getUsers))
// .post(userController.createUser)  // Remove this : dont need this router anymore, we are using this in main router.js in signup

userRouter
    .route('/:id')
    .get(catchErrors(userController.getProfile))
    .put([sanitizeBody('email').trim().escape(),
            sanitizeBody('username').trim().escape(),
            sanitizeBody('photoUrl').trim().escape()
        ],
        catchErrors(userController.updateUser))
    .delete(authorization, isAdmin, catchErrors(userController.deleteUser))