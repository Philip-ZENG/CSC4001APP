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
