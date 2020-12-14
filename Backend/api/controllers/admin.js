const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const Team = require('../models/team');
const User = require('../models/user')


exports.create_team = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY)
    if(decoded.is_admin === false){
        return res.status(401).json({message: 'You are not authorized to perform this action'})
    }else{
        const team = await Team.find({name: req.body.name});
        if(team.length === 1){
            return res.status(409).json({message: 'This team already exists'});
        }
        try {
            const newTeam = new Team({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                coach: req.body.coach,
                logo: req.body.logo,
            })
            await newTeam.save();
            return res.status(201).json({message: 'Team created successfully', newTeam});
        }
        catch(error){
            console.log(error);
            return res.status(500).json({error:error});
        }
    }
}


exports.add_coach = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY)
    if(decoded.is_admin === false){
        return res.status(401).json({message: 'You are not authorized to perform this action'})
    }else{
        const coach = await User.find({name: req.body.name});
        if(coach.length === 1){
            return res.status(409).json({message: 'This coach already exists'});
        }
        try{
            const newCoach = new User({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                email: req.body.email,
                age: req.body.age,
                position: req.body.position,
                image: req.body.image,
                team: req.body.team,
                password: req.body.password,
            })
            await newCoach.save();
            return res.status(201).json({message: 'New coach has been added successfully', newCoach});
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({error:error});
        }
    }
}