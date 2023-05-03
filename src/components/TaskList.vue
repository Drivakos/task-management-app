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
          <button @click="showEditTask(task)">Edit</button>
          <button @click="deleteTask(task.id)">Delete</button>
        </div>
        <div class="task-details">
          <p>{{ task.description }}</p>
          <p>{{ task.date }}</p>
        </div>
      </div>
    </div>
    <task-edit v-if="selectedTask" :task="selectedTask" @update-task="updateTask" @cancel-edit="cancelEdit"></task-edit>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TaskEdit from './TaskEdit.vue'

export default {
  name: 'TaskList',
  components: {
    TaskEdit
  },
  data() {
    return {
      selectedTask: null
    }
  },
  computed: {
    ...mapGetters(['tasks'])
  },
  methods: {
    ...mapActions(['deleteTask', 'editTask']),
    addTask() {
      this.$router.push('/new')
    },
    showEditTask(task) {
      this.selectedTask = task
    },
    updateTask(editedTask) {
      this.editTask({ id: editedTask.id, task: editedTask })
      this.selectedTask = null
    },
    cancelEdit() {
      this.selectedTask = null
    }
  }
}
</script>
