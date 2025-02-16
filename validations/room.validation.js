import Joi from "joi";

export function roomValidate(data){
    let roomShema= Joi.object({
        roomNumber:Joi.string().required(),
        count:Joi.number().required(),
        price:Joi.number().required(),
        image:Joi.string().optional(),
        charateristics:Joi.string().required(),
        status:Joi.string().optional()
    
    })
    return roomShema.validate(data,{abortEarly:false})
}