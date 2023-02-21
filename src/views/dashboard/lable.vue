<template>
  <div class="safe_title" :style="{ width: width }">
    <div class="title_lable">{{ title }}</div>
  </div>
</template>

<script>
export default {
  props: ["title", "width"],
};
</script>

<style lang="scss" scoped>
.safe_title {
  background: url(~@/assets/images/lable_title.png) no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 31px;
  line-height: 31px;
  position: relative;
  .title_lable {
    padding-left: 30px;
    height: 21px;
    font-size: 16px;
    font-family: ShiShangZhongHeiJianTi;
    font-weight: 400;
    color: #ffffff;
  }
}
</style>
