<template>
  <section class="container">
    <section class="dialog_summarize">
      <div class="dialog_summarize_item">
        <p class="sum_text">空气质量达标天数</p>
        <div class="sum_bg"></div>
        <div class="sum_num">105</div>
      </div>
      <div class="dialog_summarize_item">
        <p class="sum_text">距离全年达标剩余天数</p>
        <div class="sum_bg"></div>
        <p class="sum_num">195</p>
      </div>
      <div class="dialog_summarize_item">
        <p class="sum_text">今年剩余天数</p>
        <div class="sum_bg"></div>
        <p class="sum_num ">210</p>
      </div>
     
     <!--  <div class="dialog_summarize_item">
        <p class="sum_text">目标剩余天数与实际天数占比</p>
        <div class="sum_bg"></div>
        <p class="sum_num">{{obj.num4}}<sub>%</sub></p>
      </div> -->
     <!--   <div class="dialog_summarize_item">
        <p class="sum_text special_text" @click="ShowAnalysis">指标关联分析</p>
      </div> -->
    </section>
    <section class="dialog_summarize2">
      <div class="dialog_summarize2_item" @click="showTable(target.AQI)">
        <p class="sum_text">AQI</p>
        <div class="sum_bg"></div>
        <div class="sum_num sum_AQI" :class="types.type == 'AQI' ? 'active' : ''">80</div>
        <div class="state">优</div>
        <div class="state_bg"></div>
      </div>
      
      <div class="dialog_summarize2_item" @click="showTable(target.PM25)">
        <p class="sum_text">PM<sub>2.5</sub></p>
        <div class="sum_bg"></div>
        <div class="sum_num" :class="types.type == 'PM2.5' ? 'active' : ''">61<div class="sub1">ug/m3</div> </div>
        
      </div>
      <div class="dialog_summarize2_item" @click="showTable(target.PM10)">
        <p class="sum_text">PM<sub>10</sub></p>
        <div class="sum_bg"></div>
        <div class="sum_num" :class="types.type == 'PM10' ? 'active' : ''">91<div class="sub1">ug/m3</div></div>
        
      </div>
      <div class="dialog_summarize2_item" @click="showTable(target.NO2)">
        <p class="sum_text">NO<sub>2</sub></p>
        <div class="sum_bg"></div>
        <div class="sum_num" :class="types.type == 'NO2' ? 'active' : ''">41  <div class="sub1">ug/m3</div></div>
       
      </div>
      <div class="dialog_summarize2_item" @click="showTable(target.O3)">
        <p class="sum_text ">O<sub>3</sub></p>
        <div class="sum_bg special" ></div>
        <el-tooltip placement="bottom-end">
        <div slot="content">数据获取时间:{{obj.time}}</div>
       <div class="sum_num" :class="types.type == 'O3' ? 'active' : ''">7 <div class="sub1">ug/m3</div> </div>
      </el-tooltip>
     
      </div>
      <div class="dialog_summarize2_item" @click="showTable(target.SO2)">
        <p class="sum_text">SO<sub>2</sub></p>
        <div class="sum_bg"></div>
        <div class="sum_num"  :class="types.type == 'SO2' ? 'active' : ''">3  <div class="sub1">ug/m3</div></div>
          
      </div>
      <div class="dialog_summarize2_item special_CO" @click="showTable(target.CO)">
        <p class="sum_text sum_text_CO">CO</p>
        <div class="sum_bg"></div>
        <div class="sum_num sum_CO"  :class="types.type == 'CO' ? 'active' : ''">0.8<div class="sub1">mg/m3</div></div>
          
      </div>
    </section>
    <section class="complaint">
     <transition name="Table">
      <div class="table_pop" v-show="isShowTable&&!isShowDetails">
      <el-table
        style="width: 100%"
        max-height="600"
        :data="tableList2"
      >
       
        </el-table-column>
        <el-table-column
          prop="event_name"
          label="告警事件"
           :show-overflow-tooltip="true"
          align="center"
          width="190"
        >
        </el-table-column>
        <el-table-column
          prop="event_time"
          label="告警时间"
          :show-overflow-tooltip="true"
          align="center"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="street"
          label="所属街道"
          :show-overflow-tooltip="true"
          align="center"
          width="180"
        >
        </el-table-column>
         <el-table-column
          prop="event_status"
          label="任务状态"
          :show-overflow-tooltip="true"
          align="center"
          width="180"
        >
        </el-table-column>
         <el-table-column
          label="查看详情"
          :show-overflow-tooltip="true"
          align="center"
          width="180"
        >
         <template slot-scope="scope">
            <span  class="reply" @click="ShowDetails(scope.row.uuid)">详情</span>
          </template>
        </el-table-column>
      </el-table>
       <el-pagination
        background
        layout="total,prev, pager, next"
        :total="total"
        :current-page="page"
        :page-size="pageSize"
        @current-change="handleTableChange"
      >
      </el-pagination>
      </div>
      </transition>
      </section>
      <section class="details">
      <DetailsPup v-if="isShowDetails" @showTable="showTable" ref="detail"></DetailsPup>
      </section>

      <Analysis ref="Analysis"></Analysis>

      <section v-show="!isShowDetails">
        <section class="echart_box" >
      <div class="left_echart">
        <div class="seven_shop" style="margin-bottom: 30px">空气质量天数</div>
        <div ref="airQuality" class="air_dom circular"></div>
      </div>
      <div class="right_echart">
        <div class="seven_top">
          <div class="seven_shop" style="margin-bottom: 30px">
            首要污染物天数
          </div>
          <div class="seven_unit">（更新时间：{{ newDate }}）</div>
        </div>
        <!-- <div ref="polluteDay" class="Day_dom"></div> -->
     
                
                <div class="table">
                  <div class="table_main">
                    <div
                      class="table-item"
                      v-for="(item, index) in list"
                      :key="index"
                    >
                      <el-tooltip placement="top">
                        <div slot="content">{{ item.name }}</div>
                        <div class="item-title">{{ item.name }}</div>
                      </el-tooltip>

                      <div class="item-value">
                        <div class="bg-line">
                          <p
                            class="value-line"
                            :style="{ width: item.roate + '%' }"
                          ></p>
                        </div>
                        <p class="value-num">{{ item.value }}</p>
                      </div>
                    </div>
    
                </div>
              </div>
      </div>
      </section>
    <el-table
      style="margin-top: 46px"
      :data="tableList"
      element-loading-background="rgba(75, 164, 210, 0)"
      :header-cell-style="{
        'text-align': 'center',
        background: 'rgba(75, 164, 210, 0)',
        color: 'rgba(255, 255, 255, 1)',
      }"
    >
      <el-table-column
        prop="qy"
        label="指标项"
        align="center"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="dmxz"
        align="center"
        label="数值"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="mb"
        label="同比"
        align="center"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="tb"
        label="目标"
        align="center"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
    </el-table>
    </section>
  </section>
