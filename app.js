const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
app.use(cors())

require('./connection/db')
const router = require('./router')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/',router)
app.listen(3000,()=>{
    console.log('Running...');
})
