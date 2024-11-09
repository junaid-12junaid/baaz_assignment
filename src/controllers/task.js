const taskModel = require("../models/task")
let moment=require("moment")
const { isValid,validString ,validateDate} = require('../validator/validation')
let {isValidObjectId}=require("mongoose")
const ObjectId = require('mongoose').Types.ObjectId;

const createTask = async function (req, res) {
    try {

        let userId=req.decodedToken
        const data = req.body
        const {title,description,status,dueDate} = data

        const filePath = req.file ? req.file.path : null;

        console.log("file path",filePath)
        if (!isValid(title)) return res.status(400).send({ status: false, message: "title is mandatory and should have non empty String" })

            let obj = {
                title,userId
            }

            if(filePath) obj.file=filePath

        

            if (!validString(description)) return res.status(400).send({ status: false, message: "description can not be empty" })
            if(description){
                    obj.description=description
            }

            if (!validString(status)) return res.status(400).send({ status: false, message: "status can not be empty" })
            if(status){

                    let resprentStatus=['pending', 'completed']
                if(!resprentStatus.includes(status)) return res.status(400).send({ status: false, message: "please provide the status either pending or completed" })

                    obj.status=status

            }

            if (!validString(dueDate)) return res.status(400).send({ status: false, message: "dueDate can not be empty" })

            if(dueDate){

                if (!validateDate(dueDate)) return res.status(400).send({ status: false, message: "the dueDate should be in the formate of YYYY-MM-DD and should be valid date" })

                    obj.dueDate=moment(dueDate).format("YYYY-MM-DD")

            }
            
        const newUser = await taskModel.create(obj)

        return res.status(201).send({ status: true, message: "Task is created successfully", data: newUser })

    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

const  getAllTask= async function (req, res) {
    try {

       let {status}=req.query
        let userId=req.decodedToken

        const limit = parseInt(req.query.limit) || 10; 
const page = parseInt(req.query.page) || 1; 
const skip = (page - 1) * limit;

            let obj = {
                userId,
                isDeleted:false
            }


if (!validString(status)) return res.status(400).send({ status: false, message: "status can not be empty" })
            if(status){

                    let resprentStatus=['pending', 'completed']
                if(!resprentStatus.includes(status)) return res.status(400).send({ status: false, message: "please provide the status either pending or completed" })

                    obj.status=status

            }

            let allTask = await taskModel.find(obj).select({
                title: 1,
                description: 1,
                status: 1,
                dueDate: 1,
                file:1
              }).skip(skip)
              .limit(limit);
              
              

              if (allTask.length === 0) {
                return res.status(400).send({ status: false, message: "There are no tasks" });
              }
              

             

        return res.status(200).send({ status: true, message: "This are all the task of user", data: allTask })

    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

const  updateTask= async function (req, res) {
    try {

        const {title,description,status,dueDate} = req.body
        const filePath = req.file ? req.file.path : null;
        let id=req.params.id

        
        let userId=req.decodedToken

        console.log(userId)

        if (!isValid(id)) return res.status(400).send({ status: false, message: "id is mandatory and should have non empty String" })

            if (!isValidObjectId(id)) return res.status(400).send({ status: false, message: "Invalid Id" })

            let findTask=await taskModel.findById(id)

            if(!findTask) return res.status(400).send({ status: false, message: "there are no task with provided id" })

                console.log("findTask",findTask)

                if (!new ObjectId(userId).equals(findTask.userId)) {
                    return res.status(403).send({ status: false, message: "Unauthorized access! You can't update this user's task" });
                  }


        if(Object.keys(req.body).length==0&&!filePath) return res.status(400).send({ status: false, message: "please provide the inputs to update the task" });
    
        let obj = {
            
        }

        if(filePath) obj.file=filePath
        if (!validString(title)) return res.status(400).send({ status: false, message: "title can not be empty" })
            if(title){
                    obj.title=title
            }

            

            if (!validString(description)) return res.status(400).send({ status: false, message: "description can not be empty" })
            if(description){
                    obj.description=description
            }

            if (!validString(status)) return res.status(400).send({ status: false, message: "status can not be empty" })
            if(status){

                    let resprentStatus=['pending', 'completed']
                if(!resprentStatus.includes(status)) return res.status(400).send({ status: false, message: "please provide the status either pending or completed" })

                    obj.status=status

            }

            if (!validString(dueDate)) return res.status(400).send({ status: false, message: "dueDate can not be empty" })

            if(dueDate){

                if (!validateDate(dueDate)) return res.status(400).send({ status: false, message: "the dueDate should be in the formate of YYYY-MM-DD and should be valid date" })

                    obj.dueDate=moment(dueDate).format("YYYY-MM-DD")

            }

            let updatedTask = await taskModel.findByIdAndUpdate(id,obj,{new:true});
  
        return res.status(200).send({ status: true, message: "the task has been updated successfully", data: updatedTask })

    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

const  deleteTask= async function (req, res) {
    try {

        let id=req.params.id


        let userId=req.decodedToken

       

        if (!isValid(id)) return res.status(400).send({ status: false, message: "id is mandatory and should have non empty String" })

            if (!isValidObjectId(id)) return res.status(400).send({ status: false, message: "Invalid Id" })

            let findTask=await taskModel.findById(id)

            if(!findTask) return res.status(400).send({ status: false, message: "there are no task with provided id" })



                if (!new ObjectId(userId).equals(findTask.userId)) {
                    return res.status(403).send({ status: false, message: "Unauthorized access! You can't delete this user's task" });
                  }

                if(findTask.isDeleted==true) return res.status(400).send({ status: false, message: "This task is already Deleted" })
        
    
        
            let updatedTask = await taskModel.findByIdAndUpdate(id,{isDeleted:true},{new:true}).select({title:1,_id:0,isDeleted:1});
  
        return res.status(200).send({ status: true, message: "this task has been deleted successfully", data: updatedTask })

    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}



module.exports = { createTask ,getAllTask,updateTask,deleteTask}