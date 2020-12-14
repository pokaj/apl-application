const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type:String, required:true},
    email: {type:String, required:true},
    age: {type:String, required:true},
    position: {type:String, required:true},
    image: {type:String, required:true},
    team: {type: mongoose.Schema.Types.ObjectId, ref:'Team', default:null},
    is_admin: {type:Boolean, default:false},
    is_coach: {type:Boolean, default:false},
    password:{type:String, required:true}
})

module.exports = mongoose.model('User', userSchema)