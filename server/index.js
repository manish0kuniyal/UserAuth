const express= require('express')
const cors=require('cors')
const morgan =require('morgan')
const connect= require('./db/mongo.js')
const app = express()
const mongoose= require('mongoose')
const dotenv=require('dotenv')
const UserModel=require('./db/mongo')
const jwt=require('jsonwebtoken')
const otpgenerator =require('otp-generator')
const nodemailer=require('nodemailer')
const Mailgen=require('mailgen')

dotenv.config()


app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))
app.disable('x-powered-by')



mongoose.connect(process.env.URL,{
    useNewUrlParser:true
  }).then(()=>console.log("...connected to db"))
  .catch((err)=>console.log(err))

let nodeConfig={  
host: "smtp.forwardemail.net",
port: 465,
secure: true,
auth: {
  user: process.env.EMAIL 
  ,pass: process.env.PASSWORD

}}

let transporter=nodemailer.createTransport(nodeConfig)

let MailGenerator=new Mailgen({
  theme:"default",
  product:{
    name:"Mailgen",
    link:'https://index.js/'
  }
})

 const registerMail=async(req,res)=>{
  const {username,userEmail,text,subject}=req.body
  var email={
    body:{
      name:username,
      intro:text|| "Welcome Back!!",
      outro:"reach out to as @"
    }
  }
  var emailBody=MailGenerator.generate(email)
  let message={
    from:process.env.EMAIL,
    to:userEmail,
    subject:subject || "signup successful",
    html:emailBody
  }

 transporter.sendMail(message)
 .then(()=>{return res.status(200).send({msg:"email sent!"})})
 .catch(err=>res.status(500).send(err))
}


async function verifyUser(req,res,next){
    try{
       const {username} = req.method == "GET" ? req.query : req.body
       
       let exist=await UserModel.findOne({username})
       if(!exist) return res.status(404).send({error:"Can't find user "})
       next()
    }
    catch(err){
       return  res.status(404).send(err)
    }
}


async function Auth(req,res,next){
  try{
       const token =req.headers.authorization.split(" ")[1]
     
      
      const newtoken= await jwt.verify(token,'secretsx')
            
      req.user=newtoken
      res.json(newtoken)

      next()
  }
  catch(err){
    res.status(401)
     console.log(err)
  }
}


function localVariables(req,res,next){
  req.app.locals={
    OTP:null,
    resetSession:false
  }
  next()
}


// app.get('/',(req,res)=>{
//  res.send('ookok')
// })

app.post('/register', async (req, res) => {
    try {
      const { username, password, profile, email } = req.body;
  
      const existingUser = await UserModel.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: 'Username must be unique' });
      }
  
      const existingEmail = await UserModel.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ error: 'Email must be unique' });
      }
  
      if (password) {
        const user = new UserModel({
          username,
          password,
          profile,
          email,
        });
        await user.save();
      }
  
      res.status(200).json({ message: 'Registration successful' });
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: 'Something went wrong' });
    }
  });


app.post('/registermail',registerMail,(req,res)=>{
    const {username,userEmail,text,subject}=req.body
    var email={
      body:{
        name:username,
        intro:text || 'welcome back!',
        outro:"don't reply to this email"
      }
    }
})

app.post('/authenticate',(req,res)=>{
    
})

app.post('/login', verifyUser ,async (req,res)=>{
    try{
    const {username,password}=req.body
      const Findusername=await UserModel.findOne({username})
      if(Findusername){
        res.status(200)
        console.log('valid')
      }
      const Findpassword=await UserModel.findOne({password})
      if(Findpassword){
        console.log('valid')
        
      const token=jwt.sign({
        userId:UserModel._id,
        username:UserModel.username
      },'secretsx',{expiresIn:"24h"})

      return res.status(200).send({ 
        msg:"login succesful...",
        username:UserModel.username,
        token
      })
      }
    }
    catch(err){
      console.log(err)
    }
})



app.get('/user/:username', async (req, res) => {
  const { username } = req.params;
  try {
    if (!username) {
      return res.status(400).send({ error: "INVALID USERNAME" });
    }

    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).send({ error: "Couldn't find the user" });
    }

    const { password, ...userData } = user;
    return res.status(200).send(userData);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: "Something went wrong" });
  }
});


app.get('/generateOTP',verifyUser, localVariables, async (req,res)=>{
  try{
    
  req.app.locals.OTP = await otpgenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  })     
  res.status(201).send({code:req.app.locals.OTP})
  } 
  catch (err) {
    console.log(err);
    res.status(500).send({ error: "Something went wrong while generating OTP" });
  }

})

app.get('/verifyOTP',verifyUser,(req,res)=>{
    const {code}=req.query
    if(parseInt(req.app.locals.OTP)== parseInt(code)){
      req.app.locals.OTP
      req.app.locals.resetSession=true
      return res.status(201).send({msg:"verification done"})
    }
    return res.status(400).send({error:"invalid otp"})
})

app.get('/createResetSession',(req,res)=>{
    if(req.app.locals.resetSession){
      req.app.locals.resetSession=false
      return res.status(201).send({msg:"access granted"})
    }
    return res.status(404).send({error:"session expired"})
})


app.put('/updateuser',Auth,(req,res)=>{
    try{
    const id=req.query.id;
    if(id){
       const body=req.body

       UserModel.updateOne({_id:id},body,function (err,data){
         if(err)   throw err
             
         return res.status(201).send({msg:'user updated'})
       })
    } else{
      return res.status(401)
    } 
    }
    catch(err){
      res.status(401)
      console.log(err)
    }

})
app.put('/reset', verifyUser, (req, res) => {
  try {
    if(!req.app.locals.resetSession)
    return res.status(440).send({error:"session expired"})
    const { username, password } = req.body;
    UserModel.findOne({ username })
      .then((pswrd) => {
        if (pswrd) {
          UserModel.updateOne({ username: pswrd.username }, { password: password })
            .then(() => {
              return res.status(201).send({ msg: 'password reset successful' });
            })
            .catch((error) => {
              return res.status(500).send({ error });
            });
        } else {
          return res.status(404).send({ error: "username not found" });
        }
      })
      .catch((error) => {
        return res.status(500).send({ error });
      });
  } catch (err) {
    return res.status(401).send({ error: err });
  }
});



app.listen(5000,console.log("...on 5000"))
