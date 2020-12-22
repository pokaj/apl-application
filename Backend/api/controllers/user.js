const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')


exports.signup = async (req, res) => {
    const existingUser = await User.findOne({email: req.body.email})
    if(existingUser !== null){
        return res.status(409).json({message: 'A user with this email already exists'});
    }else {
        bcrypt.hash(req.body.password, 10, async(error, hash)=> {
            if(error){
                return res.status(500).json({error:error});
            }else {
                try{
                    const newUser = new User({
                        _id: new mongoose.Types.ObjectId(),
                        name: req.body.name,
                        email: req.body.email,
                        age: req.body.age,
                        position: req.body.position,
                        image: req.body.image,
                        password: hash
                    })
                    await newUser.save();
                    return res.status(201).json(newUser)
                }
                catch (error) {
                    console.log(error);
                    return res.status(500).json(error)
                }
            }
        })
    }
}


exports.login = async (req, res)=>{
    const user = await User.findOne({email:req.body.email})
    if(user === null){
        return res.status(401).json({status:false, message:"Authentication Failed"});
    }
    await bcrypt.compare(req.body.password, user.password, function(error, results) {
        if(error){
            console.log(error);
            return res.json({status: false, message: 'Authentication failed'});
        }if(results){
            const token = jwt.sign({
                email: user.email,
                is_admin: user.is_admin,
                is_coach: user.is_coach,
            }, process.env.JWT_KEY,{
                expiresIn: "1h"
            });
            return res.status(200).json({token:token, user});
        } else {
            return res.json({status: false, message: 'Authentication failed'});
        }
    })
}
