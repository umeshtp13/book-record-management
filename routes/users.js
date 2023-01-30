const express = require("express");
const {users} = require("./data/users.json");
const router = express.Router();

router.get("/users",(req,res)=> {
    res.status(200).json({
        success: true,
        data: users
    });
 });
 
 
 
 router.post('/users',(req,res)=> {
    const {id , name , surname ,email, subscriptionType,subcriptionDate} = req.body;
    const user = users.find((each)=> each.id===id);
 
    if(user){
       return res.status(404).json({
          success:false,
          message: "user already exits",
       });
       
    }
    users.push({
 
       id,
       name,
       surname,
       email,
       subscriptionType,
       subcriptionDate,
 
   });
   return res.status(201).json({
      success: true,
      data: users,
   });
 
 
 });
 
 
 router.get('/users/:id',(req,res)=>{
    const {id} = req.params;
    const user = users.find((each)=> each.id===id);
    if(!user){
       return res.status(404).json({
       success: false,
       message:" user not found",
    });
    
    }
 
    return res.status(200).json({
       success: true,
       data: user,
    });
 });
 router.put('/users/:id',(req,res)=>{
    const {id} = req.params;
    const { data }=req.body;
 
    const user = users.find((each)=> each.id===id);
    if(!user)
       return res.status(404).json({success: false,message:" user not found"});
       const UpdatedUser = users.map((each) => {
          if(each.id===id){
             return {
                ...each,
                ...data,
             };
          }
       
       return each;
       });
       return res.status(200).json({
          sucess: true,
          data: UpdatedUser,
       });
      
 
       
     });
    
     router.delete('/users/:id',(req,res)=>{
       const {id} = req.params;
       const user = users.find((each)=> each.id===id);
       if(!user){
          return res.status(404).json({
          success: false,
          message:" user to be deleted is not found",
       });
    }
       const index = users.indexOf(user);
       users.splice(index, 1);
 
       return res.status(200).json({sucess: true, data : users});
    });

    module.exports = router;