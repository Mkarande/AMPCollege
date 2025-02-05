const express = require('express')
//Import models
const person=require('./../models/person');
const router = express.Router();

//Get method to get list of all persons
router.get('/list', async (req, res) => {
    try {
        const data = await person.find();
        res.status(200).json(data);

    } catch (err) {
        console.log('err', err);
        res.status(500).json({ error: 'Internal server error'+err })
    }
})

//Post method to save person details
router.post('/save', async (req, res) => {
    try {
        const data = req.body;
        //Create new person document using the mongoose model
        const newPerson = new person(data);

        //save new person to the database
        const response = await newPerson.save();
        console.log('data saveed')
        res.status(200).json(response);
    }
    catch (err) {
        console.log('err', err);
        res.status(500).json({ error: 'Internal server error' +err})
    }
});

//Parameterzied apis
router.get('/list/:departmentType', async (req, res) => {
    try {
        const departmentType = req.params.departmentType;
        const respose = await person.find({ department: departmentType });
        console.log(respose)
        res.status(200).json(respose);

    } catch (err) {
        console.log('err', err);
        res.status(500).json({ error: 'Internal server error' + err })
    }
})

router.put('/list/:id',async(req,res)=>{
    try{
        const personId= req.params.id;//Extract url
        const updatepersonData=req.body //updated person data;

        const response =await person.findByIdAndUpdate(personId,updatepersonData,{
            new:true,//return updated document,
            runValidators:true// run
        })
        console.log('response',response);
        if(!response){
            res.status(404).json({ error: 'Person not found' })
        }else{
            res.status(200).json({ success: 'Person updated sccuessfully' }) 
        }
    }
    catch(err){
        console.log('err', err);
        res.status(500).json({ error: 'Internal server error' + err })
    }
})
router.delete('/:id',async(req,res)=>{
    try{
        const personId= req.params.id;//Extract url

        const response =await person.findByIdAndDelete(personId)
        console.log('response',response);
        if(!response){
            res.status(404).json({ error: 'Person not found' })
        }else{
            res.status(200).json({ success: 'Person deleted sccuessfully' }) 
        }
    }
    catch(err){
        console.log('err', err);
        res.status(500).json({ error: 'Internal server error' + err })
    }
})

module.exports=router;