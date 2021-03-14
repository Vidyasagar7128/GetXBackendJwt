const User = require('../models/user')
module.exports = {
    index: async (req,res,next)=>{
        await User.find().then((data)=>{
            res.status(200).json(data)
        }).catch((e)=> console.log(e))
    },
    //////////////create User ///////////////
    createUser: async (req,res,next)=>{
        var data = new User(req.body)
        
        await data.save().then((user)=>{
            const token = data.getSignedJwtToken()
            res.status(200).json({success: true,token})
        }).catch((e)=> console.log(e))
        
    },
    ////////////////////////create Token////////////////////////////
    deleteUser: async (req,res,next)=>{
       const data = await User.findByIdAndDelete({_id:req.params.id})
       .then(()=>{
           res.send('Deleted Successfully.')
       }).catch((e)=>{
           console.log(e);
       })
    },
    updateUser: async (req,res,next)=>{
        const data = await User.findByIdAndUpdate({_id:req.params.id}, 
            {
                $set:{
                name: req.body.name,
                class: req.body.class,
                email:req.body.email,
                mobile: req.body.mobile,
                password: req.body.password
                }
            })
            if(data.save()){
                res.send('Update Done.')
            }else{
                res.send('Failed.')
            }
    },
    login:async (req,res,next)=>{
        const {email,password} = req.body

        /////validate email password
        if(!email || !password){
            return next(new ErrorResponce('Enter Email And Password',400))
        }
        ///////check User
        const user = await User.findOne({email}).select('+password')
        if(!user){
            return next(new ErrorResponce('Not User Found',401))
        }
        ////match 
        const isMatch = await user.matchPassword(password)
        if(!isMatch){
            return next(new ErrorResponce('password wrong',401))
        }
        const token = user.getSignedJwtToken()
        res.status(200).json({success: true,token})
    },
    //exports.user ={
        loginMe:async (req,res,next)=>{
            req.user = await User.findById(req.user.id)
            res.status(200).json({success:true,data:req.user})
        }
   // }
}
