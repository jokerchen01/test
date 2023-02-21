<template>
  <section class="container">
    <section>
      <div class="title_box">
        <div class="mr171">
          <div class="title">昨日道路交通事故数</div>
          <div class="title_box_inner">
            <span class="title_num">35</span>
          </div>
        </div>
        <div class="mr171">
          <div class="title">其中伤人事故数</div>
          <div class="title_box_inner">
            <span class="title_num">8</span>
          </div>
        </div>
        <div>
          <div class="title">其中亡人事故数</div>
          <div class="title_box_inner">
            <span class="title_num death_num">0</span>
          </div>
        </div>
      </div>
      <div class="title_box">
        <div class="mr171">
          <div class="title">本月道路交通事故数</div>
          <div class="title_box_inner">
            <span class="title_num">576</span>
          </div>
        </div>
        <div class="mr171">
          <div class="title">其中伤人事故数</div>
          <div class="title_box_inner">
            <span class="title_num">135</span>
          </div>
        </div>
        <div>
          <div class="title">其中亡人事故数</div>
          <div class="title_box_inner">
            <span class="title_num death_num">0</span>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="gdp_row display_flex">
        <div class="left_title">道路安全事故统计</div>
        <div class="display_flex tableButtons">
          <div
            :class="[isMonth == true ? 'selected' : 'unselected', 'button']"
            @click="changeTime"
          >
            本月事件分析
          </div>
          <div
            :class="[isMonth == false ? 'selected' : 'unselected', 'button']"
            @click="changeTime"
          >
            月度统计分析
          </div>
        </div>
      </div>
      <div ref="echarts" class="echart_dom"></div>
    </section>

    <section>
      <div class="gdp_row">
        <div class="left_title">
          本年度亡人事故情况一览：{{ tableList.length }}件
        </div>
      </div>

      <el-table
        class="eventTable"
        :row-class-name="tableRowClass"
        :data="tableList"
        style="width: 100%"
      >
        <el-table-column
          prop="date"
          label="事件时间"
          :show-overflow-tooltip="true"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="发生位置"
          :show-overflow-tooltip="true"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="content"
          label="事故原因"
          :show-overflow-tooltip="true"
          align="center"
        >
        </el-table-column>
        <!-- <el-table-column
          prop="eventType"
          label="事故分类"
          :show-overflow-tooltip="true"
          align="center"
        >
        </el-table-column> -->
        <el-table-column
          prop="value"
          label="死亡人数"
          :show-overflow-tooltip="true"
          align="center"
        >
        </el-table-column>
        <!-- <el-table-column
          prop="eventDescc"
          label="事故概要"
          :show-overflow-tooltip="true"
          align="center"
        >
        </el-table-column> -->
      </el-table>
    </section>
  </section>
</template>

