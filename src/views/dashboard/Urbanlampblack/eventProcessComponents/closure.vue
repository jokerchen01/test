<!-- 结案 -->
<template>
  <div class="step_container">
    <div class="title">5-结案</div>
    <div>
      <div>案件创建时间:</div>
      <div>{{ item.create_time }}</div>
    </div>
    <div>
      <div>案件结束时间:</div>
      <div>{{ item.finish_time }}</div>
    </div>
    <div>
      <div>案件结果:</div>
      <div>{{ item.case_result }}</div>
    </div>
    <!-- <div>
      <div>结案备注:</div>
      <div>{{ item.company_name }}</div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "caseClosure",
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
