import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Replace this with your own config details
var config = {
  apiKey: "AIzaSyDBIsmnw9QB-5M3qSCceHtmORE0qQGwMhM",
  authDomain: "react-b8702.firebaseapp.com",
  projectId: "react-b8702",
  storageBucket: "react-b8702.appspot.com",
  messagingSenderId: "149500591048",
  appId: "1:149500591048:web:d2426908bf5ac0485c5efd",
  measurementId: "G-35WVEJ96NC"
};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase 