// SUNUCUYU BU DOSYAYA KURUN

const express = require('express');
const server = express();
const port = 9000;
const userModel = require("./users/model")

server.use(express.json());
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



server.get("/api/users",  async (req,res) =>{
    try {
    let allUsers = await userModel.find()
    res.json(allUsers);
    } catch (err){
        res.status(500).json({
            message:"Kullanıcı bilgileri bulunamadı"
        })
    }
});



server.get("/api/users/:id" , async (req,res) => {
    try{
        let user = await userModel.findById(req.params.id)
        if(!user){
            res.status(404).json({message:"Kullanıcı bilgileri bulunamadı"});
        }else{
            res.json(user);
        }
    } catch (err){
     res.status(500).json({
        message:"kullanıcı bilgileri bulunamadı"
     })
    }
})

server.delete("/api/users/:id" ,async (req,res) => {
    try{
        let user = await userModel.findById(req.params.id)
        if(!user){
            res.status(404).json({message:"Belirtilen İd li kullanıcı bulunamadı"});
        }else{
           await userModel.remove(req.params.id);
           res.json(user)
        }
    } catch (err){
     res.status(500).json({
        message:"kullanıcı silinemedi"
     })
    }
})


server.put("/api/users/:id" ,async (req,res) => {
    try{
        let user = await userModel.findById(req.params.id)
        if(!user){
            res.status(404).json({message:"Belirtilen İd li kullanıcı bulunamadı"});
        }else{
          let {name,bio} =req.body
        if(!name || !bio)  {
            res.status(400).json({message:"Lütfen kullanıcı için bir name ve bio sağlayın"})
        }else{
            let updatedUser = await userModel.update(req.params.id,{name,bio});
            res.json(updated)
        } }
    } catch (err){
     res.status(500).json({
        message:"kullanıcı silinemedi"
     })
    }
})

module.exports = server; // SERVERINIZI EXPORT EDİN {}
