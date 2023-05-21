const Joi = require('joi');
const validator = require("../../utils/validate")

const createUser = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().max(128).required(),
        email: Joi.string().email().max(128).required(),
        password: Joi.string().min(6).max(128).required(),
    });
    validator.validate(req.body, next, schema);
};

module.exports = {
    createUser
}