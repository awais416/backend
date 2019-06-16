import express from 'express'
import userController from './user.controller'
export const userRouter = express.Router()
userRouter
.route('/')
.get(userController.getUsers)
.post(userController.createUser)  // Remove this : dont need this router anymore, we are using this in main router.js in signup

userRouter
.route('/:id')
.get(userController.getProfile)
.put(userController.updateUser)  
.delete(userController.deleteUser)
