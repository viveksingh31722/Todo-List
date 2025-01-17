const mongoose = require('mongoose');

const todoListSchema = new mongoose.Schema({
  task:{
    type:String,
    required:true,
    trim:true
  }
});

const TodoModal = mongoose.model('todos', todoListSchema); 
module.exports = TodoModal;