const Joi = require('joi');
const errorHandling = require('../handleErrors/error_handling');

// exports.examName = Joi.string().required();
// exports.integerSchema = Joi.number().required();
// exports.integerOptionalSchema = Joi.number();
// exports.dateSchema = Joi.date().required();
// exports.arraySchema = Joi.array().required();


async function validateSchema(schema, req, res) {
    let { error } = schema.validate(req.body);    
    if (error) {
        console.log(error.message);
        
        return errorHandling(error, res);
    } else {
        return true;
    }
}

exports.validateSchema = validateSchema;