const User = require('../models/userModel')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.loginUser = async(req,res)=>{
    try{
        const {email, password } = req.body
        // check email and pass from client side
        if(!email || !password){
            return res.status(200).json({
                status: false,
                message: 'Please Enter Password And Email'
            })
        }
    // check if email exist or not
        const user = await User.findOne({email})
        if(!user){
            return res.status(200).json({
                status: false,
                message: 'Invalid Email'
            })
        }
        // check the password
     bcrypt.compare(password, user.password, async(err, isMatch) => {
            if (err){
              // return if error in password check
                console.log(err)
                return res.status(200)
                .json({
                  status:false,
                  message:'Incorrect password',
                
               })
              }
              // generate jwt token and send to client if password match
              if (isMatch) {
                const token = await jwt.sign({
                    id: user._id,
                  }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRE,
                  });
                  return res.status(200).cookie('Authorization', token, {
                      httpOnly: true
                    }).header('Authorization', token).json({
                      status: true,
                      message: 'Login Success',
                      user,
                      token
                  })
            } else {
              // pass does not match
              return res.status(200).json({
                status: false,
                message:'Incorrect password'
              })
            }
        })
    }catch(err){
        return res.status(200).json({
            status: false,
            message: 'Something Went Wrong'
        })
    }
}

// praan-e508b