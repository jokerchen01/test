<template>
  <section class="container">
    <section>
      <div class="title_box">
        <div>
          <div class="title">上月下发责令改正通知书</div>
          <div class="title_box_inner">
            <span class="first_num">{{ obj.Issue || 83 }}</span>
            <span class="title_unit">份</span>
          </div>
        </div>

        <div>
          <div class="title">上月督促整改火灾隐患</div>
          <div class="title_box_inner">
            <span class="second_num">{{ obj.toUrge ||230}}</span>
            <span class="title_unit">处</span>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="gdp_row">
        <div class="left_title">本年度消防督查趋势</div>
      </div>
      <div ref="echarts" class="echart_dom"></div>
    </section>
  </section>
</template>

<script>
import * as echarts from "echarts";
import { fireControlTrend } from "@/views/echarts";
export default {
  name: "fireControlDialog",
  data() {
    return {
      obj: {}, // 指标数据
      yfList: [], //月份,X轴
      jdjcdwList: [], //监督检查
      dczghzyhList: [], //督察整改
      xfzlgztzsList: [], //下发责令
    };
  },
  props: ["indicatorsInfo"],
  created() {
    /* this.getNorm(); */
  },
  mounted() {
    this.getFireControlTrend();
  },
  methods: {
    getNorm() {
      this.$api.statePup
        .getTiZhen({ deptid: "552af89dec967967d3593985eccb55e8" })
        .then((res) => {
          this.obj.Issue = res.filter((v) => {
            if (v.indicator_id == "ff1b536b6e2d414393e23a8bb54809d3") {
              return v;
            }
          })[0].value;
          this.obj.toUrge = res.filter((v) => {
            if (v.indicator_id == "036051e3781f4c2dad61c829e73a03df") {
              return v;
            }
          })[0].value;
          this.$forceUpdate();
        });
    },
    getFireControlTrend() {
      this.yfList = [];
      this.jdjcdwList = [];
      this.dczghzyhList = [];
      this.xfzlgztzsList = [];
     
    /*     const data = res.data; */
    
        for (let i = 0; i < 5; i++) {
          //整理月份等信息到同一个list
          /* this.yfList.push(data[i].yf);
          this.jdjcdwList.push(data[i].jdjcdw);
          this.dczghzyhList.push(data[i].dczghzyh);
          this.xfzlgztzsList.push(data[i].xfzlgztzs);
          //赋值给echarts
          fireControlTrend.xAxis[0].data = this.yfList;
          fireControlTrend.series[0].data = this.jdjcdwList;
          fireControlTrend.series[1].data = this.xfzlgztzsList;
          fireControlTrend.series[2].data = this.dczghzyhList; */
          //生成echarts
          const mychart = echarts.init(this.$refs.echarts);
          mychart.clear();
          mychart.setOption(fireControlTrend, true);
        }
    
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
      margin-right: 66px;
      margin-bottom: 24px;
    }

    .title_box_inner {
      margin-left: 32px;

      .first_num {
        font-size: 36px;
        font-family: DINPRO;
        font-weight: bold;
        color: #ffffff;
        background: linear-gradient(183deg, #ffffff 0%, #65adc9 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .second_num {
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

  .gdp_row {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left_title {
      width: 340px;
      height: 30px;
      background: url(~@/assets/images/common/tab_title_bg_11.png) no-repeat;
      background-size: 100%;
      font-size: 24px;
      font-family: PangMenZhengDao;
      color: #ffffff;
      padding-left: 24px;
      line-height: 30px;
    }
  }

  .echart_dom {
    width: 100%;
    height: 234px;
    margin: 34px 0;
  }
}
</style>
