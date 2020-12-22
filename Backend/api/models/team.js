const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    shorthand: {
        type: String,
        required: true
    },
    coach: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    logo: {
        type: String
    },
    squad:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:' Players',
            default: null
        }
    ],
    trophy_cabinet: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Trophy',
            default: null
        }
    ],
    jersey: {
        type:String
    }
});

module.exports = mongoose.model('Team', teamSchema);