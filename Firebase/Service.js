const { db } = require("./Config")

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
    LockedAccount: "No"
}

// Node Js Servers Goes Here
const HealthUser = async (req, res) => {
    const NewData = doc(db, "BharatSeva_User", req.body.Health_ID)
    const docSnap = await getDoc(NewData);
    await updateDoc(NewData, req.body)
    res.status(200).json({ Status: "Success" })
}

// const HealthUser_Activity = async(req, res)=>{
//     const {}
// }

// Get HealthUser Data
const GET_HealthUser = async (req, res) => {
    const { id: Health_ID } = req.params
    const Newdata = doc(db, "BharatSeva_User", Health_ID)
    let docSnap = await getDoc(Newdata)
    if (!docSnap.exists()) {
        await setDoc(Newdata, Default_Records)
        docSnap = await getDoc(Newdata)
        // await setDoc(doc(db, "BharatSeva_User", Health_ID, "Modified_By"))
        // await setDoc(doc(db, "BharatSeva_User", Health_ID, "Viewed_By"))
    }
    res.status(200).json({ status: "Success", Data: docSnap.data() })
}

// This One will fetch the data for Hospital Names
const Get_HealthCare_Names = async (req, res) => {
    const { id: Healthcare } = req.params
    const docRef = doc(db, "BharatSeva", "BharatSeva_HealthCare");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        res.status(200).json({ status: "Success", Data: docSnap.data() })
    } else {

        let q = query(BharatCollectionRef, where("Name", "==", Healthcare))
        const querys = await getDocs(q);
        let data;
        querys.forEach((doc) => {
            data = (doc.id + "=>" + doc.data().Name)
            console.log(data)
        })
        res.status(200).json({ status: "Failed", message: data })
    }
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
    HealthUser,
    GET_HealthUser,
    Get_HealthCare_Names
} 