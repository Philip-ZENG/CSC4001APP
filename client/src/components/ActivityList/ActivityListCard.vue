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
            <li>
              <button
                class="dropdown-item"
                type="button"
                href="http://localhost:8080/#/activityManagement"
              >
                Detail
              </button>
            </li>
            <li>
              <button class="dropdown-item" type="button" @click="toggleState">{{ action }}</button>
            </li>
            <li>
              <button class="dropdown-item" type="button" @click="deleteActivity">Delete</button>
            </li>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @description
 * This is an activity card component, used to display information of a specific component
 */
export default {
  /**
   * @var state
   * Has two value 'ACTIVE' and 'INACTIVE'
   * Used to notify whether the activity is posted or stored as drafts
   * @var action
   * Has two value 'Deactivate' and 'Activate'
   * Used to post an activity or pull back an activity
   */
  props: {
    activity_id: { type: Number, required: true },
    title: { type: String, required: true },
    time: { type: String, required: true },
    quota_left: { type: Number, required: true },
    state: { type: String, default: 'ACTIVE' },
    action: { type: String, default: 'Deactivate' },
  },
  data() {
    return {
      curState: this.state,
      curAction: this.action,
    };
  },
  methods: {
    toggleState() {
      if (this.curState === 'ACTIVE') {
        this.curState = 'INACTIVE';
        this.curAction = 'Activate';
      } else {
        this.curState = 'ACTIVE';
        this.curAction = 'Deactivate';
      }
    },
    deleteActivity() {
      // Delet activity
    },
  },
};
</script>

<style scoped></style>
