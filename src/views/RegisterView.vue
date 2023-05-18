<template>
  <div class="register-container">
    <h1>Create an account</h1>
    <div class="form-group">
      <input type="text" placeholder=" Email" v-model="email" class="form-input" />
    </div>
    <div class="form-group">
      <input type="password" placeholder=" Password" v-model="password" class="form-input" />
    </div>
    <div class="form-group">
      <button @click="register" class="form-button">Submit</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import {useRouter} from "vue-router/dist/vue-router";
const email = ref('')
const password = ref('')
const router = useRouter()
const register = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
      .then((data) => {
        console.log(data)
        let auth = getAuth().currentUser;
        console.log(auth)
        router.push('/')
      })
      .catch((error) => {
        console.log(error)
        alert(error.message)
      })
}
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-button {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  background-color: #4285f4;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.form-button:hover {
  background-color: #3367d6;
}
</style>
