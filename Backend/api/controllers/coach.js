const mongoose = require('mongoose')
const User = require('../models/user')
const Team = require('../models/team')

exports.signPlayer = async (req, res) => {
    const playerID = req.body.playerID;
    const teamID = req.body.teamID;
    try {
        await Team.findOneAndUpdate(teamID, {$push:{squad: playerID}});
        await User.findOneAndUpdate({_id:playerID}, {$set:{team: teamID}});

        return res.status(200).json({message: 'You have successfully signed this player!'});
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}


exports.available_players = async (req, res) => {
    try{
        const players = await User.find({$and: [{is_coach: false}, {team: null}]});
        return res.status(200).json(players);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}


exports.release_player = async (req, res) => {
    const playerID = req.body.playerID;
    const teamID = req.body.teamID;
    try {
        await Team.findOneAndUpdate(teamID, {$pull:{squad: playerID}});
        await User.findOneAndUpdate({_id:playerID}, {$set:{team: null}});

        return res.status(200).json({message: 'You have successfully unsigned this player!'});
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}