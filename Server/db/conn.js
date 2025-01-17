const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test').then(()=>{
  console.log('Connection Successful');
}).catch((e)=>{
  console.log(e,"no connection");
});

