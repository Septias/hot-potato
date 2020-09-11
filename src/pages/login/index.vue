
<template>
  <div
    id="login"
  >
    ge
    <div
      id="firebaseui-auth-container"
      class="shadow-3 q-pa-md"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import firebase from 'firebase/app'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import 'firebase/auth'
// import '../../compositions/fapp.ts'
// import firebase from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyBEJr9YYk-HUlCsQpPc7HJqf6MhzxidGSk',
  authDomain: 'hot-potatoe-4e275.firebaseapp.com',
  databaseURL: 'https://hot-potatoe-4e275.firebaseio.com',
  projectId: 'hot-potatoe-4e275',
  storageBucket: 'hot-potatoe-4e275.appspot.com',
  messagingSenderId: '200494281868',
  appId: '1:200494281868:web:7927f7805a0df9550577a9',
}

firebase.initializeApp(firebaseConfig)

const ui = new firebaseui.auth.AuthUI(firebase.auth())

export default defineComponent({
  setup() {
    onMounted(() => {
      ui.start('#firebaseui-auth-container', {
        signInSuccessUrl: '/',
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
      })
    })
  },
})
</script>

<style>
#login {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
