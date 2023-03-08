<template>
  <div>
    <form class="form-container" @submit.prevent="login">
      <input type="email" v-model="email" placeholder="Email" required>
      <input type="password" v-model="password" placeholder="Password" required>
      <button type="submit">Login</button>
    </form>
    Register now <router-link to="/signup">here</router-link>
  </div>
</template>

<script>
import { User } from "../sdk/user.sdk.js"

export default {

  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login() {
      try {
        User.login(this.email, this.password).then((response) => {
          if (response.success == false) {
            alert(response.msg)
            return
          }
          localStorage.token = response.token
          localStorage.userId = response.user._id
          this.$router.push('/')
        });
      } catch (error) {
        console.error(error)
        alert("An error occured.")
      }
    }
  }
}

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