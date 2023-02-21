<template>
  <section class="ommissionBureau">
    <div class="title">委办局事件分析</div>
    <div ref="commissionBureau" class="echart_dom"></div>
  </section>
</template>

<script>
import { commissionBureau } from "../../echarts";
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
      let res = [
        { street: "金牛区综合执法局", num1: 16, num3: 0, num2: null },
        { street: "金牛环投集团", num1: 3, num3: 0, num2: null },
        {
          street: "金牛国有资产投资经营集团有限公司",
          num1: 3,
          num3: 0,
          num2: null,
        },
        { street: "金牛区住建和交通局", num1: 1, num3: 0, num2: null },
        { street: "金牛区人民政府办公室", num1: 1, num3: 0, num2: 0 },
        { street: "金牛区卫健局", num1: 1, num3: 0, num2: null },
      ];
      res.forEach((v) => {
        nameList.push(v.street);
        num1List.push(v.num1 || 0);
        num2List.push(v.num2 || 0);
        num3List.push(v.num3 || 0);
      });
      let arr = nameList.map((v) => {
        if (v.includes("金牛区")) {
          v = v.replace("金牛区", "区");
          return v;
        } else {
          return v;
        }
      });
      commissionBureau.xAxis[0].data = arr;
      commissionBureau.series[0].data = num1List;
      commissionBureau.series[1].data = num2List;
      commissionBureau.series[2].data = num3List;

      this.$nextTick(() => {
        let echartsObj = this.$echarts.init(this.$refs.commissionBureau);
        echartsObj.setOption(commissionBureau);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.ommissionBureau {
  width: 100%;
  height: 200px;
  box-sizing: border-box;
  margin-top: 16px;
  padding-left: 10px;
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
