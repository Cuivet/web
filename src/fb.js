import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

  
const firebaseConfig = {
  "projectId": "fir-storage-cuivet",
  "appId": "1:805553354145:web:52e53b227ca0d927f687e0",
  "storageBucket": "fir-storage-cuivet.appspot.com",
  "locationId": "us-central",
  "apiKey": "AIzaSyCiTmnDgrPty9J40RHJgDmPnH7oYwnQjs8",
  "authDomain": "fir-storage-cuivet.firebaseapp.com",
  "messagingSenderId": "805553354145"
};
  
firebase.initializeApp(firebaseConfig);

var storage = firebase.storage();
export default storage;