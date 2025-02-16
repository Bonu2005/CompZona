import jwt from "jsonwebtoken"
import { config } from "dotenv"

config()

const middleWare=(req,res,next)=>{
    let split1 =req.header("Authorization")
    
    if(!split1){
        res.status(400).json({message:"not authorized"})
        return
    }
    try {
        let token=split1.split(" ")[1]
        let a = jwt.verify(token,process.env.TOKEN_SECRET)
        req.malumot=a
        console.log(req.malumot);
        next()
        
    } catch (error) {
        res.status(400).json({message:error.message})
        return
    }
}
export default middleWare