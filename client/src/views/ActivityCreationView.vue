<template>
  <table class="showTable" cellspacing="0" cellpadding="0" align="center">
    <tr height="125px" width="100%">
      <td width="50%" align="right"><h1>Post a new event</h1></td>
      <td width="50%" align="center"><button class="postButton" @click="postActivity">Post</button></td>
    </tr>
    <tr height="75px" width="100%"> <!--type line-->
      <td width="20%" align="left"><h3 style="margin-left:200px">Activity Type</h3></td>
      <td width="80%" align="left">
        <button class="singleSelect" @click="getType('Sports')"></button><span>Sports</span>
        <button class="singleSelect" @click="getType('Meals')"></button><span>Meals</span>
        <button class="singleSelect" @click="getType('Travel')"></button><span>Travel</span>
        <button class="singleSelect" @click="getType('Shop online')"></button><span>Shop online</span>
        <button class="singleSelect" @click="getType('Carpool')"></button><span>Carpool</span>
      </td>
    </tr>
    <tr height="75px" width="100%"> <!--title line-->
      <td width="20%" align="left"><h3 style="margin-left:200px">Activity Title</h3></td>
      <td width="80%" align="left">
        <input v-model="title" placeholder="Type in your activity title here" style="width:400px">
      </td>
    </tr>
    <tr height="75px" width="100%"> <!--time line-->
      <td width="20%" align="left"><h3 style="margin-left:200px">Activity Time</h3></td>
      <td width="80%" align="left">
        <datepicker v-model="dateinput"></datepicker>
        <select v-model="hour">
          <option v-for="(h,index) in hours" :key="index">{{h}}</option>
        </select>
        <span> : </span>
        <select v-model="min">
          <option v-for="(m,index) in mins" :key="index">{{m}}</option>
        </select>
      </td>
    </tr>
    <tr height="75px" width="100%"> <!--number line-->
      <td width="30%" align="left"><h3 style="margin-left:200px">No. of Members</h3></td>
      <td width="70%" align="left">
        <button class="singleSelect" @click="getNumber(2)"></button><span>Two</span>
        <button class="singleSelect" @click="getNumber(3)"></button><span>Three</span>
        <button class="singleSelect" @click="getNumber(4)"></button><span>Four</span>
        <button class="singleSelect" @click="otherNumSelected = true; number=null"></button>
        <span>Other number</span>
        <input v-model="otherNumber" style="width:25px; height:25px" onkeyup="this.value=this.value.replace(/[^\d]/g,'')"
          :disabled="!otherNumSelected">
      </td>
    </tr>
    <tr height="75px" width="100%"> <!--Description line-->
      <td width="20%" align="left"><h3 style="margin-left:200px">Activity Description</h3></td>
      <td width="80%" align="left">
        <input v-model="description" placeholder="Type in your activity description here ..." style="width:400px">
      </td>
    </tr>
    <tr height="75px" width="100%"> <!--location line-->
      <td width="20%" align="left"><h3 style="margin-left:200px">Activity Location</h3></td>
      <td width="80%" align="left">
        <select v-model="location" :disabled="!typeSelected" style="width:250px">
          <option disabled value="">Please select one type</option>
          <option v-for="(location,index) in locations" :key="index">{{location}}</option>
        </select>
      </td>
    </tr>
  </table>
</template>

<script>
import Datepicker from 'vuejs3-datepicker';

const axios = require('axios').default;

export default {
  components: {
    Datepicker,
  },

  data() {
    return {
      user_id: null,
      type: null,
      title: null,
      number: null,
      otherNumber: null,
      description: null,
      location: null,
      typeSelected: false,
      otherNumSelected: false,
      dateinput: new Date(),
      hour: '00',
      min: '00',
      hours: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12',
        '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
      mins: ['00', '15', '30', '45'],
    };
  },

  computed: {
    locations() {
      const locs = [
        ['Muse Basketball Court', 'Diligentia Basketball Court', 'University Sports Hall'],
        ['Diligentia Canteen', 'Muse Canteen', 'Pandora Canteen'],
        ['In Shenzhen', 'Out of Shenzhen'],
        ['Diligentia College', 'Muse College', 'Harmonia College', 'Shaw College'],
        ['Longgang District', 'Nanshan District', 'Baoan District'],
      ];
      if (this.type === 'Sports') return locs[0];
      if (this.type === 'Meals') return locs[1];
      if (this.type === 'Travel') return locs[2];
      if (this.type === 'Shop online') return locs[3];
      if (this.type === 'Carpool') return locs[4];
      return [];
    },

    finalNumber() {
      if (this.number === null) return this.otherNumber;
      else {
        if (this.otherNumber === null) return 2;
        return this.number;
      }
    },

    finalTime() {
      return this.dateToString(this.dateinput) + ' ' + this.hour + ':' + this.min;
    },

    bList1() {
      let bColor = ['white', 'white', 'white', 'white', 'white']
      if (this.type === 'Sports') bColor[0] = 'green';
      if (this.type === 'Meals') bColor[1] = 'green';
      if (this.type === 'Travel') bColor[2] = 'green';
      if (this.type === 'Shop online') bColor[3] = 'green';
      if (this.type === 'Carpool') bColor[4] = 'green';
      return bColor;
    },

    warningMessage() {
      if(this.type === null) return 'You need to give the activity type';
      if(this.title === null) return 'You need to give the activity title';
      if(this.location === null) return 'You need to give the activity location';
      return null;
    }
  },

  methods: {
    printOut() {
      console.log(this.finalTime);
    },

    getType(t) {
      this.typeSelected = true;
      this.type = t;
    },

    getNumber(num) {
      this.number = Number(num);
      this.otherNumSelected = false;
      this.otherNumber = null;
    },

    postActivity() {
      if(this.warningMessage != null){
        alert(this.warningMessage);
      }
      axios.post(
        'http://localhost:4000/postActivity',
        {
          title: this.title,
          time: this.finalTime,
          location: this.location,
          description: this.description,
          number: this.finalNumber,
          type: this.type,
        },
      )
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },

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
  },
};
</script>

<style>
.showTable{
  width: 100%;
  border-style: solid; border-width: 1px 0px 0px 0px; border-color: black;
}

.postButton{
  height: 40px; width: 100px;
  background-color: white;
  border-radius: 5px;
}

.singleSelect{
  height: 20px; width: 20px; margin: 0px 5px 0px 5px;
}
</style>
