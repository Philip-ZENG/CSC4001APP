<template>
  <section>
    <h1>Activity Management Console</h1>
    <div>
      <h1>Title</h1>
      <P>{{ title }}</P>
    </div>
    <div>
      <h1>Time</h1>
      <p>{{ time }}</p>
    </div>
    <div>
      <h1>Location</h1>
      <p>{{ location }}</p>
    </div>
    <div>
      <h1>Type</h1>
      <p>{{ type }}</p>
    </div>
    <div>
      <h1>Max Capacity</h1>
      <p>{{ max_capacity }}</p>
    </div>
    <div>
      <h1>Quota Left</h1>
      <p>{{ quota_left }}</p>
    </div>
    <div>
      <h1>Description</h1>
      <p>{{ description }}</p>
    </div>
    <member-list></member-list>
    <h1>Actions</h1>
    <button class="btn btn-primary" type="button" @click="quitActivity">Quit</button>
    <button class="btn btn-primary" type="button" @click="toActivityList">Back</button>
    <div v-if="showTerminate">
      <button class="btn btn-danger" type="button" @click="terminate">
        Terminate
      </button>
    </div>
  </section>
</template>
<script>
import MemberList from './MemberList.vue';

export default {
  /** Manager Functionality
   * *Change manager: OK
   * *Quit from the activity : OK
   * *Terminate the activity: OK
   * *Delete member : OK
   * *Activate activity
   * *Deactivate activity
   * *Go back to activity list page: OK
   */
  /** Member Functionality
   * *Quit from the activity: OK
   * *Go back to activity list page: OK
   */
  components: {
    'member-list': MemberList,
  },
  props: {
    title: { type: String, required: true },
    time: { type: String, required: true },
    quota_left: { type: Number, required: true },
    location: { type: String, required: true },
    type: { type: String, required: true },
    max_capacity: { type: Number, required: true },
    description: { type: String, required: true },
  },
  inject: [
    // Data
    'userId',
    'userRole',
    'activityInfo',
    // Methods
    'deleteMember',
    'terminateActivity',
  ],
  computed: {
    /**
     * @description
     * Return the activity data, since loading takes time, we need to use a dummy data to prevent
     * the error of accessing undefined attributes
     */
    activityData() {
      if (this.activityInfo.length === 1) {
        return this.activityInfo[0];
      }
      return this.activityInfo[1];
    },
    /**
     * @description
     * Show the terminate button if the user is the manager
     */
    showTerminate() {
      return this.userRole[0] === 'MANAGER';
    },
  },
  methods: {
    /**
     * @description
     * Navigate back to the activity list page of the user
     */
    toActivityList() {
      // eslint-disable-next-line
      const targetPath = '/activityList/user_id=' + this.userId;
      this.$router.push(targetPath);
    },
    /**
     * @description
     * Quit from the activity
     */
    quitActivity() {
      // Check whether the manager is the user
      if (this.userRole[0] === 'MANAGER') {
        alert(
          'Set another member as Manager for this activity before yuo quit. Or if you want to terminate the activity, press the "Terminate" button',
        );
      } else {
        // eslint-disable-next-line
        if (confirm('Are you sure that you want to quit this activity?')) {
          this.deletMember(this.userId);
        }
      }
    },
    /**
     * @description
     * Terminate the activity
     */
    terminate() {
      // eslint-disable-next-line
      if (confirm('Are you sure that you want to terminate this activity?')) {
        this.terminateActivity();
      }
    },
  },
};
</script>
