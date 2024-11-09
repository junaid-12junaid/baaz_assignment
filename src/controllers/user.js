const userModel = require("../models/user")
const { isValid, isvalidEmail, isValidPassword, keyValid,isvalidMobile,isValidName } = require('../validator/validation')

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

require("dotenv").config()


async function signup(req, res) {
    try {
        const data = req.body
        const {  name,phone,email,password} = data

        if (!isValid(name)) return res.status(400).send({ status: false, message: "name is mandatory and should have non empty String" })

            if (!isValidName.test(name)) return res.status(400).send({ status: false, message: "Please Provide name in valid formate and Should Starts with Capital Letter" })

        if (!isValid(email)) return res.status(400).send({ status: false, message: "email is mandatory and should have non empty String" })

        if (!isvalidEmail.test(email)) return res.status(400).send({ status: false, message: "email should be in  valid Formate" })

        if (await userModel.findOne({ email })) return res.status(400).send({ status: false, message: "This email is already Registered Please give another Email" })

            if (!isValid(phone)) return res.status(400).send({ status: false, message: "Phone is mandatory and should have non empty Number" })

                if (!isvalidMobile.test(phone)) return res.status(400).send({ status: false, message: "please provide Valid phone Number with 10 digits starts with 6||7||8||9" })
        
                if (await userModel.findOne({ phone })) return res.status(400).send({ status: false, message: "This Phone is already Registered Please give another Phone" })


        if (!isValid(password)) return res.status(400).send({ status: false, message: "password is mandatory and should have non empty String" })

        if (!isValidPassword(password)) return res.status(400).send({ status: false, message: "please provide Valid password with 1st letter should be Capital letter and contains spcial character with Min length 8 and Max length 15" })


        const encyptPassword = await bcrypt.hash(password, 10)

        let obj = {
            email, password: encyptPassword,name,phone
        }

        const newUser = await userModel.create(obj)

        return res.status(201).send({ status: true, message: "User created successfully", data: newUser })

    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

const loginUser = async function (req, res) {
    try {
        let data = req.body
        const { email, password } = data

        if (!keyValid(data)) return res.status(400).send({ status: false, msg: "Email and Password Required !" })

        if (!email) return res.status(400).send({ status: false, msg: "email is required" })


    
        if (!password) return res.status(400).send({ status: false, msg: "password is required" })

     
        const user = await userModel.findOne({ email: email })
        if (!user) return res.status(400).send({ status: false, msg: "Email is Invalid Please try again !!" })

        const verifyPassword = await bcrypt.compare(password, user.password)

        if (!verifyPassword) return res.status(400).send({ status: false, msg: "Password is Invalid Please try again !!" })

        const token = jwt.sign({
            userId: user._id.toString()
        },process.env.SECRET_JWT_KEY, { expiresIn: '24h' })

        let obj = {
            userId: user._id,
            token: token
        }

        res.status(200).send({ status: true, message: "User login successfull", data: obj })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


module.exports = { signup, loginUser }