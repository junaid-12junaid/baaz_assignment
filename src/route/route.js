const express = require('express')
const router = express.Router()
const { authentication } = require("../middleware/auth")
let {upload}=require("../upload")


const { signup, loginUser } = require('../controllers/user')
const { createTask, getAllTask, updateTask, deleteTask } = require('../controllers/task')


// for users route =============================>

router.post("/auth/signup",signup )
router.post("/auth/login", loginUser)

// for task route =============================>

router.post("/tasks",authentication, upload.single('file'),createTask )
router.get("/tasks",authentication, getAllTask)
router.put("/tasks/:id",authentication, upload.single('file'),updateTask )
router.delete('/tasks/:id',authentication,deleteTask )

// for worng route=============================>

router.all('/*/', async function (req, res) {
    return res.status(404).send({ status: false, message: "Page Not Found" })
})


module.exports = router