function selfPolice(roles) {
    return (req, res, next) => {
       let { id } = req.params;
       console.log(req.malumot);
     
       if (id == req.malumot.id || roles.includes(req.malumot.role)) {
          next();
          return;
       }
 
       res.status(400).send({ message: "Not allowed update" });
    };
 }

 export default selfPolice;