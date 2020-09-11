
import { ref } from 'vue'
import firebase from 'firebase/app'
import './fapp'
import 'firebase/auth'
import 'firebase/firestore'

const db = firebase.firestore()

type DocumentSnapshot = firebase.firestore.DocumentSnapshot
type DocumentReference = firebase.firestore.DocumentReference

export class User {
  constructor(public currentLocation: Position, private id: string) {
  }

  setLocation(location: Position) {
    this.currentLocation = location
    db.collection('users').doc(this.id).update({
      currentLocation: new firebase.firestore.GeoPoint(this.currentLocation.coords.latitude, this.currentLocation.coords.longitude),
    })
  }
}

const user = ref<User>()

const userConverter = {
  toFirestore(user: User) {
    return {
      currentLocation: new firebase.firestore.GeoPoint(user.currentLocation.coords.latitude, user.currentLocation.coords.longitude),
    }
  },
  fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions) {
    const data = snapshot.data(options)
    return new User({ coords: data.currentLocation, timestamp: Date.now() }, snapshot.id)
  },
}

async function getCurrentPosition(): Promise<Position> {
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      resolve(position)
    })
  })
}

const authPromise = new Promise((resolve, reject) => {
  firebase.auth().onAuthStateChanged((authUser) => {
    if (authUser) {
      db.collection('users').doc(authUser.uid).withConverter(userConverter).get().then(async(doc: DocumentSnapshot) => {
        if (doc.exists) {
          user.value = doc.data() as User
          resolve(user)
        }
        else {
          user.value = new User(await getCurrentPosition(), authUser.uid)
          db.collection('users').doc(authUser.uid).withConverter(userConverter).set(user.value)
          resolve(user)
        }
      })
    }
    else {
      reject(new Error('No user'))
    }
  })
})

export async function useUser() {
  try {
    await authPromise
  }
  catch (e) {
    throw new Error(e)
  }
  return { user }
}
