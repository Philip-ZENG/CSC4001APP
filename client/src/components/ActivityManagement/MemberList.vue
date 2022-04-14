<template>
<section>
  <h1> Member List </h1>
  <!-- <component :is="memberItem"></component> -->
  <div v-if="!isManager">
    <member-item-for-member
      v-for="member in memberInfo[0]"
      :key="member.user_id"
      :memberName="member.user_name"
      :memberId="member.user_id"
    ></member-item-for-member>
  </div>
  <div v-else>
    <member-item-for-manager
      v-for="member in memberInfo[0]"
      :key="member.user_id"
      :memberName="member.user_name"
      :memberId="member.user_id"
    ></member-item-for-manager>
  </div>
</section>
</template>

<script>
import MemberItemForManager from './MemberItemForManager.vue';
import MemberItemForMember from './MemberItemForMember.vue';

export default {
  components: {
    'member-item-for-manager': MemberItemForManager,
    'member-item-for-member': MemberItemForMember,
  },
  inject: ['memberInfo', 'userRole'],
  computed: {
    isManager() {
      if (this.userRole[0] === 'MANAGER') {
        return true;
      }
      return false;
    },
  },
};
</script>
