const express = require("express")
const app = express();
require('dotenv').config();

// Extra Security packages goes here
const helmet = require('helmet')
const cors = require("cors")
const xss = require("xss-clean")

// Flexible Rate Limiter!
const { RateLimit } = require("./MiddleWare/RateLimiter")
app.use(RateLimit)

// Express Rate Limiter
const rateLimiter = require("express-rate-limit");

// Security Goes Here

app.set('trust proxy', 1);
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
})
);
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors())
app.use(xss())

// Incoming Data to JSON
app.use(express.json())
// Connect to MongoDB
const ConnectDB = require("./MongoDB/Database")


// Patient Authorization Router Goes Here
const PatientRouter_Authorization = require("./Router/Patient_Authorization_Router")
app.use('/api/v1/userauth', PatientRouter_Authorization)

// Below Will handle PatientRoutings
const Patient_Authentication = require("./MiddleWare/Patient_Authentication");
const Patient = require("./Router/Patient")
const PatientBioData = require("./Router/Patient_BioData")
const PatientDetails_Router = require("./Router/Patient_Details_Router");
const Appointments = require("./Router/AppointsmentRouter")
app.use('/api/v1/userdetails', Patient_Authentication, PatientDetails_Router, PatientBioData, Appointments)
app.use('/api/v1/user', Patient_Authentication, Patient)
 




// HealthCare Login/Register Function Goes Here
const Authorizationrouter = require("./Router/HIP_Authorization_Router");
app.use("/api/v1/healthcareauth", Authorizationrouter)



const authentication = require("./MiddleWare/HIP_Authentication");
const HIP_Info = require("./Router/HIP_Info") 
const GET_Patient = require("./Router/HIP_Patient_Issues")
const HIP_router = require("./Router/HIP_PatientDetails_Router");

app.use("/api/v1/healthcaredetails", authentication, HIP_Info, HIP_router)
app.use("/api/v1/healthcare", authentication, GET_Patient)




const port = 5000;
const start = async () => {
    try {
        await ConnectDB(process.env.MONGODB_URL);
        app.listen(port, console.log(`Server is Listening to port ${port}.....`))
    } catch (error) {
        console.log("Something Went Wrong, Message: ", error.message)
    }
}
start(); 