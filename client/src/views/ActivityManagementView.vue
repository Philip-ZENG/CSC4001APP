<template>
  <section>
    <div class="home">
    </div>
    <management-console
      v-for="activity in ACTIVITY_INFO"
      :key="activity.activity_id"
      :title="activity.title"
      :time="activity.time"
      :location="activity.location"
      :type="activity.type"
      :max_capacity="activity.max_capacity"
      :quota_left="activity.quota_left"
      :description="activity.description"
    ></management-console>
  </section>
</template>

<script>
import managementConsole from '../components/ActivityManagement/ManagementConsole.vue';

const axios = require('axios').default;

const ACTIVITY_INFO_URL = 'http://localhost:4000/getActivityInfo';
const USER_ROLE = 'http://localhost:4000/getUserRole';
const DELETE_MEMBER = 'http://localhost:4000/quitActivity';
const CHANGE_MANAGER = 'http://localhost:4000/changeManager';
const TERMINATE_ACTIVITY = 'http://localhost:4000/terminateActivity';
const MEMBER_INFO = 'http://localhost:4000/getMemberInfo';

export default {
  components: {
    'management-console': managementConsole,
  },
  data() {
    return {
      activity_id: null,
      // Use array here because if set to null, the data cannot be pass through
      user_id: [],
      user_role: [],
      ACTIVITY_INFO: [],
      MEMBER_ID_LIST: [], // The list of user_ids who take part in the activity
      MEMBER_INFO: [], // Information of all the members
    };
  },
  provide() {
    return {
      // Data
      userId: this.user_id,
      userRole: this.user_role,
      activityInfo: this.ACTIVITY_INFO,
      memberInfo: this.MEMBER_INFO,
      // Methods
      deleteMember: this.deleteMember,
      changeManager: this.changeManager,
      terminateActivity: this.terminateActivity,
    };
  },
  methods: {
    /**
     * @description
     * Return activity info of a specific activity with the provided activity_id
     */
    getActivityInfo() {
      const that = this;
      axios
        .post(ACTIVITY_INFO_URL, { activity_id: this.activity_id })
        .then((response) => {
          that.ACTIVITY_INFO.push(response.data);
        });
    },
    /**
     * @description
     * Return the role of a user with the provided activity_id and user_id
     */
    getUserRole() {
      axios
        .post(USER_ROLE, { activity_id: this.activity_id, user_id: this.user_id })
        .then((response) => {
          this.user_role.push(response.data.role);
        });
    },
    /**
     * @description
     * Quit from the activity with provided activity_id and user_id
     * If the user is a manager, we need to make sure there is at least another manager before
     * he can execute this action
     */
    deleteMember(userId) {
      axios.post(DELETE_MEMBER, { activity_id: this.activity_id, user_id: userId });
    },
    /**
     * @description
     * Transfer the authority of activity manager to other member with provided new_manager_id
     */
    changeManager(newManagerId) {
      axios.post(CHANGE_MANAGER, {
        activity_id: this.activity_id,
        new_manager_id: newManagerId,
        old_manager_id: this.user_id[0],
      });
    },
    /**
     * @description
     * Terminate the whole activity, can only be triggered by activity manager
     */
    terminateActivity() {
      axios.post(TERMINATE_ACTIVITY, { activity_id: this.activity_id });
    },
    /**
     * @description
     * Get all the member info
     */
    getMemberInfo() {
      axios
        .post(MEMBER_INFO, { activity_id: this.activity_id })
        .then((response) => {
          this.MEMBER_INFO.push(response.data);
        });
    },
  },
  mounted() {
    this.getActivityInfo();
    this.getUserRole();
    this.getMemberInfo();
  },
  created() {
    // get the route parameter 'id' from router
    this.activity_id = this.$route.params.activity_id;
    this.user_id.push(this.$route.params.user_id);
  },
};
</script>
