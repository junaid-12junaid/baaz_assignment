const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;

const taskSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: 'user',
        required: true,
        trim: true
    },
        title: {
            type:String, 
            required:true,
            trim:true
        },
        description: {
            type:String,
            trim:true
        },
        status: {
            type: String,
            default: 'pending',
            enum: ['pending', 'completed'],
            trim: true
        },
        dueDate: {
            type:Date,
            trim:true
        },
        file:{
            type:String,
            trim:true
        },
        deletedAt: { type: Date },
        isDeleted: { type: Boolean, default: false }
        
},{timestamps:true})


module.exports = mongoose.model("task", taskSchema)