const express = require('express');
const {ResearchMethod, validate} = require('../models/researchMethod');
const auth = require('../middleware/authenticator');
const router = express.Router();

router.get('/',  async(req, res)=>{
    const researchMethods = await ResearchMethod.find();
    res.send(researchMethods);
});

router.get('/:id',auth, async(req, res)=>{
    const researchMethods = await ResearchMethod.findById(req.params.id);
    if(!researchMethods) return res.status(404).send('The research method with given id was not found');
    res.send(researchMethods);
});

router.post('/',  async (req, res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const existingResearchMethod = await ResearchMethod.findOne({name: req.body.name});
    if(existingResearchMethod) return res.status(400).send('Research Method exists');


    const researchMethod = new ResearchMethod({
        name: req.body.name
    })
    await researchMethod.save();
    res.send(researchMethod);
});

router.put('/:id',auth,  async(req, res)=>{

    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let researchMethod = {name: req.body.name};
    try{
        researchMethod = await ResearchMethod.findByIdAndUpdate(req.params.id, researchMethod,{new:true});
        if(!researchMethod) return res.status(404).send('The research method with given id was not found');
        res.send(researchMethod);
    }
    catch(err)
    {
        console.error(err);
    }
});

router.delete('/:id',auth,  async(req, res)=>{

    const researchMethod = await ResearchMethod.findByIdAndRemove(req.params.id);
    if(!researchMethod) return res.status(404).send('The status with given id was not found');
    res.send(researchMethod);
});

module.exports = router;