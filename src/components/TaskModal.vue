<template>
  <div class="task-modal" v-if="isModalVisible">
    <div class="task-modal-header">
      <h2>{{ modalTitle }}</h2>
      <button @click="close">X</button>
    </div>
    <div class="task-modal-content">
      <form @submit.prevent="save">
        <div>
          <label>Title</label>
          <input type="text" v-model="task.title" />
        </div>
        <div>
          <label>Description</label>
          <textarea v-model="task.description"></textarea>
        </div>
        <div>
          <label>Date</label>
          <input type="date" v-model="task.date" />
        </div>
        <div class="task-modal-footer">
          <button type="submit">{{ modalAction }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskModal',
  props: {
    editingTask: Object
  },
  data() {
    return {
      isModalVisible: false,
      task: {
        title: '',
        description: '',
        date: ''
      }
    }
  },
  computed: {
    modalTitle() {
      return this.editingTask ? 'Edit Task' : 'Add Task'
    },
    modalAction() {
      return this.editingTask ? 'Save' : 'Add'
    }
  },
  methods: {
    close() {
      this.isModalVisible = false
    },
    show() {
      this.isModalVisible = true
    },
    save() {
      if (this.editingTask) {
        this.$emit('edit-task', this.task)
      } else {
        this.$emit('add-task', this.task)
      }
      this.close()
    }
  },
  watch: {
    editingTask(task) {
      if (task) {
        this.task = { ...task }
      } else {
        this.task = {
          title: '',
          description: '',
          date: ''
        }
      }
    }
  }
}
</script>

<style scoped>
.task-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
}

.task-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
}

.task-modal-content {
  padding: 1rem;
  background-color: #fff;
}

.task-modal-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}
</style>
