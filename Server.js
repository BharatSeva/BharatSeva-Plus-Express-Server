'use strict';

const express = require("express");
const responseTime = require('response-time');
const app = express();
const client = require('prom-client');
const collectDefaultMetrics = client.collectDefaultMetrics;

require('dotenv').config();

collectDefaultMetrics({ timeout: 5000 });

const reqResTime = new client.Histogram({
  name: 'http_express_req_res_time',
  help: 'Histogram for the duration of HTTP requests in ms',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 5, 15, 50, 100, 200, 300, 500, 1000]
});

app.use(responseTime((req, res, time) => {
  console.log(res.statusCode)
  reqResTime.labels({
    method: req.method,
    route: req.url,
    status_code: res.statusCode
  }).observe(time);
}))

const counter = new client.Counter({
  name: 'node_request_operations_total',
  help: 'The total number of processed requests'
});

const histogram = new client.Histogram({
  name: 'node_request_duration_seconds',
  help: 'Histogram for the duration of requests in seconds.',
  buckets: [0.5, 1, 2, 5, 10]
});

app.use((req, res, next) => {
  console.log("global--> " + req.url);
  const start = Date.now();
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    histogram.observe(duration);
    counter.inc();
  });
  next();
});

// for prometheus /metrics
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});



const path = require('path');
app.use('/healthcare', express.static(path.join(__dirname, 'healthcare_static_build/build')));
app.get('/healthcare/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'healthcare_static_build/build', 'index.html'));
});

app.use('/', express.static(path.join(__dirname, 'patient_static_build/build')));
app.get('/user/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'patient_static_build/build', 'index.html'));
});


// Extra Security packages goes here
const cors = require("cors")
app.use(cors())

// Flexible Rate Limiter!
// const { RateLimit } = require("./MiddleWare/RateLimiter")
// app.use(RateLimit)

// Express Rate Limiter
// const rateLimiter = require("express-rate-limit");

// Security Goes Here
app.set('trust proxy', 1);
// app.use(rateLimiter({
  //     windowMs: 15 * 60 * 1000,
  //     max: 100,
  // })
  // );
  
const helmet = require('helmet')
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
const xss = require("xss-clean")
app.use(xss())

// Incoming Data to JSON
app.use(express.json())



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



// Connect to MongoDB
const ConnectDB = require("./MongoDB/Database")
const PORT = process.env.PORT || 5000;
// If cloud is not present then use local cluster
const URL = process.env.MONGODB_URL || "mongodb://mongodb:27017/mydatabase"   
const start = async () => {
    try {
        await ConnectDB(URL);
        app.listen(PORT, console.log(`Server is Listening to port ${PORT}.....`))
    } catch (error) {
        console.log("Something Went Wrong, Message: ", error.message)
    }
}
start(); 