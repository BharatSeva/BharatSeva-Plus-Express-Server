const nodemailer = require("nodemailer")
require('dotenv').config();



const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SENDEREMAIL,
        pass: process.env.SENDERPASSWORD
    }
})


const SendMail = async (Sendto, Subject,  Message) => {
    try {
        await transporter.sendMail({
            from: process.env.SENDEREMAIL,
            to: `${Sendto}`,
            subject: `${Subject}`,
            text: `${Message}`
        })
        console.log(`Message has been succesfully Send`)
    }
    catch (err) {
        console.log(err.message)
    }
}



module.exports = {
    SendMail
}