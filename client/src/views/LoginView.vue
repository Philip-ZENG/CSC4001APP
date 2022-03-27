<template>
  <div class="about">
    <h1>This is the Login page</h1>
  </div>

  <div class="userInput">
    <p>Email Address</p>
    <input v-model="userAccount" placeholder="Email" />
    <p>Password</p>
    <input v-model="password" placeholder="Password" />
    <p></p>
    <button v-on:click="accountVerification">Login</button>
  </div>

  <div class="loginStatus">
    <p>Login Status is </p>
    <h1>{{ loginStatus }}</h1>
  </div>
</template>

<script>
const axios = require('axios').default;

const LOGIN_URL = 'http://localhost:4000/login';

export default {
  name: 'LoginView',
  data() {
    return {
      userAccount: null,
      password: null,
      loginStatus: false,
    };
  },
  methods: {
    accountVerification() {
      const account = this.userAccount;
      const keyword = this.password;
      axios.post(LOGIN_URL, { userAccount: account, password: keyword });
      axios.get(LOGIN_URL).then((results) => {
        this.loginStatus = results.data.verificationResult;
      });
    },
  },
};
</script>
