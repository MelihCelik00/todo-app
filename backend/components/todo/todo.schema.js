const Joi = require('joi');


const validateTodoBody = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        status: Joi.boolean().optional()
    });
    validate(req.body, next, schema);
}

const validateUserId = (req, res, next) => {
    const schema = Joi.object({
        params: Joi.object().keys({
            userId: Joi.string().trim().min(1).required()
        }),
    });
    validate(req, next, schema);
}

const validateTaskId = (req, res, next) => {
    const schema = Joi.object({
        params: Joi.object().keys({
            userId: Joi.string().trim().min(1).required()
        }),
    });
    validate(req, next, schema);
}


const validate = (req, next, schema) => {
    const options = {
        abortEarly: false,
        allowUnknow: true,
        stripUnknown: true
    };
    const {error, value} = schema.validate(req, options);
    if (error)
        next({ message: `Validation Error: ${error.details.map(x => x.message).join(', ')}`, status: 400 });
    else
        next();
};

module.exports = {
    validateTodoBody,
    validateUserId,
    validateTaskId
};