<script>
import * as echarts from "echarts";
import { roadSafety } from "@/views/echarts";
export default {
  props: ["indicatorsInfo"],
  name: "roadSafety",
  data() {
    return {
      obj: {}, // 指标数据
      options: [],
      value: "",
      tableList: [],
      totalCount: 0, // 总数
      isMonth: true,
      deathNumList: [], //亡人事故数
      injuredNumList: [], //受伤事故数
      accidentNumList: [], //事故数
      xAxisList: [], //X轴
    };
  },
  created() {
    this.getNorm();
  },
  mounted() {
    this.getJtsgs();
  },
  watch: {
    //监听是否为本月或全年
    isMonth: {
      handler(newVal, oldVal) {
        var year = new Date().getFullYear();
        var month = new Date().getMonth() + 1;
        var obj = { queryType: "", queryDate: "" };
        if (newVal == false) {
          obj.queryType = 2;
          obj.queryDate = year;
        } else {
          obj.queryType = 1;
          obj.queryDate = year + "-" + month;
        }
        this.getJtsgs(obj);
      },
      immediate: true,
    },
  },
  methods: {
    changeTime() {
      this.isMonth = !this.isMonth;
    },
    tableRowClass() {
      return "tablerowclass";
    },
    getNorm() {
      this.$api.statePup
        .getTiZhen({ deptid: "22958dc6719622e60f8be80f3ab2f6c2" })
        .then((res) => {
          this.obj.monthDie = res.filter((v) => {
            if (v.indicator_id == "b34a84204dec46cea6249327590a4f65") {
              return v;
            }
          })[0].value;
          this.obj.monthInjury = res.filter((v) => {
            if (v.indicator_id == "6bb9620c931d4e7691473a8477320eca") {
              return v;
            }
          })[0].value;
          this.obj.monthTraffic = res.filter((v) => {
            if (v.indicator_id == "2bf19fff5c72455daf99685fb01baddf") {
              return v;
            }
          })[0].value;
          this.obj.yesterdayTraffic = res.filter((v) => {
            if (v.indicator_id == "0e804ff6f01142efa6ee2c4f351c774e") {
              return v;
            }
          })[0].value;
          this.obj.yesterdayInjury = res.filter((v) => {
            if (v.indicator_id == "20601bdcc2014e428e71fbe675a32f35") {
              return v;
            }
          })[0].value;
          this.obj.yesterdayDie = res.filter((v) => {
            if (v.indicator_id == "0a655e99f7344edda8610a69e8b38b04") {
              return v;
            }
          })[0].value;
          this.$forceUpdate();
        });
      this.$api.statePup.getQtsjfb().then((res) => {
        this.tableList = res.data;
      });
    },
    getJtsgs(obj) {
      this.xAxisList = [];
      this.accidentNumList = [];
      this.deathNumList = [];
      this.injuredNumList = [];

      /* for (let index in arr) {
          this.xAxisList.push(arr[index].date);
          this.accidentNumList.push(arr[index].value1);
          this.deathNumList.push(arr[index].value2);
          this.injuredNumList.push(arr[index].value3);
        } */
      //重写echarts数据
      /* roadSafety.xAxis[0].data = this.xAxisList;
        roadSafety.series[0].data = this.accidentNumList;
        roadSafety.series[1].data = this.injuredNumList;
        roadSafety.series[2].data = this.deathNumList; */
      const mychart = echarts.init(this.$refs.echarts);
      mychart.clear();
      mychart.setOption(roadSafety, true);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  .title_box {
    display: flex;
    height: 110px;
    justify-content: flex-start;

    .title {
      background: url(~@/assets/images/common/title_background.png) no-repeat;
      background-size: 100%;
      font-size: 20px;
      color: rgba(255, 255, 255, 1);
      padding-left: 24px;
      line-height: 20px;
      //   margin-right: 66px;
      margin-bottom: 24px;
    }

    .mr171 {
      margin-right: 40px;
      width: 205px;
    }

    .title_box_inner {
      margin-left: 32px;

      .title_num {
        font-size: 36px;
        font-family: DINPRO;
        font-weight: bold;
        color: #ffffff;
        background: linear-gradient(183deg, #ffffff 0%, #65adc9 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .death_num {
        font-size: 36px;
        font-family: DINPRO;
        font-weight: bold;
        color: #ffffff;
        background: linear-gradient(183deg, #ffffff 0%, #f17d7d 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .title_unit {
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
        margin-left: 11px;
      }
    }

    .title_month {
      margin-right: 112px;
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffffff;
      margin-top: 18px;
    }

    .title_day {
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffffff;
      margin-top: 18px;
    }

    .up_icon {
      width: 12px;
      height: 15px;
      background: url("~@/assets/images/common/up_icon.png") no-repeat;
      background-size: 100%;
      margin-top: 19px;
      margin-right: 9px;
    }

    .down_icon {
      width: 12px;
      height: 15px;
      background: url("~@/assets/images/common/down_icon.png") no-repeat;
      background-size: 100%;
      margin-top: 19px;
      margin-right: 9px;
    }

    .detail_num {
      font-size: 28px;
      font-family: DINPRO;
      font-weight: bold;
      color: #ffffff;
      background: linear-gradient(183deg, #ffffff 0%, #65adc9 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-top: 10px;
    }
  }

  ::v-deep .eventTable {
    margin-top: 35px;
    height: 200px;
    overflow: auto;

    .tablerowclass {
      background: url("~@/assets/images/safe_pup.png") 100% 100%;
    }
  }

  .gdp_row {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left_title {
      width: 360px;
      height: 30px;
      background: url(~@/assets/images/common/tab_title_bg_11.png) no-repeat;
      background-size: 100%;
      font-size: 20px;
      font-family: PangMenZhengDao;
      color: #ffffff;
      padding-left: 24px;
      line-height: 30px;
    }
  }

  .selected {
    color: #ffffff;
    background: url(~@/assets/images/common/selected.png) no-repeat;
  }

  .unselected {
    color: #c0d3e5;
    background: url(~@/assets/images/common/unselected.png) no-repeat;
  }

  .tableButton {
    margin-left: 25px;
  }

  .button {
    cursor: pointer;
    width: 120px;

    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 500;
    line-height: 38px;
  }

  .display_flex {
    display: flex;
    justify-content: flex-start;
    // flex-wrap: nowrap;
  }
  .echart_dom {
    width: 100%;
    height: 234px;
    margin: 34px 0;
  }
}
</style>
