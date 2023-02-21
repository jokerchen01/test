<template>
  <section>
    <div v-show="currentStatus == 1">
      <section class="top_box">
        <div class="top_left" @click="showTablePop" style="cursor: pointer">
          <div>
            <div class="title marg21">7日舆情数</div>
            <div class="value" @click="showTablePop($event, 'none', 'Week')">
              0
            </div>
          </div>
          <div class="midden">
            <div class="WLYQ marg12">已解决</div>
            <div
              class="value1"
              @click="showTablePop($event, 'none', 'Week', '已解决')"
            >
            0
            </div>
          </div>
          <div>
            <div class="WLYQ marg12">办理中</div>
            <div
              class="value1"
              @click="showTablePop($event, 'none', 'Week', '办理中')"
            >
            0
            </div>
          </div>
        </div>
        <div class="top_left" @click="showTablePop" style="cursor: pointer">
          <div>
            <div class="title marg21" style="cursor: pointer">本月舆情数</div>
            <div
              class="value"
              @click="showTablePop($event, 'none', 'Month')"
              style="cursor: pointer"
            >
            0
            </div>
          </div>
          <div class="midden">
            <div class="WLYQ marg12">已解决</div>
            <div
              class="value1"
              @click="showTablePop($event, 'none', 'Month', '已解决')"
            >
             0
            </div>
          </div>
          <div>
            <div class="WLYQ marg12">办理中</div>
            <div
              class="value1"
              @click="showTablePop($event, 'none', 'Month', '办理中')"
            >
            0
            </div>
          </div>
        </div>
      </section>
      <section>
        <div class="gdp_row">
          <div class="gdp_row_left">
            <div class="left_title">本月舆情类型分布</div>
            <div class="left_container">
              <div class="list" v-if="progressFourData.length != 0">
                <div
                  class="list_item"
                  v-for="(item, index) of progressList(progressFourData)"
                  :key="index"
                >
                  <div
                    class="item_name"
                    @click="showTablePop($event, 'isxxlx', 'Month')"
                    style="cursor: pointer"
                  >
                    <div class="item_icon">
                      <div class="icon"></div>
                    </div>
                    <div class="name_val">
                      {{ item.name }}
                    </div>
                    <div class="item_val">{{ item.value }}</div>
                  </div>
                  <div class="item_progress">
                    <div
                      class="left_progress_val"
                      :style="{ width: item.percentage }"
                    ></div>
                  </div>
                </div>
              </div>
              <div class="no_data" v-else></div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div class="gdp_row_left">
          <div class="left_title_detail">本月各街道舆情分布</div>
          <div
            ref="streetSentiment"
            class="streetSentiment_box"
            v-if="obj.BYYQS != 0"
          ></div>
          <div class="no_data" v-else></div>
        </div>
      </section>
      <section>
        <div class="gdp_row_left">
          <div class="left_title_detail">本月舆情列表</div>
          <el-table :data="tableList" style="width: 100%" max-height="240">
            <el-table-column
              type="index"
              label="序号"
              width="70"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="tjsj"
              label="发现时间"
              align="center"
              width="140"
            >
            </el-table-column>
            <el-table-column
              prop="grade"
              label="舆情等级"
              :show-overflow-tooltip="true"
              align="center"
              width="110"
            >
              <template slot-scope="scope">
                <span
                  class="colorbox"
                  :style="{
                    background: scope.row.grade == '蓝色' ? '#5689b0' : '',
                  }"
                ></span>
              </template>
            </el-table-column>
            <el-table-column
              prop="zdxx"
              label="舆情概况"
              :show-overflow-tooltip="true"
              align="center"
              width="380"
            >
            </el-table-column>
            <el-table-column label="详情" align="center" width="100">
              <template slot-scope="scope">
                <span class="f-curson" @click="openPupClick(scope.row.id)"
                  >查看</span
                >
              </template>
            </el-table-column>
            <el-table-column
              prop="xxlx"
              label="类型"
              :show-overflow-tooltip="true"
              align="center"
              width="110"
            >
            </el-table-column>
            <el-table-column
              prop="zbdw"
              label="转办单位"
              :show-overflow-tooltip="true"
              align="center"
              width="110"
            >
            </el-table-column>
            <el-table-column
              prop="hfqk"
              label="办理回复"
              :show-overflow-tooltip="true"
              align="center"
              width="110"
            >
            </el-table-column>
            <el-table-column
              prop="blzt"
              label="办理状态"
              :show-overflow-tooltip="true"
              align="center"
              width="110"
            >
            </el-table-column>
          </el-table>
        </div>
      </section>
    </div>
    <div v-show="currentStatus == 2">
      <section class="is_checked">
        <div class="box_title">
          <div class="title_left">整体情况</div>
          <div class="back" @click="goBack"></div>
        </div>
        <div class="item">
          <div class="item_left">发现时间</div>
          <div class="item_right">{{ detail.tjsj }}</div>
        </div>
        <div class="item">
          <div class="item_left">舆情等级</div>
          <div class="item_right">{{ detail.grade }}</div>
        </div>
        <div class="item">
          <div class="item_left">舆情概况</div>
          <div class="item_right">{{ detail.zdxx }}</div>
        </div>
        <div class="item content">
          <div class="item_left">主要内容</div>
          <div class="item_right">
            {{ detail.zynr }}
          </div>
        </div>
        <div class="item">
          <div class="item_left">原文链接</div>
          <div class="item_right" @click="openUrl" style="cursor: pointer">
            {{ detail.url }}
          </div>
        </div>
        <div class="item">
          <div class="item_left">舆情类型</div>
          <div class="item_right">{{ detail.lx }}</div>
        </div>
        <div class="item">
          <div class="item_left">转办单位</div>
          <div class="item_right">{{ detail.zbdw }}</div>
        </div>
        <div class="item">
          <div class="item_left">办理回复</div>
          <div class="item_right">{{ detail.blhf }}</div>
        </div>
        <div class="item">
          <div class="item_left">办理状态</div>
          <div class="item_right">{{ detail.blzt }}</div>
        </div>
      </section>
    </div>
    <div>
      <internet-table-pop
        ref="table_pop"
        @goBack="goBack"
        @openPupClick="openPupClick"
        :type="type"
      />
    </div>
  </section>
