const express = require("express")
const app = express();
require('dotenv').config();
// Incoming Data to JSON



// extra Security packages goes here
const helmet = require('helmet')
const cors = require("cors")
const xss = require("xss-clean")
const rateLimiter = require("express-rate-limit");
// Security Goes Here

app.set('trust proxy', 1);
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
})
);  
app.use(express.json())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors())
app.use(xss())

// Connect to MongoDB
const ConnectDB = require("./MongoDB/Database")

// Patient Request Authentication Goes here
const Patient_Authentication = require("./MiddleWare/Patient_Authentication");


// This one for PatientBio_Data Details
const PatientBioData = require("./Router/Patient_BioData")

// Patient Access Router Goes Here
const PatientRouter_Authorization = require("./Router/Patient_Authorization_Router")
app.use('/api/v1/patientAuth', PatientRouter_Authorization)
const PatientDetails_Router = require("./Router/Patient_Details_Router");

app.use('/api/v1/patientDetails', Patient_Authentication, PatientDetails_Router, PatientBioData)


// app.use('/api/v1/', PatientBioData)



// authentication middleware Goes here
const authentication = require("./MiddleWare/HIP_Authentication");
// This one to create a patient problem 
// Create Patient Route Goes Here 
const PatientProblems = require("./Router/Patient_problem_Router")

const HIP_router = require("./Router/HIP_PatientDetails_Router");
const Authorizationrouter = require("./Router/HIP_Authorization_Router")
app.use("/api/v1/hipAuth", Authorizationrouter)
app.use("/api/v1/hip", [authentication, HIP_router, PatientProblems])


const port = process.env.PORT || 5000; 

const start = async () => {
    try {
        await ConnectDB(process.env.MONGODB_URL);
        app.listen(port, console.log(`Server is Listening to port ${port}.....`))
    } catch (error) {
        console.log("Something Went Wrong, Message: ", error.message)
    }
}
start(); 