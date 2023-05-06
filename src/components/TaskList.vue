<template>
  <div class="tasks-wrapper">
    <div class="task-list">
      <div class="task-list-header">
        <h2>New Tasks List</h2>
      </div>
      <div class="task-list-content">
        <div class="task" v-for="(task, index) in incompleteTasks" :key="index">
          <div class="task-header">
            <h3>{{ task.title }}</h3>
            <button class="timer-button" @click="toggleTimer(task)">
              <i :class="timerIconClass(task)"></i>
            </button>
            <button @click="showEditTask(task)">Edit</button>
            <button @click="deleteTask(task.id)">Delete</button>
          </div>
          <div class="task-details">
            <p>Description: {{ task.description }}</p>
            <p>Task created at: {{ task.date }}</p>
            <p>Time spent: {{ formatTime(task.timeElapsed) }}</p>
            <p>{{ task.formattedTime }}</p>
            <p>Task status: {{ task.status }}</p>
            <button class="complete-btn" v-if="!task.completed" @click="completeTask({id: task.id})">Complete</button>
          </div>
        </div>
      </div>
      <task-edit v-if="selectedTask" :task="selectedTask" @update-task="updateTask"
                 @cancel-edit="cancelEdit"></task-edit>
    </div>
    <div class="task-list-completed">
      <div class="task-list-header">
        <h2>Completed Tasks List</h2>
      </div>
      <div class="task-list-content">
        <div class="task" v-for="(task, index) in completedTasks" :key="index">
          <div class="task-header">
            <h3>{{ task.title }}</h3>
            <button class="timer-button" @click="toggleTimer(task)">
              <i :class="timerIconClass(task)"></i>
            </button>
            <button @click="showEditTask(task)">Edit</button>
            <button @click="deleteTask(task.id)">Delete</button>
          </div>
          <div class="task-details">
            <p>Description: {{ task.description }}</p>
            <p>Task created at: {{ task.date }}</p>
            <p>Time spent: {{ formatTime(task.timeElapsed) }}</p>
            <p>{{ task.formattedTime }}</p>
            <p>Task status: {{ task.status }}</p>
            <button class="complete-btn" v-if="!task.completed" @click="incompleteTask({id: task.id})">incomplete</button>
          </div>
        </div>
      </div>
      <task-edit v-if="selectedTask" :task="selectedTask" @update-task="updateTask"
                 @cancel-edit="cancelEdit"></task-edit>
    </div>
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
    ...mapGetters(['tasks']),
    incompleteTasks() {
      return this.tasks.filter((task) => task.status !== 'Completed')
    },
    completedTasks() {
      return this.tasks.filter((task) => task.status === 'Completed')
    },
    formattedTime() {
      if (this.selectedTask) {
        const start = this.selectedTask.timeStarted
        const now = new Date()
        const diff = now - start
        const hours = Math.floor(diff / (1000 * 60 * 60))
        const minutes = Math.floor(diff / (1000 * 60)) % 60
        const seconds = Math.floor(diff / 1000) % 60
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      }
      return '00:00:00'
    }
  },
  methods: {
    ...mapActions(['deleteTask', 'editTask', 'completeTask','incompleteTask']),
    showEditTask(task) {
      this.selectedTask = task
    },
    updateTask(editedTask) {
      this.editTask({ id: editedTask.id, task: editedTask })
      this.selectedTask = null
    },
    cancelEdit() {
      this.selectedTask = null
    },
    toggleTimer(task) {
      if (!task.timer) {
        task.timer = 0
        task.status = 'In progress'
        task.timer = setInterval(() => {
          task.timeElapsed++
        }, 1000)
      } else {
        clearInterval(task.timer)
        task.timer = 0
        task.status = 'Paused'
        this.editTask({ id: task.id, task })
      }
    },
    formatTime(time) {
      let minutes = Math.floor(time / 60);
      let seconds = time % 60;
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    },
    timerIconClass(task) {
      return task.timer ? 'fas fa-pause' : 'fas fa-play'
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
.task-list, .task-list-completed {
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
  grid-template-columns: 1fr auto auto auto;
  grid-gap: 0.5rem;
  align-items: center;
  margin-bottom: 0.5rem;
}

.task-header h3 {
  max-width: fit-content;
  overflow: hidden;
  margin: 0;
  font-weight: 700;
  color: #0a9;
}

.task-header button , .complete-btn{
  background-color: #0a9;
  color: #fff;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
}

.task-header button:hover ,.complete-btn:hover {
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
