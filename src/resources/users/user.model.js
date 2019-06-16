import mongoose from 'mongoose'
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

/** export model */
export const User = mongoose.model('user', userSchema)