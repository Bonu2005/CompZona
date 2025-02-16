import Joi from "joi";

export function orderValidate(data){
    let orderShema= Joi.object({
        userId:Joi.number().required(),
        total:Joi.number().required(),
        payment:Joi.number().required(),
        status:Joi.optional()

    })
    return orderShema.validate(data,{abortEarly:false})
}