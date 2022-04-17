<template>
  <div class="home">
    <table class="showTable" cellspacing="0" cellpadding="0" align="center">
      <tr height="100px"> <!--first row-->
        <td id="swip" align="center" colspan="2" border="1px">
          <span>{{dateinput}}</span>
        </td>
        <td id="create" align="center">
          <button id = "createNew" @click="switchTo('/activityCreation')">
          + Post a new event</button>
        </td>
      </tr>
      <tr height="50px"> <!--second row-->
        <td align="center" width="50%"> <!--search bar-->
          <div  class="rightSep">
            <select v-model="searchType">
              <option value="type">type</option>
              <option value="title">title</option>
            </select>
            <input v-model="userInput">
            <button @click="searchActivity">search</button>
          </div>
        </td>
        <td align="center" width="20%"> <!--order bar-->
          <div class="rightSep" id="order-select">
            <select v-model="searchOrder">
              <option disabled value="">Please select one</option>
              <option value="MostRecent">Most Recent</option>
              <option value="MostPopular">Most Popular</option>
            </select>
          <button @click="sortActivity">Sort</button>
          </div>
        </td>
        <td align="center" width="20%"> <!--date bar-->
          <div>
            <datepicker v-model="dateinput" placeholder="Select Date" iconColor="purple"></datepicker>
            <button @click="searchByDate">search</button>
          </div>
        </td>
        
      </tr>
    </table>

    <div class="actSquare"> <!-- activity square-->
      <dl>
        <dt v-for="(act, index) in shownActivity" :key="index">
          <activity-card :time="dateToString(new Date(act.time))" :title="act.title" 
            :description="act.description" @click="showDetail(index)">
          </activity-card>
        </dt>
      </dl>
      <div class="pageList"> <!-- page -->
        <button @click="page -= 1" :disabled="page == 1">previous</button>
        <span style="margin-left:10px; margin-right:10px"> {{page}} </span>
        <button @click="page += 1" :disabled="page == numOfPages">next</button>
        <span> go to: </span>
        <select v-model="userPage">
          <option v-for="p in numOfPages" :key="p" :disabled="p == page">{{p}}</option>
        </select>
      </div>
    </div>

    <div class="cardOut" v-show="cardSelected" @click="cardSelected = false"></div> <!-- detail card-->
      <div class="detailCard" v-show="cardSelected">
        <table width="90%" height="90%" padding="5%" cellspacing="0" cellpadding="0" align="center">
          <tr width="100%" height="50px">
            <td width="25%"> organizer photo </td>
            <td width="30%">type: {{Object(shownActivity[chosenIndex]).type}}</td>
            <td width="45%">title: {{Object(shownActivity[chosenIndex]).title}}</td>
          </tr>
           <tr width="100%" height="50px">
            <td>number:{{Object(shownActivity[chosenIndex]).quota_left}} / {{Object(shownActivity[chosenIndex]).max_capacity}}</td>
            <td>Loc: {{Object(shownActivity[chosenIndex]).location}}</td>
            <td>Time: {{dateToString(new Date(Object(shownActivity[chosenIndex]).time))}}</td>
          </tr>
          <tr width="100%" height="50px">
            <td colspan="3">{{Object(shownActivity[chosenIndex]).activity_id}}</td>
          </tr>
          <tr>
            <td colspan="3">{{Object(shownActivity[chosenIndex]).description}}</td>
          </tr>
        </table>
      </div>
  </div>
</template>

<script>
/* eslint-disable */
import Datepicker from 'vuejs3-datepicker';
import ActivityCard from '../components/Home/ActivityCard.vue';

const axios = require('axios').default;

export default {
  components: {
    Datepicker,
    'activity-card': ActivityCard,
  },

  data() {
    return {
      userId: '1',
      searchOrder: '',
      searchType: 'type',
      actInformation: [], // store the activity information
      page: 1, // store the page number
      userInput: '', // store the user's input for searching
      userPage: null, // the page number user want to view
      dateinput: new Date(),
      minNum: null,
      maxNum: null,
      cardSelected: false,
      chosenIndex: 0,
    };
  },

  computed: {
    //calculate the total number of pages
    totalActivityNum() {
      return this.actInformation.length;
    },
    //calculate the current page number
    numOfPages() {
      const temp = Math.floor(this.totalActivityNum / 12);
      const res = this.totalActivityNum % 12;
      if (res === 0) {
        return temp;
      }
      return temp + 1;
    },
    //return the activity on a certain page
    shownActivity() {
      const res = [];
      if (this.page * 12 > this.actInformation.length) {
        for (let i = (this.page - 1) * 12; i < this.actInformation.length; i += 1) {
          res.push(this.actInformation[i]);
        }
      } else {
        for (let i = 0; i < 12; i += 1) {
          res.push(this.actInformation[(this.page - 1) * 12 + i]);
        }
      }
      return res;
    },
  },

  watch: {
    //the page number changes when user change the page number by clicking the page change button
    userPage() {
      this.page = Number(this.userPage);
    },
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
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //ask for activity infromation
    askInfo() {
      axios.post(
        'http://localhost:4000/getActivityInfo',
        { today: this.dateToString(new Date())},
        )
        .then((response) => {
          this.actInformation = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //search for the activity on a certain day
    searchByDate() {
      axios.post(
        'http://localhost:4000/searchByDate',
        { dateinput: this.dateToString(this.dateinput) },
      )
        .then((response) => {
          this.actInformation = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //change the Date() form to string form
    dateToString(date) {
      const year = date.getFullYear();
      let month = (date.getMonth() + 1).toString();
      let day = (date.getDate()).toString();
      let dateTime = '';
      if (month.length === 1) {
        month = '0' + month;
      }
      if (day.length === 1) {
        day = '0' + day;
      }
      dateTime = year + '-' + month + '-' + day;
      return dateTime;
    },

    //show detail information about the card the user are interested in
    showDetail(index) {
      this.chosenIndex = index;
      const act = Object(this.shownActivity[this.chosenIndex]);
      axios.post(
        'http://localhost:4000/activityMember',
        { activity_id: act.activity_id}
      ).then((response) => {
        console.log(response.data);
      }).catch((error) => {
        console.log(err);
      });
      this.cardSelected = true;
    },
     //sort the activity
    sortActivity() {
      axios.post('http://localhost:4000/MostRecent')
        .then((response) => {
          this.actInformation = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    printOut(a) {
      console.log(a);
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
  width: 350px;
  margin: 5px;
  border-style: solid; border-width: 0px 1px 0px 0px;
}

.showTable{
  width: 100%;
  border-style: solid; border-width: 1px 0px 1px 0px; border-color: black;
}

.actSquare{
  padding-left: 6%; padding-right: 6%; padding-top: 1%;

}


.pageList{
  position: fixed; bottom: 0%;
  width: 100%; height: 5%;
  background-color: white;
}

.cardOut{
  position:fixed; bottom:0%; top:0%; left:0%; right:0%;
  height:100%; width:100;
  background:rgba(0,0,0,0.2)
}

.detailCard{
  position:fixed; top:25%; bottom:25%; left:25%; right:25%;
  width:50%; height:50%;
  background-color: whitesmoke;
  border: solid; border-radius: 10px;
}
</style>
