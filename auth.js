const passport= require("passport");
const GoogleStrategy=require("passport-google-oauth20").Strategy;
const  callback_url="http://localhost:3000/google/callback";

passport.use(new GoogleStrategy({
    clientID:'536543738969-smu3nl9ekfn95fi7fnntsu3kf2ivhtfq.apps.googleusercontent.com',
    clientSecret:'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',
    callbackURL:callback_url,
    scope:['email','profile'],
    passReqToCallback:true
    
},async(req,accessToken,refereshToken,profile,cb)=>
{
   
    console.log("Shravani")
    const defaulUser={
        fullName: `${profile.name.givenName} ${profile.name.familyName}`,
        lastName:profile.name.familyName,
        email: profile.emails[0].value,
        picture:profile.photos[0].value,
        googleId:profile.id,
    }
    console.log(profile.id)
    console.log(accessToken)
    const existinguser= await User.findOne({email: profile.emails[0].value})


    if(existinguser){return cb(null,profile)}
    const users=new User({
        fullName: `${profile.name.givenName} ${profile.name.familyName}`,
        lastName:profile.name.familyName,
        email: profile.emails[0].value,
        picture:profile.photos[0].value,
        googleId:profile.id,
     });
     users.save();
    return cb(null,profile)
}))
passport.serializeUser((user,cb)=>{ 
    console.log("Serializing User: ",user);
    cb(null,user);
});
passport.deserializeUser(function(user,done){
    done(null,user)
})

const auth=async(req,res)=>{
    const lastname=req.body.lastname
    const val=await User.find({lastName:lastname})
    const name=[]
    val.forEach(function(item){
       name.push(item["email"]);
    });
    const data = {
        title: 'Info',
        dataArray: name
    };
    return res.render('final',data);
};

module.exports = auth;