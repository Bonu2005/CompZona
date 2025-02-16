import Joi from "joi";

export function userValidate(data){
    let userShema= Joi.object({
        name:Joi.string().required(),
        email:Joi.string().required(),
        password:Joi.string().required(),
        role:Joi.string().optional()
    })
    return userShema.validate(data,{abortEarly:false})
}