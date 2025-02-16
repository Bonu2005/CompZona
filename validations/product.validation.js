import Joi from "joi";

export function productValidate(data){
    let productShema= Joi.object({
        compyuterNumber:Joi.string().required(),
        price:Joi.number().required(),
        type:Joi.string().required(),
        image:Joi.string().optional(),
        status:Joi.string().optional(),
        charateristics:Joi.string().required()
    })
    return productShema.validate(data,{abortEarly:false})
}