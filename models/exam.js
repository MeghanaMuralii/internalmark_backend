const mongoose = require("mongoose")
const examSchema=mongoose.Schema(
    {
    name:String,
    admissionno:String,
    attendence:String,
    totalmark:String,
    assignment:String,
    internal:String
    }
)

const examModel=mongoose.model("InteralMarks",examSchema)
module.exports=examModel