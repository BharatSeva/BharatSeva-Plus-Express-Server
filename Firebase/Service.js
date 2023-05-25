const { db } = require("./Config")

const { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } = require("firebase/firestore")


const BharatCollectionRef = collection(db, "BharatSeva")

const Update_Records = async (req, res) => {
    console.log(req.body)
    const NewData = doc(db, "BharatSeva", req.body.HealthId)
    updateDoc(NewData, req.body)
    res.status(200).json({ Status: "Successfull" })
}

const GetAllData = async (req, res) => {
    // try {
    // let data = await BharatCollectionRef.get()
    // let Dataas = await data();
    // console.log(doc.Dataas());
    // BharatCollectionRef.get()
    //     .then((qs)=>{
    //         qs.forEach(element => {
    //             var data = doc.data()
    //             console.log(data)

    //         });
    //     })

    
    const DataG = await getDocs(BharatCollectionRef)
    res.status(200).json({ Data: DataG })
    // getDocs(BharatCollectionRef
    // }
    // catch(e) {
    //     console.log(e.message)
    //     res.status(400).json({ message: e.message })
    // }
}

module.exports = {
    Update_Records,
    GetAllData
} 