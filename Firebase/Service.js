const { db } = require("./Config")
const statusCode = require("http-status-codes")
const { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, setDoc, increment,
    query,
    where
} = require("firebase/firestore")


// HealthCare Default Preferance
const Default_HealthcareRecords = {
    RecordsCreated: 0,
    HealthID_Created: 0,
    RecordsViewed: 0,
    Biodata_Viewed: 0,
    LockedAccount: false,
    available: true,
    TotalNoOfViews: 0,
    email: "Rare",
    about: "--/--",
    name: "--/--",
    rating: 1 / 10,
    Acccount_Deletion: false,
    Total_appointments: 0,
    Total_request: 50,
    appointment_fee: 50
}
// This Will Update HealthCare Preferance
const UpdateHealthCarePreferance = async (req, res) => {
    try {
        const { healthcareId } = req.user
        const NewData = doc(db, "BharatSeva_HealthCare", healthcareId.toString())
        const DocSnap = await getDoc(NewData)
        if (!DocSnap.exists()) {
            await setDoc(NewData, Default_HealthcareRecords)
        }
        const { email, available } = req.body
        if (email && available) {
            await updateDoc(NewData, { available, email })
            res.status(200).json({ Status: "Successfull" })
        }
        else if (available) {
            await updateDoc(NewData, { available })
            res.status(200).json({ Status: "Successfull" })
        } else if (email) {
            await updateDoc(NewData, { email })
            res.status(200).json({ Status: "Successfull" })
        }
        else {
            res.status(statusCode.NOT_ACCEPTABLE).json({ status: "Not Allowed!", message: "You Don't Have Permission to perform this task!" })
        }
    } catch (err) {
        console.log(err.message)
        res.status(statusCode.INTERNAL_SERVER_ERROR).json({ status: "Given ID Not Found!" })
    }
}

// This One Is For HealthCare Getting All The Data For User Search Apppointment
const GetAllData = async (req, res) => {
    try {
        const { healthcareId } = req.user
        const docRef = doc(db, "BharatSeva_HealthCare", healthcareId.toString());
        let docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
            await setDoc(docRef, Default_HealthcareRecords)
            docSnap = await getDoc(docRef);
        }
        res.status(200).json({ stats: docSnap.data() })
    } catch (err) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: err.message })
    }
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
    Total_request: 50,
    Total_appointments: 0
}

