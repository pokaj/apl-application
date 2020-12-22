const mongoose = require('mongoose')

const fixtureSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    team1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true
    },
    team2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true
    },
    date_time: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Fixture', fixtureSchema)