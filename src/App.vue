<template class="wrapper">
  <nav>
    <router-link to="/login" v-if="!isLoggedIn">Login</router-link>
    <router-link to="/register" v-if="!isLoggedIn">Register</router-link>
    <a class="logo-wrapper" href="/">
      <img src="./assets/task-logo.png" alt="logo" />
    </a>
    <button @click="signOutUser" v-if="isLoggedIn">Logout</button>
  </nav>
 <router-view/>
</template>

<style scoped>
</style>
<script setup>
import {onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
const isLoggedIn = ref(false);
let auth = getAuth()
onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
      console.log(isLoggedIn.value)
    } else {
      isLoggedIn.value = false;
      console.log(isLoggedIn.value)
    }
  });
});
const signOutUser = () => {
  signOut(auth)
    .then(() => {
      alert("logged out successfully");
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>

<style scoped>
  nav button {
    background-color: #0a9;
    color: #fff;
    padding: 0.5rem;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    margin-top: 1rem;
  }

  nav button:hover {
    background-color: #0c7;
  }

  .logo-wrapper img {
    max-width: 300px;
    display: block;
    margin: 0 auto;
  }
</style>
