const  mongoose = require("mongoose")

const connect = (URL)=>{
    return mongoose
                    .connect(URL)
                    .then((res)=>console.log("Connected To Database 😊"))
                    .catch((err)=>console.log("Something Went Wrong Message: ", error.message))
}

module.exports = connect