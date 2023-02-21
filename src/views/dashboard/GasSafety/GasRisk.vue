<template>
  <section>
    <section class="risk" v-if="status == 0">
      <div class="pop_title">
        <div class="title" @click="goPopOne">燃气管道老化更新改造</div>
        <div class="title" @click="goPopTwo">风险排查整治台账</div>
        <div class="title" @click="goPopThree">燃气老旧院落改造明细</div>
      </div>
      <div class="risk_title">风险管线情况</div>
      <div class="risk_content">
        <div class="left">
          <div class="left_one">金牛区管道总长度</div>
          <div class="left_two">
            <span>1494.4</span>
            <span>km</span>
          </div>
          <div class="left_three">超30年以上管道长度</div>
          <div class="left_four">
            <span>30</span>
            <span>km</span>
          </div>
        </div>
        <div class="middle">
          <div class="echarts_dom circular" ref="pie_one"></div>
        </div>
        <div class="right">
          <div class="echarts_dom circular" ref="pie_two"></div>
        </div>
      </div>

      <div class="occupy">占压管线情况</div>
      <div class="occupy_content">
        <div class="occupy_left">
          <div class="occupy_title">金牛区占压管线处数</div>
          <div class="num">20</div>
        </div>
        <div class="occupy_right">
          <div class="occupy_title">金牛区占压管线点位数</div>
          <div class="num">10</div>
        </div>
      </div>
      <div class="risk_title">各街道占压管线分布</div>
      <div class="occupy_echarts">
        <div class="echarts_dom" ref="gas_Trend"></div>
      </div>
    </section>
    <section>
      <GasPipelinePop
        :status="status"
        @changeStatus="changeStatus"
      ></GasPipelinePop>
    </section>
    <section>
      <GasRiskPop :status="status" @changeStatus="changeStatus"></GasRiskPop>
    </section>
    <section>
      <GasOldYardPop
        :status="status"
        @changeStatus="changeStatus"
      ></GasOldYardPop>
    </section>
  </section>
</template>

<script>
import GasPipelinePop from "./GasPipelinePop";
import GasRiskPop from "./GasRiskPop";
import GasOldYardPop from "./GasOldYardPop";
import { gasPieOne, gasPieTwo, gasTrend } from "@/views/echarts";

export default {
  name: "GasRisk",
  components: { GasPipelinePop, GasRiskPop, GasOldYardPop },
  data() {
    return {
      status: 0, //123分别表示三个弹窗
      obj: {}, //指标
    };
  },
  watch: {
    status: {
      handler(newValue) {
        if (newValue == 0) {
          this.getPieOne();
          this.getPieTwo();
          this.reqGasTrend();
        }
      },
    },
  },
  mounted() {
    this.getPieOne();
    this.getPieTwo();
    this.reqGasTrend();
    /*  this.reqData(); */
  },
  methods: {
    goPopOne() {
      this.status = 1;
    },
    goPopTwo() {
      this.status = 2;
    },
    goPopThree() {
      this.status = 3;
    },
    changeStatus(status) {
      this.status = status;
    },
    getPieOne() {
      /* gasPieOne.series[0].data = res;
      gasPieOne.series[1].data = res; */
      this.$nextTick(() => {
        let echartsObj = this.$echarts.init(this.$refs.pie_one);
        echartsObj.setOption(gasPieOne);
      });
    },
    getPieTwo() {
      /*   gasPieTwo.series[0].data = res;
      gasPieTwo.series[1].data = res; */
      this.$nextTick(() => {
        let echartsObj = this.$echarts.init(this.$refs.pie_two);
        echartsObj.setOption(gasPieTwo);
      });
    },
    reqGasTrend() {
      /* let nameList = [];
      let valueList1 = [];
      let valueList2 = [];
      res.forEach((v) => {
        nameList.push(v.ssjb1);
        valueList1.push(v.cs || 0);
        valueList2.push(v.dws || 0);
      });
      gasTrend.xAxis[0].data = nameList;
      gasTrend.series[0].data = valueList1;
      gasTrend.series[1].data = valueList2; */
      this.$nextTick(() => {
        let echartsObj = this.$echarts.init(this.$refs.gas_Trend);
        echartsObj.setOption(gasTrend);
      });
    },
    async reqData() {
      let res1 = await this.$api.eventpivot.getTiZheng({
        indicatorId: "df48f0d4bd714d5092c64aa3da3df239",
      });
      let res2 = await this.$api.eventpivot.getTiZheng({
        indicatorId: "98efe6b7f2074f1886b1931e0923168d",
      });
      let res3 = await this.$api.eventpivot.getTiZheng({
        indicatorId: "1b59ca6f982e4c87ae733349fbbd147b",
      });
      let res4 = await this.$api.eventpivot.getTiZheng({
        indicatorId: "c0af4134ce354e29a139f3ce4284ce56",
      });

      this.$set(this.obj, `num1`, res1[0].value);
      this.$set(this.obj, `num2`, res2[0].value.slice(0, 2));

      this.$set(this.obj, `num3`, res3[0].value);
      this.$set(this.obj, `num4`, res4[0].value);
    },
  },
};
</script>

