<template>
  <div>
    <h2>Genezio Angular Todo List</h2>
    <form @submit.prevent="createTodo">
      <label for="title">Title:</label>
      <input type="text" id="title" v-model="title" required>
      <button type="submit">Add Todo</button>
    </form>
    <div class="todo-list">
      <div v-for="todo in todos" :key="todo._id" class="todo-item">
        <input type="checkbox" :id="'todo-' + todo._id" v-model="todo.solved" @change="markDone(todo)">
        <label :for="'todo-' + todo._id">{{ todo.title }}</label>
        <button @click="deleteTodo(todo._id)">Delete</button>
      </div>
    </div>

    <button @click="logout()">Logout</button>
  </div>
</template>

<script>
import { Task } from "../sdk/task.sdk.js"
import router from '../router';

export default {
  data() {
    return {
      todos: [],
      title: ""
    }
  },
  methods: {
    createTodo() {
      if (!localStorage.token || !localStorage.userId) {
        router.push('/login')
        return
      }

      Task.createTask(localStorage.token, this.title, localStorage.userId)
        .then(response => {
          if (!response.success && response.msg == "User is not logged on") {
            localStorage.token = ""
            localStorage.userId = ""
            router.push('/login')
          }

          this.title = '';
          this.todos = [...this.todos, response.task]
        })
        .catch(error => {
          alert("An error occured.")
          console.error(error)
        });
    },
    deleteTodo(index) {
      if (!localStorage.token || !localStorage.userId) {
        router.push('/login')
        return
      }

      Task.deleteTask(localStorage.token, index).then((response) => {
        if (response.success) {
          this.todos = this.todos.filter((todo) => todo._id !== index);
        }
      }).catch((error) => {
        alert("An error occured.")
        console.error(error)
      });
    },
    logout() {
      localStorage.token = ""
      localStorage.userId = ""
      router.push('/login')
    },
    markDone(todo) {
      if (!localStorage.token || !localStorage.userId) {
        router.push('/login')
        return
      }

      Task.updateTask(localStorage.token, todo._id, todo.title, todo.solved).then((response) => {
        if (!response.success) {
          todo.solved = !todo.solved;
          alert("Could not mark as done.")
          return;
        }
        console.log("MARKED", this.todos);
      }).catch((error) => {
        alert("Could not mark as done.")
        todo.solved = !todo.solved;
        console.error(error)
      });
    },
  },
  mounted() {
    if (!localStorage.token || !localStorage.userId) {
      router.push('/login')
      return
    }

    Task.getAllTasksByUser(localStorage.token, localStorage.userId).then((response) => {
      this.todos = response.tasks;
    }).catch((error) => {
      alert("An error occured.")
      console.error(error)
    });
  }
}
</script>

<style>

.todo-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 50px;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  width: 200px;
}

input[type="checkbox"] {
  margin-right: 0.5rem;
}
</style>




