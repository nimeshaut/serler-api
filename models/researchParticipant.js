const mongoose = require('mongoose');
const Joi = require('joi');

const researchParticipantsSchema = new mongoose.Schema({
    name: {type:String, required:true, trim:true, minlength:2, maxlength:255}
});

function validateParticipant(researchParticipant){
    const schema = {
        name: Joi.string().min(2).required()
    };
    return Joi.validate(researchParticipant, schema);
}

const ResearchParticipant = mongoose.model('ResearchParticipant', researchParticipantsSchema);

exports.researchParticipantsSchema = researchParticipantsSchema;
exports.ResearchParticipant = ResearchParticipant;
exports.validate = validateParticipant;