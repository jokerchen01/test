<template>
  <section class="obscuration" v-if="showTablePop" @click="closeObscuration">
    <div class="table_pop" @click.stop="">
      <div v-if="type == 'danger'">
        <section v-show="!isShowDetail">
          <div class="title">
            <div class="deatil_table_pop">风险隐患列表</div>
            <div class="go_back" @click="changeStaus">返回</div>
          </div>
          <div class="time_calendar">
            <el-date-picker
              type="month"
              placeholder="年/月/日"
              value-format="yyyy-MM"
              v-model="queryDate"
              @change="reqndswfxyhlist"
            >
            </el-date-picker>
          </div>
          <div class="table_box">
            <el-table
              :data="
                riskTableList.slice(
                  (currentPage - 1) * pageSize,
                  currentPage * pageSize
                )
              "
              style="width: 100%"
              max-height="600"
            >
              <el-table-column
                type="index"
                label="序号"
                width="70"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="troubleshooting_time"
                label="排查时间"
                align="center"
                width="140"
              >
              </el-table-column>
              <el-table-column
                prop="hidden_danger"
                label="隐患名称"
                :show-overflow-tooltip="true"
                align="center"
                width="180"
              >
              </el-table-column>
              <!-- <el-table-column
                prop="basic_information"
                label="事件情况"
                :show-overflow-tooltip="true"
                align="center"
                width="240"
              >
              </el-table-column> -->
              <el-table-column align="center" width="200">
                <template slot="header" slot-scope="scope">
                  <el-select
                    v-model="street"
                    placeholder="属地街道"
                    @change="reqndswfxyhlist"
                    clearable
                  >
                    <el-option
                      v-for="item in selectList[1]"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </template>
                <template slot-scope="scope">
                  {{ scope.row.street }}
                </template>
              </el-table-column>

              <el-table-column
                :show-overflow-tooltip="true"
                align="center"
                width="130"
              >
                <template slot="header" slot-scope="scope">
                  <el-select
                    v-model="categoryField"
                    placeholder="类别领域"
                    @change="reqndswfxyhlist"
                    clearable
                  >
                    <el-option
                      v-for="item in selectList[2]"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </template>
                <template slot-scope="scope">
                  {{ scope.row.category_field }}
                </template>
              </el-table-column>
              <!-- <el-table-column
                prop="dept"
                label="属事部门"
                :show-overflow-tooltip="true"
                align="center"
                width="180"
              >
              </el-table-column> -->
              <el-table-column
                :show-overflow-tooltip="true"
                align="center"
                width="140"
              >
                <template slot="header" slot-scope="scope">
                  <el-select
                    v-model="mediation"
                    placeholder="调处情况"
                    @change="reqndswfxyhlist"
                    clearable
                  >
                    <el-option
                      v-for="item in selectList[3]"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </template>
                <template slot-scope="scope">
                  {{ scope.row.mediation }}
                </template>
              </el-table-column>

              <el-table-column
                :show-overflow-tooltip="true"
                align="center"
                width="140"
              >
                <template slot="header" slot-scope="scope">
                  <el-select
                    v-model="riskLevel"
                    placeholder="风险等级"
                    @change="reqndswfxyhlist"
                    clearable
                  >
                    <el-option
                      v-for="item in selectList[4]"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </template>
                <template slot-scope="scope">
                  {{ scope.row.risk_level }}
                </template>
              </el-table-column>
              <el-table-column
                prop="trigger_group"
                label="是否引发群体性事件"
                :show-overflow-tooltip="true"
                align="center"
                width="140"
              >
              </el-table-column>
              <el-table-column width="80" fixed="right">
                <template slot-scope="scope">
                  <span @click="goDetails(scope.row, 'danger')" class="reply"
                    >详情</span
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="footer">
            <div class="totalCount">事件总数：{{ riskTableList.length }}</div>
            <el-pagination
              background
              layout="total,prev, pager, next"
              :total="totalCount"
              :current-page.sync="currentPage"
              @current-change="handleTableChange"
              :page-size="pageSize"
            >
            </el-pagination>
          </div>
        </section>
        <detailNav v-show="isShowDetail" ref="detailDom" />
      </div>
      <div v-else>
        <section v-show="!isShowDetail">
          <div class="title">
            <div class="deatil_table_pop">群体性事件列表</div>
            <div class="go_back" @click="changeStaus">返回</div>
          </div>

          <div class="time_calendar">
            <el-date-picker
              v-model="queryDate"
              type="month"
              placeholder="年/月/日"
              @change="reqNdqtsjxq"
              value-format="yyyy-MM"
            >
            </el-date-picker>
          </div>
          <div class="table_box">
            <el-table
              :data="
                groupTableList.slice(
                  (currentPage - 1) * pageSize,
                  currentPage * pageSize
                )
              "
              style="width: 100%"
              max-height="600"
            >
              <el-table-column
                type="index"
                label="序号"
                width="70"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="occurrence_time"
                label="发生时间"
                align="center"
                width="140"
              >
              </el-table-column>
              <el-table-column
                prop="event_name"
                label="事件名称"
                :show-overflow-tooltip="true"
                align="center"
                width="180"
              >
              </el-table-column>
              <el-table-column
                prop="event_overview"
                label="事件情况"
                :show-overflow-tooltip="true"
                align="center"
                width="240"
              >
              </el-table-column>
              <el-table-column align="center" width="200">
                <template slot="header" slot-scope="scope">
                  <el-select
                    v-model="street"
                    placeholder="属地街道"
                    @change="reqNdqtsjxq"
                    clearable
                  >
                    <el-option
                      v-for="item in selectList[1]"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </template>
                <template slot-scope="scope">
                  {{ scope.row.street }}
                </template>
              </el-table-column>

              <el-table-column
                :show-overflow-tooltip="true"
                align="center"
                width="140"
              >
                <template slot="header" slot-scope="scope">
                  <el-select
                    v-model="categoryField"
                    placeholder="类别领域"
                    @change="reqNdqtsjxq"
                    clearable
                  >
                    <el-option
                      v-for="item in selectList[2]"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </template>
                <template slot-scope="scope">
                  {{ scope.row.category_field }}
                </template>
              </el-table-column>
              <el-table-column
                prop="dept"
                label="属事部门"
                :show-overflow-tooltip="true"
                align="center"
                width="170"
              >
              </el-table-column>
              <el-table-column
                :show-overflow-tooltip="true"
                align="center"
                width="150"
              >
                <template slot="header" slot-scope="scope">
                  <el-select
                    v-model="mediation"
                    placeholder="事件规模"
                    @change="reqNdqtsjxq"
                    clearable
                  >
                    <el-option
                      v-for="item in selectList[4]"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </template>
                <template slot-scope="scope">
                  {{ scope.row.event_scale }}
                </template>
              </el-table-column>
              <el-table-column
                prop="manifestation"
                label="表现形式"
                :show-overflow-tooltip="true"
                align="center"
                width="140"
              >
              </el-table-column>
              <el-table-column
                :show-overflow-tooltip="true"
                align="center"
                width="130"
              >
                <template slot="header" slot-scope="scope">
                  <el-select
                    v-model="attentionLevel"
                    placeholder="关注等级"
                    @change="reqNdqtsjxq"
                    clearable
                  >
                    <el-option
                      v-for="item in selectList[3]"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </template>
                <template slot-scope="scope">
                  {{ scope.row.attention_level }}
                </template>
              </el-table-column>
              <el-table-column width="80" fixed="right">
                <template slot-scope="scope">
                  <span @click="goDetails(scope.row, '')" class="reply"
                    >详情</span
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="footer">
            <div class="totalCount">事件总数：{{ groupTableList.length }}</div>
            <el-pagination
              background
              layout="total,prev, pager, next"
              :total="totalCount"
              :current-page.sync="currentPage"
              @current-change="handleTableChange"
              :page-size="pageSize"
            >
              <!--  @current-change="handleTableChange" -->
            </el-pagination>
          </div>
        </section>
        <detailNav v-show="isShowDetail" ref="detailDom" />
      </div>
    </div>
  </section>
