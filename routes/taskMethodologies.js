const express = require('express');

const {TaskMethodology, validate} = require('../models/taskMethodology')
const router = express.Router();

router.get('/', async(req, res)=>{
    const taskMethodologies = await TaskMethodology.find();
    res.send(taskMethodologies);
});

router.get('/:id', async(req, res)=>{
    const taskMethodology = await TaskMethodology.findById(req.params.id);
    if(!taskMethodology) return res.status(404).send('The methodology with given id was not found');
    res.send(taskMethodology);
});

router.post('/', async (req, res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const existingMethodology = await TaskMethodology.findOne({name: req.body.name});
    if(existingMethodology) return res.status(400).send('Methodology exists');

    const methodology = new TaskMethodology({
        name: req.body.name
    })
    await methodology.save();
    res.send(methodology);
});

router.put('/:id', async(req, res)=>{

    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let methodology = {name: req.body.name};
    try{
        methodology = await TaskMethodology.findByIdAndUpdate(req.params.id, methodology,{new:true});
        if(!methodology) return res.status(404).send('The methodology with given id was not found');
        res.send(methodology);
    }
    catch(err)
    {
        console.error(err);
    }
});

router.delete('/:id', async(req, res)=>{

    const methodology = await TaskMethodology.findByIdAndRemove(req.params.id);
    if(!methodology) return res.status(404).send('The methodology with given id was not found');
    res.send(methodology);
});

module.exports = router;