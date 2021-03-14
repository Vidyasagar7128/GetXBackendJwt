const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const Schema = mongoose.Schema;
UserSchema = new Schema({
    name: String,
    class: String,
    email:{
        type: String,
        required:[true,'Please enter Email'],
        unique:true,
        
    },
    mobile:String,
    password:{
        type:String,
        select:false
    },
    resetPasswordToken:String,
    resetPasswordExpire:String,
    createdAt:{
        type:Date,
        default:Date.now
    }
    
})
/////////////////Encrypt Password//////////////
UserSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})
///////////////// Sign Token JWt/////////////////

UserSchema.methods.getSignedJwtToken = function(){
    return jwt.sign({id:this._id},'gaikwadvidyasagarraosaheb')
}
////////matchPassword hash db
UserSchema.methods.matchPassword = async function(enteredPass){
    return await bcrypt.compare(enteredPass, this.password)
}
///////////////Generate Token////////////////////
UserSchema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString('hex')
    console.log(resetToken);
    //////////////hash token/////////////////////
    this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')
    ////////////expireToken///////////
    this.resetPasswordExpire = Date.now()+10*60*1000
    return resetToken;
}

module.exports = mongoose.model('User', UserSchema)
