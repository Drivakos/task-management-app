<template>
  <form className="task-form" @submit.prevent="submitTask">
    <label htmlFor="title">Title:</label>
    <input id="title" type="text" v-model="taskTitle" required>

    <label htmlFor="description">Description:</label>
    <textarea id="description" v-model="taskDescription" required></textarea>

    <label htmlFor="date">Date:</label>
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
      taskDate: new Date().toISOString().slice(0, 10) // set default value to today's date
    }
  },

  methods: {
    submitTask() {
      const newTask = {
        title: this.taskTitle,
        description: this.taskDescription,
        date: this.taskDate
      }

      this.$emit('new-task', newTask)

      this.taskTitle = ''
      this.taskDescription = ''
      this.taskDate = new Date().toISOString().slice(0, 10) // reset taskDate to today's date
    }
  }
}
</script>
