<template>
  <section class="gas_serve">
    <section>
      <div class="repair">
        <div class="repair_left">
          <div class="title_left">抢险急修流程图</div>
          <div class="img_left">
            <img src="@/assets/images/qx.png" alt="" />
          </div>
        </div>
        <div class="repair_right">
          <div class="title_right">抢险急修案例</div>
          <div class="img_right">
            <div class="right_item">
              <div class="left_item">接报时间:</div>
              <div class="right_item">2022-09-24 10:14:01</div>
            </div>
            <div class="right_item">
              <div class="left_item">客户姓名:</div>
              <div class="right_item">沈先生</div>
            </div>
            <div class="right_item">
              <div class="left_item">险情地址:</div>
              <div class="right_item">二环路北一段14号</div>
            </div>
            <div class="right_item">
              <div class="left_item">险情描述:</div>
              <div class="right_item">
                施工损坏地下燃气管道(已告维护现场，禁止明火)
              </div>
            </div>
            <div class="right_item">
              <div class="left_item">派发人员:</div>
              <div class="right_item">陈丹</div>
            </div>
            <div class="right_item">
              <div class="left_item">处理部门:</div>
              <div class="right_item">抢险队-北门片区(马再平班组)</div>
            </div>
            <div class="right_item">
              <div class="left_item">现场核实:</div>
              <div class="right_item">现场检查施工损坏院内PE90低压管道</div>
            </div>
            <div class="right_item">
              <div class="left_item">现场处置:</div>
              <div class="right_item">停气后组织开挖，抢修完成后恢复供气</div>
            </div>
            <div class="right_item">
              <div class="left_item">工单归档:</div>
              <div class="right_item">2022-9-24 15:12:29</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="title">抢险急修信息台账本</div>
    <div class="table_pop">
      <div class="time_calendar">
        <el-date-picker v-model="timeList" type="daterange" value-format="yyyy-MM-dd" start-placeholder="年/月/日"
          end-placeholder="年/月/日" :clearable="false">
        </el-date-picker>
        <div class="change">
          <div class="query" @click="reqRqaqQXJX()">查询</div>
          <div class="reset" @click="reset">重置</div>
        </div>
      </div>
      <el-table style="width: 100%" max-height="600" :data="tableList" :cell-style="{ padding: '5px' }">
        <el-table-column type="index" label="序号" width="70" align="center">
        </el-table-column>
        <el-table-column prop="report_time" label="接报时间" :show-overflow-tooltip="true" align="center" width="140">
        </el-table-column>
        <el-table-column prop="address" label="险情地址" :show-overflow-tooltip="true" align="center" width="220">
        </el-table-column>
        <el-table-column prop="describe" label="险情描述" :show-overflow-tooltip="true" align="center" width="220">
        </el-table-column>

        <el-table-column prop="result" label="险情处置" :show-overflow-tooltip="true" align="center" width="250">
        </el-table-column>
      </el-table>

      <div class="footer">
        <el-pagination background layout="total,prev, pager, next" :total="total" :current-page.sync="page"
          :page-size="pageSize" @current-change="handleTableChange">
        </el-pagination>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "GasRepair",
  data() {
    return {
      tableList: [
        {
          result: "核实为调压箱切断，恢复切断后供气正常",
          total: 97,
          address: "金科南二路59号金牛区高新产业发展服务中心政府大楼1楼厨房",
          report_time: "2022-10-08 06:49:00.0",
          describe: "食堂无气加急，很多人要吃早饭，10月7日晚上都可以用。",
        },
        {
          result: "现场检查地管进水，拆丁字管盲板排除积水后恢复供气",
          total: 97,
          address: "商贸大道一段99号恒业、星园5号楼2单元1603号",
          report_time: "2022-10-06 14:03:22.0",
          describe:
            "金一维修18582520257转：热水器水管气管接反了，需转管网，请加急。",
        },
        {
          result: "现场按流程恢复供气",
          total: 97,
          address: "一品天下大街1128号1-2-713",
          report_time: "2022-10-05 15:31:12.0",
          describe:
            "抢险班18582520461转：该处着火，调压箱被人为关闭，请转管网按流程恢复（已同时转网格）",
        },
        {
          result: "立管下堵头丝接微漏，处置后恢复供气",
          total: 97,
          address: "抚琴东北路8号1栋3单元",
          report_time: "2022-10-01 13:39:55.0",
          describe: "该处单元丁字管有漏气，需转管网到场排查处理",
        },
        {
          result: "现场检查D32管道漏气，开挖补漏处理，已恢复 ",
          total: 97,
          address: "金牛区恒德路10号马鞍西路13幢2单元",
          report_time: "2022-09-30 20:06:00.0",
          describe: "供气王川彭18683716325转：该处地管漏气，请转管网",
        },
        {
          result: "现场检查是D25低压天地连漏气，开挖补漏处理，已恢复 ",
          total: 97,
          address: "金牛区一环路北一段330号26栋2单元02",
          report_time: "2022-09-29 15:41:00.0",
          describe: "供气15828534408转：丁字管漏气，转管网",
        },
      ],
      page: 1,
      pageSize: 6,
      total: 6,
      timeList: [],
    };
  },
  mounted() {
    /*  this.reset(); */
  },
  methods: {
    /* async reqRqaqQXJX() {
      let res = await this.$api.statePup.getRqaqQXJX({
        pageSize: this.pageSize,
        offsetNum: (this.page - 1) * this.pageSize,
        start_time: this.timeList[0],
        end_time: this.timeList[1],
      });
      console.log(res);
      res.length != 0 ? (this.total = res[0].total) : (this.total = 0);

      this.tableList = res;
    }, */
    handleTableChange(page) {
      /*  this.page = page;
       this.reqRqaqQXJX(); */
    },
    reset() {
      this.page = 1;
      this.timeList = [
        this.$moment().format("YYYY-01-01"),
        this.$moment().format("YYYY-MM-DD"),
      ];
      /*  this.reqRqaqQXJX(); */
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
    height: 30px;
    font-size: 20px;
    font-weight: 700;
  }

  .table_pop {
    z-index: 2000;
    background-size: 100% 100%;
    height: auto;

    .time_calendar {
      margin: 20px 0 30px 0;
      ::v-deep{
        .el-date-editor.el-input__inner {
          background-color: rgba(23, 53, 70) !important;
          // border-color: #3a769d;
          /*  color: #fff; */
        }
      }
      .change {
        position: absolute;
        top: 500px;
        left: 270px;
        width: 180px;
        display: flex;
        justify-content: space-between;
        cursor: pointer;

        .query {
          width: 80px;
          height: 40px;
          line-height: 42px;
          background: url("~@/assets/images/搜索.png") no-repeat 100% 100%;
          text-align: center;
        }

        .reset {
          width: 80px;
          height: 40px;
          line-height: 42px;
          background: url("~@/assets/images/搜索.png") no-repeat 100% 100%;
          text-align: center;
        }
      }
    }

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

  .repair {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 350px;
    font-size: 20px;
    font-family: PangMenZhengDao;
    font-weight: 400;
    color: #ffffff;
    margin-bottom: 20px;

    .repair_left {
      width: 47%;

      .title_left {
        height: 40px;
        line-height: 40px;
        margin-bottom: 20px;
        padding-left: 15px;
        /* background: url(/eventCenter/img/tab_title_bg.d8000399.png) no-repeat; */
        background-size: 100%;
      }

      .img_left {
        width: 100%;
        height: 300px;

        img {
          width: 100%;
          height: 250px;
        }
      }
    }

    .repair_right {
      width: 47%;

      .title_right {
        height: 40px;
        line-height: 40px;
        margin-bottom: 20px;
        padding-left: 15px;
        /* background: url(/eventCenter/img/tab_title_bg.d8000399.png) no-repeat; */
        background-size: 100%;
      }

      .img_right {
        font-size: 16px;
        text-align: justify;
        line-height: 35px;
        height: 250px;
        overflow-y: auto;

        .right_item {
          display: flex;

          .left_item {
            width: 100px;
          }

          .right_item {
            width: 300px;
            margin-left: 20px;
          }
        }
      }
    }
  }
}

::v-deep {
  .el-input__inner {
    width: 225px !important;
  }
}
</style>