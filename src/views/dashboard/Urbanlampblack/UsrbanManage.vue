<template>
  <section>
    <section class="container" v-show="isShowContainer">
      <section class="title">
        <div class="out_problems">
          <div class="content">突出问题</div>
        </div>
      </section>
      <section class="dialog_summarize_two">
        <div class="dialog_summarize_item">
          <p class="sum_text">本月突出问题</p>
          <div class="sum_bg"></div>
          <div
            class="sum_num"
            @click="ShowProblemTable(problemObj.Month)"
            :class="problemTraget.type == '本月突出问题' ? 'active' : ''"
          >
            0
          </div>
        </div>
        <div class="dialog_summarize_item">
          <p class="sum_text">已结案问题数</p>
          <div class="sum_bg"></div>
          <p
            class="period"
            @click="ShowProblemTable(problemObj.Closure)"
            :class="problemTraget.type == '已结案问题数' ? 'active' : ''"
          >
            0
          </p>
        </div>
        <div class="dialog_summarize_item">
          <p class="sum_text">待处置问题数</p>
          <div class="sum_bg"></div>
          <p
            class="sum_num"
            @click="ShowProblemTable(problemObj.disposed)"
            :class="problemTraget.type == '待处置问题数' ? 'active' : ''"
          >
            0
          </p>
        </div>
        <div class="dialog_summarize_item">
          <p class="sum_text">超期办理问题数</p>
          <div class="sum_bg"></div>
          <p
            class="sum_num"
            @click="ShowProblemTable(problemObj.overdue)"
            :class="problemTraget.type == '超期办理问题数' ? 'active' : ''"
          >
            0
          </p>
        </div>
        <div class="dialog_summarize_item">
          <p class="sum_text">今日突出问题数</p>
          <div class="sum_bg"></div>
          <p
            class="sum_num"
            @click="ShowProblemTable(problemObj.Today)"
            :class="problemTraget.type == '今日突出问题数' ? 'active' : ''"
          >
            0
          </p>
        </div>
      </section>
      <section>
        <transition name="AITable">
          <ProblemPup
            v-show="isShowProblemTable"
            :problemObj="problemObj"
            @showDetail="showDetail"
            @handleTableChange="handleTableChange"
          ></ProblemPup>
        </transition>
      </section>
      <div class="gdp_row">
        <div class="gdp_row_right new_right" style="padding-right: 0">
          <div class="right_title">来源分析</div>
          <div ref="new_top3GdpPie" class="echart_dom circular1"></div>
        </div>
        <div class="gdp_row_left new_left">
          <div class="left_title">事件趋势分析</div>
          <div ref="new_gdpRectTrend" class="echart_dom"></div>
        </div>
      </div>
      <section class="title">
        <div class="out_problems">
          <div class="content">AI发现</div>
        </div>
      </section>

      <section class="dialog_summarize_AI">
        <div class="dialog_summarize_item">
          <p class="sum_text">今日发现案件数</p>
          <div class="sum_bg"></div>
          <div class="sum_num">
            <!--    @click="ShowAITable('今日发现案件数')"
            :class="aiTraget == '今日发现案件数' ? 'active' : ''" -->
            0
          </div>
        </div>
        <div class="dialog_summarize_item">
          <p class="sum_text">今日应处置案件数</p>
          <div class="sum_bg"></div>
          <p class="sum_num">
            <!--      @click="ShowAITable('今日应处置案件数')"
            :class="aiTraget == '今日应处置案件数' ? 'active' : ''" -->
            0
          </p>
        </div>
        <div class="dialog_summarize_item">
          <p class="sum_text">今日已处置案件数</p>
          <div class="sum_bg"></div>
          <p class="sum_num">0</p>
        </div>
        <div class="dialog_summarize_item">
          <p class="sum_text">未处置案件数</p>
          <div class="sum_bg"></div>
          <p
            class="sum_num"
            @click="ShowAITable(aiObj.disposed)"
            :class="aiTraget.type == '未处置案件数' ? 'active' : ''"
          >
            0
          </p>
        </div>
        <div class="dialog_summarize_item">
          <p class="sum_text">本月超期处置</p>
          <div class="sum_bg"></div>
          <p
            class="period"
            @click="ShowAITable(aiObj.overdue)"
            :class="aiTraget.type == '本月超期处置' ? 'active' : ''"
          >
            0
          </p>
        </div>
      </section>

      <section>
        <transition name="AITable">
          <AiListPup
            v-show="isShowAITable"
            :aiObj="aiObj"
            @showDetail="showDetail"
            @handleTableChange="handleAITableChange"
          ></AiListPup>
        </transition>
      </section>
      <section class="title">
        <div class="out_problems">
          <div class="content">数字城管</div>
        </div>
      </section>
      <section class="dialog_summarize">
        <div class="dialog_summarize_item">
          <p class="sum_text">今日上报案件数</p>
          <div class="sum_bg"></div>
          <div class="sum_num">0</div>
        </div>
        <div class="dialog_summarize_item">
          <p class="sum_text">应处置案件数</p>
          <div class="sum_bg"></div>
          <p class="sum_num">0</p>
        </div>
        <div class="dialog_summarize_item">
          <p class="sum_text">已处置案件数</p>
          <div class="sum_bg"></div>
          <p class="sum_num">0</p>
        </div>
        <div class="dialog_summarize_item">
          <p class="sum_text">按期未处置数</p>
          <div class="sum_bg"></div>
          <p class="period">0</p>
        </div>
        <div class="dialog_summarize_item">
          <p class="sum_text">监督员在线数量</p>
          <div class="sum_bg"></div>
          <p :class="obj.supervise < 51 ? 'period' : 'sum_num'">0</p>
        </div>
      </section>
      <div class="gdp_row">
        <div class="gdp_row_right" style="padding-right: 0">
          <div class="right_title">来源分析</div>
          <div ref="top3GdpPie" class="echart_dom circular2"></div>
        </div>
        <div class="gdp_row_left">
          <div class="left_title">事件趋势分析</div>
          <div ref="gdpRectTrend" class="echart_dom"></div>
        </div>
      </div>
      <section class="gdp_row">
        <div class="gdp_row_left" style="margin-left: 0">
          <div class="tabs">
            <div
              class="tab_item"
              :class="{ tab_item_active: typeStatus == 1 }"
              @click.stop="typeStatus = 1"
            >
              类型
            </div>
            <div
              class="tab_item"
              :class="{ tab_item_active: typeStatus == 2 }"
              @click.stop="typeStatus = 2"
            >
              区域
            </div>
            <!-- <div
              class="tab_item"
              :class="{ tab_item_active: typeStatus == 3 }"
              @click.stop="typeStatus = 3"
            >
              时段
            </div> -->
          </div>
          <div class="left_title">热点分析</div>
          <div ref="GDPTrend" class="echart_dom" style="width: 700px"></div>
        </div>
      </section>
    </section>
    <section v-show="!isShowContainer">
      <DetailPup ref="detail"></DetailPup>
    </section>
  </section>
