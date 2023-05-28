<template>
  <header class="header">
    <div class="logo">
      <img src="../assets/task-logo.png" alt="Logo"/>
    </div>
    <div class="burger-menu-wrapper">
      <div class="burger-menu" @click="toggleMenu">
        <div :class="{ bar: true, active: isMenuOpen }"></div>
        <div :class="{ bar: true, active: isMenuOpen }"></div>
        <div :class="{ bar: true, active: isMenuOpen }"></div>
        <div v-show="isMenuOpen" class="close-icon">X</div>
      </div>
      <ul v-show="isMenuOpen" class="menu">
        <li class="menu-item">
          <router-link to="/login" v-if="!isLoggedIn">Login</router-link>
        </li>
        <li class="menu-item">
          <router-link to="/register" v-if="!isLoggedIn">Register</router-link>
        </li>
        <li class="menu-item log-out-button">
          <button @click="signOutUser" v-if="isLoggedIn">Logout</button>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
import { ref } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export default {
  data() {
    return {
      isMenuOpen: false,
      isLoggedIn: ref(false)
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    signOutUser() {
      signOut(this.auth)
          .then(() => {
            alert("logged out successfully");
            window.location.reload();
          })
          .catch((error) => {
            console.log(error);
          });
    }
  },
  mounted() {
    this.auth = getAuth();

    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }

      console.log("isLoggedIn:", this.isLoggedIn); // Remove '.value' property access
    });
  }
};
</script>
<style>
.header {
  display: grid;
  justify-items: end;
  align-items: center;
  position: relative;
  justify-content: center;
}
.burger-menu-wrapper{
  position: absolute;
  right:15px;
}
.logo img {
  max-width: 300px;
  height: auto;
}

.burger-menu {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 20px;
  cursor: pointer;
}

.bar {
  width: 100%;
  height: 2px;
  background-color: #0a9;
}

.bar.active {
  display: none;
}

.menu {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  list-style: none;
  margin-top: 10px;
}

.menu-item {
  margin-bottom: 5px;
}

.menu-item a {
  text-decoration: none;
  color: #0a9;
}

.close-icon {
  font-size: 20px;
  color: #0a9;
}

.close-icon:hover {
  cursor: pointer;
}

.log-out-button button {
  background-color: #0a9;
  color: #fff;
  padding: 0.5rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  margin-top: 1rem;
}

.log-out-button button:hover {
  background-color: #0c7;
}
</style>
