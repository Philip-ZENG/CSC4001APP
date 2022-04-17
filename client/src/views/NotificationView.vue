<template>
  <div class="home">
    <h1>This is the Notification page</h1>
    <form @submit.prevent="setUserId">
      <label for="user_id">Set user_id<input type="text" id="user_id" v-model="user_id" /></label>
      <button>Submit</button>
    </form>
    <form @submit.prevent="setUserToken">
      <label for="user_token"
        >Set user_token<input type="text" id="user_token" v-model="user_token"
      /></label>
      <button>Set</button>
    </form>
    <p>Get user_id : {{ get_user_id }}</p>
    <p>Get user_token : {{ get_user_token }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user_id: null,
      user_token: null,
    };
  },
  computed: {
    get_user_id() {
      return this.$store.getters.getUserId;
    },
    get_user_token() {
      return this.$store.getters.getUserToken;
    },
  },
  methods: {
    setUserId() {
      this.$store.dispatch('setUserId', { user_id: this.user_id });
    },
    setUserToken() {
      this.$store.dispatch('setUserToken', { user_token: this.user_token });
    },
  },
};
</script>
