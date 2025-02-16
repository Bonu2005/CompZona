import Joi from "joi";

export function loginValidate(data){
    let loginShema= Joi.object({
        email:Joi.string().required(),
        password:Joi.string().required(),
        

    })
    return loginShema.validate(data,{abortEarly:false})
}