<template>
  <section class="container">
    <!-- <section class="dialog_summarize">
      <div class="dialog_summarize_item">
        <p class="sum_text">餐饮企业总数</p>
        <div class="sum_bg"></div>
        <div class="sum_num">{{ obj.CYQYZS }}</div>
      </div>
      <div class="dialog_summarize_item">
        <p class="sum_text">在线监测企业数量</p>
        <div class="sum_bg"></div>
        <p class="sum_num">{{ obj.ZXJCQYSL }}</p>
      </div>
      <div
        class="dialog_summarize_item"
        :class="{ active: tabValue === 'excessCase' }"
        @click="changeTab('excessCase')"
      >
        <p class="sum_text">超标案件数量</p>
        <div class="sum_bg"></div>
        <p class="period">{{ obj.CBAJSL }}</p>
      </div>
      <div
        class="dialog_summarize_item"
        :class="{ active: tabValue === 'cookFumeDisturbResidents' }"
        @click="changeTab('cookFumeDisturbResidents')"
      >
        <p class="sum_text">餐饮油烟扰民投诉数量</p>
        <div class="sum_bg"></div>
        <p class="sum_num">{{ obj.CYYYRMTSSL }}</p>
      </div>
    </section> -->
    <section class="dialog_summarize">
      <div>
        <span>餐饮企业总数</span>
        <p>5413</p>
      </div>
      <div @click="addPointHandle">
        <span>在线监测企业数</span>
        <p>748</p>
      </div>
      <div
        :class="{ active: tabValue === 'excessCase' }"
        @click="changeTab('excessCase')"
      >
        <span>超标案件数</span>
        <p class="period">33</p>
      </div>
      <div
        :class="{ active: tabValue === 'cookFumeDisturbResidents' }"
        @click="changeTab('cookFumeDisturbResidents')"
      >
        <span>餐饮油烟扰民投诉数</span>
        <p>0</p>
      </div>
    </section>
    <el-dialog
      :visible.sync="showBigImg"
      :modal-append-to-body="false"
      :modal="false"
      width="820px"
      height="1120px"
      top="6.8vh"
      class="big_img"
    >
      <img width="780px" height="1120px" :src="dialogImageUrl" alt="" />
    </el-dialog>
    <component
      :is="tabValue"
      :obj="obj"
      @changeTab="changeTab"
      @showBigImage="showBigImage"
    ></component>
  </section>
</template>

<script>
import cookFumeObserve from "./cookFumeObserve.vue";
import cookFumeDisturbResidents from "./cookFumeDisturbResidents.vue";
import excessCase from "./excessCase.vue";

