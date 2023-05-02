<!-- TaskApp.vue -->
<template>
  <div class="task-app">
    <h1>Task Manager</h1>
    <task-form @new-task="addTask"></task-form>
    <task-list :tasks="tasks"></task-list>
  </div>
</template>

<script>
import TaskForm from './components/TaskForm.vue'
import TaskList from './components/TaskList.vue'

export default {
  components: {
    TaskForm,
    TaskList
  },
  data() {
    return {
      tasks: []
    }
  },
  methods: {
    addTask(newTask) {
      this.tasks.push(newTask)
      console.log(this.tasks) // check if the new task is added to the array
    }
  }
}
</script>
