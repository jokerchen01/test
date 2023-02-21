<template>
  <section class="coordination">
    <div class="title">协同单位排行</div>
    <div class="table">
      <!--      <div class="head">-->
      <!--        <div class="colum_item">排名</div>-->
      <!--        <div class="colum_item">事件分类</div>-->
      <!--        <div class="colum_item">数量</div>-->
      <!--      </div>-->
      <div class="table_main">
        <!--        <div-->
        <!--          class="tr"-->
        <!--          v-for="(v, i) in list"-->
        <!--          :key="i"-->
        <!--          @click="openEventList(v)"-->
        <!--        >-->
        <!--          <div class="colum_item">{{ i + 1 }}</div>-->
        <!--          <div class="colum_item">{{ v.text }}</div>-->
        <!--          <div class="colum_item">{{ v.num }}</div>-->
        <!--        </div>-->
        <div class="table-item" v-for="(item, index) in list" :key="index">
          <el-tooltip placement="top">
            <div slot="content">{{ item.text }}</div>
            <div class="item-title">{{ item.text }}</div>
          </el-tooltip>

          <div class="item-value">
            <div class="bg-line">
              <p class="value-line" :style="{ width: item.roate + '%' }"></p>
            </div>
            <p class="value-num">{{ item.num }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      list: [],
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      let res = [
        { text: "金牛区消防救援大队", num: 2 },
        { text: "金牛区住建和交通局", num: 2 },
        { text: "金牛区住建和交通局", num: 2 },
        { text: "金牛区住建和交通局", num: 2 },
      ];
      this.list = res;
      if (this.list?.length) {
        let total = 0;
        this.list.forEach((item) => {
          total += Number.parseInt(item.num);
        });
        this.list.forEach((item) => {
          item.roate = ((Number.parseInt(item.num) / total) * 100).toFixed(1);
        });
        console.log("=============list", this.list);
      }
    },
    openEventList(v) {
      let json = {
        queryType: 1,
        tag: v.text,
      };
      this.$store.commit("getEventType", json);
    },
  },
};
</script>

<style lang="scss" scoped>
.coordination {
  margin-top: 16px;
  width: 100%;
  height: 180px;
  box-sizing: border-box;
  padding: 0 10px;
  .title {
    width: 451px;
    height: 31px;
    background: url("~@/assets/images/two_title_8.png") no-repeat;
    background-size: 100% 100%;

    box-sizing: border-box;
    padding-left: 38px;

    font-family: ShiShangZhongHeiJianTi;
    color: #ffffff;

    display: flex;
    align-items: center;
  }
  .table {
    margin-top: 9px;
    .head {
      /*    background: url(../../../../assets/images/newEvent/thead_box.png); */
      background-size: 100% 100%;
      width: 446px;
      height: 38px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-right: 10px;
    }
    .table_main {
      height: 155px;
      overflow-y: auto;
      .tr {
        /*  background: url(../../../../assets/images/newEvent/tr_box.png); */
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
        height: 32px;
        margin-top: 15px;
        display: flex;
        align-items: center;
        line-height: 1;
        .item-title {
          flex-shrink: 0;
          width: 109px;
          height: 100%;
          margin-right: 12px;
             background: url("~@/assets/images/event_xt_sort_bg.png") no-repeat;
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
            right: 0;
            top: -10px;
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
</style>
