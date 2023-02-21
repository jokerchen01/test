<template>
  <section class="gas_serve">
    <div class="title">服务网点分布</div>
      <div class="table_pop" >
      <el-table
        style="width: 100%"
        max-height="600"
    :cell-style="{padding: '5px'}"
        :data="tableList"
      >
        <el-table-column type="index" label="序号" width="100" align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="网点名称"
          align="center"
          width="300"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          :show-overflow-tooltip="true"
          align="center"
          width="300"
        >
        </el-table-column>
      </el-table>
       <el-pagination
        background
        layout="total,prev, pager, next"
        :current-page="page"
        :page-size="pageSize"
        :total="total"
        @current-change="handleTableChange"
      >
      </el-pagination>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "GasServeTable",
  data() {
    return {
      tableList: [
        { total: 10, address: "营康西路366号", name: "金牛维修班" },

        { total: 10, address: "营康西路366号", name: "金牛第二服务中心" },

        { total: 10, address: "九里提南支路15号", name: "金牛第一服务中心" },

        { total: 10, address: "一环路北三段68-7", name: "调压队北二站驻点" },

        { total: 10, address: "营康西路366号", name: "第三储备站" },

        { total: 10, address: "一环路北一段438号", name: "抢险队西北桥驻点" },

        { total: 10, address: "营康西路366号", name: "抢险队三储驻点" },

        { total: 10, address: "营和街10号", name: "抢险七、八班" },

        { total: 10, address: "马鞍北路46号", name: "巡线队马鞍北路驻点" },

        { total: 10, address: "泰宏路6号", name: "巡线队李家沱驻点" },
      ],
      page: 1,
      pageSize: 10,
      total: 10,
    };
  },
  mounted() {
    /* this.reqRqaqWDFB() */
  },
  methods: {
    async reqRqaqWDFB() {
      let res = await this.$api.statePup.getRqaqWDFB({
        pageSize: this.pageSize,
        offsetNum: (this.page - 1) * this.pageSize,
      });
      this.tableList = res;
      if (res.length != 0) {
        this.total = res[0].total;
      }
      console.log(res);
    },
    handleTableChange(page) {
      this.page = page;
      this.reqRqaqWDFB();
    },
  },
};
</script>

<style lang="scss" scoped>
.gas_serve {
  width: 100%;
  color: #fff;
  .title {
    width: 100%;
    height: 50px;
    font-size: 16px;
    font-weight: 700;
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