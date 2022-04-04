<template>
  <div class="home">
    <div class="outer">
      <div>
        <div class="head"><h1>post a new event</h1></div>
        <div class="headB" align="center"><button id="postAct">Post</button></div>
      </div>
      <div style="width:100%"> <!-- type line -->
        <div style="width:20%; float:left"><h3>Activity Type</h3></div>
        <div style="width:80%; float:left; align:center">
          <button class="singleSelect"></button><span>Sports</span>
          <button class="singleSelect"></button><span>Meals</span>
          <button class="singleSelect"></button><span>Travel</span>
          <button class="singleSelect"></button><span>Shop online</span>
          <button class="singleSelect"></button><span>Carpool</span>
        </div>
      </div>
      <div style="width:100%"> <!-- title line -->
        <div style="width:20%; float:left"><h3>Activity Title</h3></div>
        <div style="widht:80%; float:left align:center">
          <span>
          <input v-model="title" placeholder="Type in your activity title here">{{title}}
          </span>
        </div>
      </div>
      <div style="width:100%">
        <div style="width:100px; float:left"><h3>No. of Members</h3></div>
        <div style="width:300px; float:left">
          <button class="singleSelect"></button><span>Two</span>
          <button class="singleSelect"></button><span>Three</span>
          <button class="singleSelect"></button><span>Four</span>
          <button class="singleSelect"></button>
          <span>Other number <input v-model="number"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: null,
      number: null,
    };
  },
};
</script>

<style>
.outer{
  position: fixed; left: 10%; width: 80%; height: 100%;
}

.head{
  float: left; width: 80%; height: 100px; margin: 10px 0px 10px 0px;
}

.headB{
  float: left;
  width: 20%;
  height: 100px;
  margin: 10px 0px 10px 0px;
}

.singleSelect{
  height: 20px; width: 20px; margin: 0px 5px 0px 5px;
}
</style>
