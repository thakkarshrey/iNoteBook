const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/inotebook',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('Connected to mongoDB')
}).catch((e)=>{
    console.log('Connection failed',e)
})



// mongo db connection code in terminal : sudo mongod --dbpath /usr/local/var/mongodb/