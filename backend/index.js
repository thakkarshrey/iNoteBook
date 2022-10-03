const express = require('express')
const cors = require('cors')
const app = express()
const port = 8000
require('./db')

// i will have to use a middleware to let express know that we are going to be dealing with json files
app.use(express.json())
app.use(cors())

// In restful API humne saare routes ek js file mei rakhe hai aur yaha humne saare routes alag js file mei rakhi hai isliye ese app.use kiya hai
// Available routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port,()=>{
    console.log(`App is listening on ${port}`)
})
