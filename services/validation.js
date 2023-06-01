const { json } = require('body-parser')
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

class LoanValidations{
    loan_request_validation(){
        return Joi.object({
            user_id:Joi.string().alphanum().required(),
            pancard:Joi.string().alphanum().required(),
            name: Joi.string().min(3).max(50).required(),
            dob:Joi.string().required(),
            gender:Joi.string().valid('male', 'female','other').required(),
            mobile: Joi.string().pattern(new RegExp(/^\d{10}$/)).required(),
            email: Joi.string().email().empty('').required(),
            'employement-type':Joi.string().valid("home maker","self employed","salaried").required(),
            address1:Joi.string().required(),
            address2:Joi.string().required(),
            pincode:Joi.number().min(6).required(),
            city:Joi.string().required(),
            state:Joi.string().required()
        })
    }
    specific_loan_details_validation(){
        return Joi.object({
            loan_id:Joi.string().alphanum().required()
        })
    }
    user_id_validation(){
        return Joi.object({
            user_id:Joi.string().alphanum().required()
        })
    }
}

class FaqValidations{
    faq_validation(){
        return Joi.object({
            question:Joi.string().required(),
            answer:Joi.string().required(),
            type:Joi.string().valid('buying','selling','general').required()
        })
    }
    faq_id_validation(){
        return Joi.object({
            faq_id:Joi.string().alphanum().required()
        })
    }
    update_faq_validation(){
        return Joi.object({
            question:Joi.string(),
            answer:Joi.string(),
            type:Joi.string().valid('buying','selling','general')
        })
    }
}

class ReviewValidations{
    review_data_validations(){
        return Joi.object({

        })
    }
    review_id_validations(){
        return Joi.object({

        })
    }
    update_review_validations(){
        return Joi.object({

        })
    }
}
module.exports={UserValidations,LoanValidations,FaqValidations,ReviewValidations}