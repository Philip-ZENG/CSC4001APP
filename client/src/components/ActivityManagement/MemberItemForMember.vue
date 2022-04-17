<template>
  <button
    type="button"
    class="btn btn-primary"
  >
    {{ memberName }}
  </button>
</template>

<script>
export default {
  props: {
    memberName: { type: String, required: true },
  },
};
</script>
