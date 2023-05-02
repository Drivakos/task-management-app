import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAb-NeIlxNhGTB64t0ZzNzybH6khV1vQdw",
    authDomain: "my-task-manager-905aa.firebaseapp.com",
    projectId: "my-task-manager-905aa",
    storageBucket: "my-task-manager-905aa.appspot.com",
    messagingSenderId: "575270454448",
    appId: "1:575270454448:web:8cb032b135e691434e2775"
};
firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()