</template>

<script>
import {
  GDPTrend,
  top3GdpPie,
  gdpRectTrend,
  top3newGdpPie,
  GDPnewTrend,
} from "@/views/echarts";
import echarts from "echarts";
import AiListPup from "./aiListPup.vue";
import ProblemPup from "./problemPup.vue";
import DetailPup from "./detailsPup.vue";
export default {
  name: "UsrbanManage",
  components: {
    AiListPup,
    ProblemPup,
    DetailPup,
  },
  data() {
    return {
      obj: {}, // 指标数据
      typeStatus: 1, // 类型
      newObj: [], //新增指标
      isShowAITable: false,
      aiObj: {
        page: 1,
        pageSize: 5,
        total: 0,
        aiList: [],
        disposed: {
          type: "未处置案件数",
          url: "szcgjrwczajxqlb",
        },
        overdue: {
          type: "本月超期处置",
          url: "szcgbycqczajxqlb",
        },
      },

      aiTraget: {
        type: "",
        url: "",
      },
      isShowProblemTable: false, //表格
      problemObj: {
        page: 1,
        pageSize: 5,
        total: 0,
        problemList: [],
        Month: {
          type: "本月突出问题",
          url: "bytcwtlb",
        },
        Closure: {
          type: "已结案问题数",
          url: "yjawtslb",
        },
        disposed: {
          type: "待处置问题数",
          url: "dczwtslb",
        },
        overdue: {
          type: "超期办理问题数",
          url: "cqwtslb",
        },
        Today: {
          type: "今日突出问题数",
          url: "jrtcwtlb",
        },
      },
      problemTraget: {
        type: "",
        url: "",
      },
      isShowContainer: true, //最外层
    };
  },

  mounted() {
    /* this.reqSzcgTcData(); */
    this.initData();
    this.initNewData();
    this.getNorm();
    this.getEvent();
    this.reqSzcgAI();
    this.getType();
  },
  watch: {
    typeStatus: {
      handler(newValue) {
        if (newValue == 1) {
     
          this.getType();
        } else if (newValue == 2) {
          this.getArea();
        } else if (newValue == 3) {
          this.getTime();
        }
      },
      immediate: true,
    },
  },
  methods: {
    initData() {
      GDPTrend.legend.data = ["立案", "结案"];
      GDPTrend.legend.show = true;
      GDPTrend.yAxis[0].nameTextStyle = {
        fontSize: 18,
        align: "right",
        padding: [0, 6, 0, 0],
      };
      GDPTrend.xAxis[0].data = [];
      GDPTrend.xAxis[0].axisLabel.rotate = 0;
      GDPTrend.grid.bottom = "10%";
      GDPTrend.series = [
        {
          name: "立案",
          type: "bar",
          //   stack: 'Search Engine',
          emphasis: {
            focus: "series",
          },
          barWidth: 10,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(116, 199, 255, 1)" },
                { offset: 1, color: "rgba(172, 229, 255, 0.15)" },
              ]),
              backgroundColor:
                "linear-gradient(180deg, rgba(116, 199, 255, 1), rgba(172, 229, 255, 0.15))",
            },
          },
          data: [1061, 1196.9, 1289.7, 1329.9, 1472.9, 751.5],
        },
        {
          name: "结案",
          type: "bar",
          //   stack: 'Search Engine',
          emphasis: {
            focus: "series",
          },
          barWidth: 10,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(139, 255, 187, 0.82)" },
                { offset: 1, color: "rgba(132, 255, 187, 0)" },
              ]),
              backgroundColor:
                "linear-gradient(180deg, rgba(139, 255, 187, 0.82), rgba(132, 255, 187, 0))",
            },
          },
          data: [106, 119, 128, 132, 147, 75],
        },
      ];
      /*    top3GdpPie.legend.data = ["巡查上报", "自报自处", "视频上报"]; */
      top3GdpPie.series[0].data = [];
      gdpRectTrend.legend.data = [
        "市容环境",
        "宣传广告",
        "街面秩序",
        "施工管理",
      ];
      gdpRectTrend.yAxis[0].name = "件";
      /*  this.$api.operationSituaty
        .getIndicators("lyfx")
        .then((res) => {
          let arr = [];
          let nameList = [];
          res.forEach((v) => {
            nameList.push(v.wtly);
            arr.push({ name: v.wtly, value: v.value });
          });
          top3GdpPie.series[0].data = arr;
          top3GdpPie.legend.data = nameList;
          top3GdpPie.series[1].data = arr;
        })
        .then(() => {
          this.$nextTick(() => {
           
          });
        }); */
      top3GdpPie.series[0].data = [
        {
          name: "城管平台",
          value: 1028,
        },
      ];
      top3GdpPie.legend.data = ["城管平台"];
      let pieEcharts = this.$echarts.init(this.$refs.top3GdpPie);
      pieEcharts.setOption(top3GdpPie);

      let res = [
        { type: "宣传广告", value: 267, rq: "01-30" },
        { type: "市容环境", value: 621, rq: "01-30" },
        { type: "市容环境设施", value: 59, rq: "01-30" },
        { type: "街面秩序", value: 489, rq: "01-30" },
        { type: "宣传广告", value: 433, rq: "01-31" },
        { type: "市容环境", value: 990, rq: "01-31" },
        { type: "市容环境设施", value: 81, rq: "01-31" },
        { type: "街面秩序", value: 891, rq: "01-31" },
        { type: "宣传广告", value: 288, rq: "02-01" },
        { type: "市容环境", value: 629, rq: "02-01" },
        { type: "市容环境设施", value: 63, rq: "02-01" },
        { type: "街面秩序", value: 456, rq: "02-01" },
        { type: "宣传广告", value: 295, rq: "02-02" },
        { type: "市容环境", value: 615, rq: "02-02" },
        { type: "市容环境设施", value: 57, rq: "02-02" },
        { type: "街面秩序", value: 583, rq: "02-02" },
        { type: "宣传广告", value: 186, rq: "02-03" },
        { type: "市容环境", value: 417, rq: "02-03" },
        { type: "市容环境设施", value: 49, rq: "02-03" },
        { type: "街面秩序", value: 378, rq: "02-03" },
      ];
      if (res.length == 0) return;
      let time = this.$moment().format("MM-DD");

      let time1 = this.returnTime(1);
      let time2 = this.returnTime(2);
      let time3 = this.returnTime(3);
      let time4 = this.returnTime(4);
      let time5 = this.returnTime(5);
      let time6 = this.returnTime(6);

      let timeList = [time6, time5, time4, time3, time2, time1, time];
      let dataList = [];
      timeList.forEach((j) => {
        let json = {};

        res.forEach((v) => {
          if (j == v.rq) {
            json.rq = v.rq;
            if (v.type == "市容环境") {
              json.srhj = v.value;
            } else if (v.type == "宣传广告") {
              json.xcgg = v.value;
            } else if (v.type == "街面秩序") {
              json.jmcx = v.value;
            } else if (v.type == "施工管理") {
              json.sggl = v.value;
            }
          }
        });
        dataList.push(json);
      });

      let name = [],
        arr = [], // 市容环境
        brr = [], // 宣传广告
        crr = []; // 街面秩序
      let dataList2 = dataList.filter((v) => {
        if (v.rq) return v;
      });
      dataList2.forEach((v) => {
        name.push(this.$moment(v.rq).format("MM-DD"));
        arr.push(v.srhj || 0);
        brr.push(v.xcgg || 0);
        crr.push(v.jmcx || 0);
      });
      gdpRectTrend.xAxis[0].data = name;
      gdpRectTrend.series = [
        {
          name: "市容环境",
          data: arr,
          type: "line",
        },
        {
          name: "宣传广告",
          data: brr,
          type: "line",
        },
        {
          name: "街面秩序",
          data: crr,
          type: "line",
        },
      ];

      let gdpRectEcharts = this.$echarts.init(this.$refs.gdpRectTrend);
      gdpRectEcharts.setOption(gdpRectTrend, true);
    },
    returnTime(value) {
      return this.$moment().subtract(value, "days").format("MM-DD");
    },
    getArea() {
      /*  this.$api.operationSituaty
        .getIndicators('rdfxqy')
        .then((res) => {
          let name = [],
            arr = [], // 立案
            brr = []; // 结案
          res.forEach((v) => {
           name.push(v.street_name);
            arr.push(v.inst_num);
            brr.push(v.archive_num);
          });
          GDPTrend.xAxis[0].data = name;
          GDPTrend.series[0].data = arr;
          GDPTrend.series[1].data = brr;
        })
        .then(() => {
          this.$nextTick(() => {
          
          });
        }); */
      let res = [
        { inst_num: 103, archive_num: 97, street_name: "凤凰山街道办事处" },
        { inst_num: 224, archive_num: 216, street_name: "天回镇街道办事处" },
        { inst_num: 232, archive_num: 221, street_name: "九里堤街道办事处" },
        { inst_num: 195, archive_num: 186, street_name: "荷花池街道办事处" },
        { inst_num: 210, archive_num: 194, street_name: "抚琴街道办事处" },
        { inst_num: 193, archive_num: 184, street_name: "茶店子街道办事处" },
        { inst_num: 165, archive_num: 162, street_name: "驷马桥街道办事处" },
        { inst_num: 214, archive_num: 208, street_name: "西华街道办事处" },
        { inst_num: 177, archive_num: 168, street_name: "西安路街道办事处" },
        { inst_num: 282, archive_num: 278, street_name: "金泉街道办事处" },
        { inst_num: 197, archive_num: 194, street_name: "沙河源街道办事处" },
        { inst_num: 213, archive_num: 202, street_name: "五块石街道办事处" },
        { inst_num: 189, archive_num: 184, street_name: "营门口街道办事处" },
      ];
      let name = [],
        arr = [], // 立案
        brr = []; // 结案
      res.forEach((v) => {
        name.push(v.street_name);
        arr.push(v.inst_num);
        brr.push(v.archive_num);
      });
      GDPTrend.xAxis[0].data = name;
      GDPTrend.series[0].data = arr;
      GDPTrend.series[1].data = brr;
      let echartsObj = this.$echarts.init(this.$refs.GDPTrend);
      echartsObj.setOption(GDPTrend);
    },
    getType() {
      /*   this.$api.operationSituaty
        .getIndicators('rdfxlx')
        .then((res) => {
          let name = [],
            arr = [], // 立案
            brr = []; // 结案
          res.forEach((v) => {
            name.push(v.sub_type_name);
            arr.push(v.inst_num);
            brr.push(v.archive_num);
          });
          GDPTrend.xAxis[0].data = name;
          GDPTrend.series[0].data = arr;
          GDPTrend.series[1].data = brr;
        })
        .then(() => {
          this.$nextTick(() => {
           
          });
        }); */
     
      let res = [
        { inst_num: 613, archive_num: 607, sub_type_name: "非机动车乱停放" },
        { inst_num: 367, archive_num: 361, sub_type_name: "违规标语宣传品" },
        { inst_num: 307, archive_num: 288, sub_type_name: "乱堆物堆料" },
        { inst_num: 275, archive_num: 266, sub_type_name: "暴露垃圾" },
        { inst_num: 191, archive_num: 189, sub_type_name: "沿街晾挂" },
        { inst_num: 184, archive_num: 179, sub_type_name: "无照经营游商" },
        { inst_num: 107, archive_num: 106, sub_type_name: "非法小广告" },
        { inst_num: 102, archive_num: 96, sub_type_name: "垃圾箱（果屑箱）" },
        { inst_num: 90, archive_num: 89, sub_type_name: "道路不洁" },
        { inst_num: 71, archive_num: 67, sub_type_name: "店外经营" },
        { inst_num: 55, archive_num: 53, sub_type_name: "违章接坡" },
        { inst_num: 44, archive_num: 44, sub_type_name: "积存垃圾渣土" },
        { inst_num: 45, archive_num: 43, sub_type_name: "占道经营" },
        { inst_num: 28, archive_num: 26, sub_type_name: "占道废品收购" },
        { inst_num: 23, archive_num: 22, sub_type_name: "废弃家具设备" },
        { inst_num: 21, archive_num: 20, sub_type_name: "绿化弃料" },
        { inst_num: 6, archive_num: 6, sub_type_name: "绿地脏乱" },
        { inst_num: 5, archive_num: 5, sub_type_name: "擅自饲养家禽家畜" },
        { inst_num: 4, archive_num: 4, sub_type_name: "机动车乱停放" },
        { inst_num: 4, archive_num: 4, sub_type_name: "防撞桶" },
        { inst_num: 2, archive_num: 2, sub_type_name: "垃圾间（楼）" },
        { inst_num: 3, archive_num: 2, sub_type_name: "雨水井盖" },
        { inst_num: 2, archive_num: 2, sub_type_name: "水务沟槽盖板" },
        { inst_num: 2, archive_num: 2, sub_type_name: "非装饰性树挂" },
        { inst_num: 6, archive_num: 2, sub_type_name: "不明井盖" },
        { inst_num: 1, archive_num: 1, sub_type_name: "餐厨垃圾遗撒和污染" },
        { inst_num: 5, archive_num: 1, sub_type_name: "交通护栏" },
        { inst_num: 1, archive_num: 1, sub_type_name: "宣传栏" },
        { inst_num: 1, archive_num: 1, sub_type_name: "乱丢弃医疗废物" },
        { inst_num: 1, archive_num: 1, sub_type_name: "便道桩" },
        { inst_num: 4, archive_num: 1, sub_type_name: "通信交接箱" },
        { inst_num: 6, archive_num: 1, sub_type_name: "道路破损" },
        { inst_num: 1, archive_num: 1, sub_type_name: "违规户外广告" },
        { inst_num: 1, archive_num: 1, sub_type_name: "店面无证装修" },
        { inst_num: 1, archive_num: 0, sub_type_name: "施工工地围挡问题" },
        { inst_num: 1, archive_num: 0, sub_type_name: "路灯" },
        { inst_num: 1, archive_num: 0, sub_type_name: "交通标志牌" },
        { inst_num: 2, archive_num: 0, sub_type_name: "街头座椅" },
        { inst_num: 3, archive_num: 0, sub_type_name: "花架花钵" },
        { inst_num: 1, archive_num: 0, sub_type_name: "监控电子眼" },
        { inst_num: 2, archive_num: 0, sub_type_name: "架空线缆脱落" },
        { inst_num: 2, archive_num: 0, sub_type_name: "通信井盖" },
        { inst_num: 3, archive_num: 0, sub_type_name: "护树设施" },
      ];
      let name = [],
        arr = [], // 立案
        brr = []; // 结案
      res.forEach((v) => {
        name.push(v.sub_type_name);
        arr.push(v.inst_num);
        brr.push(v.archive_num);
      });
      GDPTrend.xAxis[0].data = name;
      GDPTrend.series[0].data = arr;
      GDPTrend.series[1].data = brr;


        let echartsObj = this.$echarts.init(this.$refs.GDPTrend);
        echartsObj.setOption(GDPTrend);
    
    },
    getTime() {
      /*  this.$api.statePup
        .getSzcgrdfxsd()
        .then((res) => {
          let name = [],
            arr = [], // 立案
            brr = []; // 结案
          res.data.forEach((v) => {
            name.push(v.hours);
            arr.push(v.archiveNum);
            brr.push(v.instNum);
          });
          GDPTrend.xAxis[0].data = name;
          GDPTrend.series[0].data = arr;
          GDPTrend.series[1].data = brr;
        })
        .then(() => {
          this.$nextTick(() => {
         
          });
        }); */
      let echartsObj = this.$echarts.init(this.$refs.GDPTrend);
      echartsObj.setOption(GDPTrend);
    },
    getNorm() {
      /* this.$api.operationSituaty
        .getIndicatorsTarget("31b536d88ddc427baec3326fa3cd6a21")
        .then((res) => {
          this.$set(this.obj, "report", res[0].value);
        });
      this.$api.operationSituaty
        .getIndicatorsTarget("a7cdcca43a7d4d55be9c19a84a0a3b3a")
        .then((res) => {
          this.$set(this.obj, "Disposal", res[0].value);
        });
      this.$api.operationSituaty
        .getIndicatorsTarget("7cac84b4f6b44ed8be7392a51078c31e")
        .then((res) => {
          this.$set(this.obj, "deal", res[0].value);
        });
      this.$api.operationSituaty
        .getIndicatorsTarget("cb188eed5d5a47a8a1131f0f591cb497")
        .then((res) => {
          this.$set(this.obj, "mature", res[0].value);
        });
      this.$api.operationSituaty
        .getIndicatorsTarget("0704b73a7e0c49a1ba940f7ebb3b0a9b")
        .then((res) => {
          this.$set(this.obj, "supervise", res[0].value);
        }); */
    },
    initNewData() {
      /*   top3newGdpPie.series[0].data = [];
      this.$api.statePup
        .getSzcgLYFX()
        .then((res) => {
          let newres = [],
            nameList = [];
          res.forEach((v) => {
            nameList.push(v.source);
            let obj = { name: v.source, value: v.value };
            newres.push(obj);
          });
          top3newGdpPie.legend.data = nameList;
          top3newGdpPie.series[0].data = newres;
          top3newGdpPie.series[1].data = newres;
        })
        .then(() => {
          this.$nextTick(() => {
           
          });
        }); */
      top3newGdpPie.legend.data = ["突出问题交办系统"];
      top3newGdpPie.series[0].data = [
        {
          name: "突出问题交办系统",
          value: 35,
        },
      ];
      top3newGdpPie.series[1].data = [
        {
          name: "突出问题交办系统",
          value: 35,
        },
      ];
      let pieEcharts = this.$echarts.init(this.$refs.new_top3GdpPie);
      pieEcharts.setOption(top3newGdpPie);
    },
    getEvent() {
      /*     this.$api.statePup.getSzcgTCLX().then((res) => {
        let lianList = [];
        let dczList = [];
        let typeList = [];
        res.forEach((v) => {
          lianList.push(v.lian_value);
          dczList.push(v.dcz_value);
          typeList.push(v.type);
        });
        GDPnewTrend.series[0].data = lianList;
        GDPnewTrend.series[1].data = dczList;
        GDPnewTrend.yAxis[0].data = typeList;
        this.$nextTick(() => {
        
        });
      }); */
      GDPnewTrend.series[0].data = [1, 2, 2, 6, 6, 9, 10, 12];
      GDPnewTrend.series[1].data = [0, 0, 0, 0, 0, 1, 1, 0];
      GDPnewTrend.yAxis[0].data = [
        "非机动车乱停放-非机动车乱停放",
        "违规户外广告-道路绿地广场广告",
        "积存垃圾渣土",
        "非机动车乱停放-互联网租赁自行车乱停放",
        "占道经营",
        "乱堆物堆料",
        "暴露垃圾",
        "其他",
      ];
      let echartsObj = this.$echarts.init(this.$refs.new_gdpRectTrend);
      echartsObj.setOption(GDPnewTrend);
    },
    //突出问题指标
    /*  async reqSzcgTcData() {
      let res = await this.$api.statePup.getSzcgTcData();
      this.newObj = res;
    }, */
    //AI指标
    async reqSzcgAI() {
      /*  let res1 = await this.$api.statePup.getSzcgAI(
        "1cc621e19e05486c8949ce9443a051b9"
      );
      let res2 = await this.$api.statePup.getSzcgAI(
        "7f2dadc76c114021943a64eb74fb3f53"
      );
      let res3 = await this.$api.statePup.getSzcgAI(
        "67d073022ad6413799ead8b70f4d9ce1"
      );
      let res4 = await this.$api.statePup.getSzcgAI(
        "5808ba60577e42d29a8de79622215853"
      );
      let res5 = await this.$api.statePup.getSzcgAI(
        "ca51805de4c841089993e762dbd3c1e7"
      );

      this.$set(this.obj, `num1`, res1[0].value);
      this.$set(this.obj, `num2`, res2[0].value);
      this.$set(this.obj, `num3`, res3[0].value);
      this.$set(this.obj, `num4`, res4[0].value);
      this.$set(this.obj, `num5`, res5[0].value); */
    },
    //AI弹窗
    /*  ShowAITable(target) {
      if (this.isShowAITable) {
        this.isShowAITable = false;
        this.$nextTick(() => {
          this.aiTraget.type = "";
          this.aiObj.total = 0;
          this.aiObj.page = 1;
        });
      } else {
        this.aiObj.total = 0;
        this.aiObj.page = 1;
        this.isShowAITable = true;
        this.aiTraget.type = target.type;
        this.aiTraget.url = target.url;
        this.reqSzcgAIList(target.url);
      }
    }, */
    /* ShowProblemTable(target) {
      if (this.isShowProblemTable) {
        this.isShowProblemTable = false;

        this.$nextTick(() => {
          this.problemTraget.type = "";
          this.problemObj.total = 0;
          this.problemObj.page = 1;
        });
      } else {
        this.isShowProblemTable = true;
        this.problemObj.total = 0;
        this.problemObj.page = 1;
        this.problemTraget.type = target.type;
        this.problemTraget.url = target.url;
        this.reqSzcgProblemList(target.url);
      }
    }, */
    //al列表
    async reqSzcgAIList(url) {
      let res = await this.$api.operationSituaty.getParameter(
        {
          pageSize: this.aiObj.pageSize,
          offsetNum: (this.aiObj.page - 1) * this.aiObj.pageSize,
        },
        `${url}`
      );

      this.aiObj.aiList = res;
      if (res.length != 0) {
        this.aiObj.total = res[0].total;
      }
    },

    //突出问题列表
    async reqSzcgProblemList(url) {
      let res = await this.$api.operationSituaty.getParameter(
        {
          pageSize: this.problemObj.pageSize,
          offsetNum: (this.problemObj.page - 1) * this.problemObj.pageSize,
        },
        `${url}`
      );
      if (res.length != 0) {
        this.problemObj.total = res[0].total;
      }
      this.problemObj.problemList = res;
    },

    showDetail(id) {
      this.$refs.detail.isShowDetail = true;
      this.$refs.detail.id = id;
    },
    handleAITableChange(page) {
      this.aiObj.page = page;
      this.reqSzcgAIList(this.aiTraget.url);
    },
    handleTableChange(page) {
      this.problemObj.page = page;
      this.reqSzcgProblemList(this.problemTraget.url);
    },
  },
};
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;
  position: absolute;
  top: 42px;
  left: 50%;
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #ffffff;
  z-index: 1003;
  .tab_item {
    width: 95px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    background: url(~@/assets/images/common/tab_nema_bg.png) no-repeat;
    background-size: 100%;
    cursor: pointer;
  }
  .tab_item_active {
    background-size: 100%;
    background: url(~@/assets/images/common/active_tab_name_bg.png) no-repeat;
  }
}

