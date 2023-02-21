<template>
  <section>
    <section>
      <section class="status_box">
        <div
          class="item"
          :class="{ active: currentStatus == 1 || currentStatus == -1 }"
          @click="changeStatus(1)"
        >
          食品安全监管
        </div>
        <div
          class="item"
          :class="{ active: currentStatus == 2 || currentStatus == -2 }"
          @click="changeStatus(2)"
        >
          药品安全监管
        </div>
        <div
          class="item"
          :class="{ active: currentStatus == 3 || currentStatus == -3 }"
          @click="changeStatus(3)"
        >
          产（商）品质量监管
        </div>
        <div
          class="item"
          :class="{ active: currentStatus == 4 || currentStatus == -4 }"
          @click="changeStatus(4)"
        >
          特种设备监管
        </div>
      </section>
    </section>
    <el-divider></el-divider>
    <section v-show="currentStatus == 1">
      <div class="seven_shop" style="margin-bottom: 30px">
        食品安全监管<span class="timeEnd">数据截至8.31</span>
      </div>
      <section class="dialog_summarize">
        <div class="title_box">
          <div class="indicatorsBox">
            <div class="title">食品生产企业数</div>
            <div class="title_box_inner">
              <span class="first_num">10</span>
              <!-- <span class="title_unit">件</span> -->
              <span class="title_unit"></span>
            </div>
          </div>

          <div class="indicatorsBox">
            <div class="title por">食品流通企业数</div>
            <div class="title_box_inner">
              <span class="first_num">10952</span>
              <span class="title_unit"></span>
            </div>
          </div>

          <div class="indicatorsBox">
            <div class="title">餐饮服务企业数</div>
            <div class="title_box_inner">
              <span class="first_num">10201</span>
              <span class="title_unit"></span>
            </div>
          </div>
        </div>
      </section>

      <div class="seven_shop" style="margin-bottom: 30px">监管情况</div>
      <section class="dialog_summarize">
        <div class="title_box">
          <div class="indicatorsBox">
            <!-- <div class="title">监督检查（户次）</div> -->
            <div class="title">监督检查</div>
            <div class="title_box_inner">
              <span class="first_num">36525</span>
              <span class="title_unit">户次</span>
              <span class="title_unit"></span>
            </div>
          </div>

          <div class="indicatorsBox">
            <div class="title por">
              <!-- 监督抽检合格（批次） -->
              监督抽检合格
              <div class="percentBox">
                <div class="percent">占比</div>
                <div class="percent_num">
                  <span>97.56%</span>
                </div>
              </div>
            </div>
            <div class="title_box_inner">
              <span class="first_num">4952</span>
              <span class="title_unit">批次</span>
            </div>
          </div>

          <div class="indicatorsBox">
            <!-- <div class="title">不合格（批次）</div> -->
            <div class="title">不合格</div>
            <div class="title_box_inner">
              <span
                class="second_num"
                style="cursor: pointer"
                @click="showTable()"
                >116</span
              >
              <span class="title_unit">批次</span>
            </div>
            <div ref="percentOfPass1" class="air_dom"></div>
          </div>
        </div>
      </section>
      <br />
      <br />
      <section class="dialog_summarize">
        <div class="title_box">
          <div class="indicatorsBox">
            <!-- <div class="title por">投诉举报（件）</div> -->
            <div class="title por">投诉举报</div>
            <div class="title_box_inner">
              <span class="first_num">86</span>
              <span class="title_unit">件</span>
            </div>
          </div>
          <div class="indicatorsBox">
            <div class="title">线索移送</div>
            <div class="title_box_inner">
              <span class="first_num">11</span>
              <span class="title_unit">件</span>
            </div>
          </div>
          <div class="indicatorsBox">
            <div class="title"></div>
            <div class="title_box_inner">
              <span class="first_num"></span>
              <!-- <span class="title_unit">件</span> -->
              <span class="title_unit"></span>
            </div>
          </div>
        </div>
      </section>
    </section>
    <section v-if="currentStatus == -1">
      <section class="dialog_table" v-show="!isShowDetail">
        <div class="table_title">
          <div class="table_title_icon"></div>
          <span class="table_title_text">检查详情</span>
          <div class="switcher">
            <div class="switcher_pre_active" @click="showTable()"></div>
          </div>
        </div>
        <el-table
          :data="tableData1"
          style="width: 100%"
          height="342"
          :header-cell-class-name="headerCellClass"
        >
          <el-table-column
            type="index"
            width="80"
            label="序号"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="ajly"
            label="案件来源"
            width="150"
            align="center"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="dsrmc"
            label="当事人名称"
            width="200"
            align="center"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="wfxw"
            label="涉嫌/违法行为"
            width="160"
            align="center"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="cfbh"
            label="立案/当场处罚编号"
            width="220"
            align="center"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="fk"
            label="罚款（元）"
            width="120"
            align="center"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="jasj"
            label="结案时间"
            width="150"
            align="center"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column width="80" fixed="right">
            <template slot-scope="scope">
              <span @click="goDetails(scope.row)" class="reply">详情</span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="total, prev, pager, next"
          :current-page="page1"
          :total="total1"
          :page-size="pageSize"
          @current-change="changePage1"
        >
        </el-pagination>
      </section>
      <detailNav v-show="isShowDetail" ref="detailDom" />
    </section>
    <section v-show="currentStatus == 2">
      <medicin-regulation />
    </section>
    <section v-show="currentStatus == -2">
      <section class="dialog_table">
        <div class="table_title">
          <div class="table_title_icon"></div>
          <span class="table_title_text">检查详情</span>
          <div class="switcher">
            <div class="switcher_pre_active" @click="showTable()"></div>
          </div>
        </div>
        <el-table
          :data="tableData2"
          style="width: 100%"
          height="342"
          :header-cell-class-name="headerCellClass"
        >
          <el-table-column
            type="index"
            width="80"
            label="序号"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="ajly"
            label="案件来源"
            width="150"
            align="center"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="dl"
            label="大类"
            width="150"
            align="center"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="xl"
            label="小类"
            width="150"
            align="center"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="dsrmc"
            label="当事人名称"
            width="200"
            align="center"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="wfxw"
            label="涉嫌/违法行为"
            width="160"
            align="center"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="cfbh"
            label="立案/当场处罚编号"
            width="220"
            align="center"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="ajmc"
            label="案件名称"
            width="150"
            align="center"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="zywfxw"
            label="查办案件的主要违法行为"
            width="150"
            align="center"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="wfxwft"
            label="违法行为的法条明细"
            width="150"
            align="center"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="cftkmx"
            label="处罚条款明细"
            width="150"
            align="center"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="mssw"
            label="没收实物"
            width="150"
            align="center"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="mswfsd"
            label="没收违法所得（元）"
            width="150"
            align="center"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="fk"
            label="罚款（元）"
            width="120"
            align="center"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="jasj"
            label="结案时间"
            width="150"
            align="center"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="cfjdsh"
            label="处罚决定书号"
            width="150"
            align="center"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
            width="120"
            align="center"
            show-overflow-tooltip
          >
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="total, prev, pager, next"
          :current-page="page2"
          :total="total2"
          :page-size="pageSize"
          @current-change="changePage2"
        >
        </el-pagination>
      </section>
    </section>
    <section v-show="currentStatus == 3">
      <div class="seven_shop" style="margin-bottom: 30px">
        产（商）品质量监管
        <span class="timeEnd">数据截至8.31</span>
      </div>
      <section class="dialog_summarize">
        <div class="title_box">
          <!-- <div class="indicatorsBox">
            <div class="title"></div>
            <div class="title_box_inner">
              <span class="first_num"></span>
              <span class="title_unit">件</span>
              <span class="title_unit"></span>
            </div>
          </div> -->

          <div class="indicatorsBox">
            <div class="title por">经营主体</div>
            <div class="title_box_inner">
              <span class="first_num">452522</span>
              <span class="title_unit">家</span>
            </div>
          </div>

          <!-- <div class="indicatorsBox">
            <div class="title"></div>
            <div class="title_box_inner">
              <span class="first_num"></span>
              <span class="title_unit"></span>
            </div>
          </div> -->
        </div>
      </section>

      <div class="seven_shop" style="margin-bottom: 30px">监管情况</div>
      <section class="dialog_summarize">
        <div class="title_box">
          <div class="indicatorsBox">
            <div class="title">监督检查</div>
            <div class="title_box_inner">
              <span class="first_num">345268</span>
              <!-- <span class="title_unit">件</span> -->
              <span class="title_unit">户次</span>
            </div>
          </div>

          <div class="indicatorsBox">
            <div class="title por">
              监督抽检合格
              <div class="percentBox">
                <div class="percent">占比</div>
                <div class="percent_num">
                  <span>88.65%</span>
                </div>
              </div>
            </div>
            <div class="title_box_inner">
              <span class="first_num">322</span>
              <span class="title_unit">批次</span>
            </div>
          </div>

          <div class="indicatorsBox">
            <div class="title">不合格</div>
            <div class="title_box_inner">
              <span
                class="second_num"
                style="cursor: pointer"
                @click="showTable()"
                >35</span
              >
              <span class="title_unit">批次</span>
            </div>
            <div ref="percentOfPass3" class="air_dom"></div>
          </div>
        </div>
      </section>
      <br />
      <br />
      <section class="dialog_summarize">
        <div class="title_box">
          <div class="indicatorsBox">
            <div class="title por">投诉举报</div>
            <div class="title_box_inner">
              <span class="first_num">6</span>
              <span class="title_unit">件</span>
            </div>
          </div>

          <div class="indicatorsBox">
            <div class="title">线索移送</div>
            <div class="title_box_inner">
              <span class="first_num">2</span>
              <span class="title_unit">件</span>
            </div>
          </div>
          <div class="indicatorsBox">
            <div class="title"></div>
            <div class="title_box_inner">
              <span class="first_num"></span>
              <!-- <span class="title_unit">件</span> -->
              <span class="title_unit"></span>
            </div>
          </div>
        </div>
      </section>
    </section>
    <section v-if="currentStatus == -3">
      <section class="dialog_table" v-show="!isShowDetail">
        <div class="table_title">
          <div class="table_title_icon"></div>
          <span class="table_title_text">检查详情</span>
          <div class="switcher">
            <div class="switcher_pre_active" @click="showTable()"></div>
          </div>
        </div>
        <el-table
          :data="tableData3"
          style="width: 100%"
          height="342"
          :header-cell-class-name="headerCellClass"
        >
          <el-table-column
            type="index"
            width="80"
            label="序号"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="ajly"
            label="案件来源"
            width="150"
            align="center"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="dsrmc"
            label="当事人名称"
            width="200"
            align="center"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="wfxw"
            label="涉嫌/违法行为"
            width="160"
            align="center"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="cfbh"
            label="立案/当场处罚编号"
            width="220"
            align="center"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="ajmc"
            label="案件名称"
            width="150"
            align="center"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="fk"
            label="罚款（元）"
            width="120"
            align="center"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="jasj"
            label="结案时间"
            width="150"
            align="center"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column width="80" fixed="right">
            <template slot-scope="scope">
              <span @click="goDetails(scope.row)" class="reply">详情</span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="total, prev, pager, next"
          :current-page="page3"
          :total="total3"
          :page-size="pageSize"
          @current-change="changePage3"
        >
        </el-pagination>
      </section>
      <detailNav v-show="isShowDetail" ref="detailDom" />
    </section>
    <section v-show="currentStatus == 4">
      <section class="dialog_summarize">
        <div class="title_box">
          <div class="indicatorsBox">
            <div class="title">金牛区电梯总数</div>
            <div class="title_box_inner">
              <span class="first_num">13250</span>
              <!-- <span class="title_unit">件</span> -->
              <span class="title_unit"></span>
            </div>
          </div>

          <div class="indicatorsBox">
            <div class="title por">近30日发生困人的电梯数</div>
            <div class="title_box_inner">
              <span class="second_num">0</span>
              <span class="title_unit"></span>
            </div>
          </div>

          <div class="indicatorsBox">
            <div class="title">近30日发生3次以上困人电梯数</div>
            <div class="title_box_inner">
              <span class="second_num">0</span>
              <span class="title_unit"></span>
            </div>
          </div>
        </div>
      </section>
      <section style="display: flex; height: 350px">
        <section class="halfBox6">
          <div class="seven_shop" style="margin-bottom: 30px">
            各街道/社区电梯数量分布
          </div>
          <!-- <div
            ref="chartColumnar"
            style="width: 550px; height: 260px; overflow: visible"
          ></div> -->
          <div v-if="true" ref="elevatorNum" class="echart_dom"></div>
          <div v-else class="no_data"></div>
        </section>
        <section class="halfBox4">
          <div class="seven_shop" style="margin-bottom: 30px">
            近30日电梯困人街道排行
          </div>
          <div class="main_content suqlx" v-if="true">
            <!-- <div class="content_title">多诉事件</div> -->
            <div class="duosu">
              <div v-for="(item, index) in multilData" :key="index">
                <div class="content_text">
                  <div>
                    <img src="~@/assets/images/dot.png" />
                    {{ item.ssjd }}
                  </div>
                  <span>{{ item.total }}</span>
                </div>
                <scroll-bar
                  :backgroundColor="2"
                  :width="(item.total / 20) * 100 + ''"
                ></scroll-bar>
                <!-- <scroll-bar
                  :backgroundColor="2"
                  :width="0.04 * 100 + ''"
                ></scroll-bar> -->
              </div>
            </div>
          </div>
          <div v-else class="no_data"></div>
        </section>
      </section>
    </section>
  </section>
