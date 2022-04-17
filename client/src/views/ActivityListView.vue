<template>
<div>
  <div class="home mt-3">
    <h1> My Activity List</h1>
  </div>

  <div class="container mt-3" style="align: center;">
    <div class="card">
      <div class="row">
        <div class="col">
          <h3>Title</h3>
        </div>
        <div class="col">
          <h3>Time</h3>
        </div>
        <div class="col">
          <h3>Remaining Quota</h3>
        </div>
        <div class="col">
          <h3>Stauts</h3>
        </div>
      </div>
    </div>

    <div class="card mt-2">
      <div class="row">
        <div class="col">
          <h4>{{ title }}</h4>
        </div>
        <div class="col">
          <h4>{{ time }}</h4>
        </div>
        <div class="col">
          <h4>{{ quota_left }}</h4>
        </div>
        <div class="col">
          <div class="dropdown">
            <button class="btn btn-success dropdown-toggle save_button"
            type="button" id="dropdownMenuButton"
            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {{ state }}
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" href="http://localhost:8080/#/activityManagement">Detail</a>
              <a class="dropdown-item">{{ action }}</a>
              <a class="dropdown-item">Delete</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card mt-2">
      <div class="row">
        <div class="col">
          <h4>Running</h4>
        </div>
        <div class="col">
          <h4>2022/4/10 19:00</h4>
        </div>
        <div class="col">
          <h4>3</h4>
        </div>
        <div class="col">
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle save_button"
            type="button" id="dropdownMenuButton"
            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              INACTIVE
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" href="http://localhost:8080/#/activityManagement">Detail</a>
              <a class="dropdown-item">Activate</a>
              <a class="dropdown-item">Delete</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <activity-list-card state="INACTIVE"></activity-list-card>

  </div>
</div>
</template>

<script>
import { createApp } from 'vue';
import ActivityListCard from '../components/ActivityListCard.vue';

// Register Component
const app = createApp({});
app.component('activity-list-card', ActivityListCard);

const axios = require('axios').default;

const ACTIVITY_INFO_URL = 'http://localhost:4000/getActivityInfo';

export default {
  components: { ActivityListCard },
  name: 'ActivityList',
  data() {
    return {
<<<<<<< HEAD
      user_id: 8,
      ACTIVITY_ID_LIST: null,
      // Stores the package sent by the server (all the activity information of a user)
      ACTIVITY_DATA: null,
      title: null,
      time: null,
      quota_left: null,
      state: null,
      action: null,
    };
  },
  methods: {
    loadActivityRecord(callback) {
      axios.post(ACTIVITY_INFO_URL, { user_id: this.user_id })
        .then((response) => {
          const DATA_INDEX = 1;
          const ID_LIST_INDEX = 0;
          this.ACTIVITY_DATA = response.data[DATA_INDEX];
          this.ACTIVITY_ID_LIST = response.data[ID_LIST_INDEX];
          return callback();
=======
      user_id: [],
      ACTIVITY_DATA: [], // Stores all the activity information of a user
    };
  },
  provide() {
    return {
      userId: this.user_id,
      activityData: this.ACTIVITY_DATA,
    };
  },
  methods: {
    /**
     * @description
     * Loads all the activity information of a user with given user_id
     * Data is loaded into the local variable ACTIVITY_DATA
     * @var ID_LIST_INDEX @var DATA_INDEX
     * Data package is sent in the form: {[ACTIVITY_ID_LIST],[ACTIVITY_DATA]}
     * @param {*} callback
     * This callback function is used to pass data from async function
     */
    loadActivityRecord() {
      axios
        .post(ACTIVITY_INFO_URL, { user_id: this.user_id })
        .then((response) => {
          const DATA_INDEX = 0;
          for (let i = 0; i < response.data[DATA_INDEX].length; i += 1) {
            this.ACTIVITY_DATA.push(response.data[DATA_INDEX][i]);
          }
>>>>>>> 1ebfbd75b3d9358c35ceef756d2c17d6ea52af3f
        });
    },
    renderActivityCard(index) {
      this.title = this.ACTIVITY_DATA[index].title;
      this.time = this.ACTIVITY_DATA[index].time;
      this.quota_left = this.ACTIVITY_DATA[index].quota_left;
      this.state = 'ACTIVE';
      if (this.state === 'ACTIVE') {
        this.action = 'Deactivate';
      } else {
        this.action = 'Activate';
      }
    },
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
          self.renderActivityCard(0);
        });
    },
  },
  mounted() {
<<<<<<< HEAD
    this.renderPage();
=======
    this.loadActivityRecord();
  },
  created() {
    // get the route parameter 'id' from router
    this.user_id.push(this.$route.params.user_id);
>>>>>>> 1ebfbd75b3d9358c35ceef756d2c17d6ea52af3f
  },
};
</script>

<style>
.save_button {
  min-width: 110px;
  max-width: 110px;
}
</style>
