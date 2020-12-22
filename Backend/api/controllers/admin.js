const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const Team = require('../models/team');
const Fixture = require('../models/fixture')


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
                shorthand: req.body.shortname,
                coach: req.body.coach,
                logo: req.body.logo,
            })
            await newTeam.save();
            return res.status(201).json({message: 'Team created successfully', newTeam});
        }
        catch(error){
            console.log(error);
            return res.status(500).json(error);
        }
    }
}


exports.update_coach = async (req, res) => {
    try{
        const teamID = req.body.teamID;
        const team = await Team.findOne({_id: teamID});
        await Team.findOneAndUpdate({_id: teamID}, {
            $set: {coach: req.body.coachID}
        });
        return res.status(200).json({message: `${team.name} coach updated!`});
    }
    catch (error) {
        return res.status(500).json(error);
    }
}


exports.add_fixtures = async (req, res) => {
    try{
        const fixture = new Fixture({
            _id: new mongoose.Types.ObjectId(),
            team1: req.body.team_one,
            team2: req.body.team_two,
            date_time: req.body.date_time,
        })
        await fixture.save();
        return res.status(200).json({message: 'New fixture added successfully'});
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}