</template>

<script>
import detailNav from "./detail.vue";
import medicinRegulation from "./medicinRegulation.vue";
import echarts from "echarts";
import {
  elevatorNum,
  percentOfPass1,
  percentOfPass2,
  percentOfPass3,
} from "@/views/echarts";
// import { salesBar, trafficBar, top3GdpPie } from "../../echart";
import scrollBar from "./scrollBar.vue";

export default {
  components: {
    scrollBar,
    medicinRegulation,
    detailNav,
  },
  data() {
    return {
      isShowDetail: false, //是否展示详情信息
      currentStatus: 1,
      headerCellClass: "header_cell",
      pageSize: 6,
      tableData1: [],
      page1: 1,
      total1: 0,
      tableData2: [],
      page2: 1,
      total2: 0,
      tableData3: [],
      page3: 1,
      total3: 0,
      // 栏目1指标
      spscqys: "--", // 食品生产企业数
      spltqys: "--", // 食品流通企业数
      cyfwqys: "--", // 餐饮服务企业数
      jdjc1: "--", // 监督检查（户次）
      jdcjhg1: "0", // 监督抽检合格（批次）
      zb1: "--", // 占比
      bhg1: "0", // 不合格（批次）
      tsjb1: "--", // 投诉举报（件）
      xsys1: "--", // 线索移送（件）

      // 栏目3指标
      jyzt: "--", // 经营主体
      jdjc3: "--", // 监督检查（户次）
      jdcjhg3: "0", // 监督抽检合格（批次）
      zb3: "--", // 占比
      bhg3: "0", // 不合格（批次）
      tsjb3: "--", // 投诉举报（件）
      xsys3: "--", // 线索移送（件）
      JNDTZS: "--", // 金牛区电梯总数
      krdts1: "--", // 近30日发生困人的电梯数
      krdts2: "--", // 近30日发生3次以上困人电梯数
      // 各街道/社区电梯数量分布
      qxdatax: [
        "荷花池",
        "金泉",
        "茶店子",
        "西安路",
        "驷马桥",
        "抚琴",
        "沙河源",
        "天回镇",
        "营门口",
        "西华",
        "五块石",
        "九里堤",
        "凤凰山",
      ],
      qxdatay: [
        3539,
        2784,
        2591,
        2581,
        2495,
        2455,
        2066,
        2055,
        1866,
        1553,
        1278,
        972,
        402,
      ],
      // 近30日电梯困人街道排行
      multilData: [
          { ssjd: "西安路", total: 3 },
        { ssjd: "驷马桥", total: 4 },
        { ssjd: "荷花池", total: 6 },
        { ssjd: "营门口", total: 2 },
        { ssjd: "天回镇", total: 0 },
        { ssjd: "天回镇", total: 3 },
        { ssjd: "天回镇", total: 4 },
      ],
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      // 食品生产企业数
      this.$api.statePup
        .getDataSet({ dateCode: ["nw"] }, "IDX_CQYS")
        .then((res) => {
          this.spscqys = res.data.data.nw.data[0].value;
        });
      // 食品流通企业数
      this.$api.statePup
        .getDataSet({ dateCode: ["nw"] }, "IDX_SPLT")
        .then((res) => {
          this.spltqys = res.data.data.nw.data[0].value;
        });
      // 餐饮服务企业数
      this.$api.statePup
        .getDataSet({ dateCode: ["nw"] }, "IDX_CYFW")
        .then((res) => {
          this.cyfwqys = res.data.data.nw.data[0].value;
        });
      // 监督检查1
      this.$api.statePup
        .getDataSet({ dateCode: ["nw"] }, "IDX_SPAQ")
        .then((res) => {
          this.jdjc1 = res.data.data.nw.data[0].value;
        });
      // 监督抽检合格1
      this.$api.statePup
        .getDataSet({ dateCode: ["nw"] }, "IDX_PAQJ")
        .then((res) => {
          this.jdcjhg1 = res.data.data.nw.data[0].value;
          this.initPie1();
        });
      // 监督抽检合格-占比1
      this.$api.statePup
        .getDataSet({ dateCode: ["nw"] }, "IDX_AQJD")
        .then((res) => {
          this.zb1 = res.data.data.nw.data[0].value;
        });
      // 不合格1
      this.$api.statePup
        .getDataSet({ dateCode: ["nw"] }, "IDX_QJDC")
        .then((res) => {
          this.bhg1 = res.data.data.nw.data[0].value;
          this.initPie1();
        });
      // 投诉举报1
      this.$api.statePup
        .getDataSet({ dateCode: ["nw"] }, "IDX_QJDT")
        .then((res) => {
          this.tsjb1 = res.data.data.nw.data[0].value;
        });
      // 线索移送1
      this.$api.statePup
        .getDataSet({ dateCode: ["nw"] }, "IDX_QJDX")
        .then((res) => {
          this.xsys1 = res.data.data.nw.data[0].value;
        });
      // 经营主体
      this.$api.statePup
        .getDataSet({ dateCode: ["nw"] }, "IDX_CSPJ")
        .then((res) => {
          this.jyzt = res.data.data.nw.data[0].value;
        });
      // 监督检查3
      this.$api.statePup
        .getDataSet({ dateCode: ["nw"] }, "IDX_CSPZ")
        .then((res) => {
          this.jdjc3 = res.data.data.nw.data[0].value;
        });
      // 监督抽检合格3
      this.$api.statePup
        .getDataSet({ dateCode: ["nw"] }, "IDX_SPZL")
        .then((res) => {
          this.jdcjhg3 = res.data.data.nw.data[0].value;
          this.initPie3();
        });
      // 监督抽检合格-占比3
      this.$api.statePup
        .getDataSet({ dateCode: ["nw"] }, "IDX_PZLJ")
        .then((res) => {
          this.zb3 = res.data.data.nw.data[0].value;
        });
      // 不合格3
      this.$api.statePup
        .getDataSet({ dateCode: ["nw"] }, "IDX_ZLJD")
        .then((res) => {
          this.bhg3 = res.data.data.nw.data[0].value;
          this.initPie3();
        });
      // 投诉举报3
      this.$api.statePup
        .getDataSet({ dateCode: ["nw"] }, "IDX_LJDT")
        .then((res) => {
          this.tsjb3 = res.data.data.nw.data[0].value;
        });
      // 线索移送3
      this.$api.statePup
        .getDataSet({ dateCode: ["nw"] }, "IDX_LJDX")
        .then((res) => {
          this.xsys3 = res.data.data.nw.data[0].value;
        });
      // 金牛区电梯总数
      this.$api.statePup
        .getDataSet({ dateCode: ["nw"] }, "IDX_JNQD")
        .then((res) => {
          this.JNDTZS = res.data.data.nw.data[0].value;
          // console.log(res.data.data.nw.data[0].value, "111");
        });
      // 近30日发生困人的电梯数
      this.$api.statePup
        .getDataSet({ dateCode: ["nw"] }, "IDX_JRFS")
        .then((res) => {
          this.krdts1 = res.data.data.nw.data[0].value;
        });
      // 近30日发生3次以上困人电梯数
      this.$api.statePup
        .getDataSet({ dateCode: ["nw"] }, "IDX_RFSC")
        .then((res) => {
          this.krdts2 = res.data.data.nw.data[0].value;
        });
      // 获取table1、table2、table3数据
      this.getTableData(1, 1);
      this.getTableData(2, 1);
      this.getTableData(3, 1);
      // 等数据加载完成后再调用渲染
      // this.initEcharts({ qxdatax: this.qxdatax, qxdatay: this.qxdatay });
      this.initEcharts1();
      this.getRank();
      this.initPie1();
      this.initPie2();
      this.initPie3();
    },
    // 获取表格数据
    getTableData(flag, pageNum) {
      console.log(sessionStorage);
      // this.$api.operationSituaty
      this.$api.statePup
        .getMarketlist({
          page: pageNum,
          pageSize: this.pageSize,
          dl:
            flag == 1
              ? "食品安全监管"
              : flag == 2
              ? "药品安全监管"
              : "产（商）品质量监管",
        })
        .then((res) => {
          console.log("resresres", res);
          if (res.code === 200) {
            switch (flag) {
              case 1:
                this.tableData1 = res.data.list;
                this.page1 = res.data.pageNumber;
                this.total1 = res.data.totalRow;
                break;
              case 2:
                this.tableData2 = res.data.list;
                this.page2 = res.data.pageNumber;
                this.total2 = res.data.totalRow;
                break;
              case 3:
                this.tableData3 = res.data.list;
                this.page3 = res.data.pageNumber;
                this.total3 = res.data.totalRow;
                break;
            }
          }
        });
    },
    // 切换栏目
    changeStatus(v) {
      this.currentStatus = v;
      if (v == 4) {
        this.$nextTick(() => {
          this.initEcharts1();
          this.getRank();
        });
      }
    },
    // 开关表格
    showTable() {
      this.currentStatus = this.currentStatus * -1;
      this.isShowDetail = false;
    },
    changePage1(page1) {
      this.getTableData(1, page1);
      console.log(`table1翻到${page1}页了`);
    },
    changePage2(page2) {
      this.getTableData(2, page2);
      console.log(`table2翻到${page2}页了`);
    },
    changePage3(page3) {
      this.getTableData(3, page3);
      console.log(`table3翻到${page3}页了`);
    },
    initEcharts(datas) {
      let data = datas.qxdatay;
      let ydata = datas.qxdatax;
      let yMax = 500;
      let dataShadow = [];
      for (let i = 0; i < data.length; i++) {
        dataShadow.push(yMax);
      }
      let myChartColumnar = echarts.init(this.$refs.chartColumnar);
      myChartColumnar.setOption({
        tooltip: {
          trigger: "axis",
          textStyle: {
            fontSize: 35,
          },
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        grid: {
          right: "10%",
          top: "15%",
          left: "8%",
          bottom: "35%",
        },
        xAxis: {
          data: ydata,
          axisLabel: {
            // inside: true,
            color: "#ffffff",
            fontSize: 18,
            // rotate: 40,
            formatter: function(value) {
              if (value.length > 4) {
                return `${value.slice(0, 4)}...`;
              }
              return value;
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(155, 194, 255, .5)",
              width: 1,
              type: "solid",
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: "#ffffff",
            fontSize: 18,
          },
          axisLine: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
              color: "rgba(133,213,255,0.08)",
            },
          },
        },
        dataZoom: [
          {
            type: "inside",
          },
        ],
        series: [
          {
            type: "bar",
            barWidth: 10,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 1)",
            },
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(116, 199, 255, 1)" },
                { offset: 0.5, color: "#188df0" },
                { offset: 1, color: "rgba(172, 229, 255, 0.1500)" },
              ]),
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#2378f7" },
                  { offset: 0.7, color: "#2378f7" },
                  { offset: 1, color: "#83bff6" },
                ]),
              },
            },
            data: data,
          },

          // {
          //   data: data /* 这里要和第一组数据一样、才能保持在最高处*/,
          //   type: "line",
          //   symbol: "circle", //拐点样式
          //   symbolSize: 3, //拐点大小
          //   itemStyle: {
          //     normal: {
          //       lineStyle: {
          //         width: 1, //折线宽度
          //         color: "rgba(255, 223, 200, 1)", //折线颜色
          //       },
          //       color: "rgba(255, 223, 200, 1)", //拐点颜色
          //       borderColor: "rgba(255, 223, 200, 1)", //拐点边框颜色
          //       borderWidth: 3, //拐点边框大小
          //     },
          //     emphasis: {
          //       color: "#4CCEFE", //hover拐点颜色定义
          //     },
          //   },
          // },
        ],
      });
      myChartColumnar.resize();
      const zoomSize = 6;
      myChartColumnar.on("click", function(params) {
        console.log(data[Math.max(params.dataIndex - zoomSize / 2, 0)]);
        myChartColumnar.dispatchAction({
          type: "dataZoom",
          startValue: data[Math.max(params.dataIndex - zoomSize / 2, 0)],
          endValue:
            data[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)],
        });
      });
    },
    initEcharts1() {
     /*  let nameList = [];
      let valueList = [];

      this.$api.operationSituaty.getIndicators("gjddtslfb").then((res) => {
        res.forEach((v) => {
          nameList.push(v.ssjd);
          valueList.push(v.total);
        });
        elevatorNum.xAxis.data = nameList;
        elevatorNum.series[0].data = valueList;
      }); */
      this.$nextTick(() => {
        let echartsObj = this.$echarts.init(this.$refs.elevatorNum);
        echartsObj.setOption(elevatorNum);
      });
    },
    initPie1() {
      this.$nextTick(() => {
        let pieData = [
          { name: "合格", value: this.jdcjhg1 },
          { name: "不合格", value: this.bhg1 },
        ];
        percentOfPass1.series[0].data = pieData;
        let pieEcharts = this.$echarts.init(this.$refs.percentOfPass1);
        pieEcharts.setOption(percentOfPass1);
      });
    },
    initPie2() {
      this.$nextTick(() => {
        let pieData = [
          { name: "合格", value: this.jdcjhg2 },
          { name: "不合格", value: this.bhg2 },
        ];
        percentOfPass2.series[0].data = pieData;
        let pieEcharts = this.$echarts.init(this.$refs.percentOfPass2);
        pieEcharts.setOption(percentOfPass2);
      });
    },
    initPie3() {
      this.$nextTick(() => {
        let pieData = [
          { name: "合格", value: this.jdcjhg3 },
          { name: "不合格", value: this.bhg3 },
        ];
        percentOfPass3.series[0].data = pieData;
        let pieEcharts = this.$echarts.init(this.$refs.percentOfPass3);
        pieEcharts.setOption(percentOfPass3);
      });
    },
    goDetails(v) {
      this.isShowDetail = true;
      this.$refs.detailDom.detail = v;
    },
    //近30日电梯被困排行
    getRank() {
     /*  this.$api.operationSituaty.getIndicators("dtkrjdph").then((res) => {
        this.multilData = res;
      }); */
    },
  },
};
</script>

