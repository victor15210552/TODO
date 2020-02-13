const express = require('express');
const API = express();
const CORS = require('cors');
const mongoose = require('mongoose');
require('./config/connection');

//take Model Task
const taskModel = require('./config/models/items');
const tasksEntity = mongoose.model('Item', taskModel);

//middlewares
API.use(CORS());
API.use(express.json());

//Route///////////////////
API.get('/items', (req, res) => {
    tasksEntity.find()
    .sort({date:-1})
    .then(items => res.json(items))
    .catch(err => res.status(404).json({ sucess: false }));
 });

 //post new item
API.post('/items/create', (req, res) => {
    var newTask = new tasksEntity(req.body);
    newTask.save()
    .then(item  => res.json(item))
    .catch(err => res.status(404).json({ sucess: false }));
});


API.delete('/items/delete/:id', (req, res) => {
    tasksEntity.findById(req.params.id)
        .then(item => item.remove().then(()=> res.json({ sucess: true })))
        .catch(err => res.status(404).json({ sucess: false }));
});


API.post('/items/update', (req, res) => {
    const {flag} = req.body;
    const {id} = (flag==='update')?req.body.task:req.body;
    if(flag === 'update'){
        const {title, description} = req.body.task;
        var toUpdate = {
            title:title,
            description:description
        };
    }else if(flag === 'notDone'){
        var toUpdate = {
            taskStatus:false
        }
    }else{
        var toUpdate = {
            taskStatus: true
        };
    }
    tasksEntity.findByIdAndUpdate(id,toUpdate,{new:true}, function(err, result){
        if(!err){
            res.json({
                message:'updated',
                result
            });
        }else{
            res.status(500);
        }
    });
});


const port = process.env.PORT || 4000;
API.listen(port, () => console.log('Server running on port '+port));