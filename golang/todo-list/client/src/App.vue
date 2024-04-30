<template>
  <div>
    <a href="https://genezio.com" target="_blank">
      <img
        src="https://raw.githubusercontent.com/Genez-io/graphics/main/svg/Logo_Genezio_White.svg"
        class="logo genezio light"
        alt="Genezio Logo"
      />
      <img
        src="https://raw.githubusercontent.com/Genez-io/graphics/main/svg/Logo_Genezio_Black.svg"
        class="logo genezio dark"
        alt="Genezio Logo"
      />
    </a>
    <a href="https://vuejs.org" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue.js logo" />
    </a>

    <h1>Genezio + Vue = ❤️</h1>

    <div class="card">
      <input
        type="text"
        class="input-box"
        v-model="name"
        placeholder="Enter your name"
      />
      <br />
      <br />

      <button @click="sayHello">Say Hello</button>
      <p class="read-the-docs">{{ response }}</p>
    </div>
  </div>
</template>

<script>
import { BackendService } from '@genezio-sdk/todo-list';

export default {
  data() {
    return {
      name: "",
      response: "",
    };
  },
  methods: {
    async sayHello() {
      this.response = await BackendService.hello(this.name);
    },
  },
};
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #61dafbaa);
}

@media (prefers-color-scheme: dark) {
  .dark {
    display: none; /* Hide light logo in light mode */
  }
}

@media (prefers-color-scheme: light) {
  .light {
    display: none; /* Hide dark logo in dark mode */
  }
}

@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: no-preference) {
  a:nth-of-type(2) .logo {
    animation: logo-spin infinite 20s linear;
  }
}

.card {
  padding: 2em;
}

.read-the-docs {
  color: #888;
}

.input-box {
  width: 25%;
  border-radius: 5px;
  box-shadow: none !important;
  border: 2px solid #888;
  padding: 10px;
}
</style>
