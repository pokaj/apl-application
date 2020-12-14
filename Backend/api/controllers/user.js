const bcrypt = require('bcrypt')

exports.login = async (req, res)=>{
    const user = await User.findOne({email:req.body.email})
    if(user === null){
        return res.status(401).json({status:false, message:"Authentication Failed"});
    }
    await bcrypt.compare(req.body.password, user.password, function(error, results) {
        if(error){
            console.log(error);
            return res.json({status: false, message: 'Authentication failed'});
        }if(results){
            const token = jwt.sign({
                email: user.email,
                is_admin: user.is_admin,
                is_coach: user.is_coach,
            }, process.env.JWT_KEY,{
                expiresIn: "1h"
            });
            return res.status(200).json({token:token, user});
        } else {
            return res.json({status: false, message: 'Authentication failed'});
        }
    })
}
