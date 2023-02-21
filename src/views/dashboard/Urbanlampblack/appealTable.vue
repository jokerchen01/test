<template>
  <section>
    <section class="complaint">
      <div class="complaint_title">
        <div class="div">{{ title }}&nbsp;总共{{ total }}条</div>
        <div class="back" @click="goBack">返回</div>
      </div>

      <el-table
        :data="tableList"
        element-loading-background="rgba(75, 164, 210, 0)"
        :header-cell-style="{
          'text-align': 'center',
          background: 'rgba(75, 164, 210, 0)',
          color: 'rgba(255, 255, 255, 1)',
        }"
        max-height="450"
        v-loading="loading"
      >
        <el-table-column align="center" type="index" label="序号" width="70">
        </el-table-column>
        <el-table-column
          align="center"
          prop="WorkFormNO"
          label="事件编号"
          :show-overflow-tooltip="true"
          width="150"
        >
        </el-table-column>
        <!--     <el-table-column
          align="center"
          prop="FmAddress"
          label="所属街道"
             :show-overflow-tooltip="true"
          width="120"
        >
        </el-table-column> -->
        <el-table-column
          align="center"
          prop="FmContent"
          label="事件内容"
          :show-overflow-tooltip="true"
          width="250"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="FromTime"
          label="上报时间"
          :show-overflow-tooltip="true"
          width="200"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="CrtStepName"
          label="处置状态"
          :show-overflow-tooltip="true"
          width="120"
        >
        </el-table-column>

        <el-table-column align="center" label="详情" width="100">
          <template slot-scope="scope">
            <span class="reply" @click="goDetail(scope.row.Pkid)">查看</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total,prev, pager, next"
        :total="total"
        :current-page="page"
        :page-size="pageSize"
        @current-change="handleTableChange"
      >
      </el-pagination>
    </section>
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
  },
  data() {
    return {
      pageSize: 10,
      total: 0,
      page: 1,
      tableList: [],
      loading: true,
    };
  },
  watch: {
    title: {
      handler(newVal) {
        if (newVal == "诉求总量") {
          this.getAppealList();
        } else {
          this.getUnsatisfacList();
        }
      },
      immediate: true,
    },
  },

  methods: {
    handleTableChange(page) {
      this.page = page;
      this.title == "诉求总量"
        ? this.getAppealList()
        : this.getUnsatisfacList();
    },
    async getAppealList() {
      let res = await this.$api.statePup.getAirAppealList({
        DCntACode: "11070416",
        page: this.page,
        pageSize: this.pageSize,
      });
      this.total = res.data.totalRow;
      this.tableList = res.data.list;
      this.loading = false;
    },
    async getUnsatisfacList() {
      let res = await this.$api.statePup.getAirUnsatisfactList({
        DCntACode: "11070416",
        page: this.page,
        pageSize: this.pageSize,
      });
      this.total = res.data.totalRow;
      this.tableList = res.data.list;
      this.loading = false;
    },
    goBack() {
      this.$parent.isShowAppeal = false;
    },
    goDetail(id) {
      console.log(id);
      this.$parent.isShowDetail = true;
      this.$parent.isShowAnalysis = false;
      this.$emit("returnDataHandle", id);
    },
  },
};
</script>




<style lang="scss" scoped>
@import "../common.scss";
.search_form {
  margin-top: 80px;
}
.complaint {
  height: 600px;
  .complaint_title {
    margin-top: 30px;
    font-size: 20px;
    display: flex;
    justify-content: space-between;
  }
}
.back {
  height: 35px;
  cursor: pointer;
  font-size: 20px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #73c0f5;
  margin-right: 50px;
  position: static;
}
</style>
