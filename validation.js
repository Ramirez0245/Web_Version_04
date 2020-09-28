const Joi = require('joi');

const FileValidation = req =>
{
    console.log(req.body);
    const schema = Joi.object
    ({
        file_name: Joi.string().min(4).max(26).required(),
        extention: Joi.string().min(1).max(12).required()
    }); 
    return schema.validate(req.body)
}

const FileValidationPatch = req =>
{
    console.log(req.body);
    const schema = Joi.object
    ({
        file_name: Joi.string().min(4).max(26).required(),
        extention: Joi.string().min(1).max(12).required(),
        file_name_to: Joi.string().min(4).max(26).required(),
        extention_to: Joi.string().min(1).max(12).required()
    }); 
    return schema.validate(req.body)
}



module.exports.FileValidation = FileValidation;
module.exports.FileValidationPatch = FileValidationPatch;