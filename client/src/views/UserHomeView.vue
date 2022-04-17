<template>
  <div class="home">
    <table class="showTable" cellspacing="0" cellpadding="0" align="center">
      <tr height="100px">
        <!--first row-->
        <td id="swip" align="center" colspan="3" border="1">
          <span>{{ dateinput }}</span>
        </td>
        <td id="create" align="center">
          <button id="createNew" @click="switchTo('/activityCreation')">+ Post a new event</button>
        </td>
      </tr>
      <tr height="50">
        <!--second row-->
        <td align="center" width="30%">
          <!--search bar-->
          <select v-model="searchType">
            <option value="type">type</option>
            <option value="title">title</option>
          </select>
          <input v-model="userInput" />
          <button @click="searchActivity">search</button>
        </td>
        <td align="center" width="20%">
          <!--order bar-->
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
          <!--date bar-->
          <div class="rightSep">
            <datepicker v-model="dateinput"></datepicker>
            <button @click="searchByDate">search</button>
          </div>
        </td>
        <td align="center" width="30%">
          <!--number bar-->
          <span>number of members: </span>
          <input
            v-model="minNum"
            style="width: 25px; height: 25px"
            onkeyup="this.value=this.value.replace(/[^\d]/g,'')"
          />
          <span> - </span>
          <input
            v-model="maxNum"
            style="width: 25px; height: 25px"
            onkeyup="this.value=this.value.replace(/[^\d]/g,'')"
          />
        </td>
      </tr>
    </table>

    <div class="actSquare">
      <dl>
        <dt v-for="(act, index) in shownActivity" :key="index">
          <activity-card :time="act.time" :title="act.title" :description="act.description">
          </activity-card>
        </dt>
      </dl>
      <div class="pageList">
        <button @click="page -= 1" :disabled="page == 1">previous</button>
        <span style="margin-left: 10px; margin-right: 10px"> {{ page }} </span>
        <button @click="page += 1" :disabled="page == numOfPages">next</button>
        <span> go to: </span>
        <select v-model="userPage">
          <option v-for="p in numOfPages" :key="p" :disabled="p == page">{{ p }}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
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
      searchOrder: '',
      searchType: 'type',
      actInformation: [], // store the activity information
      page: 1, // store the page number
      userInput: '', // store the user's input for searching
      userPage: null, // the page number user want to view
      dateinput: new Date(),
      minNum: null,
      maxNum: null,
    };
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
    userPage() {
      this.page = Number(this.userPage);
    },
  },

  methods: {
    switchTo(path) {
      this.$router.replace(path);
    },

    searchActivity() {
      axios
        .post('http://localhost:4000/searchActivity', {
          searchType: this.searchType,
          userInput: this.userInput,
        })
        .then((response) => {
          this.actInformation = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    askInfo() {
      axios
        .post('http://localhost:4000/getActivityInfo')
        .then((response) => {
          this.actInformation = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    searchByDate() {
      axios
        .post('http://localhost:4000/searchByDate', {
          dateinput: this.dateToString(this.dateinput),
        })
        .then((response) => {
          this.actInformation = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    dateToString(date) {
      const year = date.getFullYear();
      let month = (date.getMonth() + 1).toString();
      let day = date.getDate().toString();
      let dateTime = '';
      if (month.length === 1) {
        // eslint-disable-next-line
        month = '0' + month;
      }
      if (day.length === 1) {
        // eslint-disable-next-line
        day = '0' + day;
      }
      // eslint-disable-next-line
      dateTime = year + '-' + month + '-' + day;
      return dateTime;
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
  border-style: solid;
  border-width: 0px 1px 1px 0px;
}

#create {
  border-style: solid;
  border-width: 0px 0px 1px 0px;
}

#createNew {
  text-align: center;
  background-color: white;
  border-radius: 10px;
  height: 45px;
  width: 200px;
}

.rightSep {
  width: 350px;
  margin: 5px;
  border-style: solid;
  border-width: 0px 1px 0px 0px;
}

.showTable {
  width: 100%;
  border-style: solid;
  border-width: 1px 0px 1px 0px;
  border-color: black;
}

.actSquare {
  padding-left: 4%;
  padding-right: 4%;
  padding-top: 1%;
  align-content: center;
}

.pageList {
  position: fixed;
  bottom: 0%;
  width: 100%;
  height: 5%;
  background-color: white;
}
</style>
