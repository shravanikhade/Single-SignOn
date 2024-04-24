const mongoose=require("mongoose")
const express=require("express")
const app=express();
mongoose.connect("mongodb://localhost:27017/users")
const Users=mongoose.model("UserData",{firstName:String,lastName:String,password:String,email:String,dob:String,userName:String})
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname+'/learn1.html');
});
app.get('/login1',function(req,res){
   res.sendFile(__dirname+'/learn21.html')
})
app.use(express.json())
app.listen(3000)
app.post("/signup", async function(req,res){
    const usernam=req.body.username
    const existinguser= await Users.findOne({userName:usernam})
    if(existinguser){return res.status(403).send("Username already exist")}
    const user=new Users({
        firstName:req.body.firstname,
        lastName:req.body.lastname,
        password:req.body.password,
        email:req.body.email,
        dob:req.body.dob,
        userName:req.body.username
     });
     user.save();
     return res.json({
        msg:"User created succesfully"
     })
})
app.post("/login",async function(req,res){
   const usernam=req.body.username
   const password=req.body.password
   const exist=await Users.findOne({userName:usernam,password:password})
   if(!exist)
   {
      return res.status(403).send("No User Exist")
   }
   return res.sendFile(__dirname+"/learn31.html")
})
app.post("/web",async function(req,res){
   const lastname=req.body.lastname
   const val=await Users.find({lastName:lastname})
   return res.send(val)
})