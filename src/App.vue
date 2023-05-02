<template>
  <div class="task-app">
    <h1>Task Manager</h1>
    <task-form></task-form>
    <task-list :tasks="tasks"></task-list>
  </div>
</template>

<script>
import TaskForm from './components/TaskForm.vue'
import TaskList from './components/TaskList.vue'
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
