<template>
  <form class="task-form" @submit.prevent="submitTask">
    <div class="form-group">
      <label for="title">Title:</label>
      <input id="title" type="text" v-model="taskTitle" required>
    </div>

    <div class="form-group">
      <label for="description">Description:</label>
      <textarea id="description" v-model="taskDescription" required></textarea>
    </div>

    <div class="form-group">
      <label for="date">Date:</label>
      <input id="date" type="date" v-model="taskDate" required>
    </div>

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

<style scoped>
.task-form {
  background-color: #222;
  color: #eee;
  padding: 1rem;
  border-radius: 0.5rem;
}

.form-group {
  margin-top: 1rem;
}

.form-group label {
  display: block;
}

.form-group input,
.form-group textarea {
  background-color: #444;
  color: #eee;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin-top: 0.5rem;
  width: 100%;
}

.form-group input[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(1);
}

.task-form button {
  background-color: #0a9;
  color: #fff;
  padding: 0.5rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  margin-top: 1rem;
}

.task-form button:hover {
  background-color: #0c7;
}
</style>
