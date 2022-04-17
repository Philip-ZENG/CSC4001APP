<template>
  <section>
    <h1>This is visitor home</h1>
    <button @click="goToLogIn">Login</button>
    <br>
    <br>
    <button @click="goToRegister">Register</button>
  </section>
</template>

<script>
export default {
  methods: {
    goToLogIn() {
      this.$router.push('/login');
    },
    goToRegister() {
      this.$router.push('/register');
    },
  },
};
</script>
