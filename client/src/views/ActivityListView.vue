<template>
<div>
  <div class="home mt-3">
    <h1> My Activity List</h1>
  </div>
  <div class="container mt-3" style="align: center;">
    <activity-list-title></activity-list-title>
    <activity-list></activity-list>
  </div>
</div>
</template>

<script>
import ActivityList from '../components/ActivityList/ActivityList.vue';
import ActivityListTitle from '../components/ActivityList/ActivityListTitle.vue';

const axios = require('axios').default;

const ACTIVITY_INFO_URL = 'http://localhost:4000/getActivityList';

export default {
  components: {
    'activity-list-title': ActivityListTitle,
    'activity-list': ActivityList,
  },
  data() {
    return {
      user_id: [],
      ACTIVITY_ID_LIST: [], // The list of activity id of a user
      ACTIVITY_DATA: [], // Stores all the activity information of a user
    };
  },
  provide() {
    return {
      userId: this.user_id,
      activityIdList: this.ACTIVITY_ID_LIST,
      activityData: this.ACTIVITY_DATA,
    };
  },
  methods: {
    /**
     * @description
     * Loads all the activity information of a user with given user_id
     * Data is loaded into the local variable ACTIVITY_ID_LIST & ACTIVITY_DATA
     * @var ID_LIST_INDEX @var DATA_INDEX
     * Data package is sent in the form: {[ACTIVITY_ID_LIST],[ACTIVITY_DATA]}
     * @param {*} callback
     * This callback function is used to pass data from async function
     */
    loadActivityRecord(callback) {
      axios.post(ACTIVITY_INFO_URL, { user_id: this.user_id })
        .then((response) => {
          const ID_LIST_INDEX = 0;
          const DATA_INDEX = 1;
          for (let i = 0; i < response.data[DATA_INDEX].length; i += 1) {
            this.ACTIVITY_DATA.push(response.data[DATA_INDEX][i]);
          }
          for (let i = 0; i < response.data[ID_LIST_INDEX].length; i += 1) {
            this.ACTIVITY_ID_LIST.push(response.data[ID_LIST_INDEX][i]);
          }
          this.ACTIVITY_ID_LIST = response.data[ID_LIST_INDEX];
          return callback();
        });
    },
  },
  // lIFE Cycle mounted, will be executed after app setup
  mounted() {
    this.loadActivityRecord(() => {});
  },
  created() {
    // get the route parameter 'id' from router
    this.user_id.push(this.$route.params.user_id);
  },
};
</script>

<style>
.save_button {
  min-width: 110px;
  max-width: 110px;
}
</style>
