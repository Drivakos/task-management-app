<template>
  <div class="task-list">
    <div class="task-list-header">
      <h2>Task List</h2>
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

<style scoped>
.task-list-content {
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
.task-list {
  background-color: #222;
  color: #eee;
  padding: 1rem;
  border-radius: 0.5rem;
}

.task-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.task-list-header h2 {
  margin: 0;
}

.task-list-header button {
  background-color: #777;
  color: #fff;
  padding: 0.5rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
}

.task-list-header button:hover {
  background-color: #555;
}

.task {
  margin-bottom: 1rem;
  border: 1px solid #0a9;
  border-radius: 0.5rem;
  padding: 1rem;
}

.task-header {
  display: grid;
  grid-template-columns: 1fr auto auto;
  grid-gap: 0.5rem;
  align-items: center;
  margin-bottom: 0.5rem;
}

.task-header h3 {
  margin: 0;
  font-weight: 700;
  color: #0a9;
}

.task-header button {
  background-color: #0a9;
  color: #fff;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
}

.task-header button:hover {
  background-color: #0c7;
}

.task-details p {
  margin: 0.5rem 0;
}

.task-details p:last-child {
  margin-bottom: 0;
}

.task-header, .task-details {
  width: 100%;
  text-after-overflow: elipsis;
  overflow: clip;
}
</style>
