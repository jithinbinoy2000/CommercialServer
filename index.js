require ('dotenv').config();
const express = require ('express');
const cors = require('cors')
const app = express()
app.use(cors());

const port = process.env.PORT || 4000;
app.listen(port,()=>{
    console.log(`server starting on port : ${port}`);
})
app.get('/',(request,response)=>{
  response.status(200).send("server running now ! Waiting for responses !")
})