<template>
  <section>
    <section v-if="getIsLogIn && getIsUser">
      <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #e3f2fd">
        <div class="container-fluid">
          <a class="navbar-brand" href="http://localhost:8080/#/">PickUp</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" aria-current="page" href="http://localhost:8080/#/userHome"
                  >Home</a
                >
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Activity Management
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li>
                    <a class="dropdown-item" href="http://localhost:8080/#/activityCreation"
                      >Create Activity</a
                    >
                  </li>
                  <li>
                    <a class="dropdown-item" href="http://localhost:8080/#/activityList"
                      >My Activity List</a
                    >
                  </li>
                  <li>
                    <a class="dropdown-item" href="http://localhost:8080/#/activityManagement"
                      >Modify My Activity</a
                    >
                  </li>
                </ul>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Personal Center
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li>
                    <a class="dropdown-item" href="http://localhost:8080/#/personalInfo"
                      >Personal Information</a
                    >
                  </li>
                  <li>
                    <a class="dropdown-item" href="http://localhost:8080/#/setting">Setting</a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="http://localhost:8080/#/notification"
                      >Notification</a
                    >
                  </li>
                </ul>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="http://localhost:8080/#/login">Login</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="http://localhost:8080/#/register">Register</a>
              </li>
              <li class="nav-item">
                <button @click="logout">Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </section>
    <router-view />
  </section>
</template>

<script>
export default {
  computed: {
    getIsLogIn() {
      return this.$store.getters.getIsLogIn;
    },
    getIsUser() {
      return this.$store.getters.getIsUser;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('setIsLogOut');
      this.$store.dispatch('setIsUser', { isUser: null });
      this.$router.push('/');
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