</template>

<script>
import detailNav from "./detail.vue";
export default {
  name: "InternetTablePop",
  components: {
    detailNav,
  },
  props: {
    type: String,
  },
  data() {
    return {
      showTablePop: false,
      isShowDetail: false,
      value1: "",
      queryType: 6, //下拉类型标志
      selectList: [], //通用下拉单
      //风险表格请求参数
      queryDate: "", //时间
      street: "", //街道
      categoryField: "", //领域
      mediation: "", //调处情况
      riskLevel: "", //风险等级
      riskTableList: [],
      //事件群体两个不同的字段
      eventScale: "", //事件规模
      attentionLevel: "", //关注等级
      groupTableList: [],

      totalCount: 10,
      currentPage: 1,
      pageSize: 10,
    };
  },
  watch: {
    showTablePop: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          if (this.type == "danger") {
            this.reqndswfxyhlist();
            this.reqQjxlxzq();
          } else {
            this.reqNdqtsjxq();
            this.reqQjxlxzq();
          }
        }
      },
    },
  },
  mounted() {},
  methods: {
    closeObscuration() {
      this.showTablePop = false;
    },
    //获取风险表格通用下拉
    async reqQjxlxzq() {
      //获取下拉前先清除
      this.selectList = [];
      if (this.type == "danger") {
        let i = 0;
        this.queryType = 6;
        for (this.queryType; this.queryType <= 10; this.queryType++) {
          let res = await this.$api.statePup.getQjxlxzq({
            queryType: this.queryType,
            sort: "desc",
          });

          this.$set(this.selectList, i, res.data);
          i++;
        }
      } else {
        let j = 0;
        this.queryType = 1;
        for (this.queryType; this.queryType <= 5; this.queryType++) {
          let res = await this.$api.statePup.getQjxlxzq({
            queryType: this.queryType,
            sort: "desc",
          });

          this.$set(this.selectList, j, res.data);
          j++;
        }
      }
    },

    //获取风险隐患列表
    async reqndswfxyhlist() {
      let res = await this.$api.statePup.getNdswfxyhlist({
        queryDate: this.queryDate,
        street: this.street,
        categoryField: this.categoryField,
        mediation: this.mediation,
        riskLevel: this.riskLevel,
      });
      this.totalCount = res.data.length;
      this.riskTableList = res.data;
      this.riskLevel = "";
      this.mediation = "";
    },
    //获取群体事件列表
    async reqNdqtsjxq() {
      let res = await this.$api.statePup.getNdqtsjxq({
        queryDate: this.queryDate,
        street: this.street,
        categoryField: this.categoryField,
        eventScale: this.eventScale,
        attentionLevel: this.attentionLevel,
      });

      this.totalCount = res.data.length;
      this.groupTableList = res.data;
      this.attentionLevel = "";
      this.eventScale = "";
    },
    //换页
    handleTableChange(page) {
      this.currentPage = page;
    },
    //返回
    changeStaus() {
      this.street = "";
      this.categoryField = "";
      this.mediation = "";
      this.riskLevel = "";
      this.eventScale = "";
      this.attentionLevel = "";
      this.$emit("goBack", 1);
      this.closeObscuration();
    },
    goDetails(v, type) {
      this.isShowDetail = true;
      this.$refs.detailDom.type = type;
      this.$refs.detailDom.detail = v;
    },
  },
};
</script>

<style lang="scss" scoped>
.table_pop {
  z-index: 2000;
  background-size: 100% 100%;
  height: auto;
  .title {
    display: flex;
    .go_back {
      margin-left: 680px;
      font-size: 20px;
      color: #fff;
      cursor: pointer;
    }
    .deatil_table_pop {
      width: 180px;
      height: 30px;
      background: url(~@/assets/images/common/tab_title_bg.png) no-repeat;
      background-size: 100%;
      font-size: 22px;
      font-family: PangMenZhengDao;
      color: #ffffff;
      padding-left: 24px;
      line-height: 30px;
      margin-bottom: 20px;
    }
  }
  .time_calendar {
    margin: 20px 0 30px 0;
    width: 40%;
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

    input::-webkit-input-placeholder {
      /* placeholder字体大小 */
      font-size: 20px;
    }
    .el-select-dropdown__item {
      padding: 0 !important;
      width: 100px !important;
    }
    .el-select-dropdown {
      padding: 0 !important;
    }
    .el-date-editor .el-icon-circle-close {
      position: absolute;
      top: 0;
      left: -50px;
    }
  }
}
.table_box {
  ::v-deep {
    .el-input__inner {
      width: 130px !important;
      border: none;
      text-align: center;
    }
  }
}
</style>
