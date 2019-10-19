const mongoose = require("mongoose");
const Joi = require("joi");

const operatorSchema = {operatorName: String,
    operatorType: String};

const searchFieldSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 255
  },
  fieldType: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 255
  },
  operators: [{ operation: String, name: String }]
});

function validateSearchField(searchField) {
  const validOpsSchema = Joi.object({
    operation: Joi.string()
      .min(1)
      .required(),
    name: Joi.string()
      .min(1)
      .required()
  }).required();

  const validOperators = Joi.array()
    .items(validOpsSchema)
    .min(1)
    .unique()
    .required();

  const schema = {
    name: Joi.string()
      .min(2)
      .required(),
    fieldType: Joi.string()
      .min(2)
      .required(),
    operators: Joi.array()
      .items(validOpsSchema)
      .min(1)
      .required()


  };
  return Joi.validate(searchField, schema);
}

const SearchField = mongoose.model("SearchField", searchFieldSchema);

exports.searchFieldSchema = searchFieldSchema;
exports.SearchField = SearchField;
exports.validate = validateSearchField;
