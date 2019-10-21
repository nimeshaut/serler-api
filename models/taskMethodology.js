const mongoose = require('mongoose');
const Joi = require('joi');

const taskMethodologiesSchema = new mongoose.Schema({
    name: {type:String, required:true, trim:true, minlength:2, maxlength:255}
});

function validateTaskMethodology(taskMethodology){
    const schema = {
        name: Joi.string().min(2).required()
    };
    return Joi.validate(taskMethodology, schema);
}

const TaskMethodology = mongoose.model('TaskMethodology', taskMethodologiesSchema);

exports.taskMethodologiesSchema = taskMethodologiesSchema;
exports.TaskMethodology = TaskMethodology;
exports.validate = validateTaskMethodology;