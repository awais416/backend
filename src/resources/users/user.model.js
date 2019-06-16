import mongoose from 'mongoose'
import pick from 'lodash.pick'
import bcrypt from 'bcryptjs'
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
    console.log('step 1')
    if (this.isModified('password')){
        console.log('step2')
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password,salt)
        next()
    }
    else { 
        next()
    }
    console.log(this)
})

/** choose user data to send back back to client */
userSchema.methods.toJSON = function() {
    return pick(this,['_id', 'email', 'username', 'photoUrl', 'isAdmin'])
} 
/** export model */
export const User = mongoose.model('user', userSchema)