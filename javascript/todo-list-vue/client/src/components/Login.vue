<template>
  <div>
    <form class="form-container" @submit.prevent="login">
      <input type="email" v-model="email" placeholder="Email" required />
      <input
        type="password"
        v-model="password"
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
    Register now
    <router-link to="/signup">here</router-link>
  </div>
</template>

<script>
import { User } from "@genezio-sdk/todo-list-vue";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        User.login(this.email, this.password).then((response) => {
          if (
            !response ||
            response.success === false ||
            response == "Internal error"
          ) {
            if (response.err) {
              alert(response.err);
              return;
            } else {
              if (response.msg) {
                alert(response.msg);
                return;
              } else {
                alert(
                  "Unexpected Error:Please check the backend logs in the project dashboard - https://app.genez.io. ",
                );
                return;
              }
            }
          }
          localStorage.token = response.token;
          // eslint-disable-next-line
          localStorage.userId = response.user._id;
          this.$router.push("/");
        });
      } catch (error) {
        console.error(error);
        alert("An error occured.");
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
