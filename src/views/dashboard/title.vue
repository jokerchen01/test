<template>
  <div class="safe_title">
    <div class="title_lable">{{ title }}</div>
  </div>
</template>

<script>
export default {
  props:['title']

};
</script>

<style lang="scss" scoped>
.safe_title {
  background: url(~@/assets/images/safe_title.png) no-repeat;
  background-size: 100% 100%;
  width: 938px;
  height: 29px;
  position: relative;
  .title_lable {
    padding-left: 45px;
    padding-top: 6px;
    font-size: 20px;
    font-family: YouSheBiaoTiHei;
    font-weight: 400;
    color: #ffffff;
  }
}
</style>
