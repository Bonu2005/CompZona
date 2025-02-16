function passedRole(roles) {
    return (req, res, next) => {  
    
        console.log(req.malumot);
        
       if (!roles.includes(req.malumot.role)) {
          return res.status(400).send({ message: "Not allowed" });
       }
       next();
    };
 }
 
 export default passedRole;