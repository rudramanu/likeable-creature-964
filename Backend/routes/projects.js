const express = require("express");
const { ProjectModel } = require("../models/projects.model");
const ProjectRouter = express.Router();


// *****************//
// GET ALL USERS

ProjectRouter.get("/search/:key", async (req, res) => {
   try {
      // let getlocation=AllData.location
       const data = await ProjectModel.find(
         {
            "$or":[
               {location:{$regex:req.params.key}},
               {name:{$regex:req.params.key}}
            ]
         }
       )
         
     res.send(data);
   } catch (error) {
       res.send("err:Not able to get the all salons data");
       console.log(error);
   }
});




//GET================================================================================================> 
ProjectRouter.get("/",async(req,res)=>{
   try{
   //let userId = req.params.id;
   
   let data = await ProjectModel.find()
   res.send(data);
   }catch(err){
    console.log("error in projects | get by userId",err)
   }
})

//=====>  Regex for search Using location ============================================================> 
//==>>>Sample URL => localhost:8000/product/search?location=goa
ProjectRouter.get("/search/", async (req,res)=>{
   //let searchLocation = req.params
   let locationQuery = req.query
   try {
      let loca = locationQuery.location
      let data = await ProjectModel.find({location: { $regex: loca, $options: 'i'}})
      res.send(data)
   } catch (error) {
      console.log(error);
      res.status(404).send("Something went wrong")
   }
})

//Post================================================================================================> 
ProjectRouter.post("/add",async(req,res)=>{
   //let {name, image, loaction, rating, services, availableTime}=req.body;
   try {
      //let newPro =
      await ProjectModel.insertMany(req.body);
      //await newPro.save()
      //console.log(req.body);
      res.send("data inserted")
   } catch (error) {
      console.log(error);
      res.status(422).json({err:"fill all the nescessary entries"})
   }

})

//Delete================================================================================================>  
ProjectRouter.delete("/:id",async(req,res)=>{
  let _id = req.params.id;
  let out = await ProjectModel.findByIdAndDelete(_id);
  res.send("deleted successfully")

})





module.exports={ProjectRouter};