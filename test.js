const express = require("express");
const app = express();
const expressError = require("./expressErrer.js");

// app.use((req,res,next)=>{
//     console.log("Hi I am a midleware");
//     next();
// });
app.use("/api",(req,res,next)=>{
    let {name} = req.query;
    if(name=="yashjain"){
        next()
    }else{
       throw new expressError(401,"Access denied");
    }
})
app.get("/api", (req, res) => {

    res.send("data");
});
app.get("/err" , (req,res)=>{
    adkajf=dfafd;
})
app.get("/", (req, res) => {

    res.send("workin");
});
app.get("/admin", (req, res) => {

    throw new expressError(402,"Permission Denied");
});
app.use((err,req,res,next)=>{
    console.log("----errer-----");
    let {status=500,message="some error occure"} = err;
    res.status(status).send(message);
    console.log(status);

})
app.listen(3000, () => {
    console.log("app is listening");
})