<style lang="scss" scoped>
.halfBox {
  width: 50%;
}
.halfBox6 {
  width: 60%;
  position: relative;
}
.halfBox4 {
  width: 40%;
  position: relative;
}
.duosu {
  width: 280px;
  // height: 185px;
  height: 300px;
  margin-top: 10px;
  overflow: hidden;
  overflow-y: auto;
}
.suqlx {
  margin-top: 16px;
}
.main_content {
  width: 445px;
  height: 224px;
  // background: url("~@/assets/images//echartsbg.png") 100% 100%
  // no-repeat;
  .content_title {
    width: 100%;
    padding-left: 34px;
    font-size: 24px;
    font-family: PangMenZhengDao-3, PangMenZhengDao;
    font-weight: normal;
    color: #ffffff;
    line-height: 25px;
    letter-spacing: 1px;
    background: linear-gradient(180deg, #ffffff 0%, #5689b0 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .content_text {
    width: 100%;
    height: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 18px;
    margin-bottom: 10px;
    div {
      font-size: 18px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ebfaff;
      line-height: 25px;
    }
    span {
      font-size: 24px;
      font-family: DIN-Bold, DIN;
      font-weight: bold;
      color: #ffffff;
      line-height: 29px;
      background: linear-gradient(180deg, #ffffff 0%, #b9e7ff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}
.dialog_table {
  .table_title {
    position: relative;
    padding: 20px 0;
    font-size: 22px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #ffe489;
    line-height: 30px;
    letter-spacing: 1px;
    //text-shadow: 0px 2px 11px rgba(0, 0, 0, 0.5000), 0px -6px 4px rgba(255, 255, 255, 0.5000);
    background: linear-gradient(180deg, #ffffff 0%, #a3d5ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    &_icon {
      margin-top: 4px;
      float: left;
      height: 22px;
      width: 22px;
      background: url(~@/assets/images/table_title_icon.png) 100% 100%
        no-repeat;
      background-size: 100%;
    }

    &_text {
      padding-left: 9px;
    }
    .switcher {
      position: absolute;
      width: 30px;
      height: 30px;
      top: 50%;
      left: 98%;
      transform: translate(-50%, -50%);
      overflow: visible;
      &_pre {
        background: url(~@/assets/images/leftjt.png) 150% 80%;
        background-size: 100%;
        width: 30px;
        height: 30px;
        margin-right: 8px;
        cursor: pointer;
      }
      &_pre_active {
        width: 30px;
        height: 30px;
        cursor: pointer;
        background: url(~@/assets/images/leftacjt.png) no-repeat;
        background-size: 100%;
      }
      &_next {
        background: url(~@/assets/images/rightjt.png) no-repeat;
        background-size: 100%;
        width: 30px;
        height: 30px;
        cursor: pointer;
      }
      &_next_active {
        background: url(~@/assets/images/rightacjt.png) no-repeat;
        background-size: 100%;
      }
    }
  }
}
.dialog_summarize {
  width: 100%;
  height: 96px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &_item {
    width: 25%;
    height: 100%;
    position: relative;

    .sum_text {
      font-size: 20px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      line-height: 24px;
      letter-spacing: 1px;
      padding-top: 0.039063rem; /* 15 / 384 */
      text-align: center;
    }

    .sum_bg {
      background: url(~@/assets/images/common/xiaofeizhishu_bg.png) 100% 100%
        no-repeat;
      height: 19px;
      position: absolute;
      width: 100%;
      left: -17px;
      top: 45px;
    }

    .sum_num {
      height: 49px;
      font-size: 40px;
      font-family: DIN-Bold, DIN;
      font-weight: bold;
      color: #ffffff;
      line-height: 49px;
      letter-spacing: 1px;
      background: linear-gradient(180deg, #ffffff 0%, #b9e7ff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-align: center;
    }
  }
  .title_box {
    width: 100%;
    display: flex;
    height: 110px;
    justify-content: space-between;

    .indicatorsBox {
      width: 20%;
      white-space: nowrap;
      overflow: visible;
      .por {
        position: relative;
      }

      .title {
        background: url(~@/assets/images/common/title_background.png) no-repeat;
        background-size: 100%;
        font-size: 20px;
        color: rgba(255, 255, 255, 1);
        padding-left: 12px;
        line-height: 20px;
        margin-bottom: 24px;
        .percentBox {
          width: 95px;
          position: absolute;
          top: 14px;
          right: -135px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .percent {
            // right: -130px;
            background: url(~@/assets/images/common/lastmonth_bg.png) no-repeat;
            // width: 103px;
            text-align: center;
            line-height: 25px;
            font-size: 18px;
            font-family: PingFang SC;
            font-weight: 600;
            color: #ffffff;
          }

          .percent_num {
            // position: absolute;
            margin-top: 5px;
            // right: -114px;
            // top: 39px;
            span {
              font-size: 20px;
              line-height: 23px;
              font-family: DINPRO;
              font-weight: bold;
              color: #ffffff;
              background: linear-gradient(183deg, #ffffff 0%, #65adc9 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
          }
        }
      }

      .title_box_inner {
        margin-left: 32px;

        .first_num {
          font-size: 26px;
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
    }
  }
}

.seven_shop {
  width: 400px;
  height: 30px;
  line-height: 30px;
  font-size: 20px;
  font-family: PangMenZhengDao;
  color: #ffffff;
  background: url(~@/assets/images/common/tab_title_bg.png) no-repeat;
  background-size: 100%;
  padding-left: 24px;
}

.echart_dom {
  // width: 100%;
  width: 400px;
  height: 300px;
  overflow: visible;
}
.status_box {
  display: flex;
  justify-content: space-around;
  margin-bottom: 30px;
  .item {
    background: url(~@/assets/images/common/un_active.png) no-repeat;
    background-size: 100% 100%;
   
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
    cursor: pointer;
    // margin-right: 22px;
    padding: 5px 20px 5px 19px;
  }
  .active {
    background: url(~@/assets/images/common/tab_active.png) no-repeat;
    background-size: 100% 100%;
  }
}
// element翻页器页数按钮
::v-deep .el-pagination.is-background .number {
  background: rgba($color: #fff, $alpha: 0.2);
  color: #fff;
}
// element翻页器翻页中间的省略号
::v-deep .el-pagination.is-background .more {
  background: rgba($color: #fff, $alpha: 0.2);
  color: #fff;
}
// element翻页器共xxx页
::v-deep .el-pagination.is-background .el-pagination__total {
  color: #fff;
  font-size: 16px;
}
// element翻页器左箭头
::v-deep .el-pagination.is-background .btn-prev {
  background: rgba($color: #fff, $alpha: 0.2);
  color: #fff;
  font-size: 16px;
}
// element翻页器右箭头
::v-deep .el-pagination.is-background .btn-next {
  background: rgba($color: #fff, $alpha: 0.2);
  color: #fff;
  font-size: 16px;
}
::v-deep .el-table__header {
  // height: 35px;
}
::v-deep .el-table th.el-table__cell.header_cell {
  position: relative;
  overflow: visible;
  height: 55px;
  div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
.air_dom {
  position: relative;
  top: -85px;
  left: 170px;
  width: 110px;
  height: 110px;
}
</style>
