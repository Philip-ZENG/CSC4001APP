<template>
  <div class="home">
    <table class="showTable" cellspacing="0" cellpadding="0" align="center">
      <tr height="100px">
        <td id="swip" align="center" colspan="3" border="1">
          <swiper options="swiperOption" class = 'swiper-box'>
            <swiper-slide height="50" align="center">
              <div >content</div>
            </swiper-slide>
          </swiper>
        </td>
        <td id="create" align="center">
          <button id = "createNew" @click="switchTo('/activityCreation')">
          + Post a new event</button>
        </td>
      </tr>
      <tr height="50">
        <td align="center" width="30%">
          <select v-model="searchType">
            <option value="type">type</option>
            <option value="title">title</option>
          </select>
          <input v-model="userInput"><span>{{userInput}}</span>
          <button @click="searchActivity">search</button>
        </td>
        <td align="center" width="20%">
          <div class="rightSep" id="order-select">
            <select v-model="searchOrder">
            <option disabled value="">Please select one</option>
            <option>Most Recent</option>
            <option>Almost Full</option>
            <option>Most Popular</option>
          </select>
          <button>Sort</button>
          </div>
        </td>
        <td align="center" width="20%">
          <div class="rightSep">
            <datepicker>
            </datepicker>
          </div>
        </td>
        <td align="center" width="30%">number of member</td>
      </tr>
    </table>

    <div class="actSquare">
      <dl>
        <dt v-for="(act, index) in actInformation.slice(page*12,page*12+12)" :key="index">
          <activity-card :time="act.time" :title="act.title" :description="act.description">
          </activity-card>
        </dt>
      </dl>
      <div class="pageList">
        <div class="pageIndex">1</div>
        <div class="pageIndex">{{numOfPages}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import Datepicker from 'vuejs3-datepicker';
import ActivityCard from '../components/ActivityCard.vue';

const axios = require('axios').default;

export default {
  components: {
    Swiper,
    SwiperSlide,
    Datepicker,
    'activity-card': ActivityCard,
  },

  computed: {
    totalActivityNum() {
      return this.actInformation.length;
    },

    numOfPages() {
      const temp = Math.floor(this.totalActivityNum / 12);
      const res = this.totalActivityNum % 12;
      if (res === 0) {
        return temp;
      }
      return temp + 1;
    },
  },

  data() {
    return {
      searchOrder: '',
      searchType: 'type',
      actInformation: [],
      page: 0,
      userInput: '',
    };
  },

  methods: {
    switchTo(path) {
      this.$router.replace(path);
    },

    searchActivity() {
      axios.post(
        'http://localhost:4000/searchActivity',
        { searchType: this.searchType, userInput: this.userInput },
      )
        .then((response) => {
          this.actInformation = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    askInfo() {
      axios.post('http://localhost:4000/getActivityInfo')
        .then((response) => {
          this.actInformation = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  mounted() {
    this.askInfo();
  },

};
</script>

<style>
#swip {
  border-style: solid; border-width: 0px 1px 1px 0px;
}

#create {
  border-style: solid; border-width: 0px 0px 1px 0px;
}

#createNew {
  text-align:center;
  background-color: white;
  border-radius: 10px;
  height:45px; width: 200px;
}

.rightSep{
  margin: 5px;
  border-style: solid; border-width: 0px 1px 0px 0px;
}

.showTable{
  width: 100%;
  border-style: solid; border-width: 1px 0px 1px 0px; border-color: black;
}

.actSquare{
  padding-left: 4%; padding-right: 4%; padding-top: 1%;
  align-content: center;
}

.pageList{
  position: fixed; bottom: 0%;
  width: 100%; height: 5%;
  background-color: white;
}

.pageIndex{
  float: left;
  width: 30px; height: 30px;
  border-style: solid; border-width: 1px; border-radius: 5px;
  text-align: center;
  color: slateblue;
}

</style>
