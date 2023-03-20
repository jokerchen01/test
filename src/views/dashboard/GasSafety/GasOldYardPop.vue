<template>
  <section v-if="status == 3" class="gasoldyardpop">
    <div class="title">
      <div class="deatil_table_pop">成都燃气老旧院落改造明细表</div>
      <div class="go_back" @click="changeStaus"></div>
    </div>

    <div class="table_pop">
      <el-table style="width: 100%" max-height="600" :data="tableList">
        <el-table-column type="index" label="序号" width="70" align="center">
        </el-table-column>
        <el-table-column
          prop="xqmc"
          label="小区名称"
          align="center"
          width="220"
        >
        </el-table-column>
        <el-table-column
          prop="xxdz"
          label="详细地址"
          :show-overflow-tooltip="true"
          align="center"
          width="300"
        >
        </el-table-column>
        <el-table-column
          prop="ssjd"
          label="所属街道"
          :show-overflow-tooltip="true"
          align="center"
          width="160"
        >
        </el-table-column>
        <el-table-column
          prop="0922zt"
          label="目前状态"
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
  name: "GasOldYardPop",
  props: ["status"],
  data() {
    return {
      tableList: 

[{"0922zt":"完工","xqmc":"抚琴西北街1号","ssjd":"抚琴街办","fzr_phone":"18628330277","xxdz":"抚琴西北街1号","fzr":"廖长缨"},{"0922zt":"完工","xqmc":"抚琴西北街3号","ssjd":"抚琴街办","fzr_phone":"18628330277","xxdz":"抚琴西北街3号","fzr":"廖长缨"},{"0922zt":"完工","xqmc":"抚琴西北街30号","ssjd":"抚琴街办","fzr_phone":"18628330277","xxdz":"抚琴西北街30号","fzr":"廖长缨"},{"0922zt":"完工","xqmc":"抚琴西北街38号","ssjd":"抚琴街办","fzr_phone":"18628330277","xxdz":"抚琴西北街38号","fzr":"廖长缨"},{"0922zt":"完工","xqmc":"营门口路52号","ssjd":"抚琴街办","fzr_phone":"18628330277","xxdz":"营门口路52号","fzr":"廖长缨"},{"0922zt":"完工","xqmc":"五里墩路17号院","ssjd":"茶店子街办","fzr_phone":"18628330277","xxdz":"五里墩路17号院","fzr":"廖长缨"},{"0922zt":"准备进场","xqmc":"爱民路124号外院","ssjd":"荷花池街办","fzr_phone":"18628330277","xxdz":"爱民路124号外院","fzr":"廖长缨"},{"0922zt":"准备进场","xqmc":"花圃路6号","ssjd":"荷花池街办","fzr_phone":"18628330277","xxdz":"花圃路6号","fzr":"廖长缨"},{"0922zt":"准备进场","xqmc":"西青路55号","ssjd":"西安路街办","fzr_phone":"18628330277","xxdz":"西青路55号","fzr":"廖长缨"},{"0922zt":"准备进场","xqmc":"爱民路124号内院","ssjd":"荷花池街办","fzr_phone":"18628330277","xxdz":"爱民路124号内院","fzr":"廖长缨"},{"0922zt":"准备进场","xqmc":"西体北路8号","ssjd":"荷花池街办","fzr_phone":"18628330277","xxdz":"西体北路8号","fzr":"廖长缨"},{"0922zt":"准备进场","xqmc":"西青路53号","ssjd":"西安路街办","fzr_phone":"18628330277","xxdz":"西青路53号","fzr":"廖长缨"}],
    };
  },
  mounted() {
   /*  this.getRqaqLJYL(); */
  },
  methods: {
    changeStaus() {
      this.$emit("changeStatus", 0);
    },
  
  },
};
</script>

<style lang="scss" scoped>
.gasoldyardpop {
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
      background: url(~@/assets/images/qt_icon_fhuiq.png) 100% 100%
        no-repeat;
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