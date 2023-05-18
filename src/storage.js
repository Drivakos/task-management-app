const STORAGE_KEY = 'task-management-app-tasks'
// TODO: save tasks to localStorage and then to DB
export function saveTasks(tasks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}
// TODO: sync tasks from DB to localStorage based on user and last edit date
export function getTasks() {
    const tasks = localStorage.getItem(STORAGE_KEY)
    return tasks ? JSON.parse(tasks) : []
}