export default {
  name: "UsrbanManage",
  components: { cookFumeObserve, cookFumeDisturbResidents, excessCase },
  data() {
    return {
      obj: {}, // 指标数据
      tabValue: "cookFumeObserve",
      showBigImg: false,
      dialogImageUrl: "",
    };
  },
  mounted() {
    //this.initData();
    // this.$api.eventpivot
    //       .getTiZheng({ indicatorId: "46d3213a9fbe4d85ac0c3e8d49b0d12c" })
    //       .then((res) => {
    //         console.log('右眼投诉： ', res);
    //         resolve(true);
    //       });
  },
  methods: {
    showBigImage(url) {
      this.showBigImg = true;
      this.dialogImageUrl = url;
    },
    changeTab(name) {
      this.tabValue = name;
    },
 /*    initData() {
      let json = {
        dateCode: ["nw"],
      };
      // 餐饮企业总数
      const CYQYZS = new Promise((resolve) => {
        this.$api.operationSituaty.getIndicatorsTarget('468690dcd8c84e819cb73ab78b234a67').then((res) => {
          this.$set(this.obj, "CYQYZS", res[0].value);
          resolve(true);
        });
      });
      // 在线监测企业数量
      const ZXJCQYSL = new Promise((resolve) => {
        this.$api.operationSituaty.getIndicatorsTarget("046295dd09084b9aa44b13c1fae4df41").then((res) => {
          this.$set(this.obj, "ZXJCQYSL", res[0].value);
          resolve(true);
        });
      });
      // 超标案件数量
      const CBAJSL = new Promise((resolve) => {
        this.$api.operationSituaty.getIndicatorsTarget("faba06d91dc247a180439448b5ffcfb3").then((res) => {
          this.$set(this.obj, "CBAJSL", res[0].value);
          resolve(true);
        });
      });
      // 餐饮油烟扰民投诉数量
      const CYYYRMTSSL = new Promise((resolve) => {
        this.$api.operationSituaty.getIndicatorsTarget("46d3213a9fbe4d85ac0c3e8d49b0d12c").then((res) => {
          this.$set(this.obj, "CYYYRMTSSL", res[0].value);
          resolve(true);
        });
      });
      // 餐饮许可审查通过数量
      const CYSKSCTGSL = new Promise((resolve) => {
        this.$api.operationSituaty.getIndicatorsTarget("335ca049d0e047d18013bac614431b4c").then((res) => {
          this.$set(this.obj, "CYSKSCTGSL", res[0].value);
          resolve(true);
        });
      });
      // 审查不通过数量
      const SCBTGSL = new Promise((resolve) => {
        this.$api.operationSituaty.getIndicatorsTarget("53899771728e42a4803654c372c329fa").then((res) => {
          this.$set(this.obj, "SCBTGSL", res[0].value);
          resolve(true);
        });
      });
     
    }, */
    addPointHandle() {
   
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .big_img {
  .el-dialog {
    margin-left: 1050px !important;
    .el-icon-close {
      font-size: 20px;
      line-height: 30px;
      font-weight: 800;
    }
  }
}
.container {
  // .dialog_summarize {
  //   width: 100%;
  //   height: 153px;
  //   display: flex;
  //   justify-content: space-between;
  //   align-items: center;
  //   .active {
  //     background: url(~@/assets/images/cook_fume_management_bg.png) no-repeat center;
  //     background-size: 100% 100%;
  //   }
  //   &_item {
  //     width: 25%;
  //     height: 100%;
  //     position: relative;
  //     cursor: pointer;
  //     text-align: center;
  //     .sum_text {
  //       font-size: 20px;
  //       font-family: PingFangSC-Medium, PingFang SC;
  //       font-weight: 500;
  //       color: #ffffff;
  //       line-height: 24px;
  //       letter-spacing: 1px;
  //       // padding-top: 0.039063rem; /* 15 / 384 */
  //       // padding-left: 0.052083rem;
  //     }
  //     .sum_bg {
  //       background: url(~@/assets/images/sum_bg.png) 100% 100%
  //         no-repeat;
  //       height: 19px;
  //       position: absolute;
  //       width: 84px;
  //       // left: 8px;
  //       // top: 26px;
  //       left: -6px;
  //       top: 5px;
  //     }
  //     .period {
  //       font-size: 40px;
  //       font-family: DINPRO;
  //       font-weight: bold;
  //       color: #ffffff;
  //       line-height: 49px;
  //       letter-spacing: 1px;
  //       background: linear-gradient(180deg, #ffffff 0%, #f37777 100%);
  //       -webkit-background-clip: text;
  //       -webkit-text-fill-color: transparent;
  //       // padding-left: 42px;
  //       padding-top: 21px;
  //     }
  //     .sum_num {
  //       font-size: 40px;
  //       font-family: DINPRO;
  //       font-weight: bold;
  //       color: #ffffff;
  //       line-height: 49px;
  //       letter-spacing: 1px;
  //       background: linear-gradient(180deg, #ffffff 0%, #b9e7ff 100%);
  //       -webkit-background-clip: text;
  //       -webkit-text-fill-color: transparent;
  //       // padding-left: 42px;
  //       padding-top: 20px;
  //       display: flex;
  //     }
  //   }
  // }
  .dialog_summarize {
    display: flex;
    width: 100%;
    height: 153px;
    justify-content: space-between;
    align-items: center;
    .active {
      background: url(~@/assets/images/cook_fume_management_bg.png)
        no-repeat center;
      background-size: 100% 100%;
    }
    & > div {
      flex: 1;
      text-align: center;
      &:nth-child(3),
      &:nth-child(4) {
        cursor: pointer;
      }
      & > span {
        display: inline-block;
        font-size: 18px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        line-height: 24px;
       /*  background: url(~@/assets/images/sum_bg.png) 100% 100%
          no-repeat; */
      }
      .period {
        font-size: 30px;
        font-family: DINPRO;
        font-weight: bold;
        color: #ffffff;
        line-height: 49px;
        background: linear-gradient(180deg, #ffffff 0%, #f37777 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        padding-top: 21px;
      }
      & > p {
        font-size: 30px;
        font-family: DINPRO;
        font-weight: bold;
        color: #ffffff;
        line-height: 49px;
        background: linear-gradient(180deg, #ffffff 0%, #b9e7ff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        padding-top: 20px;
      }
    }
  }
}
</style>
