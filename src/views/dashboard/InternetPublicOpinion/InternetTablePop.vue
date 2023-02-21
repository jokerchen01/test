<template>
  <section class="obscuration" v-if="showTablePop" @click="closeObscuration">
    <div class="table_pop" @click.stop="">
      <div class="title">
        <div class="deatil_table_pop" v-if="type == 'Week'">7日舆情列表</div>
        <div class="deatil_table_pop" v-if="type == 'Month'">本月舆情列表</div>
        <div class="go_back" @click="changeStaus"></div>
      </div>
      <div class="time_calendar">
        <el-date-picker
          v-model="value"
          type="daterange"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="width: 100%"
          value-format="yyyy-MM-dd"
          @change="reqTsjcwlyqlist"
        >
        </el-date-picker>
      </div>
      <el-table
        :data="Tsjcwlyqlist.slice((page - 1) * pageSize, page * pageSize)"
        style="width: 100%"
        max-height="600"
      >
        <el-table-column type="index" label="序号" width="70" align="center">
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
          prop="lx"
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
      <!-- <el-pagination
        background
        layout="total,prev, pager, next"
        :total="totalCount"
        :current-page.sync="page"
        @current-change="handleTableChange"
      >
      </el-pagination> -->
      <div class="footer">
        <div class="totalCount">事件总数：{{ Tsjcwlyqlist.length }}</div>
        <el-pagination
          background
          layout="total,prev, pager, next"
          :total="totalCount"
          :current-page.sync="page"
          @current-change="handleTableChange"
          :page-size="pageSize"
        >
        </el-pagination>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "InternetTablePop",
  props: ["type"],
  data() {
    return {
      showTablePop: false,
      value: [], //时间
      street: "", //街道
      lx: "", //舆情类型
      totalCount: 10,
      page: 1,
      pageSize: 10,
      Tsjcwlyqlist: [], //表格列表
      blzt: "", //办理状态
    };
  },
  watch: {
    showTablePop: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.reqTsjcwlyqlist();
        }
      },
    },
  },
  created() {},
  methods: {
    closeObscuration() {
      this.showTablePop = false;
    },
    //获取舆情列表
    async reqTsjcwlyqlist() {
      if (!this.value) {
        this.value = [];
      }
      let res = await this.$api.operationSituaty.getParameter(
        {
          street: this.street,
          lx: this.lx,
          start_time: this.value[0],
          end_time: this.value[1],
          blzt: this.blzt,
        },
        "byyqlb"
      );
      this.Tsjcwlyqlist = res;
      if (res.length != 0) {
        this.totalCount = res[0].total;
      }

      this.lx = "";
      this.street = "";
      this.blzt == "";
    },
    //换页
    handleTableChange(page) {
      this.page = page;
    },
    //返回
    changeStaus() {
      this.$emit("goBack", 1);
      this.closeObscuration();
      this.lx = "";
    },
    openPupClick(id) {
      this.$emit("openPupClick", id);
      this.closeObscuration();
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
      display: block;
      width: 47px;
      height: 47px;
      background: url(~@/assets/images/qt_icon_fhuiq.png) 100% 100%
        no-repeat;
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
  }
}
.colorbox {
  display: inline-block;
  width: 18px;
  height: 18px;
}
</style>
