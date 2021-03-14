const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
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
    createdAt:{
        type:Date,
        default:Date.now
    }
    
})
/////////////////Encrypt Password//////////////
UserSchema.pre('save',async function(next){
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
module.exports = mongoose.model('User', UserSchema)
