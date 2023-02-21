<template>
  <section class="cook_fume_dis_resid_container">
    <div class="fill" v-show="!showDetail">
      <div class="title">
        <div>餐饮油烟扰民投诉案件流程图</div>
        <i @click="$emit('changeTab', 'cookFumeObserve')"></i>
      </div>
      <div class="flow_chart">
        <div class="unit">
          <div>1</div>
          <p>案件生成</p>
        </div>
        <div class="contect_line">
          <p>通过</p>
        </div>
        <div class="unit">
          <div>2</div>
          <p>现场核查</p>
        </div>
        <div class="contect_line">
          <p>通过</p>
        </div>
        <div class="unit">
          <div>3</div>
          <p>现场整改</p>
        </div>
        <div class="contect_line">
          <p>通过</p>
        </div>
        <div class="unit">
          <div>4</div>
          <p>跟进处理</p>
        </div>
        <div class="contect_line">
          <p>通过</p>
        </div>
        <div class="unit">
          <div>5</div>
          <p>结案</p>
        </div>
      </div>
      <div class="title">
        <div>餐饮油烟扰民投诉案件列表</div>
      </div>
      <div class="lampblack_box">
        <el-table :data="tableData" max-height="478" style="width: 830px">
          <el-table-column
            fixed
            prop="case_id"
            label="案件编号"
            width="120"
            :show-overflow-tooltip="true"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="company_name"
            label="企业名称"
            width="140"
            :show-overflow-tooltip="true"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="areaname"
            label="区域"
            width="130"
            :show-overflow-tooltip="true"
            align="center"
          >
          </el-table-column>
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
            width="130"
            :show-overflow-tooltip="true"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="countdown"
            label="倒计时(天)"
            width="130"
            :show-overflow-tooltip="true"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="create_time"
            label="生成时间"
            width="130"
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
    <cookFumeDisturbResidentsDetail
      :eventResume="eventResume"
      v-show="showDetail"
      @closeDetailWindow="showDetail = false"
    />
  </section>
</template>

<script>
import cookFumeDisturbResidentsDetail from "./cookFumeDisturbResidentsDetail.vue";
export default {
  name: "cookFumeDisturbResidents",
  components: { cookFumeDisturbResidentsDetail },

  data() {
    return {
      showDetail: false,
      eventResume: {},
      tableData: [],
      page: 1,
      total: 0,
      pageSize: 5,
    };
  },
  created() {
    this.getEventList();
  },
  methods: {
    handleTableChange(page) {
      this.page = page;
      this.getEventList();
    },
    changeTab() {
      this.$emit("changeTab", "cookFumeObserve");
    },
    getEventList() {
      this.$api.statePup
        .cookFumeDistributeResidentCompliantList({
          pageSize: this.pageSize,
          offsetNum: (this.page - 1) *  this.pageSize,
        })
        .then((res) => {
          this.total=res[0].total
          this.tableData = res;
        })
        .catch((err) => {
          console.error("获取油烟扰民举报列表失败：", err);
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
.cook_fume_dis_resid_container {
  width: 910px;
  max-height: 850px;
  background: #082933;
  padding: 30px;
  box-sizing: border-box;
  .title {
    display: flex;
    width: 100%;
    height: 47px;
    justify-content: space-between;
    margin-bottom: 20px;
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
  .flow_chart {
    display: flex;
    width: auto;
    height: 126px;
    margin: 0 16px;
    .unit {
      width: 84px;
      height: 100%;
      & > div {
        width: 84px;
        height: 84px;
        font-size: 44px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #acd9f7;
        line-height: 84px;
        text-align: center;
        background: url(~@/assets/images/circle.png) no-repeat;
        background-size: 100%;
      }
      & > p {
        margin-top: 20px;
        height: 22px;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 22px;
        text-align: center;
      }
    }
    .contect_line {
      width: 80px;
      height: 2px;
      margin: 41px 10px 0 10px;
      background-color: rgba(172, 217, 247, 0.5);
      & > p {
        margin-top: -32px;
        height: 22px;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #91bdd7;
        line-height: 22px;
        text-align: center;
      }
    }
  }
  .lampblack_box {
    padding: 10px;
    width: 850px;
    height: 502px;
    background: rgba(15, 53, 93, 0.1);
    border-radius: 8px;
    border: 2px solid rgba(93, 188, 255, 0.1);
  }
}

.cook_fume_dis_resid_container .devide_page {
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
      background: rgba(174, 216, 255, 0.06) !important;
      border-radius: 2px;
    }
  }
}
</style>
