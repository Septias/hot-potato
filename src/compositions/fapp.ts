import firebase from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyBEJr9YYk-HUlCsQpPc7HJqf6MhzxidGSk',
  authDomain: 'hot-potatoe-4e275.firebaseapp.com',
  databaseURL: 'https://hot-potatoe-4e275.firebaseio.com',
  projectId: 'hot-potatoe-4e275',
  storageBucket: 'hot-potatoe-4e275.appspot.com',
  messagingSenderId: '200494281868',
  appId: '1:200494281868:web:7927f7805a0df9550577a9',
}

try {
  firebase.initializeApp(firebaseConfig)
  console.log('initialized')
}
catch (e) {
  console.error(e)
}
