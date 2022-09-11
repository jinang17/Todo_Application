const express = require('express');
const router = express.Router();
const Task_schema = require('../models/Task_model.js')

router.get('/', (req, res) => {
    Task_schema.find((err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

router.get('/:id',async(req,res)=>{
    try 
    {
        const TaskSchema = await Task_schema.findById(req.params.id)
        res.json(TaskSchema);
    }
    catch(err)
    {
        console.log('Error'+err)
    }
})
router.post('/',async(req,res)=>{
    const Temp_Task = new Task_schema({
        Task_description: req.body.Task_description,
        Task_completed: req.body.Task_completed
    })
    try {
        const a1 = await Temp_Task.save()
        res.json(a1)
    }
    catch (err)
    {
        res.send("Error at post request "+err)
    }
})
router.patch('/:id',async(req,res)=>{
    try {
        const TaskSchema = await Task_schema.findById(req.params.id)
        TaskSchema.Task_description = req.body.Task_description
        TaskSchema.Task_completed = req.body.Task_completed
        const a1 = await TaskSchema.save()
        res.json(a1)
    }
    catch (err)
    {
        res.send("Error at patch request "+err)
    }
});
router.delete('/:id',async(req,res)=>{
    try 
    {
        const TaskSchema = await Task_schema.findByIdAndDelete(req.params.id)
        res.json(TaskSchema);
    }
    catch(err)
    {
        console.log('Error at delete'+err)
    }
});
module.exports=router
