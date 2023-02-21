<!-- 案件生成 -->
<template>
  <div class="step_container">
    <div class="title">1-案件生成</div>
    <div>
      <div>案件开始时间</div>
      <div>{{ item.create_time }}</div>
    </div>
    <div>
      <div>企业名称</div>
      <div>{{ item.company_name }}</div>
    </div>
    <div>
      <div>区域</div>
      <div>{{ item.areaname }}</div>
    </div>
    <div>
      <div>企业联系人</div>
      <div>{{ item.contacts }}</div>
    </div>
    <div>
      <div>地址</div>
      <div>{{ item.address }}</div>
    </div>
    <div>
      <div>街道负责人</div>
      <div>{{ item.contacts_daily }}</div>
    </div>
    <div>
      <div>责任人电话</div>
      <div>{{ item.phone_daily }}</div>
    </div>
    <!-- <div>
      <div>生成原因</div>
      <div>{{ item.phone_daily }}</div>
    </div>
    <div>
      <div>超标日期浓度</div>
      <div>{{ item.phone_daily }}</div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "caseGeneration",
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
