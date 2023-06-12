const { db } = require("./Config")

const { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } = require("firebase/firestore")


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
    let Total_Records = await Getdata(req.headers.health_id)
    Total_Records = Total_Records.TotalNoOfViews
    Total_Records += 1;
    const docRef = doc(db, "BharatSeva", req.headers.health_id);
    await updateDoc(docRef, { "TotalNoOfViews": Total_Records })
    res.status(200).json({ status: "Success" })
}

const RecordsViewed = async(req, res)=>{ 
    let RV = await Getdata(req.headers.health_id)
    RV = RV.RecordsViewed
    RV+=1;
    const docRef = doc(db, "BharatSeva", req.headers.health_id);
    await updateDoc(docRef, { "RecordsViewed": RV })
    res.status(200).json({ status: "Success" })
    
}

const HealthID_Created = async(req, res)=>{
    let HID = await Getdata(req.headers.health_id)
    HID = HID.HealthID_Created
    HID+=1;
    const docRef = doc(db, "BharatSeva", req.headers.health_id);
    await updateDoc(docRef, { "HealthID_Created": HID })
    res.status(200).json({ status: "Success" })
    
}

const RecordsCreated = async(req, res)=>{
    let HID = await Getdata(req.headers.health_id)
    HID = HID.RecordsCreated
    HID+=1;
    const docRef = doc(db, "BharatSeva", req.headers.health_id);
    await updateDoc(docRef, { "RecordsCreated": HID })
    res.status(200).json({ status: "Success" })
    
}

const BioDV = async(req, res)=>{
    let HID = await Getdata(req.headers.health_id)
    HID = HID.BioDV
    HID+=1;
    const docRef = doc(db, "BharatSeva", req.headers.health_id);
    await updateDoc(docRef, { "BioDV": HID })
    res.status(200).json({ status: "Success" })
    
}



module.exports = {
    Update_Records,
    GetAllData,
    Update_No_Of_Views,
    HealthID_Created,
    RecordsViewed,
    RecordsCreated,
    BioDV
} 