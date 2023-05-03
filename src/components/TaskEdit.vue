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
