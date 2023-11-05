const db = require("../config/database");
const Registration = db.Registration;
const Profile = db.Profile;
const Question = db.Question;
const Answer = db.Answer;

module.exports = {
    register: async ({userName, email , password} , callback) => {
        const newUser = new Registration({
            user_name: userName,
            user_email: email,
            pass: password,
        });
     const new_user = await newUser.save();
        if(new_user){
            return callback(null , new_user)
        }else{
            return callback(err)
        }
    }, 
    Profile: async ({firstName , lastName , email} , callback) => {
        const newProfile = new Profile({
            user_email:  email,
            first_name:firstName,
            last_name: lastName,
        });
        const new_profile = await newProfile.save();
        if(new_profile){
            return callback(null , new_profile)
        }else{
            return callback(err)
        }
    },
    userById : (id , callback)=>{
        Registration.findOne({user_id : id}).select('-pass')
        .then(user=>{
                return callback(null , user)
            })
        .catch(err=>{
                return callback(err)
            })
        },
    userByEmail: (email , callback)=>{
        Registration.findOne({user_email : email})
        .then(user =>{
            return callback(null , user)
        })
        .catch(err=>{
            return callback(err)         
        })
    },
    getAlluser: (callback)=>{
        Registration.find({},(err , users)=>{
            if(err){
                return callback(err)
            }else{
                return callback(null , users)
            }
        })
    }
    
}