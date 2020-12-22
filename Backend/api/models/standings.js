const mongoose = require('mongoose')

const leagueStandings = mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   team: {
       type: mongoose.Schema.Types.ObjectId,
       required: true,
   },
    matches_played: {
       type: Number,
        required: true
    },
    matches_won: {
       type: Number,
        required: true
    },
    matches_drawn: {
       type: Number,
        required: true
    },
    matches_lost: {
       type: Number,
        required: true
    },
    goals_for: {
       type: Number,
        required: true
    },
    goals_against: {
       type: Number,
        required: true
    },
    points: {
       type: Number,
        required: true
    }
});

module.exports = mongoose.model('Standings', leagueStandings);