<template>
  <section>
    <transition name="Analysis">
      <section class="detail_box detail_bg" v-show="isShowAnalysis">
        <div class="analysis_title">
          指标关联分析
          <h1 class="title_bg"></h1>
          <div class="close" @click="close"></div>
        </div>

        <div class="appeal">
          <div class="appeal_title">
            相关诉求分析
            <h1 class="title_bg"></h1>
          </div>
          <section v-show="!isShowAppeal">
            <div class="appeal_line">
              <div class="line_left">
                <div class="appeal_total">
                  <div class="total_title">近7日相关诉求总量</div>
                  <div class="total_num" @click="showAppealTable('诉求总量')">
                    {{ obj.total }}
                  </div>
                </div>
                <div class="satisfied">
                  <div class="satisfied_item">
                    <div class="satisfied_title">近7日不满意件</div>
                    <div
                      class="unsatisfied_num"
                      @click="showAppealTable('不满意')"
                    >
                      {{ obj.unsatisfactory }}
                    </div>
                  </div>
                  <div class="satisfied_item">
                    <div class="satisfied_title">近7日不满意件占比</div>
                    <div class="satisfied_num" @click="showAppealTable('占比')">
                      {{ obj.rate }}%
                    </div>
                  </div>
                </div>
              </div>
              <div class="line_right">
                <div class="line_title">近7日相关诉求趋势</div>
                <div class="line_echarts" ref="line_echarts"></div>
              </div>
            </div>

            <div class="appeal_Trend">
              <div class="Trend_title">近7日相关诉求街道分布</div>

              <div class="Trend_echarts" ref="Trend_echarts"></div>
            </div>
          </section>
          <AppealTable
            v-if="isShowAppeal"
            :title="title"
            @returnDataHandle="returnDataHandle"
          ></AppealTable>
        </div>

        <div class="opinions">
          <div class="opinions_title">
            相关舆情分析
            <h1 class="title_bg"></h1>
          </div>
          <section v-show="!isShowOpinions">
            <div class="opinions_line">
              <div class="line_left">
                <div class="opinions_total">
                  <div class="total_title">近7日总信息数量</div>
                  <div class="total_num" @click="showOpinionsTable('舆情列表')">
                    {{ obj.OpinionsNum }}
                  </div>
                </div>
              </div>
              <div class="line_right">
                <div class="line_title">近7日敏感舆情趋势</div>
                <div class="Opinions_echarts" ref="Opinions_echarts"></div>
              </div>
            </div>
            <div class="opinions_top5">
              <div class="left_top5">
                <div class="left_title">近7日舆情来源渠道Top5</div>
                <div class="Opinions_Pie circular" ref="Opinions_Pie"></div>
              </div>
              <div class="right_top5">
                <div class="right_title">近7日平台活跃度Top5</div>
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
                        <p class="value-num">{{ item.num }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <OpinionsTable
            v-if="isShowOpinions"
            :opinionsTitle="opinionsTitle"
          ></OpinionsTable>
        </div>
      </section>
    </transition>
    <AppealDetail
      ref="detailDom"
      v-show="isShowDetail"
      class="detail_box detail_bg"
    ></AppealDetail>
  </section>
</template>
<script>
import {
  airAppeal,
  airAppealTrend,
  airOpinions,
  airOpinionsPIE,
} from "@/views/echarts";
import AppealTable from "./appealTable.vue";
import OpinionsTable from "./opinionsTable.vue";
import AppealDetail from "./appealDetail.vue";
export default {
  components: {
    AppealTable,
    OpinionsTable,
    AppealDetail,
  },
  data() {
    return {
      isShowAnalysis: false,
      isShowAppeal: false,
      isShowOpinions: false,
      isShowDetail: false,
      obj: {},
      title: "", //用于给表格传参
      opinionsTitle: "",
      list: [], //活跃平台top5
    };
  },
  watch: {
    isShowAnalysis: {
      handler(newVal) {
        if (newVal) {
          this.getData();
        }
      },
    },
  },

  methods: {
    getData() {
      //诉求总量
      this.$api.statePup
        .getAirAppealTotal({
          DCntACode: "113701",
        })
        .then((res) => {
          console.log(res);
          this.$set(this.obj, "rate", res.data.rate);
          this.$set(this.obj, "total", res.data.total);
          this.$set(this.obj, "unsatisfactory", res.data.unsatisfactory);
        });
      //诉求趋势

      this.$api.statePup
        .getAirAppealLine({
          DCntACode: "113701",
        })
        .then((res) => {
          console.log(res);
          let nameList = [];
          let valueList = [];
          res.data.forEach((v) => {
            nameList.push(v.statdate);
            valueList.push(v.total);
          });
          airAppeal.series[0].data = valueList;

          airAppeal.xAxis.data = nameList;

          let appealLine = this.$echarts.init(this.$refs.line_echarts);
          appealLine.clear();
          appealLine.setOption(airAppeal, true);
        });
      //诉求街道分布
      this.$api.statePup
        .getAirAppealStreet({
          DCntACode: "113701",
        })
        .then((res) => {
          let nameList = [];
          let valueList = [];
          res.data.forEach((v) => {
            nameList.push(v.street);
            valueList.push(v.total);
          });

          airAppealTrend.series[0].data = valueList;

          airAppealTrend.xAxis[0].data = nameList;
          let appealTrend = this.$echarts.init(this.$refs.Trend_echarts);
          appealTrend.clear();
          appealTrend.setOption(airAppealTrend, true);
        });
      //舆情-趋势
      this.$api.statePup
        .getAirOpinions({
          keywordId: "4196382",
        })
        .then((res) => {
          let timeList = [];
          res.data.xAxis.forEach((v) => {
            timeList.push(this.$moment(v).format("MM-DD"));
          });
          airOpinions.series[0].data = res.data.seriesData[0].data;

          airOpinions.xAxis.data = timeList;
          this.$set(this.obj, "OpinionsNum", res.data.total);
          let OpinionsTrend = this.$echarts.init(this.$refs.Opinions_echarts);
          OpinionsTrend.clear();
          OpinionsTrend.setOption(airOpinions, true);
        });
      //舆情来源Top5
      this.$api.statePup
        .getAirOpinionsOriginTo5({
          keywordId: "4196382",
        })
        .then((res) => {
          let list = [];
          res.data.forEach((v) => {
            let obj = { name: v.name, value: v.num };
            list.push(obj);
          });
          airOpinionsPIE.series[0].data = list;
          airOpinionsPIE.series[1].data = list;
          let OpinionsPie = this.$echarts.init(this.$refs.Opinions_Pie);
          OpinionsPie.clear();
          OpinionsPie.setOption(airOpinionsPIE, true);
        });

      //平台活跃度Top5
      this.$api.statePup
        .getAirActiveTo5({
          keywordId: "4196382",
        })
        .then((res) => {
          if (this.list.length == 0) {
            res.data.seriesData[0].data.forEach((v) => {
              let obj = { num: v, name: "" };
              this.list.push(obj);
            });
          }

          let total = 0;
          res.data.xAxis.forEach((v, i) => {
            this.list[i].name = v;
          });
          this.list.forEach((item) => {
            total += Number.parseInt(item.num);
          });
          this.list.forEach((item) => {
            item.roate = ((Number.parseInt(item.num) / total) * 100).toFixed(1);
          });
        });
    },
    close() {
      this.isShowAnalysis = false;
      setTimeout(() => {
        this.$store.commit("getShowRight", true);
      }, 300);
    },
    showAppealTable(title) {
      this.title = title;
      this.isShowAppeal = true;
    },
    showOpinionsTable(title) {
      this.opinionsTitle = title;
      this.isShowOpinions = true;
    },
    returnDataHandle(id) {
      this.$refs.detailDom.id = id;
    },
  },
};
</script>

<style lang="scss" scoped>
.detail_box {
  position: fixed;
  top: 63px;
  right: 20px;
  height: 1330px;
  width: 940px;
  padding-top: 60px;
  .analysis_title {
    display: flex;
    font-size: 32px;
    font-family: YouSheBiaoTiHei;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 30px;
    margin-left: 30px;
  }
  .title_bg {
    height: 1px;
    background: white;
    background-size: 100% 100%;
    width: 650px;
    margin: 10px 0 0 20px;
  }
  .close {
    cursor: pointer;
    position: relative;
    top: -10px;
    left: 0;
    width: 40px;
    height: 40px;
    z-index: 99999;
    background: url("~@/assets/images/返回.png") no-repeat 100% 100%;
  }
  .appeal {
    width: 100%;
    height: 50%;
    padding-left: 30px;
    .appeal_title {
      display: flex;
      font-size: 28px;
      font-family: ShiShangZhongHeiJianTi;
      font-weight: 400;
      color: #ffffff;
      .title_bg {
        height: 1px;
        background: white;
        background-size: 100% 100%;
        width: 650px;
        margin: 10px 0 0 30px;
      }
    }
    .appeal_line {
      height: 250px;
      display: flex;
      .line_left {
        height: 100%;
        width: 50%;
        .appeal_total {
          font-size: 20px;
          width: 250px;
          height: 100px;
          margin-top: 34px;
          .total_title {
            font-size: 24px;
            font-family: ShiShangZhongHeiJianTi;
            font-weight: 400;
            background: url(~@/assets/images/sum_bg.png) no-repeat;
            background-size: 30% 100%;
            padding-left: 20px;
          }
          .total_num {
            cursor: pointer;
            width: 100%;
            height: 44px;
            /* line-height: 23px; */
            padding-left: 20px;
            padding-top: 20px;
            font-size: 36px;
            font-family: DIN;
            font-weight: bold;
            color: #ffffff;
            background: linear-gradient(183deg, #ffffff 45%, #65adc9 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }

        .satisfied {
          display: flex;
          font-size: 20px;
          width: 455px;
          height: 100px;
          margin-top: 34px;
          .satisfied_item {
            height: 100px;
            width: 100%;
            .satisfied_title {
              font-size: 24px;
              font-family: ShiShangZhongHeiJianTi;
              font-weight: 400;
              background: url(~@/assets/images/sum_bg.png) no-repeat;
              background-size: 30% 100%;
              padding-left: 20px;
            }
            .satisfied_num {
              cursor: pointer;
              width: 100%;
              height: 44px;
              /* line-height: 23px; */
              padding-left: 20px;
              padding-top: 20px;
              font-size: 36px;
              font-family: DIN;
              font-weight: bold;
              color: #ffffff;
              background: linear-gradient(183deg, #ffffff 45%, #65adc9 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
            .unsatisfied_num {
              cursor: pointer;
              width: 100%;
              height: 100px;
              padding-left: 20px;
              padding-top: 14px;
              font-size: 36px;
              line-height: 38px;
              font-family: DIN;
              font-weight: bold;
              color: #ffffff;

              background: linear-gradient(183deg, #ffffff 0%, #eab07d 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
          }
        }
      }
      .line_right {
        width: 50%;
        height: 100%;
        margin-top: 40px;
        .line_echarts {
          height: 250px;
        }
        .line_title {
          width: 245px;
          height: 30px;
          padding-left: 20px;
          background: url(~@/assets/images/jiantouyou.png) no-repeat 0% -100%;
          font-size: 24px;
          font-family: ShiShangZhongHeiJianTi;
          font-weight: 400;
          color: #ffffff;
        }
      }
    }

    .appeal_Trend {
      height: 250px;
      margin-top: 60px;
      .Trend_echarts {
        height: 250px;
      }
      .Trend_title {
        width: 280px;
        height: 30px;
        padding-left: 20px;
        background: url(~@/assets/images/jiantouyou.png) no-repeat 0% -100%;
        font-size: 24px;
        font-family: ShiShangZhongHeiJianTi;
        font-weight: 400;
        color: #ffffff;
      }
    }
  }
  .line {
    height: 1px;
    background-color: #fff;
    margin: 10px 0;
  }
  .opinions {
    width: 100%;
    height: 50%;
    padding-left: 20px;
    .opinions_title {
      display: flex;
      font-size: 28px;
      font-family: ShiShangZhongHeiJianTi;
      font-weight: 400;
      color: #ffffff;
    }
    .title_bg {
      height: 1px;
      background: white;
      background-size: 100% 100%;
      width: 685px;
      margin: 10px 0 0 34px;
    }
    .opinions_line {
      height: 250px;
      display: flex;
      .line_left {
        height: 100%;
        width: 25%;
        .opinions_total {
          font-size: 20px;
          width: 215px;
          height: 100px;
          margin-top: 20px;
          .total_num {
            cursor: pointer;
            width: 100%;
            height: 44px;
            /* line-height: 23px; */
            padding-left: 20px;
            padding-top: 20px;
            font-size: 36px;
            font-family: DIN;
            font-weight: bold;
            color: #ffffff;
            background: linear-gradient(183deg, #ffffff 45%, #65adc9 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .total_title {
            font-size: 24px;
            font-family: ShiShangZhongHeiJianTi;
            font-weight: 400;
            color: #ffffff;
            background: url(~@/assets/images/sum_bg.png) no-repeat;
            background-size: 30% 100%;
            padding-left: 24px;
          }
        }
      }
      .line_right {
        width: 75%;
        height: 100%;
        margin-top: 20px;

        .Opinions_echarts {
          height: 250px;
        }
        .line_title {
          font-size: 24px;
          margin-left: 77px;
          padding-left: 20px;
          width: 300px;
          height: 30px;

          background: url(~@/assets/images/jiantouyou.png) no-repeat 0% -100%;
          font-family: ShiShangZhongHeiJianTi;
          font-weight: 400;
          color: #ffffff;
        }
      }
    }
    .opinions_top5 {
      margin-top: 50px;
      width: 100%;
      height: 100%;
      display: flex;
      .left_top5 {
        width: 50%;
        .Opinions_Pie {
          width: 100%;
          height: 200px;
        }
        .circular {
          background-image: url(~@/assets/images/common/bubble.png);
          background-repeat: no-repeat;
          background-size: 85px 85px;
          background-position: 75px 58px;
          position: relative;
        }
        .left_title {
          width: 290px;
          height: 30px;
          padding-left: 20px;
          background: url(~@/assets/images/jiantouyou.png) no-repeat 0% -100%;
          font-size: 24px;
          font-family: ShiShangZhongHeiJianTi;
          font-weight: 400;
          color: #ffffff;
        }
      }
      .right_top5 {
        width: 50%;
        .right_title {
          width: 290px;
          height: 30px;
          padding-left: 20px;
          background: url(~@/assets/images/jiantouyou.png) no-repeat 0% -100%;

          font-size: 24px;
          font-family: ShiShangZhongHeiJianTi;
          font-weight: 400;
          color: #ffffff;
        }
        .Opinions_Trend {
          width: 100%;
          height: 200px;
        }
        .table {
          height: 200px;
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
                  font-size: 20px;
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
                    background: linear-gradient(
                        to right,
                        #4cadff 0%,
                        #4cadff 100%
                      )
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
    }
  }
}

.detail_bg {
  background: url("~@/assets/images/new_pupbg.png") 100% 100% no-repeat;
  background-size: 100% 100%;
}
.Analysis-enter-active,
.Analysis-leave-active {
  transition: all 0.5s ease;
}
.Analysis-enter {
  opacity: 0;
  transform: translateX(940px);
}
.Analysis-enter-to {
  opacity: 1;
  transform: translateX(0);
}
.Analysis-leave {
  opacity: 1;
  transform: translateX(0);
}
.Analysis-leave-to {
  opacity: 0;
  transform: translateX(940px);
}
</style>