 const express = require('express');
 const mongoose = require('mongoose');
 const cors = require('cors')
 const bodyParser = require('body-parser')
 const server = express();
 
 main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://waseem:FB6Zxrht05giuPZa@cluster0.y9hdy7q.mongodb.net/userdata');
   console.log('Db_Connected')
}
// Schema 
const userSchema = new mongoose.Schema({
       username: String,
       password:String
     });
//    schema sy make model 
     const User = mongoose.model('User', userSchema);


 server.use(cors());
 server.use(bodyParser.json());
// FB6Zxrht05giuPZa

// API
// CRUD - Create
 server.post('/demo', async(req,res)=>{
       let user = new User();
       user.username = req.body.username;
       user.password= req.body.password;
       const doc = await user.save();
       console.log(doc)
       res.json(doc)
 })
 
 server.get('/demo', async (req,res)=>{
       const docs = await User.find({});
       res.json(docs)
 })
 
//  server run at 8080
 server.listen(8080,()=>{
        console.log("Server Successfully Runing");
 })