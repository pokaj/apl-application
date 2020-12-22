const mongoose = require('mongoose')

const goalSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    game_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    team_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    scorer_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        default: null
    },
    player_assist_id: {
        types: mongoose.Schema.Types.ObjectId,
        required: true,
        default: null
    }
})

module.exports = mongoose.model('Goals', goalSchema);