const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/user')

exports.signup = async (req, res) => {
    const existingPlayer = await User.findOne({email: req.body.email})
    if(existingPlayer !== null){
        return res.status(409).json({message: 'A player with this email already exists'});
    }else {
        bcrypt.hash(req.body.password, 10, async(error, hash)=> {
            if(error){
                return res.status(500).json({error:error});
            }else {
                try{
                    const newPlayer = new User({
                        _id: new mongoose.Types.ObjectId(),
                        name: req.body.name,
                        email: req.body.email,
                        age: req.body.age,
                        position: req.body.position,
                        image: req.body.image,
                        team: req.body.team,
                        password: hash
                    })
                    await newPlayer.save();
                    return res.status(201).json(newPlayer)
                }
                catch (error) {
                    console.log(error);
                    return res.status(500).json(error)
                }
            }
        })
    }
}