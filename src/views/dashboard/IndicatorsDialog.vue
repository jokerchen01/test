<template>
  <section class="container_indicator_diaglog">
    <transition name="leftDialog">
      <section v-show="showDialog" class="obscuration"></section>
    </transition>
    <section class="target_content" :class="{ activeMove: showDialog }">
      <div v-show="showDialog" class="title_box_color">
        <div class="top_box focus_active">
          <div class="bg_img">
            <div class="bg_top">
              <div class="head_icon"></div>
              <div class="cell_icon"></div>
            </div>
            <div class="line_icon"></div>
          </div>
          <div class="top_title">{{ indicatorsInfo.name }}</div>

          <div class="top_content" v-if="!indicatorsInfo['cut']">
            <div
              v-for="(item, index) in indicatorsInfo.childInfo"
              :key="index"
              class="contont_item"
            >
              <div class="title">{{ item.name }}</div>
              <span class="title_unit">{{ item.value }}</span>
              <span class="unit">{{ item.unit }}</span>
            </div>
          </div>

          <div v-else style="width: 225px">
            <el-carousel
              @change="change"
              :autoplay="false"
              arrow="always"
              indicator-position="none"
              height="130px"
            >
              <el-carousel-item
                v-for="(item, index) in indicatorsInfo.childInfo"
                :key="index"
              >
                <div class="cut-contont_item">
                  <div class="title">{{ item.name }}</div>
                  <span class="title_unit">{{ item.value }}</span>
                  <span class="unit">{{ item.unit }}</span>
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </div>
      <img
        v-show="showDialog"
        src="@/assets/images/close_pup.png"
        class="img"
        @click.stop="handleClose"
      />
    </section>

    <section class="inspection_dialog" :class="{ showMove: showDialog }">
      <section v-if="showDialog" class="bgColor">
        <component
          :is="type"
          :indicatorsInfo="indicatorsInfo"
          ref="componentRef"
          :cutIndex="cutIndex"
        />
        <section
          class="dialog_footer"
          :class="{ footer_mt: ['inspection'].includes(type) }"
          :style="{ marginTop: type === 'areas' ? '80px' : '' }"
        >
          <div class="inspection_divider">
            <div class="inspection_divider_left"></div>
            <div class="inspection_divider_center"></div>
            <div class="inspection_divider_right"></div>
          </div>
          <div class="btn_box">
            <div class="footer_left">指标来源：{{ indexSource }}</div>
            <div
              class="city_good"
              v-if="
                [
                  'touristAccommodation',
                  'consumption',
                  'usrbanManage',
                  'eNetcom',
                  'waterPup',
                  'airPup',
                  'networkEvent',
                  'productionSafety',
                  'gridGovernance',
                  'epidemic',
                ].includes(type)
              "
            >
              {{ footerCenterBtn }}
            </div>
            <div
              class="event_handlebox"
              :style="{ 'margin-top': type === 'consumption' ? '0' : '12px' }"
              @click.stop="clickGenerateEvent(type)"
            ></div>
          </div>
        </section>

        <!--   <GenerateEvent ref="creatEvent" /> -->
      </section>
    </section>
  </section>
</template>

<script>
/* import GenerateEvent from "./GenerateEvent.vue"; */

import usrbanManage from "./Urbanlampblack"; // 数字城管加油烟监测
import InternetPublicOpinion from "./InternetPublicOpinion/index.vue";
import SocialStability from "./socialStability/index.vue";
import airPup from "./airPup/index.vue";
import FireControlSafetyDialog from "./fireControlSafetyDialog.vue";
import RoadSafetyDialog from "./roadSafetyDialog.vue";
import gasSafetyDialog from "./GasSafety/index.vue";
import MarketRegulation from "./marketRegula/index.vue";

