const express = require("express");
//const {users}= require("./data/users.json");
//const users= require("./data/users.json");

const usersRouter =require("./routes/users");
const booksRouter =require("./routes/books");
const app= express();
 const PORT =8081;

app.use(express.json());
  
app.use("/users",usersRouter);
//app.use("/books",booksRouter);

 // npm i nodemon --save-dev 

 const data = ["rohan", "dev"];

 app.get("/",(req,res)=> {
    res.status(200).json({
        message: "server is up and running successfully",
    });
 });

 app.get("/users",(req,res)=> {
   res.status(200).json({
       success: true,
       data: users
   });
});



app.post('/users',(req,res)=> {
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


app.get('/users/:id',(req,res)=>{
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

app.put('/users/:id',(req,res)=>{
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
   
    app.delete('/users/:id',(req,res)=>{
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
   




 app.get("*",(req,res)=> {
    res.status(404).json({
        message: "the route doesnt exist",
    });
 });



 app.listen(PORT , () => {
    console.log(`Server is running at port ${PORT}`);
 });