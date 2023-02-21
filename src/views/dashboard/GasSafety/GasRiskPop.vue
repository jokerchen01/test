<template>
  <section v-if="status == 2" class="gasriskpop">
    <div class="title">
      <div class="deatil_table_pop">风险排查整治台账</div>
      <div class="go_back" @click="changeStaus"></div>
    </div>

    <div class="table_pop">
      <el-table
        style="width: 100%"
        max-height="600"
        border
        :data="tableList"
        :span-method="arraySpanMethod"
      >
        <el-table-column prop="Nosort" label="序号" width="70" align="center">
        </el-table-column>
        <el-table-column prop="sq" label="名称" align="center" width="220">
        </el-table-column>
        <el-table-column
          prop="Nosort2"
          label="子序号"
          :show-overflow-tooltip="true"
          align="center"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="mcs"
          label="风险地址"
          :show-overflow-tooltip="true"
          align="center"
          width="200"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          align="center"
          width="200"
        >
          <template slot="header" slot-scope="scope">
            <el-select
              v-model="street"
              placeholder="所属街道"
              clearable
              @change="reqRqaqFXPC"
            >
              <el-option
                v-for="item in streetOptions"
                :key="item.jd"
                :label="item.jd"
                :value="item.jd"
              >
              </el-option>
            </el-select>
          </template>
          <template slot-scope="scope">
            {{ scope.row.ssjb, }}
          </template>
        </el-table-column>
        <el-table-column
          prop="fxsbs"
          label="风险设备"
          :show-overflow-tooltip="true"
          align="center"
          width="160"
        >
        </el-table-column>
        <el-table-column
          prop="jdrqs"
          label="建档日期"
          :show-overflow-tooltip="true"
          align="center"
          width="160"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          align="center"
          width="160"
        >
          <template slot="header" slot-scope="scope">
            <el-select
              v-model="clear"
              placeholder="是否清除"
              clearable
              @change="reqRqaqFXPC"
            >
              <el-option
                v-for="item in clearOptions"
                :key="item.sfxc"
                :label="item.sfxc"
                :value="item.sfxc"
              >
              </el-option>
            </el-select>
          </template>
          <template slot-scope="scope">
            {{ scope.row.sfxcs }}
          </template>
        </el-table-column>
        <el-table-column
          prop="xcrqs"
          label="消除日期"
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
      options: [],
      value: "",
      tableList: [],
      street: "全部",
      clear: "全部",
      tableArr: [], //用于存放要合并的行序号
      tablePos: 0,
      streetOptions: [],
      clearOptions: [],
    };
  },
  created() {
   /*  this.reqRqaqFXJDXL();
    this.reqRqaqFXQCXL();
    this.reqRqaqFXPC(); */
  },
  methods: {
    changeStaus() {
      this.$emit("changeStatus", 0);
    },
    //下拉
    async reqRqaqFXJDXL() {
      let res = await this.$api.statePup.getRqaqFXJDXL();
      this.streetOptions = res;
    },
    async reqRqaqFXQCXL() {
      let res = await this.$api.statePup.getRqaqFXQCXL();
      this.clearOptions = res;
    },
    async reqRqaqFXPC() {
      let res = await this.$api.statePup.getRqaqFXPC({
        jd: this.street,
        sfxc: this.clear,
      });
      console.log(res);
      let newArr = [];
      res.forEach((v) => {
        let arr = v.fxsbs.split("|");
        let brr = v.jdrqs.split("|");
        let crr = v.sfxcs.split("|");
        let drr = v.mcs.split("|");
        let err = [];
        v.xcrqs != null ? (err = v.xcrqs.split("|")) : (err = []);

        for (let i = 0; i < arr.length; i++) {
          let obj = {
            fxsbs: "",
            jdrqs: "",
            sfxcs: "",
            mcs: "",
            fzr_phone: "",
            sq: "",
            ssjb: "",
            fzr: "",
            xcrqs: "",
          };
          obj.fxsbs = arr[i];
          obj.jdrqs = brr[i];
          obj.sfxcs = crr[i];
          obj.mcs = drr[i];
          err.length != 0 ? (obj.xcrqs = err[i]) : (obj.xcrqs = "");
          obj.fzr_phone = v.fzr_phone;
          obj.sq = v.sq;
          obj.ssjb = v.ssjb;
          obj.fzr = v.fzr;

          newArr.push(obj);
        }
      });
      this.tableList = newArr;
      this.getSpanArr(this.tableList);
    },
    getSpanArr(data) {
      // 把需要合并行的归类, data是表格数据
      this.tableArr = [];
      this.tablePos = 0;
      let Nosort2 = 1;
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          // 第一行必须存在
          this.tableArr.push(1);
          this.tablePos = 0;
          this.$set(data[0], "Nosort2", Nosort2);
        } else {
          if (data[i].sq === data[i - 1].sq) {
            this.tableArr[this.tablePos] += 1;
            this.tableArr.push(0);
            Nosort2 += 1;
            this.$set(data[i], "Nosort2", Nosort2);
          } else {
            this.tableArr.push(1);
            this.tablePos = i;
            Nosort2 = 1;
            this.$set(data[i], "Nosort2", Nosort2);
          }
        }
      }
      // 表格序号
      let Nosort = 0;
      for (let n in this.tableArr) {
        if (this.tableArr[n] > 0) {
          Nosort += 1;
          this.$set(data[n], "Nosort", Nosort);
        }
      }
    },

    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 0 || columnIndex == 1 || columnIndex == 4) {
        // 第一列的合并方法,省
        const row1 = this.tableArr[rowIndex];
        const col1 = row1 > 0 ? 1 : 0; // 如果被合并了_row=0则它这个列需要取消
        return {
          rowspan: row1,
          colspan: col1,
        };
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.gasriskpop {
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
      margin-bottom: 10px;
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
      .el-table {
        tr {
          height: 78px !important;
        }
      }
    }
  }
}

.table_pop {
  ::v-deep {
    .el-input__inner {
      width: 130px !important;
      border: none;
      text-align: center;
    }
  }
}
</style>
