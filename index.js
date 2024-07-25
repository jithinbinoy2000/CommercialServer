require ('dotenv').config();
require('./Connection/DatabaseConnection')
const express = require ('express');
const session = require('express-session')
const cors = require('cors');
const app = express();
const adminRouter = require('./Routes/adminRouting');
const port = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());
app.use(session({
  secret:process.env.SESSION_SECRET || "test",
  resave:false,
  saveUninitialized:true,
  cookie:{secure:false}
}))
app.use(adminRouter);
app.listen(port,()=>{
    console.log(`server starting on port : ${port}`);
})
app.get('/',(request,response)=>{
  response.status(200).send("server running now ! Waiting for responses !")
})//faris