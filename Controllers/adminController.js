const adminUser = require("../Models/adminUser");
const resturantDetails = require("../Models/resturantDetails");
const jwt = require("jsonwebtoken");
const tableData = require("../Models/tableData");
const authSecret = process.env.AUTHSECRET;
//admin Login
exports.adminlogin = async (request, response) => {
  try {
    const { adminUserName, adminPassword } = request.body;
    console.log(adminUserName, adminPassword);
    const loggedIn = await adminUser.findOne({ adminUserName, adminPassword });
    console.log(loggedIn);
    if (loggedIn) {
      const token = jwt.sign({ loggedIn }, authSecret, { expiresIn: "6h" });
      console.log(token);
      request.session.token = token;
      response.status(200).json({ loggedIn, token });
    } else {
      response.status(400).json("Invalid Username or Password");
    }
  } catch (error) {
    response.status(500).json("error 500 ! Internal Server Error" + error);
  }
};
//Add resturant Details
exports.addResturant = async (request, response) => {
  const resturantData = request.body;
  try{const existingResturant = await resturantDetails.findOne({ resturantName: resturantData.resturantName,});
  if (existingResturant) {
    response.status(409).json({ status: 409, message: "Resturant Name Already Exist" });
  } else {
    const existingResturantUsername = await resturantDetails.findOne({resturantUserName:resturantData.resturantUserName});
    if (existingResturantUsername) {
      response.status(409).json({ status: 409, message: "UserName Must be Unique" });
    } else {
      //phone verification
      const newresturantDetails = new resturantDetails(resturantData);
      await newresturantDetails.save();
      response.status(200) .json({status: 200, message: `${resturantData.resturantName} added SuccessFully`,
        });
    }
  }}catch(error){
    response.status(500).send(error)
  }
};
//delete resturant details
exports.deleteResturant = async (request, response) => {
  const { resturantId } = request.params;
  console.log('resid'+resturantId);
  if (resturantId) { //check we get the id to delete
    try {
      const deletedFile = await resturantDetails.findOneAndDelete({ _id: resturantId,});
      console.log(deletedFile); 
      if (deletedFile) {
        response.status(200).json({ status: 200, message: "Resturant Deleted SuccessFully" }); //delete Resturant
      } else {
        response.status(404).json({ status: 404, message: "Resturant Not Found" });   
      }
    } catch (error) {
      response.status(500).json({ status: 500, message: `Server Error ${error}` });
    }
  } else {
    response.status(400).json({ status: 400, message: "No Resturant Selected" });
  }
};
//update resturant details
exports.updateResturant = async (request, response)=>{
  const {itemId} = request.params;
  const {updateResturentContent} = request.body;
  try {
    const updatedContent  = await resturantDetails.findOneAndUpdate(
      {_id:itemId},
      {$set:updateResturentContent},
      {new:true,runValidators:true}//By default, findOneAndUpdate() returns the document as it was before update was applied. If you set new: true, findOneAndUpdate() will instead give you the object after update was applied.
    )
    if(updatedContent){
      response.status(200).json({status:200,message:`updated Successfully`,data:`${updateResturentContent}`})
    }else{
      response.status(404).json({status:404,message:`Id not Found`})
    }

  } catch (error) {
    response.status(500).json({status:500,message:`Error 500 , ${error}`})
  }
}
//add tables 
exports.addTables = async(request,response)=>{
    const{tableId,seatingCapacity} = request.body;
    try{
        const existingTable = await tableData.findOne({tableId})
        if(existingTable){
            response.status(409).json({status:409,message:`${existingTable.tableId} is Already exist !!`})
        }else{
            const newTable = new tableData({
                tableId,
                seatingCapacity
            })
            await newTable.save();
            response.status(201).json({status:201, message:`${tableId} Table Created/Saved`})
        }

    }catch(error){
        response.status(500).json({status:500,message:`server error ! , ${error}`})
    }
}
//delete Table
exports.deleteTable= async(request,response)=>{
    const {deleteId} = request.params;
    if(deleteId){
      try {
        const itemToDelete = await tableData.findByIdAndDelete({_id:deleteId})
        if(itemToDelete){
          response.status(200).json({status:200,message:`${itemToDelete.tableId} deleted Successfully`})
        }else{
          response.status(404).json({status:404,message:'error 404, Item Not Found'})
        }
      } catch (error) {
        response.status(500).json({status:500,message:`error 500, Server error , ${error}`})
      }

    }
   
    

}
//update Table datas
exports.updateTable = async(request,response)=>{
  const {itemId} = request.params;
  const {updateContent} = request.body;
 try{ const updated = await tableData.findOneAndUpdate(
    {_id:itemId},
    {$set:updateContent},
    {new:true,runValidators:true}
  )
  if (updated){
    response.status(200).json({status:200,message:'updated Successfully',data:`${updated}`})
  }else{
    response.status(404).json({status:404,message:'Item not Found'})
  }}catch(error){
    response.status(500).json({status:500,message:`error 500, ${error}`})
  }
}
//get all Resturants 
exports.getAllResturants = async(request,response)=>{
  try {
    const allResturants = await resturantDetails.find({});
    if(allResturants){
      response.status(200).json({status:200,message:'successfully fetch data',data:`${allResturants}`})
    }else{
      response.status(204).json({status:204,message:`No Content found`})
    }
  } catch (error) {
    response.status(500).json({status:500,message:` error 500 ${error}`})
  }
  
}
//get all tables
exports.getAllTables = async(resquest,response)=>{
  try {
     const tableData = await tableData.find({})
     if(tableData){
      response.status(200).json({status:200,message:'Successfully fetched Data',data:tableData})
     }else{
      response.status(204).json({status:204,message:'No Content'})
     }
  } catch (error) {
    response.status(500).json({status:500,message:`error 500 , ${error}`})
  }
}