</template>

<script>
import { streetSentiment } from "@/views/echarts";
import internetTablePop from "./InternetTablePop.vue";
export default {
  components: {
    internetTablePop,
  },
  data() {
    return {
      obj: {},
      dialogVisible: true,
      progressFourData: [],
      tableList: [],
      detail: {}, //当前点击查看的舆情事件
      currentStatus: 1,
      type: "", //点击7日/本月舆情
    };
  },
  created() {
    this.initData();
  },
  mounted() {
    this.getEchartDom();
  },
  methods: {
    maxVal(arr) {
      return arr.map((e) => e.value).sort((a, b) => b - a)[0];
    },
    initData() {
     
    
    },
    getEchartDom() {
      /* let self = this;
      //本月舆情类型分布
      this.$api.statePup
        .getDataSet({ dateCode: ["nw"] }, "IDX_BYYQ")
        .then((res) => {
          res.data.data.nw.data.forEach((v) => {
            if (v.value) {
              this.progressFourData.push({
                name: v.xxlx,
                value: v.value,
              });
            }
          });
         
        }); */
      //本月各街道舆情分布
   
       /*  let nameList = [],
          valueList = [];
        res.forEach((v) => {
          nameList.push(v.street);
          valueList.push(v.value || 0);
        });
        streetSentiment.xAxis.data = nameList;
        streetSentiment.series[0].data = valueList; */

        let pieEcharts = this.$echarts.init(this.$refs.streetSentiment);
        pieEcharts.setOption(streetSentiment);
        pieEcharts.on("click", (data)=> {
          this.$refs.table_pop.street = data.name;
          this.showTablePop("none", "none", "Month");
        });
      
      //可燃气体探测器预警明细
      this.$api.statePup.getWlyqlist().then((res) => {
        this.tableList = res.data;
      });
    },
    //点击查看
    async openPupClick(id) {
      await this.$api.operationSituaty
        .getParameter(
          {
            id,
          },
          "xqxx"
        )
        .then((res) => {
    
          this.detail = res[0];
        });
      this.currentStatus = 2;
    },
    openUrl() {
      window.open(this.detail.url);
    },
    //点击返回
    goBack() {
      this.currentStatus = 1;
    },
    //展示舆情表格
    showTablePop(e, isxxlx, data, blzt) {
      if (isxxlx == "isxxlx") {
        this.$refs.table_pop.lx = e.target.innerText.split("\n")[0];
      }
      this.currentStatus = 3;
      //每次点击前先将弹窗的showTablePop设置位true
      this.$refs.table_pop.showTablePop = true;

      if (data == "Month") {
        this.type = data;
        let firstDay = this.$moment().startOf("month").format("YYYY-MM-DD");
        let lastDay = this.$moment().endOf("month").format("YYYY-MM-DD");
        let value = [firstDay, lastDay];
        this.$refs.table_pop.value = value;
        if (blzt) {
          this.$refs.table_pop.blzt = blzt;
        } else {
          this.$refs.table_pop.blzt = "";
        }
      }
      if (data == "Week") {
        this.type = data;
        let firstDay = this.$moment().add(-7, "d").format("YYYY-MM-DD");
        let lastDay = this.$moment().format("YYYY-MM-DD");
        let value = [firstDay, lastDay];
        this.$refs.table_pop.value = value;
        if (blzt) {
          this.$refs.table_pop.blzt = blzt;
        } else {
          this.$refs.table_pop.blzt = "";
        }
      }
    },
  },
  computed: {
    progressList() {
      return (arr) => {
        const max = this.maxVal(arr);
        return arr.map((el) => {
          el.percentage = `${Math.round((el.value / max) * 100)}%`;
          return el;
        });
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.top_box {
  display: flex;
  margin-bottom: 20px;
  .top_left {
    display: flex;
    align-items: center;
    width: 50%;
  }
  .midden {
  
  }
  .title {
    background: url(~@/assets/images/common/title_background.png) no-repeat;
    background-size: 100%;
    height: 19px;
    font-size: 16px;
    color: rgba(255, 255, 255, 1);
    padding-left: 24px;
    line-height: 20px;
  }
  .value {
    background: linear-gradient(183deg, #ffffff 0%, #efca83 100%);
  }
  .value1 {
    background: linear-gradient(183deg, #ffffff 0%, #65adc9 100%);
  }
  .value,
  .value1 {
    height: 30px;
    line-height: 30px;
    font-size: 26px;
    text-align: center;
    font-family: DINPRO;
    font-weight: bold;
    color: #ffffff;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .WLYQ {
    background: url(~@/assets/images/WLYQ.png) no-repeat;
    background-size: 100%;
    width: 103px;
    height: 25px;
    text-align: right;
    padding-right: 17px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #ffffff;
  }
  .marg21 {
    margin-bottom: 21px;
  }
  .marg12 {
    margin-bottom: 12px;
  }
}
.title_box {
  display: flex;
  height: 110px;
  justify-content: flex-start;

  .title {
    background: url(~@/assets/images/common/title_background.png) no-repeat;
    background-size: 100%;
    font-size: 20px;
    color: rgba(255, 255, 255, 1);
    padding-left: 24px;
    line-height: 20px;
    margin-right: 66px;
    margin-bottom: 24px;
  }

  .title_box_inner {
    margin-left: 32px;

    .first_num {
      font-size: 36px;
      font-family: DINPRO;
      font-weight: bold;
      color: #ffffff;
      background: linear-gradient(183deg, #ffffff 0%, #65adc9 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .second_num {
      font-size: 36px;
      font-family: DINPRO;
      font-weight: bold;
      color: #ffffff;
      background: linear-gradient(183deg, #ffffff 0%, #f17d7d 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .title_unit {
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffffff;
      margin-left: 11px;
    }
  }

  .title_month {
    margin-right: 112px;
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #ffffff;
    margin-top: 18px;
  }

  .title_day {
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #ffffff;
    margin-top: 18px;
  }

  .up_icon {
    width: 12px;
    height: 15px;
    background: url("~@/assets/images/common/up_icon.png") no-repeat;
    background-size: 100%;
    margin-top: 19px;
    margin-right: 9px;
  }

  .down_icon {
    width: 12px;
    height: 15px;
    background: url("~@/assets/images/common/down_icon.png") no-repeat;
    background-size: 100%;
    margin-top: 19px;
    margin-right: 9px;
  }

  .detail_num {
    font-size: 28px;
    font-family: DINPRO;
    font-weight: bold;
    color: #ffffff;
    background: linear-gradient(183deg, #ffffff 0%, #65adc9 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-top: 10px;
  }
}

.gdp_row {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  .list {
    width: 100%;
    margin-top: 27px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    &_item {
      height: 35px;
      margin-bottom: 20px;
      .item_name {
        height: 29px;
        padding-bottom: 9px;
        display: flex;
        line-height: 20px;
        position: relative;
        .item_icon {
          width: 10px;
          height: 10px;
          margin-top: 5px;
          border: 1px solid #c3efff;
          .icon {
            margin: auto;
            margin-top: 2px;
            width: 4px;
            height: 4px;
            background: #c3efff;
          }
        }
        .name_val {
          padding-left: 8px;
          font-size: 20px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 500;
          color: #ebfaff;
          cursor: pointer;
        }
        .item_val {
          position: absolute;
          right: 0;
          font-size: 26px;
          font-family: DINPRO;
          font-weight: bold;
          color: #ebfaff;
          background: linear-gradient(0deg, #b9e7ff 0%, #ffffff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
      .item_progress {
        width: 425px;
        height: 6px;
        background: rgba(255, 255, 255, 0.06);
        border-radius: 2px;
        .left_progress_val {
          height: 6px;
          background: linear-gradient(
            90deg,
            rgba(201, 77, 77, 0.01) 0%,
            rgba(139, 255, 187, 0.82) 99%
          );
          border-radius: 2px;
        }
      }
    }
  }
  &_left {
    width: 100%;
    height: 100%;
    // position: relative;
    .focus_people {
      width: 100%;
      height: 176px;
      .fp_table {
        margin-top: 20px;
        height: 114px;
        width: 888px;
        .fp_thead {
          height: 38px;
          width: 100%;
          background: #104663;
          display: flex;
          justify-content: space-around;
          align-content: center;
          align-items: center;

          .fp_tr {
            text-align: center;
            width: 25%;
            line-height: 38px;
            font-size: 20px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 500;
            color: #ffffff;
            background: linear-gradient(
              0deg,
              #6eaed5 0%,
              #e0f3ff 64.794921875%
            );
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
        .fp_tbody {
          width: 100%;
          height: 76px;
          overflow-y: auto;
          .fp_thead {
            width: 100%;
            height: 38px;
            background: url(~@/assets/images/fp_th.png) no-repeat;
            background-size: 100% 100%;
            .fp_th {
              text-align: center;
              width: 25%;
              line-height: 38px;
              font-size: 20px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 500;
              color: #ffffff;
            }
          }
        }
      }
    }
    .left_container {
      width: 100%;
      // height: 247px;
      display: flex;
      justify-content: space-between;
    }
    .left_title {
      width: 340px;
      height: 30px;
      background: url(~@/assets/images/common/tab_title_bg.png) no-repeat;
      background-size: 100%;
      font-size: 18px;
      font-family: PangMenZhengDao;
      color: #ffffff;
      padding-left: 18px;
      line-height: 30px;
    }

    .left_title_detail {
      width: 340px;
      height: 30px;
      background: url(~@/assets/images/common/tab_title_bg.png) no-repeat;
      background-size: 100%;
      font-size: 18px;
      font-family: PangMenZhengDao;
      color: #ffffff;
      padding-left: 18px;
      line-height: 30px;
      margin-bottom: 20px;
    }
  }
}
.streetSentiment_box {
  width: 100%;
  height: 228px;
  margin-bottom: 40px;
}
.colorbox {
  display: inline-block;
  width: 18px;
  height: 18px;
}
.is_checked {
  color: white;
  font-size: 20px;
  .box_title {
    display: flex;
    position: relative;
 /*    background: url(/eventCenter/img/tab_title_bg.d8000399.png) no-repeat; */

    .title_left {
      width: 340px;
      height: 30px;
      line-height: 35px;
      padding-left: 10px;
    }
    .back {
      position: absolute;
      right: 0;
      top: 0;
      display: block;
      width: 47px;
      height: 47px;
      background: url(~@/assets/images/qt_icon_fhuiq.png) 100% 100%
        no-repeat;
      cursor: pointer;
    }
  }

  .item {
    display: flex;
    margin-top: 20px;

    .item_left {
      width: 100px;
      color: #acd9f7;
      line-height: 40px;
    }
    .item_right {
      width: calc(100% - 80px);
      line-height: 40px;
    }
  }
}
::v-deep {
  .el-table__empty-text {
    transform: translate(-95%, 0) !important;
  }
}
.no_data {
  position: relative;

  left: 36%;
  transform: none;
}
</style>
