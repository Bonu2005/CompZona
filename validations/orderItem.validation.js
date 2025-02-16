import Joi from "joi";

export function orderItemValidate(data){
    let orderShema= Joi.object({
        productId:Joi.number().required(),
        orderId:Joi.number().required(),
        roomId:Joi.number().required(),
        total:Joi.number().required(),
        payment:Joi.number().required(),
        start:Joi.date().required(),
        end:Joi.date().optional(),
        summa:Joi.optional()

    })
    return orderShema.validate(data,{abortEarly:false})
}