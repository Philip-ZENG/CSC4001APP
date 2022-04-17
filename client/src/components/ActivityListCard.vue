<template>
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
          <button
            class="btn btn-success dropdown-toggle save_button"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
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
</template>

<script>
export default {
  name: 'ActivityListCard',
  props: {
    title: { type: String },
    time: { type: String },
    quota_left: { type: Number },
    state: { type: String, default: 'ACTIVE' },
    action: { type: String, default: 'Deactivate' },
  },
  data() {
    return {
      curState: this.state,
      curAction: this.action,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
