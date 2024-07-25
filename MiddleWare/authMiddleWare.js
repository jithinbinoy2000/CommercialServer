const jwt = require('jsonwebtoken');
exports.authMiddleWare = (request,response,next)=>{
    const token = request.header('Authorization');
    if(!token){
       return response.status(401).json({message:'Autherization denided ! Empty Token'})
    }
        try{
         const decodedToken = jwt.verify(token,process.env.AUTHSECRET);
         request.authProfile = decodedToken
         console.log(decodedToken);
         next();
        }catch(error){
            if(error==='JsonWebTokenError'){
              return  response.status(401).json({message:'Unauthorized User Please LogIn'}).redirect('/admin/login')
            }
            response.status(500).json({message:"Server error please try again"+`${error}`})
        }
}