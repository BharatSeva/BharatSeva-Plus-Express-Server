const { SendMail } = require("./NodeMailer")

const GreetPatient = (email, name, hospital) => {
    const txt = `Hello ${name} Its Pleasure To onboard you on our platform. Your Data Has Been Created by ${hospital} On ${new Date()}to access and view your data you need to register yourself on our website.`
    SendMail(email, `Welcome Mr.${name}`, txt)
}

const LoginDetected = async (name, healthId, Ipaddress, email) => {
    const txt = `Hello ${name}, We Have Detected A new Login In Your account With Health ID : ${healthId} from IP Address
    ${Ipaddress}. If this login not done by you immediately change your password.`
    SendMail(email, `Login Detected`, txt)
}

const UserRegister = async (name, healthId, email) => {
    const txt = `Welcome ${name} Health ID : ${healthId} to our Esteemed Platform. Bharat सेवा Welcomes You to our platform. We Have Successfully Registered
    You and We are Extremely Excited to cover a long Journey with you.`
    SendMail(email, `नमस्कार 🙏`, txt)
}

const AccountSuspended = async (name, email) => {
    const txt = `Dear ${name}, We Have Temporarily Suspended Your Account Because of Unusual Request We have Noticed!. Mail to 21vaibhav11@gmail.com For Continued Service`
    SendMail(email, `Account Suspended`, txt)
}

// This One Will Send Message To DeleteAccount
const DeleteHealthCareAccountmessage = async (name, healthcareId, email) => {
    const txt = `Dear ${name} You Have requested To delete your HealthCare Account Held With ID ${healthcareId}. Kindly Note That Your Account Login Will Be Suspended and in Upcoming 3-4 days your account will be removed. If you changed your mind and want to stop it then mail to 21vaibhav11@gmail.com to stop deletion!`
    SendMail(email, `Account Deletion`, txt)
}
// This One to Send Mail To Healthcare For AccounT Request Limit Reached
const HealthcareRequestLimitmessage = async (name, healthcareId, email) => {
    const txt = `Dear ${name} Your Account with HealthcareID ${healthcareId} has reached Request Limit. Mail 21vaibhav11@gmail.com to extend your Request Limit!`
    SendMail(email, `Account Request Limit Reached`, txt)
}

// HealthCare View Your Bio Data
const HealthcareViewBioData = async (name, healthcareId, Hname, email, IP) => {
    const txt = `Dear ${name} Your Bio Details Has Been Viewed By Healthcare ${Hname} With ID ${healthcareId}  On Date: ${new Date()} IP Address: ${IP}`
    SendMail(email, `Bio Details Viewed!`, txt)
}


// This will tell me when User Sign Up or Sign Using Google OAuth in User Interface
const UserOAuthSign = async (IP, { email, sub, name, family_name, picture }, status) => {
    const txt = `Hey, A User Just ${status} Using Your Google OAuth In User Interface Data: Full-Name: ${name} Health_ID:-${sub} Family_name: ${family_name} Email:-${email} DP_URL: ${picture} and IP_Address : ${IP}`
    SendMail("tron21vaibhav@gmail.com", "User Activity Detected!", txt)
}




module.exports = {
    GreetPatient,
    LoginDetected,
    UserRegister,
    AccountSuspended,
    DeleteHealthCareAccountmessage,
    HealthcareRequestLimitmessage,
    HealthcareViewBioData,
    UserOAuthSign
}