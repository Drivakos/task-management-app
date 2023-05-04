<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-dialog" @click.stop>
        <div class="modal-content">
          <div class="modal-header">
            <h2>Edit Task</h2>
            <button class="close-button" @click="cancelEdit">X</button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitTask">
              <div class="form-group">
                <label for="title">Title:</label>
                <input id="title" type="text" v-model="editedTask.title" required>
              </div>

              <div class="form-group">
                <label for="description">Description:</label>
                <textarea id="description" v-model="editedTask.description" required></textarea>
              </div>

              <div class="form-group">
                <label for="date">Date:</label>
                <input id="date" type="date" v-model="editedTask.date" required>
              </div>

              <div class="form-group buttons">
                <button type="submit">Save Changes</button>
                <button @click="cancelEdit">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
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
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-dialog {
  width: 80%;
  max-width: 600px;
  background-color: rgba(0, 0, 0, 0.5);
  border: 1px solid #0a9;
  border-radius: 0.5rem;
  overflow: hidden;
}

.modal-content {
  padding: 1rem;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.5rem;
}

.modal-header .close-button {
  background-color: #777;
  color: #fff;
  padding: 0.5rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
}

.modal-header .close-button:hover {
  background-color: #555;
}

.modal-body {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  overflow: hidden;
}
.form-group textarea {
  width: 100%;
  text-after-overflow: ellipsis;
}

.form-group label {
  margin-bottom: 0.5rem;
}

.task-edit {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #222;
  color: #eee;
  padding: 1rem;
  border-radius: 0.5rem;
  z-index: 100;
}

.task-edit h2 {
  margin: 0;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.task-edit form {
  display: flex;
  flex-direction: column;
}

.task-edit label {
  margin-top: 1rem;
  font-weight: bold;
}

.task-edit input,
.task-edit textarea {
  font-size: 1rem;
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
  margin-top: 0.25rem;
  background-color: #f4f4f4;
  color: #444;
}

.task-edit input[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(1);
}

.task-edit input:focus,
.task-edit textarea:focus {
  outline: none;
  border-color: #0a9;
}

.task-edit button {
  background-color: #777;
  color: #fff;
  padding: 0.5rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  margin-top: 1rem;
  font-size: 1rem;
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

.task-edit .form-group {
  display: flex;
  flex-direction: column;
}

.task-edit .form-group .form-error {
  color: #f00;
  font-size: 0.8rem;
  margin-top: 0.25rem;
}
</style>

