<template>
  <div class="btn-group">
    <button
      type="button"
      class="btn btn-primary dropdown-toggle"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      {{ memberName }}
    </button>
    <ul class="dropdown-menu">
      <li>
        <button class="dropdown-item" @click="deleteMember">Delete</button>
      </li>
      <li>
        <button class="dropdown-item" @click="modifyManager">
          Set As Manager
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    memberName: { type: String, required: true },
    memberId: { type: Number, required: true },
  },
  inject: [
    // Data
    'userId',
    'userRole',
    // Methods
    'deleteMember',
    'changeManager',
  ],
  computed: {
    /**
     * @description
     * Only show the dropdown(delete/change manager option) when the member iterm is not the user
     * And when the user is activity manager
     */
    showDropdown() {
      return this.memberId === this.userId && this.userRole === 'MANAGER';
    },
  },
  methods: {
    /**
     * @description
     * Give the users' Manager authority/identity to others
     */
    modifyManager() {
      // eslint-disable-next-line
      if (confirm('Are you sure that you want to transfer your Manager identity to others?')) {
        this.changeManager(this.memberId);
      }
    },
    /**
     * @description
     * Delete a member from an activity with provided activity_id
     */
    deleteMember() {
      // eslint-disable-next-line
      if (confirm('Are you sure that you want to delete the member from this activity?')) {
        this.deleteMember(this.memberId);
      }
    },
  },
};
</script>
