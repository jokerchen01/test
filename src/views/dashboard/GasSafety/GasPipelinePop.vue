<template>
  <section v-if="status == 1" class="gaspiplelinepop">
    <div class="title">
      <div class="deatil_table_pop">燃气管道老化更新改造情况</div>
      <div class="go_back" @click="changeStaus"></div>
    </div>

    <div class="table_pop">
      <el-table style="width: 100%" max-height="600" :data="tableList">
        <el-table-column type="index" label="序号" width="70" align="center">
        </el-table-column>
        <el-table-column
          prop="xmmc"
          label="项目名称"
          :show-overflow-tooltip="true"
          align="center"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="pmssfypg"
          label="督办项目"
          :show-overflow-tooltip="true"
          align="center"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="jsnr"
          label="建设内容（拟开挖位置）"
          :show-overflow-tooltip="true"
          align="center"
          width="220"
        >
        </el-table-column>
        <el-table-column
          prop="ghsp"
          label="规划审批"
          :show-overflow-tooltip="true"
          align="center"
          width="160"
        >
        </el-table-column>
        <el-table-column
          prop="jhkgsj"
          label="开工时间"
          :show-overflow-tooltip="true"
          align="center"
          width="160"
        >
        </el-table-column>
      </el-table>
    </div>
  </section>
</template>

<script>
export default {
  name: "GasPipelinePop",
  props: ["status"],
  data() {
    return {
      tableList: [
        {
          xmmc: "金沙北二路中压燃气管道改造项目",
          pmssfypg: "是",
          jsnr: "预计改造D108中压燃气管道195米",
          jhkgsj: "2022年7月",
          ghsp: "通过",
        },
        {
          xmmc: "圃园南一路中压燃气管道改造项目",
          pmssfypg: "是",
          jsnr: "预计改造D108中压燃气管道248米",
          jhkgsj: "2022年7月",
          ghsp: "通过",
        },
        {
          xmmc: "圃园南二路中压燃气管道改造项目",
          pmssfypg: "",
          jsnr: "预计改造D89中压燃气管道70米",
          jhkgsj: "2022年8月",
          ghsp: "报规中\u2026\u2026",
        },
        {
          xmmc: "交桂一巷、二巷、三巷中压燃气管道改造项目",
          pmssfypg: "",
          jsnr: "预计改造D108中压燃气管道380米",
          jhkgsj: "2022年8月",
          ghsp: '"报规中\u2026\u2026',
        },
      ],
    };
  },
  mounted() {
    /*   this.reqRqaqGDLH(); */
  },
  methods: {
    changeStaus() {
      this.$emit("changeStatus", 0);
    },
    async reqRqaqGDLH() {
      let res = await this.$api.statePup.getRqaqGDLH();
      this.tableList = res;
    },
  },
};
</script>

<style lang="scss" scoped>
.gaspiplelinepop {
  width: 100%;
  color: #fff;
  .title {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 50px;
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 20px;
    .deatil_table_pop {
      line-height: 40px;
    }
    .go_back {
      display: block;
      width: 47px;
      height: 47px;
      background: url(~@/assets/images/qt_icon_fhuiq.png) 100% 100% no-repeat;
      cursor: pointer;
      margin-right: 50px;
    }
  }
  .table_pop {
    z-index: 2000;
    background-size: 100% 100%;
    height: auto;
    ::v-deep {
      .el-pagination.is-background .btn-next,
      .el-pagination.is-background .btn-prev,
      .el-pagination.is-background .el-pager li {
        width: 36px;
        height: 36px;
        line-height: 36px;
        background: rgba(174, 216, 255, 0.06);
        border-radius: 2px;
      }
      .el-pager li.active {
        width: 36px;
        height: 36px;
        background: rgba(174, 216, 255, 0.06);
        border-radius: 2px;
      }
      .footer {
        position: relative;
      }
      .totalCount {
        position: absolute;
        top: 10px;
        left: 0;
        font-size: 20px;
        color: #fff;
        .el-pagination.is-background .el-pager li:not(.disabled).active {
          width: 36px;
          height: 36px;
          background: rgba(174, 216, 255, 0.06);
          border-radius: 2px;
        }

        .el-pagination .el-input__inner {
          width: 36px !important;
        }
      }
    }
  }
}
</style>