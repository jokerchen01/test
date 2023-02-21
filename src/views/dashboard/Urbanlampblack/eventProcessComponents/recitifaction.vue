<!-- 现场整改 -->
<template>
  <div class="step_container">
    <div class="title">3-现场整改</div>
    <div>
      <div>流程开始时间:</div>
      <div>{{ item.list_create_time }}</div>
    </div>
    <div>
      <div>流程限制（天）:</div>
      <div>{{ item.list_his_qx }}</div>
    </div>
    <div>
      <div>流程结束时间:</div>
      <div>{{ item.list_finish_time }}</div>
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
  name: "caseRecitification",
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
