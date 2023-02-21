<template>
  <section class="container">
    <div class="menu-box">
      <div
        :class="{ 'menu-item': true, active: item.id == active }"
        v-for="item in menu"
        :key="item.id"
        @click="changeMenu(item.id, item.component)"
      >
        {{ item.title }}
      </div>
    </div>
    <div class="content">
      <component :is="component"></component>
    </div>
  </section>
</template>

<script>
/* import GasIntroduction from "./GasIntroduction";
import Gasdistribution from "./Gasdistribution"; */
import GasRisk from "./GasRisk";
import GasServeTable from "./GasServeTable";
import GasRepair from "./GasRepair";
/* import { addPoitAirOrWater } from "@/components/Map/utils/layer"; */
const menu = [
  {
    id: 1,
    title: "燃气基本信息",
    component: "GasServeTable",
  },

  {
    id: 2,
    title: "风险管线信息",
    component: "GasRisk",
  },

  {
    id: 3,
    title: "抢险急修信息",
    component: "GasRepair",
  },
];
export default {
  name: "GasSafety",
  data() {
    return {
      component: "GasRisk",
      firstHalfGrp: "--",
      menu: menu,
      active: 2,
    };
  },
  components: {
    /*   GasIntroduction,
    Gasdistribution, */
    GasRisk,
    GasServeTable,
    GasRepair,
  },
  watch: {
    active(newVal) {
      if (newVal == 1) {
     /*    addPoitAirOrWater("燃气公司驻点"); */
      }
    },
  },
  mounted() {},
  methods: {
    changeMenu(id, component) {
      this.active = id;
      this.component = component;
    },
  },
};
</script>

<style lang="scss" scoped>
.menu-box {
  margin-bottom: 5px;
}
.container {
  .menu-box {
    display: flex;
    justify-content: space-around;
    // justify-content: flex-start;
    flex-wrap: wrap;

    .menu-item {
      cursor: pointer;
      margin: 15px 0;
      text-align: center;
      font-weight: bold;
      color: white;
      line-height: 26px;
    font-size: 16px;
    height: 26px;
      background: url("~@/assets/images/economic/item_bg.png");
      background-size: 100% 100%;
      margin-right: 5px;
      padding: 0 10px;
      width: 210px;

      &:hover {
        background: url("~@/assets/images/economic/item_bg_active.png");
        background-size: 100% 100%;
      }
    }
    .active {
      background: url("~@/assets/images/economic/item_bg_active.png");
      background-size: 100% 100%;
    }
  }

  .gdp_row {
    width: 100%;
    height: 276px;
    display: flex;
    &_right {
      width: 267px;
      height: 100%;
      padding-right: 44px;
      position: relative;
      .gdp_title {
        width: 233px;
        height: 45px;
        background: url(~@/assets/images/common/gdp_bg.png) no-repeat;
        background-size: 100%;
        font-size: 20px;
        font-family: PingFang SC;
        color: #ffffff;
        line-height: 45px;
        text-align: center;
      }
      .right_title {
        width: 262px;
        height: 30px;
        background: url(~@/assets/images/common/right_tab_title_bg.png)
          no-repeat;
        background-size: 100%;
        font-size: 22px;
        font-family: PangMenZhengDao;
        color: #ffffff;
        padding-left: 24px;
        line-height: 30px;
      }
      .gdp_num {
        height: 73px;
        text-align: center;
        margin-top: 22px;
        &_vlaue {
          width: 233px;
          font-size: 38px;
          line-height: 1;
          font-family: DINPro;
          font-weight: bold;
          color: #ffffff;
          background: linear-gradient(0deg, #e6cd98 0%, #e0f3ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          padding-bottom: 14px;
        }
        &_unit {
          width: 233px;
          font-size: 18px;
          font-family: PingFang SC;
          color: #ffffff;
        }
      }
      .gdp_num_bg {
        margin-left: 33px;
        width: 171px;
        height: 133px;
        background: url(~@/assets/images/common/gdp_num_bg.png) no-repeat;
        background-size: 100%;
        position: absolute;
        bottom: 25px;
      }
      .compared_same {
        width: 184px;
        height: 40px;
        position: absolute;
        bottom: 20px;
        left: 28px;
        .compared_same_bg {
          height: 18px;
          background: url(~@/assets/images/common/compared_same_bg.png)
            no-repeat;
          background-size: 100%;
        }
        .cs_num_box {
          display: flex;
          position: absolute;
          bottom: 30px;
          left: 33px;
          height: 30px;
          line-height: 30px;

          .cs_title {
            font-size: 18px;
            font-family: PingFang SC;
            color: #ffffff;
          }
          .up_icon {
            margin-left: 5px;
            margin-right: 8px;
            margin-top: 7px;
            width: 11px;
            height: 14px;
            background: url(~@/assets/images/common/up_icon.png) no-repeat;
            background-size: 100%;
          }
          .cs_num {
            font-size: 26px;
            font-family: DINPRO;
            font-weight: bold;
            color: #ffffff;
            background: linear-gradient(0deg, #92e4ba 0%, #ffffff 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
      }
    }
    &_left {
      width: 700px;
      height: 100%;
      margin-left: 43px;
      .left_title {
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
    }
  }

  .echart_dom {
    width: 100%;
    height: 234px;
  }

  .dialog_summarize {
    width: 100%;
    height: 96px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 15px;

    &_item {
      width: 45%;
      height: 100%;
      position: relative;

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

      .sum_bg {
        background: url(~@/assets/images/sum_bg.png) 100% 100%
          no-repeat;
        height: 20px;
        position: absolute;
        width: 100%;
        left: -243px;
        top: 5px;
      }

      .sum_num {
        font-size: 40px;
        font-family: DINPRO;
        font-weight: bold;
        color: #ffffff;
        line-height: 49px;
        letter-spacing: 1px;
        background: linear-gradient(180deg, #ffffff 0%, #b9e7ff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        padding-left: 42px;
        padding-top: 21px;
        display: flex;
        .retail_sales_total {
          width: 109px;
          font-size: 38px;
          line-height: 1;
          font-family: DINPro;
          font-weight: bold;
          color: #ffffff;
          background: linear-gradient(0deg, #e6cd98 0%, #e0f3ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .retail_sales_unit {
          width: 50px;
          height: 17px;
          font-size: 18px !important;
          font-family: PingFang SC;
          color: #ffffff;
        }
        .retail_sales_ratio {
          font-size: 24px;
          font-family: DINPRO;
          font-weight: bold;
          color: #ffffff;
          background: linear-gradient(0deg, #92e4ba 0%, #ffffff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .down_icon {
          margin-left: 2px;
          margin-right: 8px;
          margin-top: 18px;
          width: 11px;
          height: 14px;
          background: url(~@/assets/images/common/down_icon.png) no-repeat;
          background-size: 100%;
        }
      }
    }
  }
}
</style>
