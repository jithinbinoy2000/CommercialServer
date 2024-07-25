const mongoose = require('mongoose');
const AdminSchema = new mongoose.Schema({
    adminUserName:{
        type:String,
        require:true
    },adminPassword:{
        type:String,
        require:true
    }
});
const adminUser = mongoose.model('admins',AdminSchema);
module.exports=adminUser;
