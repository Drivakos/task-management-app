<template class="wrapper">
  <div class="task-app">
    <h1>Task Manager</h1>
    <task-form></task-form>
    <task-list :tasks="tasks"></task-list>
  </div>
</template>

<script>
import TaskForm from '../components/TaskForm.vue'
import TaskList from '../components/TaskList.vue'
import { mapState } from 'vuex'

export default {
  components: {
    TaskForm,
    TaskList
  },
  computed: {
    ...mapState(['tasks'])
  },
  created() {
    this.$store.dispatch('fetchTasks')
  }
}
</script>

<style scoped>
body {
  background-color: #222;
}
.task-app {
  background-color: #222;
  color: #eee;
  padding: 2rem;
  height: 100vh;
}

.task-app h1 {
  margin-bottom: 2rem;
}

@media (min-width: 768px) {
  .task-app {
    display: grid;
    grid-template-columns: 2fr;
    grid-gap: 2rem;
    max-width: 80%;
    margin: 0 auto;
  }
}

@media (max-width: 767px) {
  .task-app {
    padding: 1rem;
  }
}
</style>
