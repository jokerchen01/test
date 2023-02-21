<template>
  <div class="dashboard-container">
    <div class="dashboard">
      <div class="appeal">
        <div class="card_box">
          <div
            class="item"
            @click="showDialog('gasSafetyDialog')"
            ref="gasSafetyDialog"
          >
            <div class="RQAQ_card">
              <div class="title">燃气安全</div>
              <div class="value">{{ obj.num1 }}</div>
              <div class="lable">抢险急修数</div>
            </div>
          </div>
          <div
            class="item"
            @click="showDialog('fireControlSafetyDialog')"
            ref="fireControlSafetyDialog"
          >
            <div class="XFAQ">
              <div class="title">消防安全</div>
              <div class="flexrow">
                <div>
                  <div class="value">{{ obj.num2 }}</div>
                  <div class="lable">上月消防监督<br />检查数 (次）</div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="item"
            @click="showDialog('roadSafetyDialog')"
            ref="roadSafetyDialog"
          >
            <div class="JTAQ">
              <div class="title">交通安全</div>
              <div class="flexrow">
                <div>
                  <div class="value">{{ obj.num3 }}</div>
                  <div class="lable">昨日交通<br />事故数</div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="item margRi0"
            @click="showDialog('socialStability')"
            ref="socialStability"
          >
            <div class="SHWW">
              <div class="title">社会维稳</div>
              <div class="flexrow">
                <div>
                  <div class="value">{{ obj.num4 }}</div>
                  <div class="lable">年度涉稳<br />风险隐患</div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="item"
            @click="showDialog('internetPublicOpinion')"
            ref="internetPublicOpinion"
          >
            <div class="WLYQ">
              <div class="title">网络舆情</div>
              <div class="flexrow">
                <div>
                  <div class="value">{{ obj.num5 }}</div>
                  <div class="lable">近一周网络<br />舆情数</div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="item"
            @click="showDialog('marketRegulation')"
            ref="marketRegulation"
          >
            <div class="SCJG">
              <div class="title">市场监管</div>
              <div class="flexrow">
                <div>
                  <div class="value">{{ obj.num6 }}</div>
                  <div class="lable">累计监督检查<br />户数</div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="item"
            @click="showDialog('usrbanManage')"
            ref="usrbanManage"
          >
            <div class="SZCG">
              <div class="title">数字城管</div>
              <div class="flexrow">
                <div class="value">
                  {{ obj.num7 }}<span class="unit">%</span>
                </div>
                <div class="lable">今日结案率</div>
              </div>
            </div>
          </div>
          <div class="item" @click="showDialog('airPup')" ref="airPup">
            <div class="KQZL">
              <div class="title">空气环境</div>
              <section class="flexrow">
                <div class="left">
                  <div class="value">{{ obj.num8 }}</div>
                  <div class="lable">空气环境<br />达标天数</div>
                </div>
                <div class="right">
                  <div
                    ref="QNDBL"
                    style="width: 90px; height: 80px; margin-bottom: 13px"
                  ></div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Appeal></Appeal>
      <EventAnaly></EventAnaly>
    </div>
    <EventHandle></EventHandle>
    <analysis></analysis>
    <!-- 公告弹窗 -->
    <IndicatorsDialog
      :show="isShowIndicatorsDialog"
      @close="closeDialog()"
      :type="typeAssembly"
      :indexSource="indexSource"
      :indicatorsInfo="indicatorsInfo"
      :diaLogBg="'public_safety_bg'"
    />
  </div>
</template>

<script>
import Appeal from "./appeal.vue";
import EventAnaly from "./eventAnaly";
import EventHandle from "./eventHandle.vue";
import IndicatorsDialog from "./IndicatorsDialog.vue";
import analysis from "./analysis.vue";
import { QNDBL } from "../echarts";
export default {
  components: {
    Appeal,
    EventAnaly,
    EventHandle,
    IndicatorsDialog,
    analysis,
  },
  name: "Dashboard",
  data() {
    return {
      obj: {},
      isShowIndicatorsDialog: false,
      typeAssembly: "", //显示具体组件
      indexSource: "", //各个委办局
      indicatorsInfo: {}, // 弹窗顶部展示数据
    };
  },
  mounted() {
    this.getTarget();
  },
  methods: {
    getTarget() {
      this.$api.home.reqTarget().then((res) => {
        this.obj = res.data;

        const a = res.data.num9;
        let echartsObj = this.$echarts.init(this.$refs.QNDBL);
        QNDBL.title.text = a;
        QNDBL.series[0].data = [{ value: a }, { value: 100 - a }];
        echartsObj.setOption(QNDBL);
      });
    },
    showDialog(type) {
      this.typeAssembly = type;
      switch (type) {
        case "roadSafetyDialog":
          this.indexSource = "区道安办（交警二分局）";
          this.indicatorsInfo = {
            bg_image: "",
            name: "道路交通安全",
            childInfo: [
              {
                name: "昨日道路交通事故数",
                value: 100,
              },
            ],
          };
          break;

        case "gasSafetyDialog":
          this.indexSource = "区住建和交通局";
          this.indicatorsInfo = {
            bg_image: "",
            name: "燃气安全",
            childInfo: [
              {
                name: "抢险急修数",
                value: 100,
              },
            ],
          };
          break;
        case "fireControlSafetyDialog":
          this.indexSource = "区消防救援大队";
          this.indicatorsInfo = {
            bg_image: "",
            name: "消防安全",
            childInfo: [
              {
                name: "上月消防监督检查单位数",
                value: 100,
              },
            ],
          };
          break;

        case "internetPublicOpinion":
          this.indexSource = "区网信办";
          this.indicatorsInfo = {
            bg_image: "",
            name: "网络舆情",
            childInfo: [
              {
                name: "近一周网络舆情",
                value: 100,
              },
            ],
          };
          break;
        case "socialStability":
          this.indexSource = "区委政法委";
          this.indicatorsInfo = {
            bg_image: "",
            name: "社会维稳",
            childInfo: [
              {
                name: "本年度涉稳风险隐患",
                value: 100,
              },
              {
                name: "本年度群体性事件",
                value: 100,
              },
            ],
          };
          break;
        case "marketRegulation":
          this.indexSource = "区市场监管局";
          this.indicatorsInfo = {
            bg_image: "hesuanjiancxl",
            name: "市场监管",
            childInfo: [
              {
                name: "累计监督检查户数",
                value: 100,
              },
            ],
          };
          break;
      }
      this.isShowIndicatorsDialog = true;
    },
    closeDialog() {
      this.isShowIndicatorsDialog = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard-container {
  background: url(~@/assets/images/appeal_box.png) no-repeat;
  background-size: 100% 100%;
  width: 100%;
  display: flex;
  padding-bottom: 20px;

  .dashboard {
    width: 750px;
    .appeal {
      height: 260px;
      margin-top: 20px;
      .card_box {
        margin-top: 20px;
        width: 107%;
        height: 130px;
        display: flex;
        flex-wrap: wrap;
        .item {
          width: 22%;
          margin-bottom: 9px;
          /* margin-right: 9px; */
          margin-left: 10px;
          overflow: hidden;
          cursor: pointer;
          &:hover {
            transform: scale(1.1);
            transition: all 0.2s linear;
          }
          .title {
            padding-top: 7px;
            padding-left: 30px;
            height: 30px;
            font-family: ShiShangZhongHeiJianTi;
            font-weight: 400;
            color: #ffffff;
          }
          .RQAQ_card {
            background: url(~@/assets/images/RQAQ_card.png) no-repeat;
            background-size: 100% 100%;
            .value {
              margin-left: 44px;
              margin-top: 20px;
              margin-bottom: 15px;
              font-size: 20px;
              font-family: Akzidenz-Grotesk BQ Condensed;
              font-weight: bold;
              height: 20px;
              line-height: 20px;
              color: #df7575;
            }
            .lable {
              margin-left: 16px;
              height: 36px;
              font-size: 16px;
              font-family: PingFang SC;
              font-weight: 500;
              color: #bcdbe8;
            }
          }
          .XFAQ {
            background: url(~@/assets/images/XFAQ.png) no-repeat;
            background-size: 100% 100%;
            .flexrow {
              width: 100%;
              display: flex;
              justify-content: flex-end;
              .value {
                margin-top: 20px;
                margin-right: 17px;
                margin-bottom: 13px;
                font-size: 20px;
                font-family: Akzidenz-Grotesk BQ Condensed;
                font-weight: bold;
                color: #ffffff;
                height: 20px;
                line-height: 20px;
                text-align: center;
              }
              .lable {
                font-size: 16px;
                font-family: PingFang SC;
                font-weight: 500;
                color: #bcdbe8;
              }
            }
          }
          .JTAQ {
            background: url(~@/assets/images/JTAQ.png) no-repeat;
            background-size: 100% 100%;
            .flexrow {
              width: 100%;
              display: flex;
              justify-content: flex-end;
              .value {
                margin-top: 20px;
                margin-right: 17px;
                text-align: center;
                margin-bottom: 13px;
                font-size: 20px;
                font-family: Akzidenz-Grotesk BQ Condensed;
                font-weight: bold;
                color: #ffffff;
                height: 20px;
                line-height: 20px;
              }
              .lable {
                margin-right: 17px;
                font-size: 16px;
                font-family: PingFang SC;
                font-weight: 500;
                color: #bcdbe8;
              }
            }
          }
          .SHWW {
            background: url(~@/assets/images/SHWW_card.png) no-repeat;
            background-size: 100% 100%;
            .flexrow {
              width: 100%;
              display: flex;
              justify-content: flex-end;
              text-align: center;
              .value {
                margin-top: 20px;
                margin-right: 17px;
                margin-bottom: 13px;
                text-align: center;
                font-size: 20px;
                font-family: Akzidenz-Grotesk BQ Condensed;
                font-weight: bold;
                color: #ffffff;
                height: 20px;
                line-height: 20px;
              }
              .lable {
                margin-right: 17px;
                font-size: 16px;
                font-family: PingFang SC;
                font-weight: 500;
                color: #bcdbe8;
              }
            }
          }
          .WLYQ {
            background: url(~@/assets/images/WLYQ_card.png) no-repeat;
            background-size: 100% 100%;
            .flexrow {
              width: 100%;
              display: flex;
              justify-content: flex-end;
              text-align: center;
              .value {
                margin-top: 20px;
                margin-right: 17px;
                margin-bottom: 13px;
                font-size: 20px;
                font-family: Akzidenz-Grotesk BQ Condensed;
                font-weight: bold;
                color: #ffffff;
                height: 20px;
                line-height: 20px;
                text-align: center;
              }
              .lable {
                margin-right: 17px;
                font-size: 16px;
                font-family: PingFang SC;
                font-weight: 500;
                color: #bcdbe8;
              }
            }
          }
          .SCJG {
            background: url(~@/assets/images/SCJG_card.png) no-repeat;
            background-size: 100% 100%;
            .flexrow {
              width: 100%;
              display: flex;
              justify-content: flex-end;
              text-align: center;
              .value {
                margin-top: 20px;
                margin-right: 17px;
                margin-bottom: 13px;
                font-size: 20px;
                font-family: Akzidenz-Grotesk BQ Condensed;
                font-weight: bold;
                color: #ffffff;
                height: 20px;
                line-height: 20px;
                text-align: center;
              }
              .lable {
                font-size: 16px;
                font-family: PingFang SC;
                font-weight: 500;
                color: #bcdbe8;
              }
            }
          }
          .SZCG {
            background: url(~@/assets/images/SZCG.png) no-repeat;
            background-size: 100% 100%;
            .flexrow {
              display: flex;
              justify-content: space-between;
              .value {
                margin-top: 30px;
                margin-left: 37px;
                font-size: 20px;
                font-family: Akzidenz-Grotesk BQ Condensed;
                font-weight: bold;
                color: #ffffff;
                height: 20px;
                line-height: 20px;
                .unit {
                  font-size: 18px;
                  font-family: PingFang SC;
                  font-weight: 400;
                }
              }
              .lable {
                padding-top: 30px;
                margin-right: 12px;
                height: 91px;
                font-size: 16px;
                font-family: PingFang SC;
                font-weight: 500;
                color: #bcdbe8;
              }
            }
          }
          .KQZL {
            background: url(~@/assets/images/KQZL.png) no-repeat;
            background-size: 100% 100%;
            .flexrow {
              display: flex;
              justify-content: space-between;
              height: 91px;
              text-align: center;
              .left {
                padding-left: 10px;
              }
              .value {
                margin-top: 15px;
                font-size: 20px;
                font-family: Akzidenz-Grotesk BQ Condensed;
                font-weight: bold;
                color: #ffffff;
                height: 20px;
                line-height: 20px;
                margin-bottom: 16px;
              }
              .lable {
                font-size: 16px;
                font-family: PingFang SC;
                font-weight: 500;
                color: #bcdbe8;
              }
              .left {
                .value {
                  color: #96f0c7;
                }
              }
            }
          }
        }
      }
    }
  }
  /* & div:nth-child(2) {
    display: flex;
  } */
}
</style>
