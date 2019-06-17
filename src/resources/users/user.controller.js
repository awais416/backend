 /** import User model */
 import {
     User, validateUser} from './user.model'
 import pick from 'lodash.pick'

 /** create the user controller */
 const userController = {
     async createUser(req, res) {
         try {
             /** secondary validation like joi */
            //  const err = validateUser(req.body)
            //  if (err){
            //      res.status(400).send(err)
            //  }
             const user = new User(pick(req.body, ['email', 'password']))
             await user.save()
             res.status(200).send(user)
         } catch (err) {
            res.status(400).send(err)
         }
     },
     async getUsers(req, res){
        try {
            const result = await User.find({})
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
     async deleteUser(req, res){
        try {
            const user = await User.deleteOne({_id: req.params.id })
            res.status(200).send(user)
        }
        catch (err){
            res.status(404).send(err)
        }
     },
     async getProfile(req, res){
        try {
            const user = await User.findById({_id: req.params.id })
            if (!user){
                return res.status(404).send(user)
            }
            res.status(200).send(user)
        }
        catch (err){
            res.status(400).send(err)
        }
     },
     async getDashboard(req,res){
        try{
            // for this to work we need to create our auth system
            // const user = await User.findById(req.users._id)
            res.status(200).send("You need to sign in")
        }
        catch(err){
            res.status(400).send(err)
        }
     }
 }
 export default userController