<template>
  <div class="task-list">
    <div class="task-list-header">
      <h2>Task List</h2>
      <button @click="addTask">Add Task</button>
    </div>
    <div class="task-list-content">
      <div class="task" v-for="(task, index) in tasks" :key="index">
        <div class="task-header">
          <h3>{{ task.title }}</h3>
          <button @click="editTask(index)">Edit</button>
          <button @click="deleteTask(index)">Delete</button>
        </div>
        <div class="task-details">
          <p>{{ task.description }}</p>
          <p>{{ task.date }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { saveTasks, getTasks } from '@/storage.js'

export default {
  name: 'TaskList',
  data() {
    return {
      tasks: getTasks(),
    }
  },
  methods: {
    addTask() {
      this.$router.push('/new')
    },
    editTask(index) {
      this.$router.push(`/edit/${index}`)
    },
    deleteTask(index) {
      this.tasks.splice(index, 1)
      saveTasks(this.tasks)
    },
  },

}
</script>
