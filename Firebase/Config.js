const { initializeApp } = require("firebase/app")
const { getFirestore } = require("firebase/firestore")
require('dotenv').config();

const firebaseConfig = {
  // Put your Firebase Keys Here....
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
module.exports = {
    db
}