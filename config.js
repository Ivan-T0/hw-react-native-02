// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAN3h2wIOodurm1lTpk7x90m5ES4Sxf9nk",
  authDomain: "myapp-ec4f2.firebaseapp.com",
  databaseURL: "https://myapp-ec4f2-default-rtdb.firebaseio.com",
  projectId: "myapp-ec4f2",
  storageBucket: "myapp-ec4f2.appspot.com",
  messagingSenderId: "557605205490",
  appId: "1:557605205490:ios:602ec1aa0faeb57185e76b",
  measurementId: "G-measurement-id",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
