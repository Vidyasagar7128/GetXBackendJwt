const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/crud',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(()=>{
    console.log("DB");
}).catch((err)=>{
    console.log(err)
})
// mongoose.set('useNewUrlParser', true);
//   mongoose.set('useFindAndModify', false);
//   mongoose.set('useCreateIndex', true);
//   mongoose.set('useUnifiedTopology', true);