</template>
<script>
import { airQuality, polluteDay } from "@/views/echarts";
import DetailsPup from "./detailsPup.vue";
/* import OpinionsPup from "./OpinionsPup.vue"; */
import Analysis from "./Analysis.vue";
export default {
  components: {
    DetailsPup,
    Analysis,
  },
  name: "waterPup",
  data() {
    return {
      obj: {}, // 体征指标
      tableList: [],
      tableList2: [],
      newDate: null,
      isShowTable: false, //查看表格
      isShowDetails: false, //查看详情
      isShowAnalysis: false, //查看详情
      types: {
        type: "",
        url: "",
      },
      page: 1,
      pageSize: 5,
      total: 0,
      target: {
        PM10: {
          type: "PM10",
          url: "gjsjlb",
        },
        PM25: {
          type: "PM2.5",
          url: "GJSJ/PM2.5",
        },
        O3: {
          type: "O3",
          url: "GJSJ/O3",
        },
        NO2: {
          type: "NO2",
          url: "GJSJ/NO2",
        },
        SO2: {
          type: "SO2",
          url: "GJSJ/SO2",
        },
        AQI: {
          type: "AQI",
          url: "GJSJ/AQI",
        },
        CO: {
          type: "CO",
          url: "GJSJ/CO",
        },
      },
      list: [],
    };
  },
  mounted() {
    this.newDate = this.$moment().format("YYYY.MM.DD ");
    this.initData();
  },
  methods: {
    initData() {
      

     
          let airData = [
            { value: 0, name: "优" },
            { value: 19, name: "良" },
            { value: 12, name: "轻度污染" },
            { value: 1, name: "严重污染" },
          ];
          let polluData = [
            {
              name: "O3",
              value: 0,
            },
            {
              name: "NO2",
              value: 0,
            },
            {
              name: "PM25",
              value: 15,
            },
            {
              name: "PM10",
              value: 1,
            },
            {
              name: "CO",
              value: 0,
            },
            {
              name: "SO2",
              value: 0,
            },
          ];
          
          airQuality.series[0].data = airData;
          airQuality.series[1].data = airData;
  
          if (this.list.length == 0) {
            polluData.forEach((v) => {
              let obj = { name: v.name, value: v.value };
              this.list.push(obj);
            });
          }

          let total = 0;

          this.list.forEach((item) => {
            total += Number.parseInt(item.value);
          });
          this.list.forEach((item) => {
            item.roate = ((Number.parseInt(item.value) / total) * 100).toFixed(
              1
            );
          });
      
       
          this.$nextTick(() => {
           /*  let polluteDayEchart = this.$echarts.init(this.$refs.polluteDay);
            polluteDayEchart.setOption(polluteDay); */
            let pieEcharts = this.$echarts.init(this.$refs.airQuality);
            pieEcharts.setOption(airQuality);
          });
        
     
        this.tableList = [
          {
            qy: "优良天数",
            dmxz: "19天",
            mb:  + "1天",
            tb:  "299天",
          },
          {
            qy: "PM2.5",
            dmxz: "68.7ug/m3",
            mb: "7.1%",
            tb:  "38ug/m3",
          },
        ];
     
     /*  this.$api.eventpivot
        .getTiZheng({ indicatorId: "7cd2ca1804da4233b93c269a6a468622" })
        .then((res) => {
          let time = this.$moment(Date(res[0].time_code)).format("YYYY-MM-DD");
          this.$set(this.obj, "time", time);
          let brr = JSON.parse(res[0].value);
          const arr = [
            { name: "O₃", key: "O3" },
            { name: "SO₂", key: "SO2" },
            { name: "NO₂", key: "NO2" },
            { name: "PM₁₀", key: "PM10" },
            { name: "PM₂.₅", key: "PM2" },
            { name: "CO", key: "CO" },
            { name: "AQI", key: "AQI" },
          ];
          brr.forEach((v) => {
            arr.some((k) => {
              if (v.name == k.name) {
                this.$set(this.obj, k.key, v.value);
              }
            });
          });
        }); */
      //四个指标
     /*  this.$api.eventpivot
        .getTiZheng({ indicatorId: "00b76ff3569c44719f5b4d6c3cdeffb9" })
        .then((res) => {
          this.$set(this.obj, "num1", res[0].value);
        });
      this.$api.eventpivot
        .getTiZheng({ indicatorId: "597ac9b0de1c498089333a3c6be954df" })
        .then((res) => {
          this.$set(this.obj, "num2", res[0].value);
        });
      this.$api.eventpivot
        .getTiZheng({ indicatorId: "b051ae2451994bd0b8c4d629559d4055" })
        .then((res) => {
          this.$set(this.obj, "num3", res[0].value);
        });
      this.$api.eventpivot
        .getTiZheng({ indicatorId: "4eb661c2dae34940a0ed26eceae70209" })
        .then((res) => {
          this.$set(this.obj, "num4", parseInt(res[0].value));
        }); */
    },
  /*   showTable(target) {
      if (this.isShowTable) {
        if (this.types.type == target.type) {
          this.isShowTable = false;
          this.types.type = "";
          this.tableList2 = [];
          this.total = 0;
          this.page = 1;
        } else {
          this.total = 0;
          this.page = 1;
          this.tableList2 = [];
          this.types.type = target.type;
          this.reqTargetList(target.url);
        }
      } else {
        this.total = 0;
        this.page = 1;
        this.isShowTable = true;
        this.types.type = target.type;
        this.types.url = target.url;
        this.reqTargetList(target.url);
      }
    },
    ShowDetails(id) {
      this.isShowDetails = true;
      this.$nextTick(() => {
        this.$refs.detail.id = id;
        this.$refs.Analysis.id = id;
      });
    }, */
    /* ShowAnalysis() {
      this.$store.commit("getShowRight", false);
      setTimeout(() => {
        this.$refs.Analysis.isShowAnalysis = true;
      }, 300);
    },
    async reqTargetList(url) {
      let res = await this.$api.operationSituaty.getParameter(
        {
          pageSize: this.pageSize,
          offsetNum: (this.page - 1) * this.pageSize,
        },
        `${url}`
      );
      if (res.length != 0) {
        this.total = res[0].total;
      }
      this.tableList2 = res;
    },

    handleTableChange(page) {
      this.page = page;
      this.reqTargetList(this.types.url);
    }, */
  },
};
</script>

