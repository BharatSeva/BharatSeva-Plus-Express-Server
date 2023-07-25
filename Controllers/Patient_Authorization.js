const StatusCode = require("http-status-codes")
const Patient_Credentials = require("../Schema/Patient_CredentialSchema")
const Patient_Details = require("../Schema/Patient_Info_Schema")

const { LoginDetected, UserRegister, UserOAuthSign } = require("../NodeMailer/NodeMessages")
const { GetHealthUserSettingForServer, HealthUserLoginData } = require("../Firebase/Service")


const Patient_Register = async (req, res) => {
    try {
        let { health_id } = req.body
        const FindUser = await Patient_Details.findOne({ health_id })
        if (!FindUser) {
            res.status(StatusCode.BAD_REQUEST).json({ status: "No User Found With Given Health ID", message: "HealthCare Need To Register You Before You Login.." })
            return;
        }
        const IsUser = await Patient_Credentials.findOne({ health_id })
        if (IsUser) {
            res.status(StatusCode.BAD_REQUEST).json({ status: "User Already Registered!" })
            return
        }
        req.body.name = FindUser.fname + " " + FindUser.lname;
        if (FindUser.email === req.body.email) {
            await Patient_Credentials.create(req.body)
            res.status(StatusCode.CREATED).json({ status: "Successfully Registered, Now You Can Login..." })
            UserRegister(req.body.name, FindUser.health_id, FindUser.email)
        } else {
            res.status(StatusCode.BAD_REQUEST).json({ status: "Email Mismatched", message: "Use the same email address that you provided for HealthCare registration" })
        }
    } catch (err) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ status: "Something Bad Happened!" })
    }
}

const Patient_Login = async (req, res) => {
    try {
        const { health_id, password } = req.body
        const Patient = await Patient_Credentials.findOne({ health_id })
        if (!Patient) {
            res.status(StatusCode.BAD_REQUEST).json({ message: "No User Exits with Given Credentials" })
            return;
        }

        const IsAccountSuspended = await GetHealthUserSettingForServer(health_id.toString())
        if (!IsAccountSuspended.Account_Connection || !IsAccountSuspended.Total_request) {
            res.status(StatusCode.NOT_ACCEPTABLE).json({ status: "Account Suspended!", message: "You Have Used all your 50 operations!, Please Mail to 21vaibhav11@gmail.com to extend the limit" })
            return
        }

        const IspasswordCorrect = await Patient.P_comparePass(password)
        if (!IspasswordCorrect) {
            res.status(StatusCode.BAD_REQUEST).json({ message: "Incorrect Password!" })
            return;
        }
        const token = Patient.P_createJWT();
        await HealthUserLoginData(Patient.health_id, req.ip.toString())
        res.status(StatusCode.ACCEPTED).json({
            name: Patient.name,
            healthId: Patient.health_id,
            token
        })
        LoginDetected(Patient.name, Patient.health_id, req.ip, Patient.email)
    }
    catch (err) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: err.message })
    }
}


// Checking Your User For Auth
const GuestSchema = require("../Schema/GuestSchema")
const Patient_GoogleOAuth = async (req, res) => {
    try {
        const { email, sub, name, family_name } = req.body
        const IsUser = await Patient_Credentials.findOne({ email })
        const IsGuestUser = await GuestSchema.findOne({ email })
        if (IsUser) {
            const IsAccountSuspended = await GetHealthUserSettingForServer(IsUser.health_id.toString())
            if (!IsAccountSuspended.Account_Connection || !IsAccountSuspended.Total_request) {
                res.status(StatusCode.NOT_ACCEPTABLE).json({ status: "Account Suspended!", message: "You Have Used all your 50 operations!, Please Mail to 21vaibhav11@gmail.com to extend the limit" })
                return
            }
            const token = IsUser.P_createJWT()
            await UserOAuthSign(req.ip, req.body, "Verified User Signed In")
            res.status(200).json({ status: "Verified User", token, name: IsUser.name, healthId: IsUser.health_id })
            return
        }
        else if (IsGuestUser) {
            const IsAccountSuspended = await GetHealthUserSettingForServer(sub.toString())
            if (!IsAccountSuspended.Account_Connection || !IsAccountSuspended.Total_request) {
                res.status(StatusCode.NOT_ACCEPTABLE).json({ status: "Account Suspended!", message: "You Have Used all your 50 operations!, Please Mail to 21vaibhav11@gmail.com to extend the limit" })
                return
            }
            const token = IsGuestUser.CreateHealthUserGuestJWT()
            await UserOAuthSign(req.ip, req.body, "User Signed In")
            res.status(StatusCode.OK).json({ status: "Verified Guest User", token, healthId: IsGuestUser.sub, name: IsGuestUser.name })
            return
        } else {
            // This Will create schema for Guest User
            const GuestUser_DefaultSchema = {
                "health_id": sub,
                "fname": name.split(" ")[0],
                "middlename": "-/-",
                "lname": name.split(" ")[1],
                "sex": "M/F",
                "dob": "Your DOB",
                healthcareName: "Vaibhav Hospital",
                healthcareId: 2021071042,
                "bloodgrp": "Your Blood Group",
                "BMI": "Your BMI",
                "MarriageStatus": "Status",
                "Weight": "Weight",
                "email": email,
                "mobilenumber": "YourMobile",
                "aadharNumber": "Your Aadhar",
                "Primarylocation": "Guest Location",
                "sibling": "Yes/No",
                "twin": "Your twin",
                "fathername": "Pappa",
                "mothername": "Mummy",
                "emergencynumber": "Number"

            }
            const NewGuestUser = await Patient_Details.create(GuestUser_DefaultSchema)
            const NewUser = await GuestSchema.create({ ...req.body })
            const token = NewUser.CreateHealthUserGuestJWT()
            await UserOAuthSign(req.ip, req.body, "New User")
            res.status(StatusCode.CREATED).json({ status: "Guest User", token, healthId: NewUser.sub, name: NewUser.name })
        }
    } catch (err) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ status: "Invalid Request", message: err.message })
        console.log(err)

    }
}

module.exports = {
    Patient_Register,
    Patient_Login,
    Patient_GoogleOAuth
}