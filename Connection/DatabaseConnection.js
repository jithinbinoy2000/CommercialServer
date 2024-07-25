const mongoogse = require('mongoose');
const connectionstring = process.env.CONNECTIONSTRING
mongoogse.connect(connectionstring).then(()=>{
    console.log("Connection with MongoDB Established");
}).catch((error)=>{
console.log(`error with mongodb connection`,error);
})