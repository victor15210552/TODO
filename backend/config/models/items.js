var mongoose = require('mongoose');

var taskschema = new mongoose.Schema({
    title:{
        type: String,
        required:true,
        unique:true
    },
    description:{
        type: String,
        default:''
    },
    taskStatus:{
        type:Boolean,
        default:false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = taskschema;