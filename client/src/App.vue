<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/activityCreation">Activity Creation</router-link> |
    <router-link to="/register">Register</router-link> |
    <router-link to="/login">Login</router-link> |
    <router-link to="/personalInfo">Personal Information</router-link> |
    <router-link to="/setting">Setting</router-link> |
    <router-link to="/activityList">Activity List</router-link> |
    <router-link to="/activityManagement">Activity Management</router-link> |
    <router-link to="/notification">Notification</router-link>
  </nav>
  <router-view/>
</template>

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
