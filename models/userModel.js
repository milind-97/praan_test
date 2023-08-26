const mongoose = require('mongoose')
const validator = require('validator')
const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please Enter User Name'],
        maxLength:[30,'Name Cannot Exceed 30 Characters'],
        minLength:[3,'Name Cannot Be Less Than 3 Characters'],
    },
    email: {
        type: String,
        required: [true,'Please Enter Email Id'],
        unique: true,
        validate: [validator.isEmail, 'Please Enter valid Email']
    },
    password:{
        type: String,
        required:[true,'Please Enter Your Password'],
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now(),

    },
   
})

module.exports = mongoose.model("User",userSchema)