export default {
  data() {
    return {
      cutIndex: 0,
    };
  },
  name: "IndicatorsDialog",
  props: {
    show: Boolean,
    type: String,
    indexSource: String,
    indicatorsInfo: Object,
    diaLogBg: String,
  },
  components: {
    fireControlSafetyDialog: FireControlSafetyDialog,
    internetPublicOpinion: InternetPublicOpinion,
    socialStability: SocialStability,

    roadSafetyDialog: RoadSafetyDialog,
    usrbanManage,
    /*   GenerateEvent, */
    airPup,
    gasSafetyDialog,
    marketRegulation: MarketRegulation,
  },
  computed: {
    showDialog: {
      get() {
        return this.show;
      },
    },
    footerCenterBtn() {
      if (this.type === "consumption") {
        return "城市美好生活指数";
      } else if (this.type === "touristAccommodation") {
        return "区智慧文旅平台";
      } else if (this.type === "usrbanManage") {
        return "城市管家平台";
      } else if (this.type == "eNetcom") {
        return "金牛区'云勘察+云监督'平台";
      } else if (this.type == "waterPup") {
        return "环保环卫一体化平台";
      } else if (this.type == "airPup") {
        return "环保环卫一体化平台";
      } else if (this.type == "networkEvent") {
        return "网络信息感知平台";
      } else if (this.type == "productionSafety") {
        return "成都金牛区应急管理平台";
      } else if (this.type == "gridGovernance") {
        return "金牛区智慧蓉城综治平台";
      } else if (this.type == "epidemic") {
        return "金牛区智慧社区综合应用平台";
      }
      return "";
    },
  },
  methods: {
    change(val) {
      this.$emit("change", val);
      this.cutIndex = val;
    },

    handleClose() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.obscuration {
  position: fixed;
  //width: 1135px;
  width: 1000px;
  height: 920px;
  // background-color: rgba(11, 27, 39, 0.8);
  //background-image: linear-gradient(
  //  90deg,
  //  rgba(2, 20, 37, 0.8) 80%,
  //  rgba(2, 20, 37, 0.8) 20%,
  //  hsla(0deg, 0%, 100%, 0)
  //);
  background-color: rgba(11, 27, 39, 0.8) !important;
  top: 0;
  left: 0;
  z-index: 9;
}
.top_box {
  max-width: 640px;
  height: 128px;
  position: relative;
  .bg_img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 128px;
    .bg_top {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .head_icon {
        width: 100px;
        height: 30px;
        background: url("~@/assets/images/head_icon.png") no-repeat;
      }
      .cell_icon {
        width: 100px;
        height: 12px;
        background: url("~@/assets/images/cell_icon.png") no-repeat;
        background-size: 100% 100%;
      }
    }
    .line_icon {
      width: 100%;
      height: 3px;
      background: url("~@/assets/images/line_icon.png") no-repeat;
      background-size: 100% 100%;
    }
  }
  .top_title {
    width: 100%;
    padding: 4px 0 0 34px;
    font-size: 24px;
    font-family: PangMenZhengDao-3, PangMenZhengDao;
    font-weight: normal;
    color: #ffffff;
    line-height: 25px;
    letter-spacing: 1px;
    background: linear-gradient(180deg, #ffffff 0%, #5689b0 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .top_content {
    display: flex;
    .contont_item {
      padding-top: 15px;
      min-width: 225px;
      text-align: center;
      .title {
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        line-height: 24px;
        letter-spacing: 1px;
      }

      .title_unit {
        font-size: 30px;
        font-family: DINPRO;
        font-weight: bold;
        color: #ffffff;
        line-height: 49px;
        letter-spacing: 1px;
        background: linear-gradient(180deg, #ffffff 0%, #b9e7ff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .unit {
        font-size: 20px;
        font-family: DINPRO;
        font-weight: bold;
        color: #ffffff;
        line-height: 49px;
        letter-spacing: 1px;
        background: linear-gradient(180deg, #ffffff 0%, #b9e7ff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }
}
.img {
  position: fixed;
  top: 100px;
  left: 925px;
  display: inline-block;
  width: 24px;
  height: 24px;
  cursor: pointer;
  z-index: 99999;
}
.focus_active {
  z-index: 2300;
}

.content_bg {
  background: rgb(12 44 69);
}
.pa_content_bg {
  background: #0a232a;
}
.ps_content_bg {
  background: rgb(36 30 27);
}

.target_content {
  width: auto;
  height: 128px;
  padding: 5px 5px 0 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
  position: fixed;
  top: 500px;
  left: 218px;
  transition: all 0.3s linear;
  transition-delay: 0.1s;
  &.activeMove {
    top: 15px;
  }
  .hand {
    cursor: pointer;
  }
}

.footer_mt {
  margin-top: 15px;
}
.inspection_dialog {
  position: fixed;
  top: -73px;
  left: 220px;
  z-index: 999;
  color: #fff;
  width: 740px;
  height: 0px;
  overflow: auto;
  margin-top: 224px;
  transition: all 0.6s linear;
  transition-delay: 0.55s;
  &.showMove {
    height: 760px;
  }
  .dialog_footer {
    margin-top: 24px;
    text-align: left;
    .btn_box {
      display: flex;
      justify-content: space-between;
      align-content: center;
      align-items: center;
      margin-top: 17px;

      .footer_left {
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffbc90;
        line-height: 12px;
        letter-spacing: 1px;
      }

      .city_good {
        padding: 0 15px;
        height: 50px;
        background: url(~@/assets/images/chengshimeihao.png) no-repeat;
        background-size: 100% 100%;
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #ffffff;
        text-align: center;
        line-height: 50px;
        cursor: pointer;
      }

      .event_handlebox {
        z-index: 3;
        /*  background: url(~@/assets/images/generate_event_btn.png); */
        background-size: 100% 100%;
        width: 136px;
        height: 40px;
        cursor: pointer;
        float: right;
        margin-top: 12px;
      }
    }
  }

  .container_indicator_diaglog {
    ::v-deep {
      .el-dialog {
        margin-top: 142px !important;
        margin-left: 25px !important;
        max-height: 1160px;
        overflow-y: auto;
        width: 970px;
      }
      .el-dialog__body {
        padding: 30px !important;
      }
    }
  }

  ::v-deep {
    .el-button--small {
      font-size: 0.052083rem /* 20/384 */;
    }

    .el-dialog__header {
      padding: 0.023438rem /* 9/384 */ 0.072917rem /* 28/384 */ 0.026042rem
        /* 10/384 */ 0.036258rem /* 14/384*/;
      display: flex;
      align-items: center;

      .el-dialog__headerbtn {
        top: 0.078125rem /* 30/384 */;
      }
    }

    .el-dialog__footer {
      padding: 10px 0;
    }

    .el-dialog {
      background: url("~@/assets/images/矩形 505.png") no-repeat;
      background-size: 100% 100%;
      background-position: center center;
    }

    .el-dialog__title {
      color: #fff;
    }

    .el-form-item__label {
      color: #fff;
      font-size: 0.052083rem /* 20/384 */;
    }

    .el-input__inner,
    .el-date-editor.el-input__inner {
      //width: 1.119792rem /* 430/384 */;
      // background: #3a769d;
      // border-color: #3a769d;
      color: rgba(255, 255, 255, 1);
      font-size: 16px;
      font-weight: 500;
      width: 160px;
      height: 26px;
    }
    .el-input__icon {
      line-height: 26px;
    }

    .el-date-editor .el-range-input {
      // background: #3a769d;
      color: #fff;
    }

    .el-table::before {
      background-color: unset;
    }

    // 表格
    .el-table {
      font-family: PingFangSC-Medium, PingFang SC;

      &__empty-block,
      &__body-wrapper {
        // background: #0f3555;
      }

      &__header {
        color: #fff;
        // background: rgba($color: #061a20, $alpha: 0.1);
        color: #bcdbe8 !important;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 500;
      }

      &__fixed-right::before,
      &__fixed::before {
        background-color: unset;
      }

      th.el-table__cell {
        color: #fff;
        // background: rgba($color: #061a20, $alpha: 0.1);
        color: #bcdbe8 !important;
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 500;
      }

      tr {
        background: rgba($color: #5db8ff, $alpha: 0.1) !important; //123545
        color: #fff;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 500;
      }

      tbody tr:hover > td {
        font-size: 18px;
      }

      .el-table__cell {
        font-size: 18px;
      }

      td.el-table__cell,
      th.el-table__cell.is-leaf {
        border-bottom: none;
      }

      th.el-table__cell.header_cell {
        border-bottom: none;
        padding-top: 0.028135rem;
        background: transparent;
      }

      .el-table__fixed-right {
        background: rgba($color: #0a2833, $alpha: 1);
        height: 100% !important;
      }
      .el-table__fixed {
        background: rgba($color: #0a2833, $alpha: 1);
        height: 100% !important;
      }
    }
    .el-table--enable-row-hover .el-table__body tr:hover > td {
      background: rgba($color: #0a2833, $alpha: 0.3) !important;
    }
    .el-table--border::after,
    .el-table--group::after,
    .el-table::before {
      background-color: none !important;
      z-index: 0;
    }

    .el-tooltip__popper is-dark {
      font-size: 0.052083rem /* 20/384 */ !important;
    }

    .el-tooltip__popper {
      font-size: 0.052083rem /* 20/384 */ !important;
    }

    .el-dialog__headerbtn {
      font-size: 0.083333rem /* 32/384 */;
    }
  }
}

.inspection_divider {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  &_left,
  &_right {
    width: 10px;
    height: 1px;
    border-bottom: 1px solid #8bb6d8;
  }

  &_center {
    width: 100%;
    height: 1px;
    opacity: 0.44;
    border-bottom: 1px solid #8bb6d8;
  }
}

.title_box_color {
  background-color: #0a2833;
}
.bgColor {
  padding: 30px;
  background: url("~@/assets/images/new_pupbg.png") 100% 100% no-repeat;
  background-size: 100% 100%;
}
.leftDialog-enter-active {
  transition: all 0.3s linear;
}
.leftDialog-leave-active {
  transition: all 0.6s linear;
}
.leftDialog-enter {
  opacity: 0;
  transform: translateY(970px);
}
.leftDialog-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.leftDialog-leave {
  opacity: 1;
  transform: translateY(0);
}
.leftDialog-leave-to {
  opacity: 0;
  // transform: translateY(970px);
}
.title {
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  line-height: 24px;
  letter-spacing: 1px;
}

.title_unit {
  font-size: 40px;
  font-family: DINPRO;
  font-weight: bold;
  color: #ffffff;
  line-height: 49px;
  letter-spacing: 1px;
  background: linear-gradient(180deg, #ffffff 0%, #b9e7ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.unit {
  font-size: 20px;
  font-family: DINPRO;
  font-weight: bold;
  color: #ffffff;
  line-height: 49px;
  letter-spacing: 1px;
  background: linear-gradient(180deg, #ffffff 0%, #b9e7ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.cut-contont_item {
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  // margin-top: 20px;
  padding-top: 15px;
  width: 225px;
  text-align: center;
}
</style>
