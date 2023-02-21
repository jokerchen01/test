<!-- 现场核查 -->
<template>
  <div class="step_container">
    <div class="title">2-现场核查</div>
    <div>
      <div>流程开始时间:</div>
      <div>{{ item.list_create_time }}</div>
    </div>
    <div>
      <div>流程期限（天）:</div>
      <div>{{ item.list_his_qx }}</div>
    </div>
    <div>
      <div>流程结束时间:</div>
      <div>{{ item.list_finish_time }}</div>
    </div>
    <div>
      <div>街道责任人:</div>
      <div>{{ item.contacts }}</div>
    </div>
    <div>
      <div>责任人电话:</div>
      <div>{{ item.phone_daily }}</div>
    </div>
    <div>
      <div>街道核查人:</div>
      <div>{{ item.list_hc_contacts }}</div>
    </div>
    <div>
      <div>核查人电话:</div>
      <div>{{ item.list_hc_phone }}</div>
    </div>
    <div>
      <div>第三方公司人员:</div>
      <div>{{ item.list_three_contacts }}</div>
    </div>
    <div>
      <div>第三方电话:</div>
      <div>{{ item.list_three_phone }}</div>
    </div>
    <div>
      <div>现场照片:</div>
      <div>
        <img
          :src="url"
          width="288"
          height="195"
          class="poiner"
          v-for="url in item.files"
          :key="url"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "caseCheck",
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped>
@import './scss/common.scss';
</style>
