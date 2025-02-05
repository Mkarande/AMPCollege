const express = require('express')
const app = express();
//Import database connection
const db=require('./db')

require('dotenv').config();
//Import models
const person=require('./models/person');

//Import bodyparser-It is used to parse/extract the body of incomming http request
const bodyParser=require('body-parser');
const { constant } = require('lodash');
app.use(bodyParser.json());
const PORT=process.env.PORT ||3000

app.get('/', function (req, res) {
  res.send('Hello World')
})

//Import routes files
const personRoute=require('./routes/personRoute')
//User personRoute
app.use('/person',personRoute);
 


app.listen(PORT,()=>{
    console.log('listening on port:3000');
})