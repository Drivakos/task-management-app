<template>
  <div className="task-edit">
    <h2>Edit Task</h2>
    <form @submit.prevent="submitTask">
      <label htmlFor="title">Title:</label>
      <input id="title" type="text" v-model="editedTask.title" required>

      <label htmlFor="description">Description:</label>
      <textarea id="description" v-model="editedTask.description" required></textarea>

      <label htmlFor="date">Date:</label>
      <input id="date" type="date" v-model="editedTask.date" required>

      <button type="submit">Save Changes</button>
      <button @click="cancelEdit">Cancel</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'TaskEdit',
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      editedTask: {...this.task}
    }
  },
  methods: {
    submitTask() {
      this.$emit('update-task', this.editedTask)
    },
    cancelEdit() {
      this.$emit('cancel-edit')
    }
  }
}
</script>

<style scoped>
.task-edit {
  background-color: #222;
  color: #eee;
  padding: 1rem;
  border-radius: 0.5rem;
}

.task-edit h2 {
  margin: 0;
}

.task-edit form {
  display: flex;
  flex-direction: column;
}

.task-edit label {
  margin-top: 1rem;
}

.task-edit input,
.task-edit textarea {
  background-color: #444;
  color: #eee;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin-top: 0.5rem;
}

.task-edit input[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(1);
}

.task-edit .buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

.task-edit button {
  background-color: #777;
  color: #fff;
  padding: 0.5rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
}

.task-edit button:hover {
  background-color: #555;
}

.task-edit button[type="submit"] {
  background-color: #0a9;
}

.task-edit button[type="submit"]:hover {
  background-color: #0c7;
}
</style>
