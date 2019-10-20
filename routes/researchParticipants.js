const express = require('express');

const {ResearchParticipant, validate} = require('../models/researchParticipant');
const router = express.Router();

router.get('/', async(req, res)=>{
    const researchParticipants = await ResearchParticipant.find();
    res.send(researchParticipants);
});

router.get('/:id', async(req, res)=>{
    const researchParticipant = await ResearchParticipant.findById(req.params.id);
    if(!researchParticipant) return res.status(404).send('The participant with given id was not found');
    res.send(researchParticipant);
});

router.post('/', async (req, res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const existingParticipant = await ResearchParticipant.findOne({name: req.body.name});
    if(existingParticipant) return res.status(400).send('Participant exists');

    const participant = new ResearchParticipant({
        name: req.body.name
    })
    await participant.save();
    res.send(participant);
});

router.put('/:id', async(req, res)=>{

    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let participant = {name: req.body.name};
    try{
        participant = await ResearchParticipant.findByIdAndUpdate(req.params.id, participant,{new:true});
        if(!participant) return res.status(404).send('The participant with given id was not found');
        res.send(participant);
    }
    catch(err)
    {
        console.error(err);
    }
});

router.delete('/:id', async(req, res)=>{

    const participant = await ResearchParticipant.findByIdAndRemove(req.params.id);
    if(!participant) return res.status(404).send('The participant with given id was not found');
    res.send(participant);
});

module.exports = router;