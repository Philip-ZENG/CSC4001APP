<template>
  <section>
    <h1>Admin Console</h1>
    <user-list></user-list>
    <button @click="logout">Logout</button>
  </section>
</template>

<script>
import UserList from '../components/AdminConsole/UserList.vue';

const axios = require('axios').default;

const USER_INFO_URL = 'http://localhost:4000/getUserInfo';

export default {
  components: {
    'user-list': UserList,
  },
  data() {
    return {
      USER_DATA: [],
    };
  },
  provide() {
    return {
      userData: this.USER_DATA,
    };
  },
  methods: {
    logout() {
      this.$store.dispatch('setIsLogOut');
      this.$store.dispatch('setIsUser', { isUser: null });
      this.$router.push('/');
    },
    /**
     * @description
     * Load all the user data from database, data is stored in
     */
    loadUserData() {
      axios
        .get(USER_INFO_URL)
        .then((response) => {
          console.log(response);
          for (let i = 0; i < response.data.length; i += 1) {
            this.USER_DATA.push(response.data[i]);
          }
          console.log(this.USER_DATA);
        });
    },
  },
  mounted() {
    this.loadUserData();
  },
};
</script>
