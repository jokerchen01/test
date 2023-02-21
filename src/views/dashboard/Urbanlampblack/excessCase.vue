<template>
  <section class="excesscase_container">
    <div class="fill" v-show="!showDetail">
      <div class="title">
        <div>餐饮企业街道分布(家)</div>
        <i @click="$emit('changeTab', 'cookFumeObserve')"></i>
      </div>
      <!-- 柱状图 -->
      <div class="streetFood_box" ref="streetFood"></div>
      <!-- 表格 -->
      <div class="lampblack_box">
        <!-- :row-class-name="tableRowClass" -->
        <el-table :data="tableData" max-height="478" style="width: 830px">
          <el-table-column
            fixed
            prop="case_id"
            label="案件编号"
            width="110"
            :show-overflow-tooltip="true"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="company_name"
            label="企业名称"
            width="100"
            :show-overflow-tooltip="true"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="areaname"
            label="区域"
            width="100"
            :show-overflow-tooltip="true"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="case_type"
            label="案件类型"
            width="100"
            :show-overflow-tooltip="true"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="list_his_type"
            label="流程状态"
            width="100"
            :show-overflow-tooltip="true"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="list_his_qx"
            label="流程限制(天)"
            width="125"
            :show-overflow-tooltip="true"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="countdown"
            label="倒计时(天)"
            width="125"
            :show-overflow-tooltip="true"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="create_time"
            label="生成时间"
            width="190"
            :show-overflow-tooltip="true"
            align="center"
          ></el-table-column>
          <el-table-column fixed="right" label="操作" width="68" align="right">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="openDetailWindow(scope.row)"
                type="text"
              >
                详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <el-pagination
        background
        layout="total,prev, pager, next"
        :total="total"
        :current-page="page"
        :page-size="pageSize"
        @current-change="handleTableChange"
        class="devide_page"
      >
      </el-pagination>
    </div>
    <ExcessCaseDetails
      v-show="showDetail"
      :eventResume="eventResume"
      @closeDetailWindow="showDetail = false"
      @showBigImage="showBigImage"
    />
  </section>
</template>

<script>
import { streetFood } from "@/views/echarts";
import ExcessCaseDetails from "./excessCaseDetails.vue";
export default {
  name: "excessCase",
  components: {
    ExcessCaseDetails,
  },
 
  data() {
    return {
      page: 1, // 分页，当前页
      showDetail: false,
      eventResume: {},
      tableData: [],
      total:0,
      pageSize:5
    };
  },
  created() {
    this.getTableData();
  },
  mounted() {
    this.initChart();
  },
  methods: {
    // 分页，点击重新查询
    handleTableChange(page) {
      this.page = page;
      this.getTableData();
    },
    showBigImage(url) {
      this.$emit("showBigImage", url);
    },
    initChart() {
      //餐饮企业街道分布
      this.$api.operationSituaty
        .getIndicators("yyjccbajjdfb")
        .then((res) => {

          let nameList = [],
            valueList = [];
          res.forEach((v, i) => {
            nameList.push(v.areaname);
            valueList.push(v.value);
          });
          streetFood.xAxis.data = nameList;
          streetFood.series[0].data = valueList;
          this.$nextTick(() => {
            const myChartstreetFood = this.$echarts.init(this.$refs.streetFood);
            myChartstreetFood.setOption(streetFood);
          });
        });
    },
    getTableData() {
      // 数字城管-油烟监测-餐饮行业油烟超标街道分布
      this.$api.statePup
        .distributeOfCookFumeExceedance({
          pageSize:  this.pageSize,
          offsetNum: (this.page - 1) *  this.pageSize,
        })
        .then((res) => {
          this.tableData = res;
          this.total=res[0].total
        })
        .catch((err) => {
          console.error("获取右眼超标失败：", err);
        });
    },
    openDetailWindow(row) {
      this.showDetail = true;
      this.eventResume = row;
    },
  },
};
</script>

<style lang="scss" scoped>
.fill {
  width: 100%;
  height: 100%;
}
.excesscase_container {
  width: 910px;
  height: 850px;
  background: #082933;
  padding: 30px;
  box-sizing: border-box;
  .title {
    display: flex;
    width: 100%;
    height: 47px;
    justify-content: space-between;
    & > div {
      width: 336px;
      height: 30px;
      margin-top: 17px;
      padding-left: 20px;
      font-size: 18px;
      font-family: PangMenZhengDao;
      color: #ffffff;
      line-height: 30px;
      background: url(~@/assets/images/common/tab_title_bg.png) no-repeat left;
      background-size: 100%;
    }
    & > i {
      display: block;
      width: 47px;
      height: 47px;
      margin-right: -16px;
      background: url(~@/assets/images/qt_icon_fhuiq.png) 100% 100%
        no-repeat;
      cursor: pointer;
    }
  }
  .histogram {
    margin-top: 25px;
    width: 850px;
    height: 200px;
  }
}
.streetFood_box {
  margin-top: 25px;
  margin-bottom: 34px;
  width: 850px;
  height: 200px;
}
.lampblack_box {
  padding: 10px;
  width: 850px;
  height: 458px;
  background: rgba(15, 53, 93, 0.1);
  border-radius: 8px;
  border: 2px solid rgba(93, 188, 255, 0.1);
}
.excesscase_container .devide_page {
  ::v-deep {
    margin-top: 10px;
    .btn-next,
    .btn-prev,
    .el-pager li {
      width: 36px;
      height: 36px;
      line-height: 36px;
      background: rgba(174, 216, 255, 0.06) !important;
      border-radius: 2px;
    }
    .el-pager li .active {
      width: 36px;
      height: 36px;
      background: rgba(174, 216, 255, 0.06)  !important;
      border-radius: 2px;
    }
  }
}
</style>
