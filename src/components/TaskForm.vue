<template>
  <form class="task-form" @submit.prevent="submitTask">
    <label for="title">Title:</label>
    <input id="title" type="text" v-model="taskTitle" required>

    <label for="description">Description:</label>
    <textarea id="description" v-model="taskDescription" required></textarea>

    <label for="date">Date:</label>
    <input id="date" type="date" v-model="taskDate" required>

    <button type="submit">Save Task</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      taskTitle: '',
      taskDescription: '',
      taskDate: new Date().toISOString().slice(0, 10)
    }
  },
  methods: {
    submitTask() {
      const newTask = {
        title: this.taskTitle,
        description: this.taskDescription,
        date: this.taskDate
      }

      this.$store.dispatch('addTask', newTask)

      this.taskTitle = ''
      this.taskDescription = ''
      this.taskDate = new Date().toISOString().slice(0, 10)
    }
  }
}
</script>
