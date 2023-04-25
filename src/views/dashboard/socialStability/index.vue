<template>
  <section class="container">
    <div v-show="isShowIndex">
      <section>
        <div class="title_box">
          <div class="mr-60 f-cursor" @click="changeStatus(1)">
            <div class="title" :class="{ active: currentStatus == 1 }">
              本年度涉稳风险隐患
            </div>
          </div>
          <div @click="changeStatus(2)" class="f-cursor">
            <div class="title" :class="{ active: currentStatus == 2 }">
              本年度群体性事件
            </div>
          </div>
        </div>
      </section>
      <section>
        <div class="gdp_row">
          <div class="left_title">{{ lableTexts[0] }}</div>
        </div>
        <div ref="NDSWFXYH" class="echart_dom"></div>
      </section>
      <div class="line"></div>
   <!--    <el-select
        v-model="monthTime"
        placeholder="请选择"
        style="margin-bottom: 30px"
      >
        <el-option
          v-for="v in list"
          :key="v.value"
          :label="v.value"
          :value="v.value"
        >
        </el-option>
      </el-select> -->
      <section class="risk">
        <div class="risk_item" v-show="currentStatus == 1">
          <div
            class="f-cursor"
            v-for="(v, i) in riskLable"
            :key="i"
            @click="showTablePop('danger', 'none', v.k, v)"
          >
            <div class="title">
              {{ v.name }}
            </div>
            <span class="title_num_right" :class="{ titleActive: i == 3 }">{{
              v.value
            }}</span>
          </div>
        </div>
        <div class="risk_item" v-show="currentStatus == 2">
          <div
            class="f-cursor"
            v-for="(v, i) in groupLable"
            :key="i"
            @click="showTablePop('group', 'none', v.k, v)"
          >
            <div class="title">
              {{ v.name }}
            </div>
            <span class="title_num_right" :class="{ titleActive: i == 3 }">{{
              v.value
            }}</span>
          </div>
        </div>
      </section>
      <section v-if="currentStatus == 1">
        <section class="margin">
          <div class="gdp_row">
            <div class="left_title">{{ lableTexts[1] }}</div>
          </div>
          <div ref="SWFXYHJDFBQK" class="echart_dom"></div>
        </section>
        <section>
          <div class="gdp_row">
            <div class="left_title">{{ lableTexts[2] }}</div>
          </div>
          <div ref="SWFXYHLYFBQK" class="echart_dom"></div>
        </section>
      </section>
      <section v-if="currentStatus == 2">
        <section class="margin">
          <div class="gdp_row">
            <div class="left_title">{{ lableTexts[1] }}</div>
          </div>
          <div ref="SWFXYHJDFBQK_two" class="echart_dom"></div>
        </section>
        <section>
          <div class="gdp_row">
            <div class="left_title">{{ lableTexts[2] }}</div>
          </div>
          <div ref="SWFXYHLYFBQK_two" class="echart_dom"></div>
        </section>
      </section>
    </div>
    <section>
      <div>
        <social-table-pop ref="tablePop" :type="type" @goBack="goBack" />
      </div>
    </section>
  </section>
</template>

