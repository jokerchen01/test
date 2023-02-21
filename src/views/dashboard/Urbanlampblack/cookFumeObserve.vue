<template>
  <section>
    <div class="gdp_row">
      <!-- <div class="gdp_row_left">
        <div class="left_title">餐饮企业证照联审情况</div>
        <div class="left_container">
          <div class="left_box">
            <div class="lable">餐饮许可审查通过数量</div>
            <div class="value_unit">
              {{ obj.CYSKSCTGSL }}<span class="unit">家</span>
            </div>
            <div class="yyjcdz"></div>
          </div>
          <div class="left_box">
            <div class="lable">审查不通过数量</div>
            <div class="value_unit">
              {{ obj.SCBTGSL }}<span class="unit">家</span>
            </div>
            <div class="yyjcdz"></div>
          </div>
        </div>
      </div>
      <div class="gdp_row_right" style="padding-right: 0">
        <div class="right_title">餐饮企业类型分布</div>
        <div ref="foodBeverages" class="echart_dom"></div>
      </div>
      <div class="gdp_row_right" style="padding-right: 0">
        <div class="right_title">餐饮企业类型分布</div>
        <div ref="foodBeverages" class="echart_dom"></div>
      </div> -->
      <div>
        <p class="title">餐饮企业证照联审情况</p>
        <p class="legen">证照审批统计</p>
        <div class="content_1">
          <!-- row1 -->
          <div class="style1 flex">
            <span>受理总数</span>
            <span><big class="text1">473</big>件</span>
          </div>
          <!-- row2 -->
          <div class="flex" style="width: 100%; height: 105px">
            <!-- row2-col1 -->
            <div class="style2">
              <p>已完成</p>
              <p><big class="text5">455</big>件</p>
            </div>
            <!-- row2-col2 -->
            <div style="width: 55%; height: 100%" class="flex_col">
              <div class="style1 flex">
                <span>通过</span>
                <span><big class="text2">367</big>件</span>
              </div>
              <div class="style1 flex">
                <span>未通过</span>
                <span><big class="text3">88</big>件</span>
              </div>
            </div>
          </div>
          <!-- row3 -->
          <div class="style1 flex">
            <span>处理中</span>
            <span><big class="text4">18</big>件</span>
          </div>
        </div>
      </div>
      <div>
        <p class="title">餐饮企业监控级别</p>
        <div>
          <div ref="MonitoringLevelOfCatering" class="echart_dom_1"></div>
        </div>
      </div>
      <div>
        <p class="title">餐饮企业类型分布</p>
        <div>
          <div
            ref="CateringEnterpriseTypeDistribution"
            class="echart_dom_2"
          ></div>
        </div>
      </div>
    </div>
    <section>
      <div class="left_title" style="margin-top: 0">餐饮企业街道分布</div>
      <div class="streetFood_box" ref="streetFood"></div>
      <div class="left_title">油烟投诉趋势图</div>
      <div class="lampblack_box" ref="lampblack"></div>
    </section>
  </section>
</template>

