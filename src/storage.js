const STORAGE_KEY = 'task-management-app-tasks'

export function saveTasks(tasks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

export function getTasks() {
    const tasks = localStorage.getItem(STORAGE_KEY)
    return tasks ? JSON.parse(tasks) : []
}

// Save a task to Local Storage
let task = {
    title: 'Task 1',
    description: 'Description of Task 1',
    date: new Date()
}
localStorage.setItem('task1', JSON.stringify(task));

// Retrieve a task from Local Storage
let storedTask = localStorage.getItem('task1');
let taskObject = JSON.parse(storedTask);
console.log(taskObject.title); // Output: 'Task 1'
