import mongoose from 'mongoose'
import pick from 'lodash.pick'
import bcrypt from 'bcryptjs'
import Joi from '@hapi/joi'
import jwt from 'jsonwebtoken'
import config from '../../config'

/** create a schema (data modeling) */
const schema = {
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minlength: 10, 
        trim: true 
    },
    username :  { type: String, trim: true},
    photoUrl: String,
    isAdmin: Boolean
} 

/** create the model */
const userSchema = new mongoose.Schema(schema,{ timestamps:true})


/** hash password before saving it to the db */
userSchema.pre('save', async function(next){
    if (this.isModified('password')){
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password,salt)
        next()
    }
    else { 
        next()
    }
})

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin },config.secrets.JWT_SECRET)
    return token
}

/** choose user data to send back back to client */
userSchema.methods.toJSON = function() {
    console.log("this", this)
    return pick(this,['_id', 'email', 'username', 'photoUrl', 'isAdmin'])
} 



/** not sure if i should use a secondary validation like joi yet */
export function validateUser (data) {
    const schemas = Joi.object().keys({
        email: Joi.string().required().email().trim().unique(),
        password: Joi.string().required().min(10),
    })
    return Joi.validate(data,schemas)
}

/** export model */
export const User = mongoose.model('user', userSchema)

