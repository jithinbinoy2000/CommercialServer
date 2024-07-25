const mongoose = require('mongoose');
const tableSchema = new mongoose.Schema({
    tableId:{
        type:String,
        unique:true,
        require:true
    },
    tableCapacity:{
        type:Number,
    }
})
const tableData = mongoose.model('tables',tableSchema);
module.exports = tableData;