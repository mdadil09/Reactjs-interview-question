import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBUX_b4YklIjndwA2wpXXnx_j3kLN9O-Yk",
  authDomain: "otp-login-b90d5.firebaseapp.com",
  projectId: "otp-login-b90d5",
  storageBucket: "otp-login-b90d5.appspot.com",
  messagingSenderId: "117781026456",
  appId: "1:117781026456:web:4a90a53435f7d5a74022ed",
  measurementId: "G-F9Z0SCWJBH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
