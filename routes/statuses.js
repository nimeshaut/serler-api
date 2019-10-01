const express = require('express');
const {Status, validate} = require('../models/status');
const auth = require('../middleware/authenticator');
const router = express.Router();

router.get('/',  async(req, res)=>{
    const statuses = await Status.find();
    res.send(statuses);
});

router.get('/:id',auth, async(req, res)=>{
    const statuses = await Status.findById(req.params.id);
    if(!statuses) return res.status(404).send('The status with given id was not found');
    res.send(statuses);
});

router.post('/',  async (req, res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const existingStatus = await Status.findOne({name: req.body.name});
    if(existingStatus) return res.status(400).send('Status exists');


    const status = new Status({
        name: req.body.name
    })
    await status.save();
    res.send(status);
});

router.put('/:id',auth,  async(req, res)=>{

    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let status = {name: req.body.name};
    try{
        status = await Status.findByIdAndUpdate(req.params.id, status,{new:true});
        if(!status) return res.status(404).send('The status with given id was not found');
        res.send(status);
    }
    catch(err)
    {
        console.error(err);
    }
});

router.delete('/:id',auth,  async(req, res)=>{

    const status = await Status.findByIdAndRemove(req.params.id);
    if(!status) return res.status(404).send('The status with given id was not found');
    res.send(status);
});

module.exports = router;