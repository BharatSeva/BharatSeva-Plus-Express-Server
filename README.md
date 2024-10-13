# Bharat Seva+ Express Server

Welcome to the Express server for **Bharat Seva+**, a MERN + Firebase project designed to facilitate seamless appointments between patients and healthcare professionals. This server handles user authentication, data management, and API interactions for the front-end applications.
Refer to [Official Organisation](https://github.com/BharatSeva) to get better idea of this whole project.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation) 
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)


## Features
- Built with Express.js for efficient and scalable server-side development.
- Provides various endpoints for medical reports and data retrieval.
- Implements JWT token authentication for secure access to endpoints.
- Utilizes Nodemailer for seamless email communication.
- Stores medical records in MongoDB for efficient storage and retrieval.
- Leverages Firebase for user data management.
- Implements various database schemas for optimized data storage.
- Includes middleware for request authentication.

---

## Tech Stack
- **Node.js**: JavaScript runtime for building the server-side application.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing health records and user data.
- **Firebase**: For additional data storage and real-time capabilities.
- **JWT (JSON Web Tokens)**: For secure user authentication.
- **Nodemailer**: For email notifications. (optional)

---

## Installation

--- 
### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local (default port) or cloud instance)
- Firebase account for configuration (Create your Firebase Account and database in few steps )  
    	- Create [Firebase Account](https://firebase.google.com/)  
    	- Create Project, add Firebase database, go to settings of project and look of configurations  
    	- Copy all these configurations for your setup.  
- Postman in your local system
- Docker (this is Optional, if you want to contribute to UI only them setting up container will help you to test your application.) 
### Steps
1. Fork the repository, clone the repo in your local system using 
    ```git clone <your-repo-url> .```
2. Install dependencies
    - Run command ```npm i```
    - Setup .env file in root directory with following variables
     ```
        MONGODB_URL=<your-cluster-url-goes-here>  # set this only rest are not necessary
        JWT_SECRET_KEY=JWT_SECRET_KEY
        Patient_JWT_SECRET_KEY=30d
        SENDEREMAIL=SENDEREMAIL             # optional
        SENDERPASSWORD=SENDERPASSWORD       # optional
        JWT_LIFETIME=30d
        Patient_JWT_LIFETIME=Patient_JWT_LIFETIME
        Patient_JWT_SECRET_KEY=30d
        PORT=5000
     ```
    - Setup Firebase project and app, you'll be get following config keys in project setting
     ```
       apiKey=<apiKey>
       authDomain=<authDomain>
       projectId=<projectId>
       storageBucket=<storageBucket>
       messagingSenderId=<messagingSenderId>
       appId=<appId>
       measurementId=<measurementId>
  
     ```

3. Run the server:
    - Run ```npm start``` to start your server.

4. Alternately you can setup docker-compose file and use command ```docker-compose up -d``` to start your container, make sure you've added all the required env variables.

5. Go to ```http://localhost:5000/``` for user dashboard, and ```http://localhost:5000/healthcare/``` for Healthcare dashboard.

6. This project consist of two webapps User( also Referred as Patient) and Healthcare dashboard. If you're first time user you first need to create your healthcare account via Postman api collection with ```Register Healthcare``` endpoint in``` HealthCare_endpoints``` folder or you can use UI dashboard by hitting ```http://localhost:5000/healthcare/``` url in your favourite browser.
    - After your Healthcare account created, you can create User Biodata with ```Create User Bio Data (HealthCare)``` enpoint, which user can register and login themselves inorder to use platform.
    - Now, you can use ```Register User``` and ```Login User``` endpoint to verify and create your user account.
    - Refer to Postman Collection, if you've any doubt regarding anything or if you thing there's anything you can add, feel free to raise issue.
    - You can drop your issue in [↗️](https://t.me/+8sy5M-KU5cNmZWZl) I'll be resolve it as soon as possible.
    - Refer to CONTRIBUTING.md file for more. Happy Contributions ✅.


## Project Structure
```
.
├── Bharat Seva.postman_collection.json
├── Controllers
│   ├── AppointmentController.js
│   ├── GET_Patient_BIoData.js
│   ├── Get_For_PatientProblem_Details.js
│   ├── HIP_Authorization.js
│   ├── HIP_Info.js
│   ├── HIP_Patient_Info.js
│   ├── HIP_Patient_Problem_Issuer.js
│   └── Patient_Authorization.js
├── Firebase
│   ├── Config.js
│   └── Service.js
├── LICENSE
├── MiddleWare
│   ├── HIP_Authentication.js
│   ├── Patient_Authentication.js
│   └── RateLimiter.js
├── MongoDB
│   └── Database.js
├── NodeMailer
│   ├── NodeMailer.js
│   └── NodeMessages.js
├── README.md
├── Router
│   ├── AppointsmentRouter.js
│   ├── HIP_Authorization_Router.js
│   ├── HIP_Info.js
│   ├── HIP_PatientDetails_Router.js
│   ├── HIP_Patient_Issues.js
│   ├── Patient.js
│   ├── Patient_Authorization_Router.js
│   ├── Patient_BioData.js
│   └── Patient_Details_Router.js
├── Schema
│   ├── Appointments.js
│   ├── HIP_Info_Schema.js
│   ├── Patient_CredentialSchema.js
│   ├── Patient_Info_Schema.js
│   └── Patient_problem_Schema.js
├── Server.js
├── package-lock.json
└── package.json

7 directories, 36 files
```


---
## API Endpoints
Please find ```Bharat Seva.postman_collection.json``` for request endpoints. Import it directly in your postman as collection to explore it more.

## License
licensed under the MIT License.

## Contributing
Please find CONTRIBUTING.md file to get better idea regarding contributions.
