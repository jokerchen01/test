<template>
  <section>
    <section class="status_box">
      <div
        class="item"
        :class="{ active: currentStatus == 1 }"
        @click="changeStatus(1)"
      >
        数字城管
      </div>
      <div
        class="item"
        :class="{ active: currentStatus == 2 }"
        @click="changeStatus(2)"
      >
        油烟监测
      </div>

      <!-- <div class="sum_text special_text" @click="ShowAnalysis" v-if="currentStatus == 2">
        指标关联分析
      </div> -->
    </section>
    <UsrbanManage v-if="currentStatus == 1" />
    <newlampblack v-if="currentStatus == 2" />
    <Analysis ref="Analysis" ></Analysis>
  </section>
</template>

<script>
import Analysis from "./Analysis.vue";
import UsrbanManage from "./UsrbanManage.vue";
import newlampblack from "./newlampblack.vue";
export default {
  components: {
    UsrbanManage,
    newlampblack,
    Analysis,
  },
  data() {
    return {
      currentStatus: 1,
    };
  },
  methods: {
    changeStatus(v) {
      this.currentStatus = v;
    },
    ShowAnalysis(){
       this.$store.commit("getShowRight", false);
      setTimeout(() => {
        this.$refs.Analysis.isShowAnalysis = true;
      }, 300);
    }
  },
};
</script>

<style lang="scss" scoped>
.status_box {
  display: flex;
  margin-bottom: 15px;
  .item {
    background: url(~@/assets/images/common/un_active.png) no-repeat;
    background-size: 100% 100%;
  
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
    cursor: pointer;
    margin-right: 22px;
    padding: 9px 20px 10px 19px;
  }
  .active {
    background: url(~@/assets/images/common/tab_active.png) no-repeat;
    background-size: 100% 100%;
  }
}
.special_text {
  position: relative;
  top: 0;
  left: 500px;
  width: 150px;
  text-align: center;
  height: 40px;
  line-height: 35px;
  background: url("~@/assets/images/air1979.png") no-repeat;
  cursor: pointer;
}
</style>
