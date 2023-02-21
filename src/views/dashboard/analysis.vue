<template>
  <section class="analysis-container">
    <div class="analysis-title">事件分析</div>
<!--    <div class="analysis-content">-->
<!--      &lt;!&ndash;事件趋势&ndash;&gt;-->
<!--      <eventQsPage title="事件趋势" mode="line"></eventQsPage>-->
<!--      &lt;!&ndash;事件增速&ndash;&gt;-->
<!--      <eventQsPage title="事件增速" mode="bar"></eventQsPage>-->
<!--    </div>-->
    <section class="analytical">
      <streetevent v-ehl-interval:initData/>
      <coordination v-ehl-interval:initData/>
      <commissionBureau v-ehl-interval:initData/>
      <heightArea v-ehl-interval:initData/>
    </section>
  </section>
</template>

<script>
import streetevent from "./components/streetevent.vue"; // 街道事件分析
import heightArea from "./components/heightArea.vue"; // 高发区域
import commissionBureau from "./components/commissionBureau.vue"; // 委办局事件分析
import coordination from "./components/coordination.vue"; // 协同数量

export default {
  components: {
    streetevent,
    heightArea,
    commissionBureau,
    coordination,

  },
};
</script>

<style lang="scss" scoped>
.analysis-container {
  width: 420px;
  margin-right: 20px;
  background: rgba(10,39,51,0.9);
  border-radius: 4px;
  .analysis-title {
    width: 461px;
    height: 29px;
    margin: 15px 0 0 10px;
    background: url("~@/assets/images/event_fx_title_bg.png") no-repeat;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding-left: 45px;

    font-size: 20px;
    font-family: YouSheBiaoTiHei;
    color: #FFFFFF;
  }
  .analysis-content{
    padding: 18px 0 0 10px;
  }
}
@keyframes arrowInfine {
  0%{
    transform: translateY(-5px);
  }
  100%{
    transform: translateY(5px);
  }

}
</style>
