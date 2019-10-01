const express = require('express');
const {SearchField, validate} = require('../models/searchField');
const router = express.Router();

router.get('/', async(req, res)=>{
    const searchField = await SearchField.find();
    res.send(searchField);
});

router.get('/:id', async(req, res)=>{
    const searchField = await SearchField.findById(req.params.id);
    if(!searchField) return res.status(404).send('The Search Field with given id was not found');
    res.send(searchField);
});

router.post('/', async (req, res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const existingSearchField = await SearchField.findOne({name: req.body.name});
    if(existingSearchField) return res.status(400).send('Search Field exists');

    
    const searchField = new SearchField({
        name: req.body.name,
        fieldType: req.body.fieldType,
        operators: req.body.operators
    })
    await searchField.save();
    res.send(searchField);
});

router.put('/:id', async(req, res)=>{

    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let searchField = {name: req.body.name};
    try{
        searchField = await SearchField.findByIdAndUpdate(req.params.id, searchField,{new:true});
        if(!searchField) return res.status(404).send('The Search Field with given id was not found');
        res.send(searchField);
    }
    catch(err)
    {
        console.error(err);
    }
});

router.delete('/:id', async(req, res)=>{

    const searchField = await SearchField.findByIdAndRemove(req.params.id);
    if(!searchField) return res.status(404).send('The Search Field with given id was not found');
    res.send(searchField);
});

module.exports = router;