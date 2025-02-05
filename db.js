//It is responsible for establishing connection between nodejs application and mongoDB database
const mongoose= require('mongoose');
require('dotenv').config();
//Define mongoDB connection URL
//const mongoDBURL=process.env.MONGODB_URL_LOCAL
const mongoDBURL=process.env.MONGODB_URL

//Conecction establish-Setup mongodDB commection
//mongoose.connect(mongoDBURL);

mongoose.connect(mongoDBURL, {
    serverSelectionTimeoutMS: 30000, // Wait up to 30 seconds
    socketTimeoutMS: 45000 // Increase socket timeout
  })
    .then(() => console.log(' Connected to MongoDB Atlas'))
    .catch(err => {
      console.error(' MongoDB Connection Error:', err);
      process.exit(1); // Exit the app if the connection fails
    });
//Access connection object-It is a object use to handle events and interact with the database
const db=mongoose.connection;

db.on('connected',()=>{
    console.log('connected to mongoDB server');
});

db.on('error',(err)=>{
    console.log('error occured',err);
});

db.on('disconnected',()=>{
    console.log('server disconnected');
});


module.exports=db;