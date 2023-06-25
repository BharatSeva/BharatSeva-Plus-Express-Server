const { db } = require("./Config")
const statusCode = require("http-status-codes")
const { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, setDoc, increment,
    query,
    where
} = require("firebase/firestore")


const BharatCollectionRef = collection(db, "BharatSeva")


const Getdata = async (HID) => {
    const docRef = doc(db, "BharatSeva", HID);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
}

const Update_Records = async (req, res) => {
    const NewData = doc(db, "BharatSeva", req.body.HealthId)
    await updateDoc(NewData, req.body)
    res.status(200).json({ Status: "Successfull" })
}

const GetAllData = async (req, res) => {
    const docRef = doc(db, "BharatSeva", req.headers.health_id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        res.status(200).json({ status: "Success", Data: docSnap.data() })
    } else {
        res.status(200).json({ status: "Failed", message: "Could Not Find that Attribute" })
    }
}

const Update_No_Of_Views = async (req, res) => {
    const docRef = doc(db, "BharatSeva", req.headers.health_id);
    await updateDoc(docRef, { "TotalNoOfViews": increment(1) })
    res.status(200).json({ status: "Success" })
}

const RecordsViewed = async (req, res) => {
    const docRef = doc(db, "BharatSeva", req.headers.health_id);
    await updateDoc(docRef, { "RecordsViewed": increment(1) })
    res.status(200).json({ status: "Success" })
}

const HealthID_Created = async (req, res) => {
    const docRef = doc(db, "BharatSeva", req.headers.health_id);
    await updateDoc(docRef, { "HealthID_Created": increment(1) })
    res.status(200).json({ status: "Success" })
}

const RecordsCreated = async (req, res) => {
    const docRef = doc(db, "BharatSeva", req.headers.health_id);
    await updateDoc(docRef, { RecordsCreated: increment(1) })
    res.status(200).json({ status: "Success" })
}

const BioDV = async (req, res) => {
    const docRef = doc(db, "BharatSeva", req.headers.health_id);
    await updateDoc(docRef, { "BioDV": increment(1) })
    res.status(200).json({ status: "Success" })
}
const Default_Records = {
    Profile_Viewed: 0,
    Profile_Updated: 0,
    Records_Viewed: 0,
    Records_Created: 0,
    View_permission: "Yes",
    Email: "Every Events",
    LockedAccount: "No",
    Available_Money: 500,
    account_status: "Trial",
    Account_Connection: true,
    Total_request: 100
}

// This WIll Update the setting of the user
const UpdateHealthUserSetting = async (req, res) => {
    const { healthId } = req.params
    const { LockedAccount, View_permission, Email } = req.body
    try {
        if (LockedAccount || View_permission || Email) {
            const NewData = doc(db, "BharatSeva_User", healthId)
            const docSnap = await getDoc(NewData);
            if (!docSnap.exists()) {
                await setDoc(NewData, Default_Records)
            }
            await updateDoc(NewData, req.body)
            res.status(200).json({ Status: "Updated" })
        } else {
            res.status(statusCode.NOT_ACCEPTABLE).json({ status: "Not Allowed!", messsage: "One More Attempt to update unwanted value could Lock Your account!" })
        }
    } catch (err) {
        res.status(statusCode.BAD_REQUEST).json({ Status: "Not Allowed!" })
    }
}

// Create Health Chnged Activity Records that will goe here
const HealthUser_Activity = async (req, res) => {
    const { id: Health_ID } = req.params
    try {
        await setDoc(doc(db, "BharatSeva_User", Health_ID, "Viewed_By", req.headers.id), { ...req.body, Time: new Date() })
        await setDoc(doc(db, "BharatSeva_User", Health_ID, "Modified_By", req.headers.id), { ...req.body, Time: new Date() })
        res.status(200).json({ status: "Success", Data: "Goes" })
    } catch (err) {
        console.log(err.message)
        res.status(200).json({ status: "Failed", Data: "Failed" })
    }

}

// GET HealthUSerActivityData
const HealthUser_ActivityData = async (req, res) => {
    const { healthId } = req.user
    let Modified_By = [], Viewed_By = []
    try {
        const n = await getDocs(collection(db, "BharatSeva_User", healthId.toString(), "Viewed_By"))
        const m = await getDocs(collection(db, "BharatSeva_User", healthId.toString(), "Modified_By"))
        n.forEach((doc) => {
            Viewed_By.push(doc.data())
        })
        m.forEach((doc) => {
            Modified_By.push(doc.data())
        })
        res.status(statusCode.OK).json({ Modified_By, Modified_Length: Modified_By.length, Viewed_By, Viewed_Length: Viewed_By.length })
    } catch (err) {
        console.log(err.message)
        res.status(400).json({ status: "Failed", message: err.message })
    }
}


// Get HealthUser Data
const GET_HealthUserSettings = async (req, res) => {
    try {
        const { healthId } = req.user
        const Newdata = doc(db, "BharatSeva_User", healthId.toString())
        let docSnap = await getDoc(Newdata)
        if (!docSnap.exists()) {
            await setDoc(Newdata, Default_Records)
            docSnap = await getDoc(Newdata)
        }
        res.status(200).json({ ...docSnap.data() })
    } catch (err) {
        console.log(err.message)
        res.status(statusCode.BAD_REQUEST).json({ status: "Not Allowed!" })
    }
}

// This One will fetch the data for Hospital Names
const Get_HealthCare_Names = async (req, res) => {
    let HealthCare_Names = []
    try {
        let Names = await getDocs(collection(db, "BharatSeva_HealthCare"))
        Names.forEach((doc) => {
            let name = doc.data(), id = doc.id, location = doc.data().location
            name = name.name
            HealthCare_Names.push({ name, id, location })
        })
        res.status(200).json({ healthcares: HealthCare_Names, totalname: HealthCare_Names.length })
    } catch (err) {
        res.status(400).json({ status: "Failed", message: err.message })
    }
}

// This One Will Fetch HealthCareDataFor Appointment
const GetHealthCareForApp = async (req, res) => {
    const { healthcareId } = req.params
    try {
        const location = doc(db, "BharatSeva_HealthCare", healthcareId)
        const Data = await getDoc(location)
        res.status(200).json({ healthcare: Data.data() })

    } catch (err) {
        res.status(statusCode.BAD_REQUEST).json({ message: err.message })

    }
}

// Set the Appointment
const SetAppointment = async (req, res) => {
    const { healthCareId, appointmentId } = req.params

    try {
        await setDoc(doc(db, "BharatSeva_HealthCare", healthCareId, "Appointment", appointmentId), req.body)
        res.status(200).json({ status: "Success" })
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}


// All the below Module are for Server Use Only !!!!


const GetHealthUserSettingForServer = async (healthId) => {
    const Newdata = doc(db, "BharatSeva_User", healthId)
    let docSnap = await getDoc(Newdata)
    let datas = docSnap.data()
    return datas
}

const IncreaseRequestLimit = async (healthId) => {
    const Increment = doc(db, "BharatSeva_User", healthId)
    await updateDoc(Increment, {
        Total_request:increment(-1)
    })
}











module.exports = {
    Update_Records,
    GetAllData,
    Update_No_Of_Views,
    HealthID_Created,
    RecordsViewed,
    RecordsCreated,
    BioDV,


    // Node Js
    UpdateHealthUserSetting,
    GET_HealthUserSettings,
    Get_HealthCare_Names,
    HealthUser_Activity,
    HealthUser_ActivityData,
    SetAppointment,
    GetHealthCareForApp,



    // For Server Use Only
    GetHealthUserSettingForServer,
    IncreaseRequestLimit
} 