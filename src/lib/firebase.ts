import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBalor1tV-QWJViXZVedC5Lv1GKvsVKTs8",
  authDomain: "xantara-917b2.firebaseapp.com",
  projectId: "xantara-917b2",
  storageBucket: "xantara-917b2.firebasestorage.app",
  messagingSenderId: "81990685348",
  appId: "1:81990685348:web:125bbeeadd3bbc4e0edcc31",
};

const app = getApps().length
  ? getApp()
  : initializeApp(firebaseConfig);

export const auth = getAuth(app);