<script>
import { NDSWFXYH, SWFXYHJDFBQK, SWFXYHLYFBQK } from "../../echarts";
import SocialTablePop from "../socialStability/SocialTablePop.vue";
export default {
  components: {
    SocialTablePop,
  },
  data() {
    return {
      isShowIndex: true,
      obj: {}, // 指标数据
      currentStatus: 1,
      monthTime: "2022-01", // 选择时间
      list: [
        { value: "2022-01" },
        { value: "2022-02" },
        { value: "2022-03" },
        { value: "2022-04" },
        { value: "2022-05" },
        { value: "2022-06" },
        { value: "2022-07" },
      ], // 下拉选择数据
      riskLable: [
        { name: "涉稳风险隐患", value: 0, k: 0 }, //key来区分参数
        { name: "已化解", value: 0, k: 1 },
        { name: "调处中", value: 0, k: 1 },
        { name: "高风险", value: 0, k: 2 },
      ],
      groupLable: [
        { name: "群体性事件", value: 0, k: 0 },
        { name: "一般群体性事件", value: 0, k: 1 },
        { name: "大规模群体性事件", value: 0, k: 1 },
        { name: "重点关注", value: 0, k: 2 },
      ],

      type: "danger", //风险/群体事件group
      showStatus: "1",
      valueList: [],
      nameList: [],
      valueList2: [],
      nameList2: [],
    };
  },
  computed: {
    lableTexts() {
      let arr = [];
      if (this.currentStatus == 1) {
        arr = [
          "年度涉稳风险隐患",
          "涉稳风险隐患街道分布情况",
          "涉稳风险隐患领域分布情况",
        ];
      } else if (this.currentStatus == 2) {
        arr = [
          "年度群体性事件",
          "群体性事件街道分布情况",
          "群体性事件领域分布情况",
        ];
      }
      return arr;
    },
    /*  riskLable_state() {
      return this.riskLable[0].value != 0;
    },
    groupLable_state() {
      return this.groupLable[0].value != 0;
    }, */
  },
  watch: {
    currentStatus: {
      handler(newVal) {
        if (newVal == 1) {
          this.getseleList(6);
        } else {
          this.getseleList(1);
        }
        this.getNdswfxyh();
      },
      immediate: true,
    },
    monthTime: {
      handler(newVal) {
        if (newVal) {
          this.getMonthData();
          this.getRiskData();
        }
      },
      /* immediate: true, */
    },
  },
  created() {
    this.initData();
  },
  mounted() {
    this.getRiskData();
  },
  methods: {
    changeStatus(v) {
      this.currentStatus = v;
      this.nameList = [];
      this.nameList2 = [];
      this.valueList = [];
      this.valueList2 = [];

      this.getRiskData();
    },
    initData() {},
    getMonthData() {
      const time = this.$moment(this.monthTime).format("YYYYMMDD");
    },
    getseleList(type) {
      /*  this.$api.statePup.getQjxlxzq({ queryType: type }).then((res) => {
        this.list = res.data;
        this.monthTime = res.data[0].value;
      }); */
    },
    getRiskData() {
      /* let self = this;
      const time = this.$moment(this.monthTime).format("YYYYMMDD");
      let json = {
        dateCode: [time],
      };
      let obj = {
        FXJD: "IDX_XYHJ",
        FXLX: "IDX_XYHL",
        QTJD: "IDX_TXSJ",
        QTLX: "IDX_XSJL",
      };
      let street = "",
        group = "";
      if (this.currentStatus == 1) {
        street = obj.FXJD;
        group = obj.FXLX;
      } else {
        street = obj.QTJD;
        group = obj.QTLX;
      } */
      //涉稳风险隐患街道分布情况
      /* 
        (this.valueList = []), (this.nameList = []);
        res.data.data[time].data.forEach((v) => {
          this.nameList.push(v.jdmc);
          this.valueList.push(v.value || 0);
        });
        SWFXYHJDFBQK.xAxis.data = this.nameList;
        SWFXYHJDFBQK.series[0].data = this.valueList; */
      if (this.currentStatus == 1) {
        let echartDom = this.$echarts.init(this.$refs.SWFXYHJDFBQK);
         echartDom.clear();
        echartDom.setOption(SWFXYHJDFBQK, true);
        echartDom.on("click", function (data) {
          self.$refs.tablePop.street = data.name;
        //  self.showTablePop("danger");
        });
      } else {
        let echartDom = this.$echarts.init(this.$refs.SWFXYHJDFBQK_two);
         echartDom.clear();
        echartDom.setOption(SWFXYHJDFBQK, true);
        echartDom.on("click", function (data) {
          self.$refs.tablePop.street = data.name;
          //self.showTablePop("group");
        });
      }

      //涉稳风险隐患领域分布情况

      /*  (this.valueList = []), (this.nameList = []);
        res.data.data[time].data.forEach((v) => {
          this.nameList2.push(v.lbly);
          this.valueList2.push(v.value || 0);
        });
        SWFXYHLYFBQK.xAxis.data = this.nameList2;
        SWFXYHLYFBQK.series[0].data = this.valueList2; */

      if (this.currentStatus == 1) {
        let echartDom = this.$echarts.init(this.$refs.SWFXYHLYFBQK);
        echartDom.clear();
        echartDom.setOption(SWFXYHLYFBQK, true);
        echartDom.on("click", function (data) {
          self.$refs.tablePop.categoryField = data.name;
         // self.showTablePop("danger");
        });
      } else {
        let echartDom = this.$echarts.init(this.$refs.SWFXYHLYFBQK_two);
        echartDom.clear();
        echartDom.setOption(SWFXYHLYFBQK, true);
        echartDom.on("click", function (data) {
          self.$refs.tablePop.categoryField = data.name;
         // self.showTablePop("group");
        });
      }
    },
    //年度涉稳风险隐患
    getNdswfxyh() {
      let self = this;
      if (this.currentStatus == 1) {
        /*  let nameList = [],
            arr = [],
            brr = [];
          res.data.forEach((v) => {
            nameList.push(v.name);
            arr.push(v.value2);
            brr.push(v.value1);
          });
          NDSWFXYH.xAxis.data = nameList;
          NDSWFXYH.series[0].data = arr;
          NDSWFXYH.series[0].name = "上一年涉稳风险隐患数量";
          NDSWFXYH.series[1].name = "本年涉稳风险隐患数量";
          NDSWFXYH.series[1].data = brr; */
        this.$nextTick(() => {
          let myChartNDSWFXYH = this.$echarts.init(this.$refs.NDSWFXYH);
          myChartNDSWFXYH.setOption(NDSWFXYH);
          myChartNDSWFXYH.on("click", function (data) {
            let time = data.name.slice(0, 1);
            self.$refs.tablePop.queryDate = self
              .$moment(time)
              .format("2022-MM");
           // self.showTablePop("danger", "isCharts");
          });
        });
      } else {
        /*   let nameList = [],
            arr = [],
            brr = [];
          res.data.forEach((v) => {
            nameList.push(v.name);
            arr.push(v.value2);
            brr.push(v.value1);
          });
          NDSWFXYH.xAxis.data = nameList;
          NDSWFXYH.series[0].data = arr;
          NDSWFXYH.series[0].name = "上一年群体性事件数量";
          NDSWFXYH.series[1].name = "本年群体性事件数量";
          NDSWFXYH.series[1].data = brr; */
        this.$nextTick(() => {
          let myChartNDSWFXYH = this.$echarts.init(this.$refs.NDSWFXYH);
          myChartNDSWFXYH.setOption(NDSWFXYH);
          myChartNDSWFXYH.on("click", function (data) {
            let time = data.name.slice(0, 1);
            self.$refs.tablePop.queryDate = self
              .$moment(time)
              .format("2022-MM");
            //self.showTablePop("group", "isCharts");
          });
        });
      }
    },
    //表格弹窗
    /* showTablePop(type, isCharts, key, item) {
      this.showStatus = 2;
      this.isShowIndex = false;
      this.type = type;
      this.$refs.tablePop.showTablePop = true;
      if (isCharts != "isCharts") {
        this.$refs.tablePop.queryDate = this.monthTime;
      }
      if (item) {
        if (key == 1) {
          this.$refs.tablePop.mediation = item.name;
        } else if (key == 2) {
          this.$refs.tablePop.riskLevel = item.name.slice(0, 1);
        }
      }
      if (item) {
        if (key == 1) {
          this.$refs.tablePop.eventScale = item.name;
        } else if (key == 2) {
          this.$refs.tablePop.attentionLevel = item.name;
        }
      }
    }, */
    goBack() {
      this.showStatus = 1;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  .margin {
    margin: 20px 0;
  }
  .title_box,
  .risk_item {
    display: flex;
    height: 70px;
    .mr-60 {
      margin-right: 70px;
    }
    .title,
    .active {
      background: url(~@/assets/images/common/un_active.png) no-repeat;

      background-size: 100% 100%;
      font-size: 16px;
      color: rgba(255, 255, 255, 1);
      line-height: 25px;
      padding: 0 20px;
      margin-bottom: 16px;
    }
    .active {
      background: url(~@/assets/images/common/tab_active.png) no-repeat;
      background-size: 100% 100%;
    }
    .title_num_right,
    .titleActive {
      font-size: 26px;
      font-family: DINPRO;
      font-weight: bold;
      color: #ffffff;
      background: linear-gradient(183deg, #ffffff 0%, #96f5ed 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .titleActive {
      background: linear-gradient(183deg, #ffffff 0%, #f58d8d 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  .risk_item {
    justify-content: space-between;
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
      font-size: 16px;
      font-family: PangMenZhengDao;
      color: #ffffff;
      padding-left: 24px;
      line-height: 30px;
    }
  }

  .echart_dom {
    width: 100%;
    height: 200px;
  }
  .no_data {
    position: relative;
    top: 50%;
    left: 37%;
    transform: translate(0, 0);
  }
  .f-cursor {
    cursor: pointer;
  }
}
.line {
  margin: 20px 0;
  width: 100%;
  height: 1px;
  opacity: 0.5;
  background: #fff;
}
</style>
