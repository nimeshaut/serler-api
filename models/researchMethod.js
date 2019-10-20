const mongoose = require('mongoose');
const Joi = require('joi');

const researchMethodsSchema = new mongoose.Schema({
    name: {type:String, required:true, trim:true, minlength:5, maxlength:255}
});

function validateResearchMethods(researchMethods){
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(researchMethods, schema);
}

const ResearchMethod = mongoose.model('ResearchMethods', researchMethodsSchema);

exports.researchMethodsSchema = researchMethodsSchema;
exports.ResearchMethod = ResearchMethod;
exports.validate = validateResearchMethods;