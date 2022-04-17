<template>
  <section>
    <div class="about">
      <h1>This is the register page</h1>
    </div>

    <div class="show latest email">
      <p>This is the latest received email</p>
      <h1>{{ email }}</h1>
      <p>The total number of email registered is</p>
      <h1>{{ count }}</h1>
    </div>

    <div class="userInput">
      <p>Email Address</p>
      <input v-model="userAccount" placeholder="Email" />
      <p>Password</p>
      <input v-model="password" placeholder="Password" />
      <p></p>
      <button v-on:click="postMessage">Register</button>
    </div>
    <br>
    <button @click="goToLogin">GoToLogin</button>
  </section>
</template>

<script>
const axios = require('axios').default;

const GETEMAIL_URL = 'http://localhost:4000/getEmail';
const GETCOUNT_URL = 'http://localhost:4000/getCount';
const REGISTER_URL = 'http://localhost:4000/register';

export default {
  name: 'RegisterView',

  data() {
    return {
      email: null,
      count: null,
      userAccount: null,
      password: null,
    };
  },

  mounted() {
    axios.get(GETEMAIL_URL).then((results) => {
      this.email = results.data.email_address;
    });

    axios.get(GETCOUNT_URL).then((results) => {
      this.count = results.data.numberOfRegistery;
    });
  },

  methods: {
    pageUpdate() {
      axios.get(GETEMAIL_URL).then((results) => {
        this.email = results.data.email_address;
      });

      axios.get(GETCOUNT_URL).then((results) => {
        this.count = results.data.numberOfRegistery;
      });
    },

    postMessage() {
      const account = this.userAccount;
      const keyword = this.password;
      axios.post(REGISTER_URL, { userAccount: account, password: keyword });
      setTimeout(this.pageUpdate(), 500);
    },

    goToLogin() {
      this.$router.push('/login');
    },
  },
};
</script>
