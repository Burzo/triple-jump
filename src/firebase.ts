// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpvJdrys7upxZP7SV6OS8Y422t5RDQfVg",
  authDomain: "triple-jump-7aeb1.firebaseapp.com",
  projectId: "triple-jump-7aeb1",
  storageBucket: "triple-jump-7aeb1.appspot.com",
  messagingSenderId: "102059334403",
  appId: "1:102059334403:web:28c658ea7a7598e1446736",
  measurementId: "G-C6YBGEWGX8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

async function getData(db: any) {
  const test = collection(db, "test");
  const testData = await getDocs(test);
  testData.docs.forEach((doc) => {
    const text = doc.data();
    console.log(text);
  });
}

async function writeData(db: any) {
  await addDoc(collection(db, "test"), {
    name: "Los Angeles",
    timestamp: serverTimestamp(),
  });
}

getData(db);
writeData(db);
