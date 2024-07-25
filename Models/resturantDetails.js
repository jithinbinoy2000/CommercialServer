const mongoose = require('mongoose');
const resturantSchema = new mongoose.Schema({
    resturantName:{
        type:String,
        require:true
    },
    resturantOwnerName:{
        type:String,
        require:true
    },
    resturantPhoneNumber:{
        type:Number,
        unique:true,
    },
    resturantOwnerPhoneNumber:{
        type:Number,
        unique:true,
        require:true
    },
    resturantLicenceNumber:{
        type:String,
        unique:true,
        require:true, 
    },
    resturantUserName:{
        type:String,
        unique:true,
        require:true, 
    },
    resturantPassword:{
        type:String,
        unique:true,
        require:true, 
    }

})
const resturantDetails = mongoose.model('resturants',resturantSchema);
module.exports = resturantDetails;