<template>
  <form class="form-container" @submit.prevent="signup">
    <input type="name" v-model="name" placeholder="Name" required>
    <input type="email" v-model="email" placeholder="Email" required>
    <input type="password" v-model="password" placeholder="Password" required>
    <button type="submit">Login</button>
  </form>
</template>

<script>
import { User } from '@genezio-sdk/todo-list-angular_us-east-1';

export default {

  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async signup() {
      try {
        User.register(this.name, this.email, this.password).then((response) => {
          if (response.success === false) {
            alert(response.msg);
            return;
          }

          this.$router.push('/login');
        });
      } catch (error) {
        console.error(error);
        alert('An error occured.');
      }
    },
  },
};
</script>

<style>
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

input {
  margin: 5px;
}
</style>
