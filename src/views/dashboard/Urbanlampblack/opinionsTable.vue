<template>
  <section>
    <section class="complaint">
      <div class="complaint_title">
       <div class="div">相关舆情Top10</div>
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
        v-loading='loading'
      >
        <el-table-column align="center" type="index" label="序号" width="100">
        </el-table-column>
        <el-table-column
          align="center"
          prop="summary"
          label="舆情概述"
          :show-overflow-tooltip="true"
          width="320"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="publishTime"
          label="发帖时间"
          width="200"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="captureWebsite"
          label="来源平台"
          width="200"
        >
        </el-table-column>
   
     

        <el-table-column align="center" label="原文" width="100">
          <template slot-scope="scope">
            <span class="reply" @click="open(scope.row.url)">查看</span></span>
          </template>
        </el-table-column>
      </el-table>
   <!--    <el-pagination
        background
        layout="total,prev, pager, next"
        :total="total"
        :current-page="page"
        :page-size="pageSize"
        @current-change="handleTableChange"
      >
      </el-pagination> -->
    </section>
  </section>
</template>

<script>
export default {
  props: {
    opinionsTitle: {
      type: String,
    },
  },
  data() {
    return {
      pageSize: 5,
      total: 0,
      page: 0,
loading:true,
      tableList: [],
    };
  },
  watch: {
    opinionsTitle: {
      handler(newVal) {
        if (newVal == "舆情列表") {
          this.getOpinionsList();
        }
      },
      immediate: true,
    },
  },

  mounted() {},
  methods: {
    handleTableChange(page) {
      this.page = page;
      this.getOpinionsList();
    },

    goBack() {
      console.log(this.$parent.isShowOpinions);
      this.$parent.isShowOpinions = false;
    },
    async getOpinionsList() {
      let res = await this.$api.statePup.getAirOpinionsList({
        keyword: "环保",
      });
      console.log(res);
      this.tableList = res.data;
      this.total = res.data.length;
      this.loading=false
    },
    open(url) {
      window.open(url);
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
  margin-top: 30px;
  height: 600px;
  .complaint_title {
  
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
margin-right: 35px;
  position: static;
}
</style>
