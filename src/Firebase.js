import * as firebase from "firebase";
import firestore from "firebase/firestore";

const settings = { timestampsInSnapshots: true };

const config = {
  apiKey: "AIzaSyA7Ewb3skXrx7RBAZjzINLSi8TdwrEDnxc",
  authDomain: "flyevents-f5f7c.firebaseapp.com",
  databaseURL: "https://flyevents-f5f7c.firebaseio.com",
  projectId: "flyevents-f5f7c",
  storageBucket: "flyevents-f5f7c.appspot.com",
  messagingSenderId: "755208812806",
  appId: "1:755208812806:web:475f4aaa490de6d4798687",
  measurementId: "G-QD96FVWDT8"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;
