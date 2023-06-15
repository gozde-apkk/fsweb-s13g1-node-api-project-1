// SUNUCUYU BU DOSYAYA KURUN

const express = require('express');
const server = express();
const port = 9000;
const userModel = require("./users/model")


server.get("/",function(req, res){
    res.send("hello world");
} );

server.listen(port, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", port);
})

server.post("/api/users", async (req,res)=>{
     try {
        let {name,bio} = req.body;
     if(!name || !bio){  /*name ve bio alanı yoksa*/
       res.status(400).json({message: "Lütfen kullanıcı için bir name ve bio sağlağın"});
     }else {
       let insertedUser = await userModel.insert({name,bio});
       res.status(201).json(insertedUser);
     }
     } catch (err) {
        res.status(500).json({
            message:"Veritabanına kaydedilirken bir hata oluştu"
     })
    }
});


/*
server.post("/api/users", (req,res)=>{
    let {name,bio} = req.body;
    if(!name || !bio){  /*name ve bio alanı yoksa
      res.status(400).json({message: "Lütfen kullanıcı için bir name ve bio sağlağın"});
    }else {
      let insertedUser =userModel.insert({name,bio}).then((insertedUser) =>{
        return insertedUser
      }).catch((err)=> {
        res.status(500).json({
            message:"Veritabanına kaydedilirken bir hata oluştu"
        })
      }
);
      res.status(201).json(insertedUser);
    }
});
*/

module.exports = server; // SERVERINIZI EXPORT EDİN {}
