<template>
  <section class="eventAnaly">
    <titleNav :title="'事件分析'" />
    <section class="container">
      <div class="left_box">
        <lableNav :width="'470px'" :title="'当日事件统计'" />
        <div class="DRSJ_bg">
          <div class="DRSJ_icon"></div>
          <div class="event_box">
            <div class="value">100</div>
            <div class="lable">当日事件总数</div>
          </div>
          <div>
            <div class="yesterday">较昨日</div>
            <div class="compare">
              <div v-if="obj.flag" class="rise"></div>
              <div v-else class="slip"></div>
              <div class="text">20<span class="unit">%</span></div>
            </div>
          </div>
          <div class="ic_line"></div>
          <div>
            <div class="value urgenColor">5</div>
            <div class="lable">紧急事件数</div>
          </div>
        </div>
      </div>

      <div class="right_box">
        <div class="top_nav">
          <lableNav :width="'446px'" :title="lableTitle" />
          <div class="btnFlex">
            <div
              class="left_triangle"
              @click="SJQSClick()"
              title="事件趋势变化"
              v-show="isShowCurrentEvent"
            ></div>
            <div
              class="right_triangle"
              @click="DRSJClick()"
              title="当日事件总数"
              v-show="!isShowCurrentEvent"
            ></div>
          </div>
        </div>
        <div
          ref="lineChart"
          style="width: 360px; height: 170px"
          v-show="!isShowCurrentEvent"
        ></div>
        <div
          ref="DRSJZS"
          style="width: 360px; height: 170px"
          class="cicular"
          v-show="isShowCurrentEvent"
        ></div>
      </div>
    </section>
  </section>
</template>

<script>
import titleNav from "./title.vue";
import lableNav from "./lable.vue";
import { SJBHQS, DRSJZS } from "../echarts";
export default {
  components: {
    titleNav,
    lableNav,
  },
  data() {
    return {
      obj: {}, // 指标数据
      lableTitle: "事件趋势变化",
      isShowCurrentEvent: false,
      list1: [
        2588, 2194, 1986, 3584, 3909, 4064, 4113, 4229, 2167, 2330, 4064, 4264,
        3808, 3204, 2206, 2028, 2611, 2873, 3069, 3416, 3650, 4025, 2062, 2244,
        3592, 3546, 3718, 2861, 1489, 1484,
      ],
      list2: [
        1853, 1646, 1662, 3468, 4151, 4059, 4203, 4189, 1706, 1755, 4052, 4320,
        3530, 3431, 1701, 1604, 1797, 2970, 3111, 3420, 3786, 4166, 1624, 1668,
        3535, 3608, 3350, 2884, 2377, 3292,
      ],
    };
  },
  created() {
    this.initData();
  },
  mounted() {
    this.getEchart();
  },
  methods: {
    initData() {},
    getEchart() {
      this.initEmergency();
    },
    initEmergency(data) {
      SJBHQS.series[0].data=this.list1
      SJBHQS.series[1].data=this.list2
      let myChartLine = this.$echarts.init(this.$refs.lineChart);
      myChartLine.setOption(SJBHQS);
    },
    SJQSClick() {
      this.lableTitle = "事件趋势变化";
      this.isShowCurrentEvent = false;
    },
    DRSJClick() {
      this.isShowCurrentEvent = true;
      this.lableTitle = "当日事件总数";

      let myChartPie = this.$echarts.init(this.$refs.DRSJZS);
      myChartPie.setOption(DRSJZS);
    },
  },
};
</script>

<style lang="scss" scoped>
.eventAnaly {
  background: url(~@/assets/images/sjfx_box.png) no-repeat;
  background-size: 100% 100%;
  height: 260px;
  width: 100%;
  padding-left: 9px;
  padding-top: 14px;
  padding-right: 13px;
  .container {
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    .left_box {
      width: 320px;
      .DRSJ_bg {
        width: 100%;
        height: 138px;
        background: url(~@/assets/images/DRSJ_bg.png) no-repeat;
        background-size: 100% 100%;
        margin-top: 5px;
        display: flex;
        align-items: center;
        padding-left: 10px;
        padding-right: 9px;
        .DRSJ_icon {
          width: 40px;
          height: 40px;
          background: url(~@/assets/images/DRSJ_icon.png) no-repeat;
          background-size: 100% 100%;
        }
        .event_box {
          margin-right: 13px;
        }
        .value {
          height: 28px;
          line-height: 28px;
          margin-bottom: 23px;
          font-size: 20px;
          font-family: Akzidenz-Grotesk BQ Condensed;
          font-weight: bold;
          color: #ffffff;
          text-align: center;
        }
        .urgenColor {
          color: #df7575;
        }
        .lable {
          height: 18px;
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #bcdbe8;
        }
        .yesterday {
          height: 14px;
          line-height: 14px;
          margin-bottom: 14px;
          font-size: 16px;
          font-family: ShiShangZhongHeiJianTi;
          font-weight: 400;
          color: #bcdbe8;
          text-align: right;
          margin-top: 22px;
        }
        .compare {
          display: flex;
          .rise,
          .slip {
            width: 18px;
            height: 24px;
            background-size: 100% 100%;
            margin-right: 12px;
          }
          .rise {
            background: url(~@/assets/images/rise.png) no-repeat;
          }
          .slip {
            background: url(~@/assets/images/slip.png) no-repeat;
          }
        }
        .text {
          height: 24px;
          font-size: 20px;
          font-family: Akzidenz-Grotesk BQ Condensed;
          font-weight: 400;
          color: #ffffff;
          .unit {
            font-size: 16px;
          }
        }
        .ic_line {
          background: url(~@/assets/images/ic_line.png) no-repeat;
          background-size: 100% 100%;
          width: 1px;
          height: 68px;
          margin-left: 22px;
          margin-right: 22px;
        }
      }
    }
    .right_box {
      width: 360px;
      .top_nav {
        display: flex;
        align-items: center;
        padding-right: 30px;
        .btnFlex {
          display: flex;
          .left_triangle,
          .right_triangle {
            cursor: pointer;
            width: 20px;
            height: 6px;
            background: #40728a;
            border-radius: 3px;
            background-size: 100% 100%;
            width: 28px;
            height: 28px;
          }
          .left_triangle {
            background: url(~@/assets/images/left_icon.png) no-repeat;
            // margin-right: 30px;
          }
          .right_triangle {
            background: url(~@/assets/images/right_icon.png) no-repeat;
          }
        }
      }
      .cicular {
        background-image: url(~@/assets/images/SJZS_box.png);
        background-repeat: no-repeat;
        background-size: 151px 151px;
        background-position: 13px 12px;
      }
    }
  }
}
</style>