// This WIll Update the setting of the user
const UpdateHealthUserPreferances = async (req, res) => {
    const { healthId } = req.user
    const { LockedAccount, View_permission, Email } = req.body
    try {
        if (LockedAccount || View_permission || Email) {
            const NewData = doc(db, "BharatSeva_User", healthId.toString())
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

// GET HealthUSerActivityData
const accountactivitylog = async (req, res) => {
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
        res.status(statusCode.INTERNAL_SERVER_ERROR).json({ status: "Failed", message: err.message })
    }
}


// Get HealthUser Data
const GetHealthUserStats = async (req, res) => {
    try {
        const { healthId } = req.user
        const Newdata = doc(db, "BharatSeva_User", healthId.toString())
        let docSnap = await getDoc(Newdata)
        if (!docSnap.exists()) {
            await setDoc(Newdata, Default_Records)
            docSnap = await getDoc(Newdata)
        }
        const { account_status, Available_Money, Profile_Viewed, Profile_Updated, Records_Viewed, Records_Created } = docSnap.data()
        res.status(200).json({ account_status, Available_Money, Profile_Viewed, Profile_Updated, Records_Viewed, Records_Created })
    } catch (err) {
        console.log(err.message)
        res.status(statusCode.INTERNAL_SERVER_ERROR).json({ status: "Not Allowed!" })
    }
}
// Get User Preferances
const GetHealthUserPreferances = async (req, res) => {
    try {
        const { healthId } = req.user
        const Newdata = doc(db, "BharatSeva_User", healthId.toString())
        let docSnap = await getDoc(Newdata)
        const { View_permission, LockedAccount, Email } = docSnap.data()
        res.status(200).json({ View_permission, LockedAccount, Email })
    } catch (err) {
        console.log(err)
        res.status(statusCode.EXPECTATION_FAILED).json({ status: "Not Allowed!" })
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
// Only TO Fetch Required value for user appointment!
const GetHealthCareForApp = async (req, res) => {
    const { healthcareId } = req.params
    try {
        const location = doc(db, "BharatSeva_HealthCare", healthcareId)
        const Data = await getDoc(location)
        let healthcareID = Data.id, locate = Data.data().location, about = Data.data().about, name = Data.data().name, appointment_fee = Data.data().appointment_fee, rating = Data.data().rating
        res.status(200).json({ healthcare: { locate, about, name, appointment_fee, rating, healthcareID } })

    } catch (err) {
        res.status(statusCode.BAD_REQUEST).json({ message: err.message })
    }
}

// This Will Fetch HealthCare Preferance Data From Firebase
const GetHealthCarePreferance = async (req, res) => {
    try {
        const { healthcareId } = req.user
        const location = doc(db, "BharatSeva_HealthCare", healthcareId.toString())
        let docSnap = await getDoc(location)
        if (!docSnap.exists()) {
            await setDoc(location, Default_HealthcareRecords)
            docSnap = await getDoc(location)
        }
        let email = docSnap.data().email, available = docSnap.data().available, Acccount_Deletion = docSnap.data().Acccount_Deletion
        res.status(statusCode.OK).json({ email, available, Acccount_Deletion })
    } catch (err) {
        console.log(err.message)
        res.status(statusCode.INTERNAL_SERVER_ERROR).json({ status: "Something Unexpected Happened!" })
    }
}


// THis One Will DeleteHealthcare Account Preferance ONly
const DeleteHealthCareAccountChangePreferance = async (healthcareId) => {
    const location = doc(db, "BharatSeva_HealthCare", healthcareId.toString())
    await updateDoc(location, {
        Acccount_Deletion: true
    })
}

const HealthUserLoginData = async (healthId, IP) => {
    let date = new Date()
    const locate = doc(db, "BharatSeva_HealthCare", healthId.toString(), "LoginDate", date.toString())
    await setDoc(locate, {
        IP
    })
}

// All the below Module are for Server Use Only !!!!


const GetHealthUserSettingForServer = async (healthId) => {
    const Newdata = doc(db, "BharatSeva_User", healthId)
    let docSnap = await getDoc(Newdata)
    let datas = docSnap.data()
    return datas
}

// HealthUSer Request LImit
const IncreaseRequestLimit = async (healthId) => {
    const Increment = doc(db, "BharatSeva_User", healthId)
    await updateDoc(Increment, {
        Total_request: increment(-1)
    })
}
// This Will Record HealthCare RecordsCreated Stats
const Healthcare_RecordsCreated_Stats = async (name, healthcareId, healthId, location) => {
    const Increment = doc(db, "BharatSeva_HealthCare", healthcareId)
    await updateDoc(Increment, {
        RecordsCreated: increment(1)
    })
    let date = new Date().toString()
    const create = collection(db, "BharatSeva_User", healthId, "Modified_By")
    await addDoc(create, {
        name, location, healthcareId, Type: "Records", date
    })
    const Increments = doc(db, "BharatSeva_User", healthId)
    await updateDoc(Increments, {
        Records_Created: increment(1)
    })
}

const HealthCare_RecordsViewed_Stats = async (name, healthcareId, healthId, location) => {
    const Increment = doc(db, "BharatSeva_HealthCare", healthcareId)
    await updateDoc(Increment, {
        RecordsViewed: increment(1)
    })
    let date = new Date().toString()
    const create = collection(db, "BharatSeva_User", healthId, "Viewed_By")
    await addDoc(create, {
        name, location, healthcareId, Type: "Records", date
    })
    const IncrementUser = doc(db, "BharatSeva_User", healthId)
    await updateDoc(IncrementUser, {
        Records_Viewed: increment(1)
    })
}

// This Will Log When HealthCare Viewed User Bio data!!
const HealthCare_ViewBioDataStats = async (name, healthcareId, healthId, location) => {
    const locate = doc(db, "BharatSeva_HealthCare", healthcareId)
    await updateDoc(locate, {
        Biodata_Viewed: increment(1)
    })
    let date = new Date().toString()
    const Userlocate = doc(db, "BharatSeva_User", healthId)
    await updateDoc(Userlocate, {
        Profile_Viewed: increment(1)
    })

    const create = collection(db, "BharatSeva_User", healthId, "Viewed_By")
    await addDoc(create, {
        name, location, healthcareId, Type: "BioData", date
    })
}

// This Will Count For Appointments
const AppointmentCounter = async (healthcareId, healthId) => {
    const locate = doc(db, "BharatSeva_User", healthId)
    await updateDoc(locate, {
        Total_appointments: increment(1)
    })
    const HealthcareLocate = doc(db, "BharatSeva_HealthCare", healthcareId)
    await updateDoc(HealthcareLocate, {
        Total_appointments: increment(1)
    })
}

// This Will Create User In Firebase To Log Stats
const CreateUserInFirebase = async (healthId, healthcareId) => {
    try {
        const locate = doc(db, "BharatSeva_User", healthId)
        await setDoc(locate, Default_Records)
        const location = doc(db, "BharatSeva_HealthCare", healthcareId)
        await updateDoc(location, {
            HealthID_Created: increment(1)
        })
    } catch (err) {
        console.log(err)
    }
}
const CreateHealthCareInFirebase = async (healthcareId, name, about, appointment_fee, location) => {
    try {
        const locate = doc(db, "BharatSeva_HealthCare", healthcareId)
        await setDoc(locate, { ...Default_HealthcareRecords, name, about, appointment_fee, location })
    } catch (err) {
        console.log(err)
    }
}

// HeathCare Request Limit
const HealthcareRequestLimit = async (healthcareId) => {
    const locate = doc(db, "BharatSeva_HealthCare", healthcareId)
    await updateDoc(locate, {
        Total_request: increment(-1)
    })
}

// THis Will Fetch Healthcare Account Availablitiy
const CheckHealthcareAccountAvailability = async (healthcareId) => {
    const locate = doc(db, "BharatSeva_HealthCare", healthcareId)
    const get = await getDoc(locate)
    return get.data()
}



// For HealthcareUserBrowserData
const HealthcareBrowserDataF = async (healthcareId, Data) => {
    let date = new Date()
    const locate = doc(db, "BharatSeva_HealthCare", healthcareId, "DataCollected", date.toString())
    await setDoc(locate, {
        Data
    })
}



module.exports = {
    UpdateHealthCarePreferance,
    GetAllData,
    GetHealthUserPreferances,


    // Node Js
    UpdateHealthUserPreferances,
    GetHealthUserStats,
    Get_HealthCare_Names,
    accountactivitylog,
    GetHealthCareForApp,
    GetHealthCarePreferance,
    DeleteHealthCareAccountChangePreferance,

    // Data
    HealthcareBrowserDataF,
    HealthUserLoginData,



    // For Server Use Only
    GetHealthUserSettingForServer,
    IncreaseRequestLimit,
    Healthcare_RecordsCreated_Stats,
    HealthCare_RecordsViewed_Stats,
    HealthCare_ViewBioDataStats,
    AppointmentCounter,
    CreateUserInFirebase,
    CreateHealthCareInFirebase,
    CheckHealthcareAccountAvailability,
    HealthcareRequestLimit
} 