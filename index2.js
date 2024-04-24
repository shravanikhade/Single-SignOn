const express=require("express");
const session=require("express-session")
const passport = require("passport");
function isLoggedIn(req,res,next){
    req.user ? next() : res.sendStatus(401);
}
const app= express();
app.use(session({secret:"cats"}))
app.use(passport.initialize())
app.use(passport.session());
require("./auth")
app.get('/',(req,res)=>{
res.send('<a href="/auth/google">Sign-in with Google</a>')
})
app.get('/signup',(req,res)=>{
    res.sendFile(__dirname+'/signup.html');
})
app.get('/auth/google',passport.authenticate('google',passport.authenticate('google',{scope:['email','profile']})))
app.get('/google/callback',passport.authenticate('google',{
    successRedirect:'/protected',
    failureRedirect:'/auth/failure'
}))
app.get('auth/failure',(req,res)=>{
    res.send("Something went wrong");
})
app.get('/protected',isLoggedIn,(req,res)=>{
    res.send(`Hello! ${req.user.displayName}<br><a href="/logout">logout</a>`)
})
app.get('/logout',(req,res,next)=>{
    req.session.destroy();
    res.send("Logged Out Successfully!")
})
app.post("/login",async function(req,res){
    const usernam=req.body.username
    const password=req.body.password
    const exist=await Users.findOne({userName:usernam,password:password})
    if(!exist)
    {
       return res.status(403).send("No User Exists")
    }
    return res.sendFile(__dirname+"/index3.html")
 })
 app.post("/web",auth)
app.listen(3000,()=>{
    console.log("Listening on port 3000")
})
