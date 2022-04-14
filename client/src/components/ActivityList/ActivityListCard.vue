<template>
  <div class="card mt-2">
    <div class="row">
      <div class="col">
        <h5>{{ title }}</h5>
      </div>
      <div class="col">
        <h5>{{ time }}</h5>
      </div>
      <div class="col">
        <h5>{{ quota_left }}</h5>
      </div>
      <div class="col">
        <button
          class="btn btn-primary"
          type="button"
          @click="toActivityManagement"
        >
          Detail
        </button>
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
  },
  inject: ['userId'],
  methods: {
    /**
     * @description
     * Redirect to the activity management page
     */
    toActivityManagement() {
      // eslint-disable-next-line
      const targetPath = '/activityManagement/user_id=' + this.userId + '/activity_id=' + this.activity_id;
      this.$router.push(targetPath);
    },
  },
};
</script>

<style scoped></style>
