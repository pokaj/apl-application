const mongoose = require('mongoose')

const playerStatistics = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    player_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        required: true,
    },
    yellow_cards: {
        type: Number,
        default: 0,
    },
    red_cards: {
        type: Number,
        default: 0
    },
    goals: {
        type: Number,
        default: 0
    },
    assists: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('playerStatistics', playerStatistics);