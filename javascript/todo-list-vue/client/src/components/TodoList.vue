<template>
  <div>
    <h2>Genezio Angular Todo List</h2>
    <form @submit.prevent="createTodo">
      <label for="title">Title:</label>
      <input type="text" id="title" v-model="title" required />
      <button type="submit">Add Todo</button>
    </form>
    <div class="todo-list">
      <div v-for="todo in todos" :key="todo._id" class="todo-item">
        <input
          type="checkbox"
          :id="'todo-' + todo._id"
          v-model="todo.solved"
          @change="markDone(todo)"
        />
        <label :for="'todo-' + todo._id">{{ todo.title }}</label>
        <button @click="deleteTodo(todo._id)">Delete</button>
      </div>
    </div>

  </div>
</template>

<script>
import { Task } from "@genezio-sdk/todo-list-vue";

export default {
  data() {
    return {
      todos: [],
      title: "",
    };
  },
  methods: {
    createTodo() {

      Task.createTask( this.title)
        .then((response) => {
          this.title = "";
          this.todos = [...this.todos, response.task];
        })
        .catch((error) => {
          alert("An error occured.");
          console.error(error);
        });
    },
    deleteTodo(index) {

      Task.deleteTask(index)
        .then((response) => {
          if (response.success) {
            this.todos = this.todos.filter((todo) => todo._id !== index);
          }
        })
        .catch((error) => {
          alert("An error occured.");
          console.error(error);
        });
    },
    markDone(todo) {
      Task.updateTask( todo._id, todo.title, todo.solved)
        .then((response) => {
          if (!response.success) {
            todo.solved = !todo.solved;
            alert("Could not mark as done.");
            return;
          }
          console.log("MARKED", this.todos);
        })
        .catch((error) => {
          alert("Could not mark as done.");
          todo.solved = !todo.solved;
          console.error(error);
        });
    },
  },
  mounted() {

    Task.getAllTasks()
      .then((response) => {
        this.todos = response.tasks;
      })
      .catch((error) => {
        alert("An error occured.");
        console.error(error);
      });
  },
};
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
