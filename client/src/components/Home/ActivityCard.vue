<template>
  <div class="actCard">
    <div class = "firstRow">
      <div class="profileOuter"><img class="profile" alt=" " src="../../../public/male.png"/></div>
      <div class="titlePlace"> {{title}}</div>
      <div class="datePlace"> {{time}}</div>
    </div>
    <div class="secondRow">
      {{description}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActivityCard',
  props: {
    title: { type: String },
    time: { type: String },
    description: { type: String },
  },
  data() {
    return {
    };
  },
};
</script>

<style scoped>
.actCard{
  float: left;
  width: 275px; height: 125px;
  border-radius: 10px; border-style:solid; border-width:2px;
  margin: 15px;
  box-shadow: 2px 1px 3px#000;
}

.firstRow{
  height: 40px; width: 275px;
}

.secondRow{
  height: 50px; width: 275px;
  overflow: hidden;
}

.profileOuter{
  float: left;
  border-radius: 50%;
  width: 40px; height: 40px;
}

.profile{
  width: 38px; height: 38px;
  border-radius: 50%;
}

.titlePlace{
  float: left;
  height: 20px;
  align-content: center;
  margin-top: 10px; margin-bottom: 10px;
}

.datePlace{
  float: left;
  height: 20px;
  align-content: center;
  margin-top: 10px; margin-bottom: 10px;
}
</style>
