const errorHandling = require('../handleErrors/error_handling');
const Joi = require('joi');
const validators = require('../validations/joi_validator');

const ValidateUserEmail = async (req, res, next) => {
    if (req.headers) {
        if (req.headers.email) {
            const schema = Joi.object({
                email: Joi.string().email()
            });
            let new_req = {
                body: {
                    email: req.headers.email
                }
            }
            let isValid = await validators.validateSchema(schema, new_req, res);
            if (isValid) {
                new_req = null;
                next();
            } else {
                return errorHandling("User Email not correct", res);
            }
        }
    } else {
        return errorHandling("User Email not sent in headers", res);
    }
}
module.exports = ValidateUserEmail;