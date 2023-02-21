<template>
  <section style="width: 100%; height: 100%">
    <div class="list_at_head">
      <div>
        <p>登记次数</p>
        <p>36.5万</p>
        <span class="timeEnd" style="font-size:12px">数据截至8.31</span>
      </div>
      <div>
        <p>登记次数环比</p>
        <p>--</p>
      </div>
      <div>
        <p>药品用量</p>
        <p>95.6万</p>
      </div>
      <div>
        <p>药品用量环比</p>
        <p>--</p>
      </div>
    </div>
    <div class="title" style="margin-top: 50px">
      <div class="h_1">药品人群性别分布趋势</div>
      <div class="l_1"></div>
    </div>
    <div
      ref="genderDistributeEcharts"
      class="echart_dom"
      style="margin-top: 12px; margin-bottom: 39px"
    ></div>
    <div class="title">
      <div class="h_2">药品人群年龄分布</div>
      <div class="l_2"></div>
    </div>
    <div ref="ageDistributeEcharts" class="echart_dom"></div>
  </section>
</template>

<script>
import {
  distributeOfMedicalGroup_age,
  distributeOfMedicalGroup_gender,
} from "@/views/echarts";
import echarts from "echarts";
export default {
  name: "medicinRegulation",
  data() {
    return {
      // yplt: "--", // 药品流通
      // jdjc2: "--", // 监督检查（户次）
      // jdcjhg2: "0", // 监督抽检合格（批次）
      // zb2: "--", // 占比
      // bhg2: "0", // 不合格（批次）
      // tsjb2: "--", // 投诉举报（件）
      // xsys2: "--", // 线索移送（件）
      djcs: "---", //登记次数
      djcshb: "---", // 登记次数环比
      ypyl: "---", // 药品用量
      ypylhb: "---", // 药品用量环比
    };
  },
  created() {
    this.initData();
  },
  mounted() {
    this.getJtsgs();
  },
  methods: {
    formatCTLData(num) {
      if (num > 999999) {
        return (num / 1000000).toFixed(1) + "百万";
      }
      if (num > 9999) {
        return (num / 10000).toFixed(1) + "万";
      }
      return num;
    },
    sortList(res) {
      return res
        .sort((a, b) => {
          const key = Number(a.age.slice(0, 2)) - Number(b.age.slice(0, 2));
          return key === 0 ? a.age.length - b.age.length : key;
        })
        .map((i) => i.value);
    },
    initData() {
      // 登记次数
      this.$api.eventpivot
        .getTiZheng({
          indicatorId: "a7db1e7c1f424ad7a2541a8515236636",
        })
        .then((res) => {
          this.djcs = res[0].value;
        })
        .catch((err) => {
          console.error(err);
        });
      // 登记次数环比
      this.$api.eventpivot
        .getTiZheng({
          indicatorId: "7e8727279d78472fad4143a8a4ea2557",
        })
        .then((res) => {
          this.djcshb = res[0].value;
        })
        .catch((err) => {
          console.error(err);
        });
      // 药品用量
      this.$api.eventpivot
        .getTiZheng({
          indicatorId: "d43b473c1c2c4b71a55aa77684c0a26f",
        })
        .then((res) => {
          this.ypyl = res[0].value;
        })
        .catch((err) => {
          console.error(err);
        });
      // 药品用量环比
      this.$api.eventpivot
        .getTiZheng({
          indicatorId: "8e4e78d8a8614d0ba42023a05768c6f7",
        })
        .then((res) => {
          this.ypylhb = res[0].value;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getJtsgs() {
      const mychart = echarts.init(this.$refs.genderDistributeEcharts);
      mychart.setOption(distributeOfMedicalGroup_gender);
      const mychart2 = echarts.init(this.$refs.ageDistributeEcharts);
      mychart2.setOption(distributeOfMedicalGroup_age);
    },
  },
};
</script>

<style lang="scss" scoped>
.list_at_head {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 80px;
  div {
    width: auto;
    height: 100%;
    & > p:nth-child(1) {
      box-sizing: border-box;
      padding-left: 16px;
      height: 20px;
      font-size: 20px;
      line-height: 20px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #ffffff;
      background: url(~@/assets/images/common/title_background.png) no-repeat;
      background-size: 100% 100%;
    }
    & > p:nth-child(2) {
      margin-top: 10px;
      padding-left: 16px;
      height: 50px;
      font-size: 26px;
      line-height: 50px;
      font-family: DIN;
      font-weight: bold;
      color: #ffffff;
      background: linear-gradient(183deg, #ffffff 0%, #65adc9 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}
.title {
  width: 100%;
  height: 26px;
  display: flex;
  justify-content: space-between;
  vertical-align: middle;
  align-items: center;
  .h_1 {
    width: 282px;
  }
  .h_2 {
    width: 225px;
  }
  div:nth-child(1) {
    padding-right: 16px;
    height: 26px;
    line-height: 26px;
    font-size: 20px;
    font-family: ShiShangZhongHeiJianTi;
    font-weight: 400;
    color: #ffffff;
  }
  .l_1 {
    width: calc(100% - 85px);
  }
  .l_2 {
    width: calc(100% - 85px);
  }
  div:nth-child(2) {
    height: 1px;
    background: white;
    // background: url(~@/assets/images/medicin_observe_title_line.png) no-repeat;
    background-size: 100% 100%;
  }
}
.echart_dom {
  width: 700px;
  height: 234px; //223
}
</style>
