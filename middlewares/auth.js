const jwt = require('jsonwebtoken')
const User = require('../models/user')

exports.protect = {
    login: async (req,res,next)=>{
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1]
            //this Token would store in Cookie or LocalStorage for Next time Login
        }
        if(!token){
            return next(new ErrorResponce('Not Authorized User',401))
        }
        try{
            const decoded =jwt.verify(token,'gaikwadvidyasagarraosaheb')
            console.log(decoded);
            req.user = await User.findById(decoded.id)
            //res.status(200).json({success: true,data:req.user})
            next()
        }catch(err){
            return next(new ErrorResponce('Not Authorized User',401))
        }
    }
}