<style lang="scss" scoped>
@import "../common.scss";
.container {
  .dialog_summarize {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

    &_item {
      width: 190px;
      height: 100%;
      position: relative;
      ::v-deep {
        .el-button {
          border: none;
        }
        /* .el-tooltip__popper, .el-tooltip__popper.is-dark{
          font-size: 16px !important;
        } */
      }
      .sum_text {
        text-align: left;
   
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        line-height: 24px;
        letter-spacing: 1px;
        padding-top: 0.039063rem; /* 15 / 384 */
        padding-left: 0.052083rem;
      }
      .special_text {
        text-align: center;
        height: 40px;
        line-height: 35px;
        background: url("~@/assets/images/air1979.png") no-repeat;
      }
      .sum_text_CO {
        text-align: left;
      }

      .sum_bg {
        background: url(~@/assets/images/sum_bg.png) 100% 100%
          no-repeat;
        height: 19px;
        position: absolute;
        width: 84px;
        // left: 8px;
        // top: 26px;
        left: -6px;
        top: 5px;
      }
      .special {
        left: 14px;
      }
      .sum_num {
        font-size: 26px;
        font-family: DIN;
        font-weight: bold;
        color: #ffffff;
        height: 46px;
        letter-spacing: 1px;
        background: linear-gradient(183deg, #ffffff 35%, #65adc9 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;

        padding-top: 20px;
        display: flex;
      }
      .surplus {
        margin-top: 22px;
      }
      .sum_AQI {
        font-size: 50px !important;
        padding-top: 26px;
      }
      .sum_CO {
        padding-top: 26px;
      }
    }
    /* .special_CO {
      left: -30px;
    } */
  }
  .dialog_summarize2 {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

    &_item {
      width: 120px;
      height: 100%;
      position: relative;
      ::v-deep {
        .el-button {
          border: none;
          padding: 0;
        }
        /* .el-tooltip__popper, .el-tooltip__popper.is-dark{
          font-size: 16px !important;
        } */
      }
      .sum_text {
        font-size: 20px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        line-height: 24px;
        letter-spacing: 1px;
        padding-top: 0.039063rem; /* 15 / 384 */
        padding-left: 0.052083rem;
      }
      .sum_text_CO {
        text-align: left;
      }

      .sum_bg {
        background: url(~@/assets/images/sum_bg.png) 100% 100%
          no-repeat;
        height: 19px;
        position: absolute;
        width: 84px;
        // left: 8px;
        // top: 26px;
        left: -6px;
        top: 5px;
      }

      .sum_num {
        font-size: 26px;
        font-family: DIN;
        font-weight: bold;
        color: #ffffff;

        letter-spacing: 1px;
        background: linear-gradient(183deg, #ffffff 35%, #65adc9 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        padding-top: 20px;
        display: flex;
      }
      .sum_AQI {
       
        
      }
      .sum_CO {
        padding-top: 26px;
      }
      .sub1 {
        color: #fff !important;
        background: none !important;

        width: 30px;
        height: 30px;
        font-size: 13px;
        padding: 10px 0 0 0;
      }
    }
   /*  .special_CO {
      left: -30px;
    } */
  }
}
.echart_box {
  display: flex;

  .left_echart {
    width: 320px;
    position: relative;
    .air_dom {
      position: absolute;
      bottom: 0;
      left: -100px;
      width: 400px;
      height: 220px;
    }
    .circular {
      background-image: url(~@/assets/images/common/bubble.png);
      background-repeat: no-repeat;
      background-size: 95px 95px;
      background-position: 160px 62px;
      position: relative;
    }
  }
  .right_echart {
    .Day_dom {
      width: 555px;
      height: 220px;
    }
  }
  .seven_shop {
    width: 282px;
    height: 30px;
    line-height: 30px;
    font-size: 20px;
    font-family: PangMenZhengDao;
    color: #ffffff;
    background: url(~@/assets/images/common/tab_title_bg.png) no-repeat;
    background-size: 100%;
    padding-left: 24px;
    font-weight: 400;
  }
  .seven_top {
    display: flex;
    width: 322px;
    position: relative;
    .seven_shop {
      width: 340px;
    }
    .seven_unit {
      position: absolute;
      right: -80px;
      top: 0;
      color: #ffffff;
      line-height: 30px;
      font-size: 20px;
      font-weight: 400;
    }
  }

  .Opinions_Trend {
    width: 100%;
    height: 200px;
  }
  .table {
    height: 200px;
    width: 375px;
    .head {
      background: url(~@/assets/images/newEvent/thead_box.png);
      background-size: 100% 100%;
      width: 446px;
      height: 38px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-right: 10px;
    }
    .table_main {
      height: 220px;
      overflow-y: auto;
      .tr {
        background: url(~@/assets/images/newEvent/tr_box.png);
        background-size: 100% 100%;
        width: 446px;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-right: 10px;
        cursor: pointer;
      }
      .table-item {
        width: 100%;
        height: 35px;
        margin-top: 33px;
        display: flex;
        align-items: center;
        line-height: 1;
        .item-title {
          flex-shrink: 0;
          width: 109px;
          height: 100%;
          margin-right: 12px;
          background: url("~@/assets/images/event_xt_sort_bg.png")
            no-repeat;
          background-size: 100% 100%;

          box-sizing: border-box;
          padding: 0 12px;
          font-size: 18px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #bcdbe8;
          line-height: 32px;

          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .item-value {
          flex: 1;
          height: 100%;
          display: flex;
          align-items: center;
          position: relative;
          .value-num {
            position: absolute;
            right: 15px;
            top: -20px;
            font-size: 26px;
            font-family: Akzidenz-Grotesk BQ Condensed;
            color: #ffffff;
          }
          .bg-line {
            width: 100%;
            height: 6px;
            background: #d1d1d1;
            display: flex;
            align-items: center;
            .value-line {
              height: 28px;
              background: linear-gradient(to right, #4cadff 0%, #4cadff 100%)
                no-repeat;
              background-size: 100% 6px;
              background-position: left center;
              border-right: 2px solid #d1d1d1;
            }
          }
        }
      }
    }
    .colum_item {
      //   flex: 1;
      font-size: 20px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #ffffff;
      line-height: 25px;
      background: linear-gradient(180deg, #ffffff 0%, #8dd6ff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-align: center;
      &:first-child {
        width: 95px;
      }
      &:last-child {
        width: 90px;
      }
    }
  }
}
.state {
  position: absolute;
  width: 84px;
  left: 55px;
  top: 60px;
  width: 50px;
  height: 28px;
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #ffffff;

  background: linear-gradient(183deg, #ffffff 0%, #90fafb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.state_bg {
  background: url(~@/assets/images/state_bg.png) 100% 100% no-repeat;
  height: 19px;
  position: absolute;
  width: 84px;
  left: 5px;
  top: 60px;
}
.table_pop {
  margin-bottom: 30px;
}
.Table-enter-active,
.Table-leave-active {
  transition: all 0.5s ease;
}

.Table-enter {
  opacity: 0;
  transform: translateY(-100px);
}
.Table-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.Table-leave {
  opacity: 1;
  transform: translateY(0);
}
.Table-leave-to {
  opacity: 0;
  transform: translateY(-100px);
}

.active {
  font-size: 36px !important;
  transition: all 0.5s linear;
}
</style>
