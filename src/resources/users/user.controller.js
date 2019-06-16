 /** import User model */
 import {
     User
 } from './user.model'
 import pick from 'lodash.pick'

 /** create the user controller */
 const userController = {
     async createUser(req, res) {
         try {
             const user = new User(pick(req.body, ['email', 'password']))
             await user.save()
             res.status(200).send(user)
         } catch (err) {
            res.status(400).send(err)
         }
     },
     async getUser(req, res){
        try {
            const result = await User.find({}, 'password email')
            res.status(200).send(result)
        }
        catch (err){
            res.status(404).send(err)
        }
     },
     async updateUser(req, res){
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true} )
            res.status(200).send(user)
        }
        catch (err){
            res.status(404).send(err)
        }
     },
 }
 export default userController