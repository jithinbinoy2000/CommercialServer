const Client = require("../Configurations/twilioConfig");
const sendOtpMiddleware = async(request,response,next)=>{
    const{phnumber}= request.body;
    try{
        const verification = await Client.verify.v2.services(process.env.TWILIO_VERIFY_SERVICE_SID).verifications.create({
            to: phnumber,
            channel: 'sms'
        });
    if(verification.status == "pending"){
    response.status(202).json({status:202,message:'Otp sended SuccessFully'})
    //  next();
    }else{
    response.status(500).json({status:500,message:'Failed to send OTP'})
   }
    }catch(error){
        response.status(500).json({status:500,message:`error 500, ${error}`})
    }
}

const verifyOtpMiddleware = async(request,response,next)=>{
    const {resturantOwnerPhoneNumber,otp} = request.body;
    try {
        const verificationCheck  = await Client.verify.v2.services(process.env.TWILIO_VERIFY_SERVICE_SID).verificationChecks.create({
            to:resturantOwnerPhoneNumber,code:otp
        })
        // Client.verify.v2.Services(process.env.TWILIO_VERIFY_SERVICE_SID).verificationChecks.create ({to:resturantOwnerPhoneNumber,code:otp});
        if(verificationCheck.status==="approved"){
            // response.status(200).json({status:200,message:'Otp was verified Successfully'})
             next();
        }else{
            response.status(400).json({status:400,message:'Invalid OTP'})
        }
    } catch (err) {
        response.status(500).json({status:500,message:`error 500 , ${err}`,error:err})
    }
}
module.exports= {
    sendOtpMiddleware,
    verifyOtpMiddleware
}