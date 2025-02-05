//This file represents schema 

const mongoose=require('mongoose');

//define person schema 
const personSchema=new mongoose.Schema({
    name:{
        type:String,
        reuired:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    department:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    }
})

//create persone model
const person=mongoose.model('person',personSchema);

module.exports=person;