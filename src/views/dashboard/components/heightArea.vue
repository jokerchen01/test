<template>
  <section class="heightArea">
    <div class="title">高发区域</div>
    <div class="table" v-if="list.length > 0">
      <div class="head">
        <div class="colum_item">排名</div>
        <div class="colum_item">街道</div>
        <div class="colum_item">网格</div>
        <div class="colum_item">数量</div>
      </div>
      <div class="table_main">
        <div v-for="(v, i) in list" :key="i" class="tr">
          <el-tooltip placement="top">
            <div slot="content">{{ i + 1 }}</div>
            <div class="colum_item">{{ i + 1 }}</div>
          </el-tooltip>
          <el-tooltip placement="top">
            <div slot="content">{{ v.street }}</div>
            <div class="colum_item">{{ v.street }}</div>
          </el-tooltip>
          <el-tooltip placement="top">
            <div slot="content">{{ v.text }}</div>
            <div class="colum_item">{{ v.text }}</div>
          </el-tooltip>
          <el-tooltip placement="top">
            <div slot="content">{{ v.num }}</div>
            <div class="colum_item">{{ v.num }}</div>
          </el-tooltip>
        </div>
      </div>
    </div>
    <div v-else class="no_data"></div>
  </section>
</template>

<script>


export default {
  data() {
    return {
      list: [{ "street": "茶店子街道", "num": 1, "text": "锦城社区网格5" }, { "street": "茶店子街道", "num": 1, "text": "奥林社区网格7" }, { "street": "茶店子街道", "num": 1, "text": "化成社区网格1" }, { "street": "茶店子街道", "num": 1, "text": "茶店子街道执法中队" }, { "street": "茶店子街道", "num": 1, "text": "育新社区网格3" }, { "street": "茶店子街道", "num": 1, "text": "育新社区网格4" }, { "street": "茶店子街道", "num": 1, "text": "育新社区网格8" }, { "street": "茶店子街道", "num": 1, "text": "奥林社区网格8" }, { "street": "茶店子街道", "num": 1, "text": "育新社区网格12" }, { "street": "茶店子街道", "num": 1, "text": "育新社区网格13" }, { "street": "茶店子街道", "num": 1, "text": "黄忠社区网格3" }, { "street": "茶店子街道", "num": 1, "text": "化成社区网格2" }],
    };
  },
  created() {

  },
  methods: {

  },
};
</script>

<style lang="scss" scoped>
.heightArea {
  margin-top: 16px;
  width: 100%;
  height: 200px;
  box-sizing: border-box;
  padding: 0 0 0 10px;
  position: relative;

  .title {
    width: 451px;
    height: 31px;
    background: url("~@/assets/images/two_title_8.png") no-repeat;
    background-size: 100% 100%;

    box-sizing: border-box;
    padding-left: 38px;


    font-family: ShiShangZhongHeiJianTi;
    color: #FFFFFF;

    display: flex;
    align-items: center;
  }

  .table {
    width: 415px;
    margin-top: 16px;

    .head {
      /*   background: url('~@images/eventHand/event_higt_head_bg.png') no-repeat; */
      background-size: 100% 100%;
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-right: 10px;

    }

    .table_main {
      height: 125px;
      overflow-y: auto;

      .tr {
        background-size: 100% 100%;
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-right: 10px;
        transition: all 0.5s;

        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #BCDBE8;

        .colum_item {
          font-family: PingFang SC;
          font-weight: 500;
          color: #BCDBE8;
        }

        &:hover {
          /*  background: url("~@images/eventHand/event_high_item_bg_active.png") no-repeat !important; */
          background-size: 100% 100%;
        }
      }

      &>.tr:nth-child(2n) {
        /*  background: url("~@images/eventHand/event_high_item_bg.png") no-repeat; */
        background-size: 100% 100%;
      }
    }

    .colum_item {
      width: 110px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: center;

      font-size: 18px;
      font-family: ShiShangZhongHeiJianTi;
      color: #FFFFFF;

      &:first-child {
        width: 80px;
      }

      &:last-child {
        width: 80px;
      }
    }
  }
}</style>
