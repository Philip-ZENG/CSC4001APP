<template>
  <section>
    <h1>User Management Console</h1>
    <div>
      <h1>User Id</h1>
      <P>{{ getUserId }}</P>
    </div>
    <div>
      <h1>Email</h1>
      <P>{{ email }}</P>
    </div>
    <div>
      <h1>User Name</h1>
      <P>{{ user_name }}</P>
    </div>
    <div>
      <h1>Gender</h1>
      <P>{{ gender }}</P>
    </div>
    <div>
      <h1>Contact Information</h1>
      <P>{{ contact_info }}</P>
    </div>
    <div>
      <h1>Personal Introduction</h1>
      <P>{{ Personal_intro }}</P>
    </div>
    <div>
      <h1>Identity</h1>
      <P>{{ identity }}</P>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    getUserId() {
      return this.$store.getters['userManagement/getUserId'];
    },
  },
};
</script>
