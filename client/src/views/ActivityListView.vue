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

const ACTIVITY_INFO_URL = 'http://localhost:4000/getActivityInfo';

export default {
  components: {
    'activity-list-title': ActivityListTitle,
    'activity-list': ActivityList,
  },
  data() {
    return {
      user_id: 8,
      ACTIVITY_ID_LIST: [], // The list of activity id of a user
      ACTIVITY_DATA: [], // Stores all the activity information of a user
    };
  },
  provide() {
    return {
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
    /**
     * @description
     * Call functions to load data into local memory
     * TODO We need to load data into the local memory FIRST and then render the page
     */
    renderPage() {
      const self = this;
      const myPromise1 = function () {
        return new Promise((resolve) => {
          self.loadActivityRecord(() => {
            resolve();
          });
        });
      };
      myPromise1()
        .then(() => {
          console.log(this.ACTIVITY_ID_LIST);
          console.log(this.ACTIVITY_DATA);
        });
    },
  },
  // lIFE Cycle mounted, will be executed after app setup
  mounted() {
    this.renderPage();
  },
};
</script>

<style>
.save_button {
  min-width: 110px;
  max-width: 110px;
}
</style>