<script>
import {
  miniteringOfCateringEnterprecies,
  distributeOfCateringType,
  streetFood,
  lampblack,
} from "@/views/echarts";
export default {
  name: "cookFumeObserve",
  props: {
    obj: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      totalOfcanteringLicenseApproval: "~",
      canteringLisenceCompleted: "~",
      canteringLicenseProcess: "~",
      canteringLisenceFail: "~",
      canteringLisenceSucess: "~",
    };
  },
  created() {
    this.getCanteringLisenceApprovalData();
  },
  mounted() {
    this.echartInit();
  },
  methods: {

  
    getCanteringLisenceApprovalData() {
     
    },
    echartInit() {
      // 餐饮企业街道分布
    let res3=[{"data":"[{\"areaname\":\"抚琴街道\",\"total\":819},{\"areaname\":\"茶店子街道\",\"total\":662},{\"areaname\":\"西安路街道\",\"total\":578},{\"areaname\":\"驷马桥街道\",\"total\":557},{\"areaname\":\"金泉街道\",\"total\":550},{\"areaname\":\"营门口街道\",\"total\":503},{\"areaname\":\"荷花池街道\",\"total\":472},{\"areaname\":\"九里堤街道\",\"total\":393},{\"areaname\":\"沙河源街道\",\"total\":286},{\"areaname\":\"五块石街道\",\"total\":239},{\"areaname\":\"西华街道\",\"total\":180},{\"areaname\":\"天回镇街道\",\"total\":127},{\"areaname\":\"凤凰山街道\",\"total\":46}]"}]
           let valueList = [];
        let nameList = [];
        console.log();
        JSON.parse(res3[0].data).forEach((v, i) => {
          valueList.push({
            value: v.total,
          });
          nameList.push(v.areaname)
        });

        streetFood.xAxis.data = nameList;
        streetFood.series[0].data = valueList;
        this.$nextTick(() => {
          let myChartstreetFood = this.$echarts.init(this.$refs.streetFood);
          myChartstreetFood.setOption(streetFood);
        });
      
      //油烟投诉趋势图
     
          let res4=[{"data":"{\"tsLastNow\":[{\"count\":16,\"_id\":1672502400,\"create_date\":\"2023-01\"},{\"count\":0,\"_id\":1675180800,\"create_date\":\"2023-02\"}],\"tsLastTow\":[{\"count\":57,\"_id\":1609430400,\"create_date\":\"2021-01\"},{\"count\":71,\"_id\":1612108800,\"create_date\":\"2021-02\"},{\"count\":133,\"_id\":1614528000,\"create_date\":\"2021-03\"},{\"count\":215,\"_id\":1617206400,\"create_date\":\"2021-04\"},{\"count\":207,\"_id\":1619798400,\"create_date\":\"2021-05\"},{\"count\":167,\"_id\":1622476800,\"create_date\":\"2021-06\"},{\"count\":94,\"_id\":1625068800,\"create_date\":\"2021-07\"},{\"count\":106,\"_id\":1627747200,\"create_date\":\"2021-08\"},{\"count\":154,\"_id\":1630425600,\"create_date\":\"2021-09\"},{\"count\":115,\"_id\":1633017600,\"create_date\":\"2021-10\"},{\"count\":92,\"_id\":1635696000,\"create_date\":\"2021-11\"},{\"count\":85,\"_id\":1638288000,\"create_date\":\"2021-12\"}],\"tsLast\":[{\"count\":54,\"_id\":1640966400,\"create_date\":\"2022-01\"},{\"count\":32,\"_id\":1643644800,\"create_date\":\"2022-02\"},{\"count\":85,\"_id\":1646064000,\"create_date\":\"2022-03\"},{\"count\":94,\"_id\":1648742400,\"create_date\":\"2022-04\"},{\"count\":91,\"_id\":1651334400,\"create_date\":\"2022-05\"},{\"count\":93,\"_id\":1654012800,\"create_date\":\"2022-06\"},{\"count\":57,\"_id\":1656604800,\"create_date\":\"2022-07\"},{\"count\":61,\"_id\":1659283200,\"create_date\":\"2022-08\"},{\"count\":26,\"_id\":1661961600,\"create_date\":\"2022-09\"},{\"count\":59,\"_id\":1664553600,\"create_date\":\"2022-10\"},{\"count\":38,\"_id\":1667232000,\"create_date\":\"2022-11\"},{\"count\":33,\"_id\":1669824000,\"create_date\":\"2022-12\"}]}"}]
          const result = JSON.parse(res4[0].data);
          const yearBeforeLast = result.tsLastTow;
          const lastYear = result.tsLast;
          const currentYear = result.tsLastNow;
          const currentFullYear = new Date().getFullYear();
          lampblack.series[0].name = currentFullYear - 2 + "年";
          lampblack.series[1].name = currentFullYear - 1 + "年";
          lampblack.series[2].name = currentFullYear + "年";
          lampblack.series[0].data = yearBeforeLast.map((i) => i.count);
          lampblack.series[1].data = lastYear.map((i) => i.count);
          lampblack.series[2].data = currentYear.map((i) => i.count);
          this.$nextTick(() => {
            let myChartlampblack = this.$echarts.init(this.$refs.lampblack);
            myChartlampblack.setOption(lampblack);
          });
       
      
      
      let res = [{ ct: "41", yb: "4294", zd: "1077" }];
      const dic = { yb: "一般", zd: "重点", ct: "常态" };
      miniteringOfCateringEnterprecies.series[0].data = Object.keys(res[0]).map(
        (key) => {
          return { name: dic[key], value: res[0][key] };
        }
      );
      this.$nextTick(() => {
        let myChart = this.$echarts.init(this.$refs.MonitoringLevelOfCatering);
        myChart.setOption(miniteringOfCateringEnterprecies);
      });

      //餐饮企业类型分布
      let res2 = [
        {
          data: '[{"sub_text":"中餐","num":2075},{"sub_text":"火锅","num":696},{"sub_text":"烧烤","num":350},{"sub_text":"西餐","num":36},{"sub_text":"面食","num":506},{"sub_text":"中式包点","num":134},{"sub_text":"饮品","num":149},{"sub_text":"其他(干锅快餐等)","num":1466}]',
        }, 
      ];
      let data = (res2?.[0] && res2[0].data && JSON.parse(res2[0].data)) || [];
      data = data.sort((a, b) => a.num - b.num).slice(0, 5);
      distributeOfCateringType.series[0].data = data.map((v) => {
        return { value: v.num, name: v.sub_text };
      });
      let myChart = this.$echarts.init(
        this.$refs.CateringEnterpriseTypeDistribution
      );
      myChart.setOption(distributeOfCateringType);
    },
  },
};
</script>