<style lang="scss" scoped>
.risk {
  color: #fff;
  .pop_title {
    height: 24px;
    display: flex;
    justify-content: space-around;
    margin-left: 12px;
    margin-bottom: 30px;
    .title {
      background: url(~@/assets/images/rqaq.png) no-repeat;
      background-size: 100%;
      line-height: 26px;
      cursor: pointer;
      margin-right: 20px;
      width: 180px;
      height: 26px;
      text-align: center;
    }
  }
  .risk_title {
    width: 340px;
    height: 20px;
    line-height: 20px;
    background: url(~@/assets/images/tab_title_bg.d8000399.png) no-repeat;
    background-size: 100%;
    font-size: 16px;
    padding: 0 0 0 15px;
    color: white;
  }
  .risk_content {
    display: flex;
    height: 100px;
    margin-top: 15px;
    margin-bottom: 50px;
    .left {
      width: 320px;
      .left_one {
        margin-bottom: 20px;
        font-size: 12px;
        background: url(~@/assets/images/下载.png) no-repeat;
        background-size: 35%;
        padding-left: 12px;
      }
      .left_two {
        margin-bottom: 10px;
        font-size: 16px;
        :nth-child(1) {
          font-size: 20px;
          font-family: DINPRO;
          font-weight: bold;
          color: #ffffff;
          line-height: 16px;
          letter-spacing: 1px;
          background: -webkit-gradient(
            linear,
            left top,
            left bottom,
            from(#ffffff),
            color-stop(130%, #7fb4c7)
          );
          background: linear-gradient(180deg, #ffffff 0%, #7fb4c7 130%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-right: 5px;
        }
      }
      .left_three {
        margin-bottom: 20px;
        margin-top: 15px;
        font-size: 12px;
        background: url(~@/assets/images/下载.png) no-repeat;
        background-size: 35%;
        padding-left: 12px;
      }
      .left_four {
        :nth-child(1) {
          font-size: 20px;
          font-family: DINPRO;
          font-weight: bold;
          color: #ffffff;
          line-height: 16px;
          letter-spacing: 1px;
          background: -webkit-gradient(
            linear,
            left top,
            left bottom,
            from(#ffffff),
            color-stop(130%, #7fb4c7)
          );
          background: linear-gradient(0deg, #ffffff 0%, #ed9090 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-right: 5px;
        }
      }
    }
    .middle {
      width: 280px;
      .echarts_dom {
        height: 140px;
      }
    }
    .right {
      width: 280px;
      .echarts_dom {
        height: 140px;
      }
    }
  }
  .occupy {
    width: 340px;
    height: 20px;
    line-height: 20px;
    background: url(~@/assets/images/tab_title_bg.d8000399.png) no-repeat;
    background-size: 100%;
    font-size: 16px;
    padding: 0 0 0 15px;
    color: white;
    margin-top: 10px;
  }
  .occupy_content {
    margin-top: 22px;
    height: 80px;
    width: 540px;
    display: flex;
    justify-content: space-between;
    .occupy_title {
      font-size: 12px;
      margin-bottom: 20px;
      background: url(~@/assets/images/下载.png) no-repeat;
      background-size: 100%;
      padding-left: 12px;
    }
    .num {
      font-size: 20px;
      font-family: DINPRO;
      font-weight: bold;
      color: #ffffff;
      line-height: 16px;
      letter-spacing: 1px;
      background: -webkit-gradient(
        linear,
        left top,
        left bottom,
        from(#ffffff),
        color-stop(130%, #7fb4c7)
      );
      background: linear-gradient(180deg, #ffffff 0%, #7fb4c7 130%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-top: 10px;
    }
  }
  .occupy_echarts {
    height: 250px;
    width: 100%;
    .echarts_dom {
      width: 100%;
      height: 100%;
    }
  }
}
.circular {
  background-image: url(~@/assets/images/bubble.4dc016b4.png);
  background-repeat: no-repeat;
 background-size: 37px 37px;
    background-position: 20px 51px;
  position: relative;
  z-index: 999;
}
</style>