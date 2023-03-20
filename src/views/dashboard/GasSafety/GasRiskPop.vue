<template>
  <section v-if="status == 2" class="gasriskpop">
    <div class="title">
      <div class="deatil_table_pop">风险排查整治台账</div>
      <div class="go_back" @click="changeStaus"></div>
    </div>

    <div class="table_pop">
      <el-table style="width: 100%" max-height="600" border :data="tableList" :span-method="arraySpanMethod">
        <el-table-column prop="Nosort" label="序号" width="70" align="center">
        </el-table-column>
        <el-table-column prop="sq" label="名称" align="center" width="220">
        </el-table-column>
        <el-table-column prop="Nosort2" label="子序号" :show-overflow-tooltip="true" align="center" width="100">
        </el-table-column>
        <el-table-column prop="mcs" label="风险地址" :show-overflow-tooltip="true" align="center" width="200">
        </el-table-column>
        <el-table-column prop="mcs" :show-overflow-tooltip="true" align="center" width="200" label="所属街道">
         
       
        </el-table-column>
        <el-table-column prop="fxsbs" label="风险设备" :show-overflow-tooltip="true" align="center" width="160">
        </el-table-column>
        <el-table-column prop="jdrqs" label="建档日期" :show-overflow-tooltip="true" align="center" width="160">
        </el-table-column>
        <el-table-column prop="sfxcs" label="是否清除" :show-overflow-tooltip="true" align="center" width="160">
         
        </el-table-column>
        <el-table-column prop="xcrqs" label="消除日期" :show-overflow-tooltip="true" align="center" width="160">
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
    this.reqRqaqFXPC()
    /*  this.reqRqaqFXJDXL();
     this.reqRqaqFXQCXL();
     ; */
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
    reqRqaqFXPC() {
      /*  let res = await this.$api.statePup.getRqaqFXPC({
         jd: this.street,
         sfxc: this.clear,
       }); */
      let res = [{ "xcrqs": null, "sfxcs": "否|否|否|否|否|否", "fxsbs": "干管|干管|干管|干管|干管|干管", "mcs": "平福巷|树蓓巷1号|平福巷|树蓓巷1号|树蓓巷1号|平福巷", "fzr_phone": "18180983186", "sq": "树蓓街社区", "ssjb": "驷马桥街道", "jdrqs": "2022年3月|2022年3月|2022年3月|2022年3月|2022年3月|2022年3月", "fzr": "刘国才" }, { "xcrqs": null, "sfxcs": "否|否|否|否|否|否|否|否|否|否", "fxsbs": "干管|干管|干管|干管|干管|干管|干管|干管|干管|干管", "mcs": "田家巷16号|解放西街|解放西街|红花南路|二环路北三段|红花南路|二环路北三段|解放西街|解放西街|解放西街", "fzr_phone": "18180983186", "sq": "红花社区", "ssjb": "驷马桥街道", "jdrqs": "2022年3月|2022年3月|2022年3月|2022年3月|2022年3月|2022年3月|2022年3月|2022年3月|2022年3月|2022年3月", "fzr": "刘国才" }, { "xcrqs": null, "sfxcs": "否|否|否|否|否|否", "fxsbs": "干管|干管|干管|干管|干管|干管", "mcs": "红花北路19号|二环路北三段|二环路北三段|二环路北三段|二环路北三段|二环路北三段", "fzr_phone": "18180983186", "sq": "高笋塘社区", "ssjb": "驷马桥街道", "jdrqs": "2022年3月|2022年3月|2022年3月|2022年3月|2022年3月|2022年3月", "fzr": "刘国才" }, { "xcrqs": null, "sfxcs": "否|否|否|否|否|否|否|否", "fxsbs": "庭院管线|庭院管线|干管|调压设备|庭院管线|干管|干管|庭院管线", "mcs": "平福路48号|树蓓街40号|三友路112号|一环路北四段211号|平福路48号|树蓓街|树蓓街|成都市马鞍小学", "fzr_phone": "18180983186", "sq": "马鞍社区", "ssjb": "驷马桥街道", "jdrqs": "2022年3月|2022年3月|2022年3月|2022年3月|2022年3月|2022年3月|2022年3月|2022年3月", "fzr": "刘国才" }, { "xcrqs": null, "sfxcs": "否|否|否|否|否|否|否", "fxsbs": "干管|调压设备|调压设备|调压设备|干管|干管|干管", "mcs": "二环路北三段|荷花池大成市场望月楼|荷花金池荷花后街2号|荷花池金牛之心针织一条街|荷花池菜市场|荷花池菜市场|站东南一路53号", "fzr_phone": "18180983186", "sq": "荷花池社区", "ssjb": "驷马桥街道", "jdrqs": "2022年3月|2022年3月|2022年3月|2022年3月|2022年3月|2022年3月|2022年3月", "fzr": "刘国才" }, { "xcrqs": null, "sfxcs": "否|否|否|否|否|否|否|否|否|否|否|否|否|否|否|否|否|否|否|否|否|否|否|否|否|否|否|否|否|否|否", "fxsbs": "干管\n庭院管线|庭院管线|庭院管线|庭院管线|庭院管线|干管|庭院管线|庭院管线|干管|庭院管线|庭院管线|庭院管线|庭院管线|庭院管线|干管|庭院管线|庭院管线|庭院管线|庭院管线|庭院管线|干管|庭院管线|庭院管线|庭院管线|庭院管线|干管|庭院管线|庭院管线|庭院管线|庭院管线|庭院管线", "mcs": "解放西街|外曹家巷49号|工人村24栋|工人村28栋|工人村26栋|工人村27栋|工人村38栋|工人村27栋|工人村29栋|工人村24栋|工人村28栋|工人村27栋|工人村27栋|工人村26栋|工人村27栋|工人村24栋|工人村26栋|外曹家巷49号|工人村20栋|外曹家巷49号|马鞍南路110号附13号|张家巷36号|工人村15栋|工人村17栋|工人村27栋|工人村27栋|工人村24栋|工人村28栋|工人村17栋|工人村24栋|外曹家巷49号", "fzr_phone": "18180983186", "sq": "工人村社区", "ssjb": "驷马桥街道", "jdrqs": "2022年3月|2022年3月|2022年3月|2022年3月|2022年3月|2022年3月|2022年3月|2022年3月|2022年3月|2022年3月|2022年3月|2022年3月|2022年3月|2022年3月|2022年3月|2022年3月|2022年3月|2022年3月|2022年3月|2022年3月|2022年3月|2022年3月|2022年3月|2022年3月|2022年3月|2022年3月|2022年3月|2022年3月|2022年3月|2022年3月|2022年3月", "fzr": "刘国才" }, { "xcrqs": null, "sfxcs": "否|否|否|否", "fxsbs": "干管|调压设备|庭院管线|庭院管线", "mcs": "解放西街|爱民路112号|爱民路124号|解放西路12号", "fzr_phone": "18180983186", "sq": "互助路社区", "ssjb": "驷马桥街道", "jdrqs": "2022年3月|2022年3月|2022年3月|2022年3月", "fzr": "刘国才" }, { "xcrqs": null, "sfxcs": "否|否|否|否|否", "fxsbs": "庭院管线|庭院管线|庭院管线|庭院管线|庭院管线", "mcs": "金牛宾馆|金牛宾馆|金牛宾馆|金牛宾馆|金牛宾馆", "fzr_phone": "18180983186", "sq": "金牛社区", "ssjb": "金泉街道", "jdrqs": "2022年3月|2022年3月|2022年3月|2022年3月|2022年3月", "fzr": "刘国才" }, { "xcrqs": null, "sfxcs": "否", "fxsbs": "干管", "mcs": "西三环路五段144号", "fzr_phone": "18180983186", "sq": "育新社区", "ssjb": "金泉街道", "jdrqs": "2022年3月", "fzr": "刘国才" }, { "xcrqs": null, "sfxcs": "否|否|否|否|否|否|否|否|否|否", "fxsbs": "庭院管线|庭院管线|庭院管线|庭院管线|庭院管线|庭院管线|庭院管线|庭院管线|庭院管线|庭院管线", "mcs": "文华路10号|文华路10号|文华路20号|文华路10号|文华路20号|文华路20号|文华路10号|文华路20号|文华路10号|文华路10号", "fzr_phone": "18180983186", "sq": "白果林社区", "ssjb": "西安路街道", "jdrqs": "2022年3月|2022年3月|2022年3月|2022年3月|2022年3月|2022年3月|2022年3月|2022年3月|2022年3月|2022年3月", "fzr": "刘国才" }, { "xcrqs": null, "sfxcs": "否", "fxsbs": "干管", "mcs": "西安北路63号", "fzr_phone": "18180983186", "sq": "青羊北路社区", "ssjb": "西安路街道", "jdrqs": "2022年3月", "fzr": "刘国才" }, { "xcrqs": null, "sfxcs": "否", "fxsbs": "干管", "mcs": "通锦路1号", "fzr_phone": "18180983186", "sq": "马家花园社区", "ssjb": "西安路街道", "jdrqs": "2022年3月", "fzr": "刘国才" }, { "xcrqs": null, "sfxcs": "否|否|否|否|否|否|否|否|否|否|否|否|否|否|否|否|否|否|否", "fxsbs": "庭院管线|庭院管线|庭院管线|庭院管线|庭院管线|庭院管线|庭院管线|庭院管线|庭院管线|庭院管线|庭院管线|庭院管线|庭院管线|庭院管线|干管|庭院管线|庭院管线|庭院管线|庭院管线", "mcs": "成华巷机关食堂|城隍东巷39号|城隍东巷44号|城隍东巷44号|城隍东巷44号|城隍东巷44号|成华街2号|城隍东巷39号|城隍东巷44号|城隍东巷39号|成华街2号|城隍东巷44号|成华街人北小学厨房|城隍东巷39号|花圃北路9号|城隍东巷44号|城隍东巷39号|城隍东巷44号|成华街2号", "fzr_phone": "18180983186", "sq": "城隍庙社区", "ssjb": "西安路街道", "jdrqs": "2022年3月|2022年3月|2022年3月|2022年3月|2022年3月|2022年3月|2022年3月|2022年3月|2022年3月|2022年3月|2022年3月|2022年3月|2022年3月|2022年3月|2022年3月|2022年3月|2022年3月|2022年3月|2022年3月", "fzr": "刘国才" }, { "xcrqs": null, "sfxcs": "否|否|否|否", "fxsbs": "庭院管线|干管\n庭院管线|庭院管线|庭院管线", "mcs": "西青路55号|西青路53号|西青路55号|西青路55号", "fzr_phone": "18180983186", "sq": "枣子巷社区", "ssjb": "西安路街道", "jdrqs": "2022年3月|2022年3月|2022年3月|2022年3月", "fzr": "刘国才" }, { "xcrqs": null, "sfxcs": "否", "fxsbs": "庭院管线", "mcs": "二环路抚琴西路口省妇幼保健院宿舍", "fzr_phone": "18180983186", "sq": "金琴南路社区", "ssjb": "西安路街道", "jdrqs": "2022年3月", "fzr": "刘国才" }, { "xcrqs": null, "sfxcs": "否", "fxsbs": "干管", "mcs": "交大路188号", "fzr_phone": "18180983186", "sq": "长庆社区", "ssjb": "营门口街道", "jdrqs": "2022年3月", "fzr": "刘国才" }, { "xcrqs": null, "sfxcs": "否|否|否", "fxsbs": "干管|干管|干管", "mcs": "站西桥东巷1号|站西桥东巷1号|玉居庵东路4号", "fzr_phone": "18180983186", "sq": "赛云台社区", "ssjb": "荷花池街道", "jdrqs": "2022年3月|2022年3月|2022年3月", "fzr": "刘国才" }, { "xcrqs": null, "sfxcs": "否|否|否|否|否|否|否|否", "fxsbs": "干管|干管|干管|干管|干管|干管|庭院管线|干管", "mcs": "北站西一巷|北站西二巷|北站西一巷3号|北站西二巷|北站西二巷|站西路3号|北站西一路小学食堂|北站西一巷", "fzr_phone": "18180983186", "sq": "北站社区", "ssjb": "荷花池街道", "jdrqs": "2022年3月|2022年3月|2022年3月|2022年3月|2022年3月|2022年3月|2022年3月|2022年3月", "fzr": "刘国才" }, { "xcrqs": null, "sfxcs": "否|否|否", "fxsbs": "干管|干管|干管", "mcs": "蓉北商贸大道二段199号|洞子口职业高级中学|蓉北商贸大道二段199号", "fzr_phone": "18180983186", "sq": "洞子口社区", "ssjb": "沙河源街道", "jdrqs": "2022年3月|2022年3月|2022年3月", "fzr": "刘国才" }, { "xcrqs": null, "sfxcs": "否|否|否", "fxsbs": "庭院管线|庭院管线|庭院管线", "mcs": "金鱼街72号|金鱼街72号|金鱼街72号", "fzr_phone": "18180983186", "sq": "西北街社区", "ssjb": "抚琴街道", "jdrqs": "2022年3月|2022年3月|2022年3月", "fzr": "刘国才" }, { "xcrqs": null, "sfxcs": "否|否|否", "fxsbs": "干管|庭院管线|庭院管线", "mcs": "光荣西路70号|二环路北一段2号|二环路北一段2号", "fzr_phone": "18180983186", "sq": "金沙路社区", "ssjb": "抚琴街道", "jdrqs": "2022年3月|2022年3月|2022年3月", "fzr": "刘国才" }, { "xcrqs": null, "sfxcs": "否", "fxsbs": "庭院管线", "mcs": "沙湾东一路171号", "fzr_phone": "18180983186", "sq": "铁路新村社区", "ssjb": "抚琴街道", "jdrqs": "2022年3月", "fzr": "刘国才" }, { "xcrqs": null, "sfxcs": "否|否", "fxsbs": "干管|干管", "mcs": "赛云台北路|赛云台北路", "fzr_phone": "18180983186", "sq": "五福社区", "ssjb": "五块石街道", "jdrqs": "2022年3月|2022年3月", "fzr": "刘国才" }, { "xcrqs": null, "sfxcs": "否", "fxsbs": "庭院管线", "mcs": "九里堤中路303号", "fzr_phone": "18180983186", "sq": "西南交通大学社区", "ssjb": "九里堤街道", "jdrqs": "2022年3月", "fzr": "刘国才" }, { "xcrqs": null, "sfxcs": "否", "fxsbs": "干管", "mcs": "星河路38号", "fzr_phone": "18180983186", "sq": "康禧社区", "ssjb": "九里堤街道", "jdrqs": "2022年3月", "fzr": "刘国才" }]
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
      background: url(~@/assets/images/qt_icon_fhuiq.png) 100% 100% no-repeat;
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
