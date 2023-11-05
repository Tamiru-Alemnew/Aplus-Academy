const{ register , getAlluser , userByEmail , userById , Profile} = require('./user.service');
const {Registration} = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require("dotenv").config();

module.exports = {
    createUser: (req, res) =>{
        const {userName , firstName , lastName , email , password} = req.body;
        if(!firstName || !lastName || !email || !password || !userName){
            return res.status(400).json({
                success: 0,
                message: "All fields are required"
            })
        }
        Registration.findOne({user_email: email})
            .then(user=>{
                if(!user){
                    register({userName , email , password}, (err , results)=>{
                        if(err){
                            return res.status(400).json({
                                success: 0,
                                message: "Something went wrong"
                            })
                        }else{
                            
                            Profile({firstName , lastName , email}, (err , results)=>{
                                if(err){
                                    return res.status(400).json({
                                        success: 0,
                                        message: "Something went wrong"
                                    })
                                }else{
                                    return res.status(200).json({
                                        success: 1,
                                        data: results
                                    })
                                }
                            })
    
                        }
                    })
                    
                } else{
                    return res.status(400).json({
                        success: 0,
                        message: "User already exist"
                    })
                }
            })
            .catch(err=>{
                return res.status(400).json({
                    success: 0,
                    message: "Something  wrong"
                })
            })
    },
    getUsers : (req , res)=>{
        getAlluser((err, user)=>{
            if(err){
                return res.status(400).json({
                    success: 0,
                    message: "Something went wrong"
                })
            }else{
                return res.status(200).json({
                    success: 1,
                    data: user
                })
                }
            })

     },
    getUserById: (req, res)=>{
        userById(req._id , (err , result)=>{
            if(err){
                pass
            }
        })
    },

    login: (req, res) => { 
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({
                success: 0,
                message: "All fields are required"
            })
        }
        userByEmail(email , (err , results)=>{
            if(err){
                return res.status(400).json({
                    success: 0,
                    message: "Something went wrong"
                })
            }

            if (!results) {
                return res.status(400).json({
                    success: 0,
                    message: "Invalid email or password 1"
                })
            }
            
            bcrypt.compare(password, results.pass, (err, isMatch) => {
                {
                if(err){
                    return res.status(400).json({
                        success: 0,
                        message: "Something went wrong"
                    })
                    }
                    console.log(req.body)
                    if (isMatch) {
                        const token = jwt.sign({ email: results.email }, process.env.JWT_SECRET, { expiresIn: '12h' });
                        return res.status(200).json({
                            success: 1,
                            message: "Login successfully",
                            token: token,
                            user: {
                                email: results.user_email,
                                userName: results.user_name
                            }
                        })
                    }
                }
            });
            })
            
    }
}