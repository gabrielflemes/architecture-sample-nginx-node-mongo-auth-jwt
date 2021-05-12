const Joi = require('joi'); //this require must be before express 

const userRegisterValidation = (body) => {
    //validate with joi
    //if invalid, return 400 - Bad Request
    const schema = Joi.object({
        name: Joi.string().min(3).max(20).required(),
        email: Joi.string().max(50).min(6).email().required(),
        password: Joi.string().min(6).required()
    });

    return schema.validate(body);
};

const loginValidation = (body) => {

    const schema = Joi.object({
        email: Joi.string().max(50).min(6).email().required(),
        password: Joi.string().min(6).required()
    });

    return schema.validate(body);
};

module.exports.userRegisterValidation = userRegisterValidation;
module.exports.loginValidation = loginValidation;