const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const examModel = require("./models/exam")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
mongoose.connect("mongodb+srv://meghana_murali:meghana@cluster0.k6qdhwb.mongodb.net/interalMarkDb?retryWrites=true&w=majority&appName=Cluster0")

app.post("/calculate", (request, response) => {
    const name = (request.body.name)
    const admissionno = (request.body.admissionno)
    const present = parseInt(request.body.present)

    const days = parseInt(request.body.days)
    const getMark1 = parseInt(request.body.mark1)
    const getExam1 = parseInt(request.body.exam1)
    const getMark2 = parseInt(request.body.mark2)
    const getExam2 = parseInt(request.body.exam2)
    const assignment1 = parseInt(request.body.assignment1)
    const assignment2 = parseInt(request.body.assignment2)

    const attendance = (present / days) * 8
    const total1 = (getMark1 / getExam1) * 10
    const total2 = (getMark2 / getExam2) * 10
    const totalmark = total1 + total2
    const assignment = assignment1 + assignment2
    const internal = attendance + total1 + total2 + assignment

    let data_store = new examModel(
        {
            name: name,
            admissionno: admissionno,
            attendence: attendance,
            totalmark: totalmark,
            assignment: assignment,
            internal: internal
        }
    )
    data_store.save()

    response.json({
        "name": name,
        "attendance": attendance,
        "totalmark": totalmark,

        "assignment": assignment,
        "internal": internal
    })
})

app.get("/viewall",(request,response)=>{
    examModel.find().then((items)=>{
        response.json(items)
    }).catch()
})

app.listen(4000, () => {
    console.log("Server is running on port 4000")
})