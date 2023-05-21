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
    validate
};