.container {
  .gdp_row {
    width: 100%;
    height: 276px;
    display: flex;
    &_right {
      width: 267px;
      height: 100%;
      padding-right: 44px;
      position: relative;
      .gdp_title {
        width: 233px;
        height: 45px;
        background: url(~@/assets/images/common/gdp_bg.png) no-repeat;
        background-size: 100%;
        font-size: 20px;
        font-family: PingFang SC;
        color: #ffffff;
        line-height: 45px;
        text-align: center;
      }
      .right_title {
        width: 262px;
        height: 30px;
        background: url(~@/assets/images/common/right_tab_title_bg.png)
          no-repeat;
        background-size: 100%;
        font-size: 22px;
        font-family: PangMenZhengDao;
        color: #ffffff;
        padding-left: 24px;
        line-height: 30px;
      }
      .gdp_num {
        height: 73px;
        text-align: center;
        margin-top: 22px;
        &_vlaue {
          width: 233px;
          font-size: 38px;
          line-height: 1;
          font-family: DINPro;
          font-weight: bold;
          color: #ffffff;
          background: linear-gradient(0deg, #e6cd98 0%, #e0f3ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          padding-bottom: 14px;
        }
        &_unit {
          width: 233px;
          font-size: 18px;
          font-family: PingFang SC;
          color: #ffffff;
        }
      }
      .gdp_num_bg {
        margin-left: 33px;
        width: 171px;
        height: 133px;
        background: url(~@/assets/images/common/gdp_num_bg.png) no-repeat;
        background-size: 100%;
        position: absolute;
        bottom: 25px;
      }
      .compared_same {
        width: 184px;
        height: 30px;
        position: absolute;
        bottom: 20px;
        left: 28px;
        .compared_same_bg {
          height: 18px;
          background: url(~@/assets/images/common/compared_same_bg.png)
            no-repeat;
          background-size: 100%;
        }
        .cs_num_box {
          display: flex;
          position: absolute;
          bottom: 18px;
          left: 33px;
          .cs_title {
            font-size: 18px;
            font-family: PingFang SC;
            color: #ffffff;
          }
          .up_icon {
            margin-left: 5px;
            margin-right: 8px;
            margin-top: 7px;
            width: 11px;
            height: 14px;
            background: url(~@/assets/images/common/up_icon.png) no-repeat;
            background-size: 100%;
          }
          .cs_num {
            font-size: 26px;
            font-family: DINPRO;
            font-weight: bold;
            color: #ffffff;
            background: linear-gradient(0deg, #92e4ba 0%, #ffffff 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
      }
    }
    &_left {
      width: 700px;
      height: 100%;
      margin-left: 43px;
      position: relative;
      .left_title {
        width: 340px;
        height: 30px;
        background: url(~@/assets/images/common/tab_title_bg.png) no-repeat;
        background-size: 100%;
        font-size: 22px;
        font-family: PangMenZhengDao;
        color: #ffffff;
        padding-left: 24px;
        line-height: 30px;
      }
    }
    .new_right {
      width: 300px !important;
    }
    .new_left {
      width: 600px !important;
      margin-left: 10px;
    }
  }

  .echart_dom {
    width: 100%;
    height: 234px;
  }
  .circular1 {
    background-image: url(~@/assets/images/common/bubble.png);
    background-repeat: no-repeat;
    background-size: 65px 65px;
    background-position: 48px 85px;
    position: relative;
    z-index: 999;
  }
  .circular2 {
    background-image: url(~@/assets/images/common/bubble.png);
    background-repeat: no-repeat;
    background-size: 65px 65px;
    background-position: 38px 85px;
    position: relative;
    z-index: 999;
  }
  .dialog_summarize {
    width: 100%;
    height: 130px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    .dialog_summarize_item {
      width: 25%;
      height: 100%;
      position: relative;

      .sum_text {
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        line-height: 24px;
        letter-spacing: 1px;
        padding-top: 0.039063rem; /* 15 / 384 */
        padding-left: 0.052083rem;
      }

      .sum_bg {
        background: url(~@/assets/images/sum_bg.png) 100% 100% no-repeat;
        height: 19px;
        position: absolute;
        width: 84px;
        // left: 8px;
        // top: 26px;
        left: -6px;
        top: 5px;
      }

      .period {
        cursor: pointer;
        font-size: 40px;
        font-family: DIN-Bold, DIN;
        font-weight: bold;
        color: #ffffff;
        line-height: 49px;
        letter-spacing: 1px;
        background: linear-gradient(180deg, #ffffff 0%, #f37777 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        padding-left: 14px;
        padding-top: 21px;
      }

      .sum_num {
        cursor: pointer;
        font-size: 40px;
        font-family: DIN-Bold, DIN;
        font-weight: bold;
        color: #ffffff;
        line-height: 49px;
        letter-spacing: 1px;
        background: linear-gradient(180deg, #ffffff 0%, #b9e7ff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        padding-left: 14px;
        padding-top: 20px;
        display: flex;
        .retail_sales_total {
          width: 109px;
          font-size: 38px;
          line-height: 1;
          font-family: DINPro;
          font-weight: bold;
          color: #ffffff;
          background: linear-gradient(0deg, #e6cd98 0%, #e0f3ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .retail_sales_unit {
          width: 50px;
          height: 17px;
          font-size: 18px !important;
          font-family: PingFang SC;
          color: #ffffff;
        }
        .retail_sales_ratio {
          font-size: 24px;
          font-family: DINPRO;
          font-weight: bold;
          color: #ffffff;
          background: linear-gradient(0deg, #92e4ba 0%, #ffffff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .down_icon {
          margin-left: 2px;
          margin-right: 8px;
          margin-top: 18px;
          width: 11px;
          height: 14px;
          background: url(~@/assets/images/common/down_icon.png) no-repeat;
          background-size: 100%;
        }
      }
    }
  }
  .dialog_summarize_two {
    width: 100%;
    height: 130px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    .dialog_summarize_item {
      width: 25%;
      height: 100%;
      position: relative;

      .sum_text {
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        line-height: 24px;
        letter-spacing: 1px;
        padding-top: 0.039063rem; /* 15 / 384 */
        padding-left: 0.052083rem;
      }

      .sum_bg {
        background: url(~@/assets/images/sum_bg.png) 100% 100% no-repeat;
        height: 19px;
        position: absolute;
        width: 84px;
        // left: 8px;
        // top: 26px;
        left: -6px;
        top: 5px;
      }

      .period {
        cursor: pointer;
        font-size: 40px;
        font-family: DIN-Bold, DIN;
        font-weight: bold;
        color: #ffffff;
        line-height: 49px;
        letter-spacing: 1px;
        background: linear-gradient(180deg, #ffffff 0%, #b9e7ff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        padding-left: 14px;
        padding-top: 21px;
      }

      .sum_num {
        cursor: pointer;
        font-size: 40px;
        font-family: DIN-Bold, DIN;
        font-weight: bold;
        color: #ffffff;
        line-height: 49px;
        letter-spacing: 1px;
        background: linear-gradient(180deg, #ffffff 0%, #f37777 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        padding-left: 14px;
        padding-top: 20px;
        display: flex;
        .retail_sales_total {
          width: 109px;
          font-size: 38px;
          line-height: 1;
          font-family: DINPro;
          font-weight: bold;
          color: #ffffff;
          background: linear-gradient(0deg, #e6cd98 0%, #e0f3ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .retail_sales_unit {
          width: 50px;
          height: 17px;
          font-size: 18px !important;
          font-family: PingFang SC;
          color: #ffffff;
        }
        .retail_sales_ratio {
          font-size: 24px;
          font-family: DINPRO;
          font-weight: bold;
          color: #ffffff;
          background: linear-gradient(0deg, #92e4ba 0%, #ffffff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .down_icon {
          margin-left: 2px;
          margin-right: 8px;
          margin-top: 18px;
          width: 11px;
          height: 14px;
          background: url(~@/assets/images/common/down_icon.png) no-repeat;
          background-size: 100%;
        }
      }
    }
  }
  .dialog_summarize_AI {
    width: 109%;
    height: 120px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    .dialog_summarize_item {
      width: 25%;
      height: 100%;
      position: relative;

      .sum_text {
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        line-height: 24px;
        letter-spacing: 1px;
        padding-top: 0.039063rem; /* 15 / 384 */
        padding-left: 0.052083rem;
      }

      .sum_bg {
        background: url(~@/assets/images/sum_bg.png) 100% 100% no-repeat;
        height: 19px;
        position: absolute;
        width: 84px;
        // left: 8px;
        // top: 26px;
        left: -6px;
        top: 5px;
      }

      .period {
        cursor: pointer;
        font-size: 40px;
        font-family: DIN-Bold, DIN;
        font-weight: bold;
        color: #ffffff;
        line-height: 49px;
        letter-spacing: 1px;
        background: linear-gradient(180deg, #ffffff 0%, #f37777 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        padding-left: 14px;
        padding-top: 21px;
      }

      .sum_num {
        cursor: pointer;
        font-size: 40px;
        font-family: DIN-Bold, DIN;
        font-weight: bold;
        color: #ffffff;
        line-height: 49px;
        letter-spacing: 1px;
        background: linear-gradient(180deg, #ffffff 0%, #b9e7ff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        padding-left: 14px;
        padding-top: 20px;
        display: flex;
        .retail_sales_total {
          width: 109px;
          font-size: 38px;
          line-height: 1;
          font-family: DINPro;
          font-weight: bold;
          color: #ffffff;
          background: linear-gradient(0deg, #e6cd98 0%, #e0f3ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .retail_sales_unit {
          width: 50px;
          height: 17px;
          font-size: 18px !important;
          font-family: PingFang SC;
          color: #ffffff;
        }
        .retail_sales_ratio {
          font-size: 24px;
          font-family: DINPRO;
          font-weight: bold;
          color: #ffffff;
          background: linear-gradient(0deg, #92e4ba 0%, #ffffff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .down_icon {
          margin-left: 2px;
          margin-right: 8px;
          margin-top: 18px;
          width: 11px;
          height: 14px;
          background: url(~@/assets/images/common/down_icon.png) no-repeat;
          background-size: 100%;
        }
      }
    }
  }
  .title {
    display: flex;
    justify-content: center;
    .out_problems {
      width: 500px;
      font-size: 20px;
      text-align: center;
      background: url(~@/assets/images/newEvent/SZCG.png) no-repeat;
      margin-top: 10px;
      .content {
        line-height: 36px;
        font-family: PangMenZhengDao;
        font-weight: bold;
        color: #ffffff;
        background: linear-gradient(180deg, #ffffff 0%, #b9e7ff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        padding-bottom: 10px;
      }
    }
  }
}
.table_pop {
  margin: 10px 0 20px 0;
}

.AITable-enter-active,
.AITable-leave-active {
  transition: all 0.5s ease;
}
.AITable-enter {
  opacity: 0;
  transform: translateY(-100px);
}
.AITable-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.AITable-leave {
  opacity: 1;
  transform: translateY(0);
}
.AITable-leave-to {
  opacity: 0;
  transform: translateY(-100px);
}
.active {
  font-size: 60px !important;
  transition: all 0.5s linear;
}
</style>
