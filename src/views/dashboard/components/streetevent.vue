<template>
  <section class="streetevent">
    <div class="title">街道事件分析</div>
    <div ref="eventAnalysis" class="echart_dom"></div>
  </section>
</template>

<script>
import { eventAnalysis } from "../../echarts";
export default {
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      let nameList = [],
        num1List = [],
        num2List = [],
        num3List = [];
      let arr = [
      /*   { street: "未归属街道名称", num1: 45, num3: 0, num2: 0 }, */
        { street: "沙河源街道", num1: 7, num3: 0, num2: 0 },
        { street: "荷花池街道", num1: 7, num3: 0, num2: 0 },
        { street: "金泉街道", num1: 7, num3: 0, num2: 0 },
        { street: "西安路街道", num1: 7, num3: 0, num2: 0 },
        { street: "茶店子街道", num1: 6, num3: 0, num2: 0 },
        { street: "营门口街道", num1: 5, num3: 0, num2: 0 },
        { street: "抚琴街道", num1: 4, num3: 0, num2: 0 },
        { street: "天回镇街道", num1: 3, num3: 0, num2: 0 },
        { street: "凤凰山街道", num1: 3, num3: 0, num2: 0 },
        { street: "五块石街道", num1: 2, num3: 0, num2: 0 },
        { street: "驷马桥街道", num1: 1, num3: 0, num2: 0 },
        { street: "九里堤街道", num1: 1, num3: 0, num2: 0 },
      ];
    
        arr.forEach((v) => {
          if (v.street.includes("街道")) {
            v.street = v.street.replace("街道", "");
            nameList.push(v.street);
          }
          num1List.push(v.num1);
          num2List.push(v.num2);
          num3List.push(v.num3);
        });
        eventAnalysis.xAxis[0].data = nameList;
        eventAnalysis.series[0].data = num1List;
        eventAnalysis.series[1].data = num3List;
        eventAnalysis.series[2].data = num2List;
        this.$nextTick(() => {
          let echartsObj = this.$echarts.init(this.$refs.eventAnalysis);
          echartsObj.setOption(eventAnalysis);
        });
     
    },
  },
};
</script>

<style lang="scss" scoped>
.streetevent {
  width: 100%;
  height: 200px;
  box-sizing: border-box;
  padding: 20px 0 0 10px;
  .title {
    width: 451px;
    height: 31px;

    background: url("~@/assets/images/two_title_8.png") no-repeat;
    background-size: 100% 100%;

    box-sizing: border-box;
    padding-left: 38px;

    font-family: ShiShangZhongHeiJianTi;
    color: #ffffff;

    display: flex;
    align-items: center;
  }
  .echart_dom {
    width: 400px;
    height: 155px;
  }
}
</style>
