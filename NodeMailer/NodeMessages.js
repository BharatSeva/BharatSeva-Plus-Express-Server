const { SendMail } = require("./NodeMailer")

const GreetPatient = (email, name, hospital) => {
    const txt = `Hello ${name} Its Pleasure To onboard you on our platform. Your Data Has Been Created by ${hospital} to access and view your data you need to register yourself on our website.`
    SendMail(email, `Welcome Mr.${name}`, txt)
}

const LoginDetected = async (name, healthId, Ipaddress, email) => {
    const txt = `Hello ${name}, We Have Detected A new Login In Your account With Health ID : ${healthId} from IP Address
    ${Ipaddress}. If this login not done by you immediately change your password.`
    SendMail(email, `Login Detected`, txt)
}

const UserRegister = async(name, healthId, email)=>{
    const txt = `Welcome ${name} Health ID : ${healthId} to our Esteemed Platform. Bharat सेवा Welcomes You to our platform. We Have Successfully Registered
    You and We are Extremely Excited to cover a long Journey with you.`
    SendMail(email, `नमस्कार 🙏`, txt)
}

const AccountSuspended = async(name, email)=>{
    const txt = `Dear ${name}, We Have Temporarily Suspended Your Account Because of Unusual Request We have Noticed!. Mail to 21vaibhav11@gmail.com For Continued Service`
    SendMail(email, `Account Suspended`, txt)
}









module.exports = {
    GreetPatient,
    LoginDetected,
    UserRegister,
    AccountSuspended
}