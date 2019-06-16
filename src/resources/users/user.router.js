import express from 'express'
import userController from './user.controller'
export const userRouter = express.Router()
userRouter
.route('/')
.get(userController.getUser)
.post(userController.createUser)

userRouter
.route('/:id')
.put(userController.updateUser)  
