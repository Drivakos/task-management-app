<template class="wrapper">
 <task-header></task-header>
 <router-view/>
</template>

<style scoped>
</style>
<script setup>
import TaskHeader from "./components/TaskHeader.vue";
</script>

<style scoped>
  .logo-wrapper img {
    max-width: 300px;
    display: block;
    margin: 0 auto;
  }
</style>
