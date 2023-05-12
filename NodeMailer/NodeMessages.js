const { SendMail } = require("./NodeMailer")

const GreetPatient = (email, name, hospital) => {
        const txt = `Hello Mr.${name} Its Pleasure To onboard you on our platform. Your Data Has Been Created by ${hospital} to access and view your data you need to register yourself on our website.`
        SendMail(email, `Welcome Mr.${name}`, txt)
}



module.exports = {
    GreetPatient
}