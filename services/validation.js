const Joi = require('joi')
class UserValidations{
    signup_validations(){
        return Joi.object({ 
            name: Joi.string().min(3).max(50).required(),
            mobile: Joi.string().pattern(new RegExp(/^\d{10}$/)).required(),
            email: Joi.string().email().empty('').optional(),
            is_verified:Joi.boolean().default(false),
            otp:Joi.number().optional(),
            role:Joi.string().valid('user', 'admin').default('user')
          })
    }
    login_validations(){
        return Joi.object({
            mobile: Joi.string().pattern(new RegExp(/^\d{10}$/)).optional(),
            email: Joi.string().email().empty('').optional(),
        })
    }
    login_verification_validations(){
        return Joi.object({
            mobile: Joi.string().pattern(new RegExp(/^\d{10}$/)).optional(),
            email: Joi.string().email().empty('').optional(),
            otp:Joi.number().optional(),
        })
    }
    specific_user_data_validations(){
        return Joi.object({
            user_id:Joi.string().required()
        })
    }
    update_user_validations(){
        return Joi.object({ 
            name: Joi.string().min(3).max(50),
            mobile: Joi.string().pattern(new RegExp(/^\d{10}$/)),
            email: Joi.string().email()
          })
    }
    token_validation(){
        return Joi.object({
            token:Joi.string().required()
        })
    }
}

module.exports={UserValidations}