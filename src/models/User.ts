import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username : {
        type : String ,
        trim : true,
        required : true,
        unique : true,
    },
    email : {
        type : String,
        required : true,
        trim : true,
        unique : true
    } ,
    password : {
        type : String ,
        required : true,
    } ,
    isVerified : {
        type : Boolean,
        default : false,
    } ,
    isAdmin : {
        type : Boolean ,
        default  : false
    } ,
    forgotPasswordToken : String,
    forgotPasswordTokenExpiry : Date,
    verifyEmailToken : String,
    verifyEmailTokenExpiry : Date,
});

const user = mongoose.models.user ||  mongoose.model('User' , userSchema);
export default user;