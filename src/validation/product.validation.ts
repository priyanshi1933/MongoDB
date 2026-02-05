import joi from "joi";
export const productValidation=joi.object({
    title:joi.string().min(3).max(20).required(),
    price:joi.number().positive().required(),
    image:joi.string().required()
})