<style lang="scss" scoped>
// .gdp_row {
//   width: 100%;
//   // height: 276px;
//   display: flex;
//   &_right {
//     width: 267px;
//     height: 100%;
//     padding-right: 44px;
//     position: relative;
//     .gdp_title {
//       width: 233px;
//       height: 45px;
//       background: url(~@/assets/images/common/gdp_bg.png) no-repeat;
//       background-size: 100%;
//       font-size: 20px;
//       font-family: PingFang SC;
//       color: #ffffff;
//       line-height: 45px;
//       text-align: center;
//     }
//     .right_title {
//       width: 262px;
//       height: 30px;
//       background: url(~@/assets/images/common/right_tab_title_bg.png) no-repeat;
//       background-size: 100%;
//       font-size: 22px;
//       font-family: PangMenZhengDao;
//       color: #ffffff;
//       padding-left: 24px;
//       line-height: 30px;
//     }
//     .gdp_num {
//       height: 73px;
//       text-align: center;
//       margin-top: 22px;
//       &_vlaue {
//         width: 233px;
//         font-size: 38px;
//         line-height: 1;
//         font-family: DINPro;
//         font-weight: bold;
//         color: #ffffff;
//         background: linear-gradient(0deg, #e6cd98 0%, #e0f3ff 100%);
//         -webkit-background-clip: text;
//         -webkit-text-fill-color: transparent;
//         padding-bottom: 14px;
//       }
//       &_unit {
//         width: 233px;
//         font-size: 18px;
//         font-family: PingFang SC;
//         color: #ffffff;
//       }
//     }
//     .gdp_num_bg {
//       margin-left: 33px;
//       width: 171px;
//       height: 133px;
//       background: url(~@/assets/images/common/gdp_num_bg.png) no-repeat;
//       background-size: 100%;
//       position: absolute;
//       bottom: 25px;
//     }
//     .compared_same {
//       width: 184px;
//       height: 30px;
//       position: absolute;
//       bottom: 20px;
//       left: 28px;
//       .compared_same_bg {
//         height: 18px;
//         background: url(~@/assets/images/common/compared_same_bg.png) no-repeat;
//         background-size: 100%;
//       }
//       .cs_num_box {
//         display: flex;
//         position: absolute;
//         bottom: 18px;
//         left: 33px;
//         .cs_title {
//           font-size: 18px;
//           font-family: PingFang SC;
//           color: #ffffff;
//         }
//         .up_icon {
//           margin-left: 5px;
//           margin-right: 8px;
//           margin-top: 7px;
//           width: 11px;
//           height: 14px;
//           background: url(~@/assets/images/common/up_icon.png) no-repeat;
//           background-size: 100%;
//         }
//         .cs_num {
//           font-size: 26px;
//           font-family: DINPRO;
//           font-weight: bold;
//           color: #ffffff;
//           background: linear-gradient(0deg, #92e4ba 0%, #ffffff 100%);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//         }
//       }
//     }
//   }
//   &_left {
//     //   width: 700px;
//     height: 100%;
//     position: relative;

//     .left_container {
//       display: flex;
//       margin-top: 63px;
//       .left_box {
//         margin-right: 38px;
//         width: 224px;
//         text-align: center;
//       }
//       .lable {
//         font-size: 20px;
//         font-family: PingFang SC;
//         font-weight: 500;
//         color: #ffffff;
//         margin-bottom: 34px;
//       }
//       .value_unit {
//         height: 30px;
//         line-height: 30px;
//         font-size: 36px;
//         font-family: DINPRO;
//         font-weight: bold;
//         color: #ffffff;
//         background: linear-gradient(183deg, #ffffff 0%, #65adc9 100%);
//         -webkit-background-clip: text;
//         -webkit-text-fill-color: transparent;

