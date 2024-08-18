// firebaseconfig.tsx
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDrgRMFNf755VvRqMriv4VmLzcHNHWX34c",
    authDomain: "stedu-feb36.firebaseapp.com",
    projectId: "stedu-feb36",
    storageBucket: "stedu-feb36.appspot.com",
    messagingSenderId: "83897171860",
    appId: "1:83897171860:web:4a164e8dd55b5eaea69981",
    measurementId: "G-KJ1C039P98"
  };
  

const app = initializeApp(firebaseConfig);
const authentication = getAuth(app);

export { authentication };
