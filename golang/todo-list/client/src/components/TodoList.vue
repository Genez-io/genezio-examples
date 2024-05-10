<template>
    <div>
      <h2>Genezio Vue Todo List</h2>
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
  
  <script lang="ts">
  import { TaskService, Task} from "@genezio-sdk/todo-list";
   
  export default {
    data() {
      return {
        todos: [],
        title: "",
      };
    },
    methods: {
      createTodo() {
        if (!this.title) {
          alert("Title is required.");
          return;
        }
        const task : Task = {
            title: this.title,
            solved: false,
            date: new Date(),
            };
        TaskService.createTask(task)
          .then((response) => {
            this.title = "";
            if(this.todos.length > 0){
                this.todos = [...this.todos, response];
            }
            else{
                this.todos = [response];
            }
          })
          .catch((error) => {
            alert("An error occured.");
            console.error(error);
          });
      },
      deleteTodo(index) {
  
        TaskService.deleteTask(index)
          .then((response) => {

              this.todos = this.todos.filter((todo) => todo._id !== index);
            
          })
          .catch((error) => {
            alert("An error occured.");
            console.error(error);
          });
      },
      markDone(todo) {
        const task : Task = {
            title: todo.title,
            solved: todo.solved,
            date: todo.date,
            };
        TaskService.updateTask( todo._id, task)
          .then((response) => {
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
        
      TaskService.getAllTasks()
        .then((response) => {
          this.todos = response
          console.log(response)
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
  