//         .unit {
//           margin-left: 10px;
//           font-size: 18px;
//           font-family: PingFang SC;
//           font-weight: 400;
//           color: #ffffff;
//         }
//       }
//       .yyjcdz {
//         margin-top: 16px;
//         background: url(~@/assets/images/yyjcdz.png) no-repeat;
//         background-size: 100% 100%;
//         width: 100%;
//         height: 18px;
//       }
//     }
//   }
// }

.gdp_row {
  width: 100%;
  display: flex;
  justify-content: space-between;
  & > div {
    height: auto;
    &:nth-child(1) {
      width: 500px;
      padding-right: 20px;
    }
    &:nth-child(2) {
      width: 200px;
      padding-right: 20px;
    }
    &:nth-child(3) {
      width: 200px;
      padding-right: 20px;
    }
    .title {
      width: 90%;
      height: 30px;
      line-height: 30px;
      background: url(~@/assets/images/common/right_tab_title_bg.png) no-repeat;
      background-size: 100%;
      font-size: 20px;
      font-family: PangMenZhengDao;
      color: #ffffff;
      padding-left: 24px;
    }
    .legen {
      margin-top: 10px;
      height: 28px;
      font-size: 20px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #acd9f7;
      line-height: 20px;
      text-align: center;
    }
    .content_1 {
      width: 100%;
      height: auto;
      & > div {
        margin-bottom: 10px;
      }
      .flex {
        display: flex;
        justify-content: space-between;
      }
      .flex_col {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
      }
      .style1 {
        width: 100%;
        height: 48px;
        line-height: 48px;
        padding: 0 20px;
        background: url("~@/assets/images/bg_in_degital_urban_manager.png")
          repeat-y;
        background-size: 100%;
        .text1 {
          background: linear-gradient(180deg, #ffffff 0%, #256d89 100%);
        }
        .text2 {
          background: linear-gradient(180deg, #ffffff 0%, #2dbc33 100%);
        }
        .text3 {
          background: linear-gradient(180deg, #ffffff 0%, #ff5841 100%);
        }
        .text4 {
          background: linear-gradient(180deg, #ffffff 0%, #e8831e 100%);
        }
        & > span:nth-child(1) {
          font-size: 18px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #ffffff;
        }
        & > span:nth-child(2) {
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          & > big {
            font-size: 20px;
            font-family: DIN-Bold, DIN;
            font-weight: bold;
            color: #aeaeae;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
      }
      .style2 {
        width: calc(45% - 10px);
        height: 106px;
        text-align: center;
        background: url("~@/assets/images/bg_in_degital_urban_manager.png")
          repeat-y;
        background-size: 100%;
        .text5 {
          background: linear-gradient(180deg, #ffffff 0%, #256d89 100%);
        }
        p {
          height: 50%;
          line-height: 53px;
        }
        & > p:nth-child(1) {
          font-size: 18px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #ffffff;
        }
        & > p:nth-child(2) {
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          & > big {
            font-size: 20px;
            font-family: DIN-Bold, DIN;
            font-weight: bold;
            color: #aeaeae;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
      }
    }
    .content_2 {
    }
  }
}
.echart_dom_1 {
  width: 200px;
  height: 260px;
  background-image: url("~@/assets/images/common/bubble.png");
  background-repeat: no-repeat;
  background-size: 90px 90px;
  background-position: 55px 85px;
}

.echart_dom_2 {
  width: 200px;
  // height: 195px;
  height: 350px;
  background-image: url("~@/assets/images/common/bubble.png");
  background-repeat: no-repeat;
  background-size: 90px 90px;
  background-position: 55px 85px;
}

.left_title {
  margin: 25px 0;
  width: 340px;
  height: 30px;
  background: url(~@/assets/images/common/tab_title_bg.png) no-repeat;
  background-size: 100%;
  font-size: 22px;
  font-family: PangMenZhengDao;
  color: #ffffff;
  padding-left: 24px;
  line-height: 30px;
}
.streetFood_box,
.lampblack_box {
  width: 100%;
  height: 228px;
}
</style>
