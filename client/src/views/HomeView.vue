<template>
  <div class="home">
    <table class="showTable" cellspacing="0" cellpadding="0" align="center">
      <tr height="100">
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
        <td align="center" width="30%">search bar</td>
        <td align="center" width="20%">
          <div class="rightSep">
            <form>
              <select name="orders">
              <option value="Most Recent">Most Recent</option>
              <option value="Almost Full" selected="selected">Almost Full</option>
              </select>
              <input type="submit" value="order the activity">
            </form>
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
      <div class="actCard">activity</div>
      <div class="actCard">activity</div>
      <div class="actCard">activity</div>
      <div class="actCard">activity</div>
      <div class="actCard">activity</div>
      <div class="actCard">activity</div>
      <div class="actCard">activity</div>
      <div class="actCard">activity</div>
      <div class="actCard">activity</div>
      <div class="actCard">activity</div>
      <div class="actCard">activity</div>
      <div class="actCard">activity</div>
      <div class="pageList">
        <div class="pageIndex">1</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import Datepicker from 'vuejs3-datepicker';

export default {
  components: {
    Swiper,
    SwiperSlide,
    Datepicker,
  },

  data() {
    return {
      swiperOption: {
        autoplay: 3000,
        pagination: '.swiper-pagination',
        autoplayDisableOnInteraction: true,
        loop: true,
      },
      swipers: [],
    };
  },

  methods: {
    switchTo(path) {
      this.$router.replace(path);
    },
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
  text-align:center;
  background-color: white;
  border-radius: 10px;
  height:45px;
  width: 200px;

}

.rightSep{
  margin: 5px;
  border-style: solid;
  border-width: 0px 1px 0px 0px;
}

.showTable{
  width: 100%;
  border-style: solid;
  border-width: 1px 0px 1px 0px;
  border-color: black;
}

.actSquare{
  padding-left: 4%;
  padding-right: 4%;
  padding-top: 1%;
  align-content: center;
}

.actCard{
  float: left;
  width: 275px;
  height: 125px;
  border-radius: 10px;
  align-content: center;
  border-style:solid;
  border-width:2px;
  margin: 15px;
  box-shadow: 5px 2px 6px#000;
}

.pageList{
  position: fixed;
  width: 60%;
  bottom: 10px;
  left: 20%;
  right: 20%
}

.pageIndex{
  width: 30px;
  height: 30px;
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  text-align: center;
  color: slateblue;
}

</style>
