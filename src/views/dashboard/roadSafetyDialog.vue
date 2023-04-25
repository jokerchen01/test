<template>
  <section class="container">
    <section>
      <div class="title_box">
        <div class="mr171">
          <div class="title">昨日道路交通事故数</div>
          <div class="title_box_inner">
            <span class="title_num">35</span>
          </div>
        </div>
        <div class="mr171">
          <div class="title">其中伤人事故数</div>
          <div class="title_box_inner">
            <span class="title_num">8</span>
          </div>
        </div>
        <div>
          <div class="title">其中亡人事故数</div>
          <div class="title_box_inner">
            <span class="title_num death_num">0</span>
          </div>
        </div>
      </div>
      <div class="title_box">
        <div class="mr171">
          <div class="title">本月道路交通事故数</div>
          <div class="title_box_inner">
            <span class="title_num">576</span>
          </div>
        </div>
        <div class="mr171">
          <div class="title">其中伤人事故数</div>
          <div class="title_box_inner">
            <span class="title_num">135</span>
          </div>
        </div>
        <div>
          <div class="title">其中亡人事故数</div>
          <div class="title_box_inner">
            <span class="title_num death_num">0</span>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="gdp_row display_flex">
        <div class="left_title">道路安全事故统计</div>
        <div class="display_flex tableButtons">
          <div :class="[isMonth == true ? 'selected' : 'unselected', 'button']" @click="changeTime">
            本月事件分析
          </div>
          <div :class="[isMonth == false ? 'selected' : 'unselected', 'button']" @click="changeTime">
            月度统计分析
          </div>
        </div>
      </div>
      <div ref="echarts" class="echart_dom"></div>
    </section>

    <section>
      <div class="gdp_row">
        <div class="left_title">
          本年度亡人事故情况一览：{{ tableList.length }}件
        </div>
      </div>

      <el-table class="eventTable" :row-class-name="tableRowClass" :data="tableList" style="width: 100%">
        <el-table-column prop="afsj" label="事件时间" :show-overflow-tooltip="true" align="center">
        </el-table-column>
        <el-table-column prop="afdd" label="发生位置" :show-overflow-tooltip="true" align="center">
        </el-table-column>
        <el-table-column prop="sgyy" label="事故原因" :show-overflow-tooltip="true" align="center">
        </el-table-column>
        <!-- <el-table-column
          prop="eventType"
          label="事故分类"
          :show-overflow-tooltip="true"
          align="center"
        >
        </el-table-column> -->
        <el-table-column prop="swrs" label="死亡人数" :show-overflow-tooltip="true" align="center">
        </el-table-column>
        <!-- <el-table-column
          prop="eventDescc"
          label="事故概要"
          :show-overflow-tooltip="true"
          align="center"
        >
        </el-table-column> -->
      </el-table>
    </section>
  </section>
</template>

<script>
import * as echarts from "echarts";
import { roadSafety } from "@/views/echarts";
export default {
  props: ["indicatorsInfo"],
  name: "roadSafety",
  data() {
    return {
      obj: {}, // 指标数据
      options: [],
      value: "",
      tableList: [{ "afsj": "2022-11-29 07:25:00", "sgyy": "双方驾驶员未确保安全驾驶", "swrs": 1, "afdd": "金凤凰大道绕城下穿路段" }, { "afsj": "2022-11-18 08:54:00", "sgyy": "电动二轮车未确保安全，行人横过未走人行横道线", "swrs": 1, "afdd": "土龙路与美墅街交叉路口" }, { "afsj": "2022-11-07 16:20:00", "sgyy": "转弯车辆未让直行车辆先行", "swrs": 1, "afdd": "金牛大道金泉路与金樽三街交叉路口" }, { "afsj": "2022-11-06 13:15:00", "sgyy": "电动自行车违规行驶（涉及外籍人员，请隐藏驾驶员信息）", "swrs": 1, "afdd": "金丰高架进城方向剑龙钢材处" }, { "afsj": "2022-10-28 00:00:00", "sgyy": "未知姓名行人在机动车道上逗留", "swrs": 1, "afdd": "三环路主道交大立交至金牛立交段山姆会员商店门前路段" }, { "afsj": "2022-10-23 04:45:00", "sgyy": "未知姓名行人横穿道路", "swrs": 1, "afdd": "北星大道一段与天宝路交叉路口出城方向50米处" }, { "afsj": "2022-10-20 14:26:00", "sgyy": "机动车违反装载规定、乱停放；非机动车未佩戴头盔、未确保安全情况下通行", "swrs": 1, "afdd": "古柏路397号门前" }, { "afsj": "2022/10/18 10:29:00", "sgyy": "行人横穿道路、电动三轮车未确保安全驾驶", "swrs": 1, "afdd": "黄金路与淳风路交叉路口" }, { "afsj": "2022-10-18 10:29:00", "sgyy": "行人横穿道路、电动三轮车未确保安全驾驶", "swrs": 1, "afdd": "黄金路与淳风路交叉路口" }, { "afsj": "2022-10-15 07:19:00", "sgyy": "货车驾驶员未确保安全，行人横过道路未走人行横道。", "swrs": 1, "afdd": "解放路一段与二环路北三段交叉路口" }, { "afsj": "2022-10-13 21:21:00", "sgyy": "电动自行车涉嫌违反交通信号通行", "swrs": 1, "afdd": "花圃路与解放路二段交叉路口" }, { "afsj": "2022-10-06 19:55:00", "sgyy": "小型普通客车掉头时未确保安全；自行车逆向行驶", "swrs": 1, "afdd": "茶店子路与子星路交叉路口" }, { "afsj": "2022-09-26 23:28:00", "sgyy": "本田牌小型普通客车违规借道超车", "swrs": 1, "afdd": "金牛区金罗路12号院附近" }, { "afsj": "2022-09-25 12:20:00", "sgyy": "货车违反安全原则，自行车逆向行驶、横过道路不下车推行", "swrs": 1, "afdd": "金芙蓉大道与古柏路交叉路口" }, { "afsj": "2022-08-30 20:53:00", "sgyy": "左志伟驾车不按规定掉头，严昌茂驾驶非机动车违反交通信号灯指示", "swrs": 1, "afdd": "天丰路与万石路交叉路口人行横道" }, { "afsj": "2022-08-28 00:26:00", "sgyy": "双方未确保安全行车", "swrs": 1, "afdd": "站北路与福康街交叉路口" }, { "afsj": "2022-08-12 17:30:00", "sgyy": "自行车横过道路时未下车推行，机动车观察不仔细", "swrs": 1, "afdd": "北星大道杜家碾地铁D2出口旁" }, { "afsj": "2022-08-10 07:20:00", "sgyy": "单车事故自摔", "swrs": 1, "afdd": "金丰高架出城方向剑龙钢材城下行匝道（机动车道）内" }, { "afsj": "2022-07-31 10:30:00", "sgyy": "行人未沿道路右侧通行，处于水泥罐车盲区；水泥罐车起步观察不到位，未确保安全", "swrs": 1, "afdd": "金牛区海霸王路罗家村7组50号门前路段" }, { "afsj": "2022-07-21 05:00:00", "sgyy": "三轮车违反交通信号灯横过道路通行；机动车未确保安全驾驶", "swrs": 2, "afdd": "营门口路278号门前路口" }, { "afsj": "2022-07-16", "sgyy": "电动自行车未确保安全", "swrs": 1, "afdd": "金声路距金丰高架约800m左右处" }, { "afsj": "2022-07-14 08:41:00", "sgyy": "电动自行车左转弯未让直行车辆先行", "swrs": 1, "afdd": "凤凰西路与凤凰东路交叉路口" }, { "afsj": "2022-07-13 06:44:00", "sgyy": "行人未按规定横过道路，机动车观察不仔细", "swrs": 1, "afdd": "蜀汉路与蜀辉路交叉口" }, { "afsj": "2022-07-11 06:20:00", "sgyy": "行人（外来探亲人员）未按规定横过道路，机动车观察不仔细", "swrs": 1, "afdd": "三环路主道商贸跨线桥下" }, { "afsj": "2022-07-06 08:31:00", "sgyy": "行人未按规定横过道路，电动两轮车未在非机动车道内行驶。", "swrs": 1, "afdd": "交大路188号前路段机动车道内" }, { "afsj": "2022-06-17 22:04:00", "sgyy": "行人未按规定横过道路，机动车观察不仔细", "swrs": 1, "afdd": "沙湾路小学门前路段" }, { "afsj": "2022-06-06 22:30:00", "sgyy": "机动车超速自撞，自燃身亡", "swrs": 1, "afdd": "北三环路三段主道上北星高架匝道处" }, { "afsj": "2022-06-05 06:57:00", "sgyy": "2机动车碰撞后，致旁边行驶的摩托车驾驶员受伤，经抢救无效死亡", "swrs": 1, "afdd": "金牛区三环路外侧主道泉水路出口处" }, { "afsj": "2022-06-01 09:29:00", "sgyy": "行人未按规定横过道路，机动车观察不仔细", "swrs": 1, "afdd": "金芙蓉大道由北向南方向盛安街路口过人行横道35米 " }, { "afsj": "2022-05-21 20:20:00", "sgyy": "行人未按规定横过道路，机动车观察不仔细", "swrs": 1, "afdd": "金牛区金丰高架桥剑龙钢材市场前路段处" }, { "afsj": "2022-05-19 13:21:00", "sgyy": "行人未按规定横过道路，机动车观察不仔细", "swrs": 1, "afdd": "金牛区北三环路一段主道内侧第一车道 " }, { "afsj": "2022-05-11 05:50:00", "sgyy": "机动车驾驶人驾车未与前车保持足以采取紧急制动措施的安全距离", "swrs": 1, "afdd": "金牛区三环路金牛立交桥外侧主道下桥端头处路段" }, { "afsj": "2022-05-07 07:00:00", "sgyy": "非机动车驾驶人驾车未确保安全", "swrs": 1, "afdd": "金牛区二环路西三段74号前路段 " }, { "afsj": "2022-04-25 19:35:00", "sgyy": "电动自行车逆行被撞致2人死亡（2人未佩戴头盔，1人死亡超7日），机动车超速10%", "swrs": 2, "afdd": "金牛区北星大道一段主道进城方向与甫家二路东段交叉路口 " }, { "afsj": "2022-04-25 13:39:00", "sgyy": "行人横穿，机动车驾驶员观察不仔细", "swrs": 1, "afdd": "金牛区北星大道一段出城方向主道\u201c北星大道金芙蓉大道跨线桥\u201d标牌前路段 " }, { "afsj": "2022-04-20 21:10:00", "sgyy": "行人横穿马路，摩托车撞人后逃逸致人死亡", "swrs": 1, "afdd": "金牛区二环路北三段189号门前路段 " }, { "afsj": "2022-04-18 10:15:00", "sgyy": "行人违反交通信号通行，机动车驾驶员观察不仔细", "swrs": 1, "afdd": "金牛区金粮路与候罗路交叉路口" }, { "afsj": "2022-03-23 01:15:00", "sgyy": "后车追尾前车，后车驾驶员死亡", "swrs": 1, "afdd": "三环路主道凤凰立交至成彭立交段成彭立交桥外侧2层10米 " }, { "afsj": "2022-03-19 02:09:00", "sgyy": "酒后骑乘电动自行车自撞身亡", "swrs": 1, "afdd": "金牛区两河路555号前路段处" }, { "afsj": "2022-03-12 17:23:00", "sgyy": "大车左转碾压致死，货车驾驶员观察不仔细", "swrs": 1, "afdd": "成都市金牛区古柏路量力钢材城D区5号门前处 " }, { "afsj": "2022-03-02 10:20:00", "sgyy": "行人横穿，大车碾压致死 ", "swrs": 1, "afdd": "两河西五路金泉运动公园地下停车场项目工地大门外路段" }, { "afsj": "2022-02-28 19:20:00", "sgyy": "非机动车未登记号牌、闯红灯、不在非机动车道内行驶", "swrs": 1, "afdd": "金牛区北三环路三段外侧辅道\u201c音乐公园\u201d掉头匝道下桥处" }, { "afsj": "2022-02-24 23:34:00", "sgyy": "装载机闯信号灯冲撞前面小轿车，导致小轿车驾驶员死亡", "swrs": 1, "afdd": "金牛区天宝路与金凤凰大道交叉口" }, { "afsj": "2022-02-14 06:45:00", "sgyy": "行人横穿被撞身亡", "swrs": 1, "afdd": "金牛区一环路西三段外侧隧道入口" }, { "afsj": "2022-01-27 19:10:00", "sgyy": "行人不在人行道内行走，电动自行车观察不仔细", "swrs": 1, "afdd": "金牛区双溪东二路与双溪西三路交叉口" }, { "afsj": "2022-01-16 14:21:00", "sgyy": "小车转弯撞到行人，行人经抢救无效死亡", "swrs": 1, "afdd": "金牛区八里桥路与王贾东二街交叉路口" }, { "afsj": "2022-01-11 16:48:00", "sgyy": "重型自卸货车冲信号灯致2名行人死亡", "swrs": 2, "afdd": "金芙蓉大道与盛达街交叉路口" }, { "afsj": "2022-01-09 16:20:00", "sgyy": "行人横穿，电动车逆行，行人被撞身亡", "swrs": 1, "afdd": "金牛区古柏路\u201c中力不锈钢市场\u201d门前路段处" }, { "afsj": "2022-01-09 06:08:00", "sgyy": "电动车载人横穿被撞，乘客死亡，未佩戴头盔", "swrs": 1, "afdd": "金牛区古靖路68号附9号\u201c帝景茶楼\u201d前道路" }],
      totalCount: 0, // 总数
      isMonth: true,
      deathNumList: [], //亡人事故数
      injuredNumList: [], //受伤事故数
      accidentNumList: [], //事故数
      xAxisList: [], //X轴
    };
  },
  created() {

  },
  mounted() {
    this.getJtsgs();
  },
  watch: {
    //监听是否为本月或全年
    isMonth: {
      handler(newVal, oldVal) {

        if (newVal) {
          this.deathNumList = [0, 0, 0, 0, 0]
          this.injuredNumList = [1, 1, 1, 1, 1]
          this.accidentNumList = [2, 2, 2, 2, 2]
          this.xAxisList = ['01', '02', '03', '04', '05',]
        } else {
          this.deathNumList = [0, 0, 0, 0, 0]
          this.injuredNumList = [3, 10, 7, 2, 1]
          this.accidentNumList = [6, 5, 4, 5, 8]
          this.xAxisList = ['01月', '02月', '03月', '04月', '05月',]
        }
        this.getJtsgs();
      },
      immediate: true,
    },
  },
  methods: {
    changeTime() {
      this.isMonth = !this.isMonth;
    },
    tableRowClass() {
      return "tablerowclass";
    },

    getJtsgs() {


      //重写echarts数据
      roadSafety.xAxis[0].data = this.xAxisList;
      roadSafety.series[0].data = this.accidentNumList;
      roadSafety.series[1].data = this.injuredNumList;
      roadSafety.series[2].data = this.deathNumList;
      this.$nextTick(() => {
        const mychart = echarts.init(this.$refs.echarts);
        mychart.clear();
        mychart.setOption(roadSafety, true);
      });

    },
  },
};
</script>

<style lang="scss" scoped>
.container {
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
      //   margin-right: 66px;
      margin-bottom: 24px;
    }

    .mr171 {
      margin-right: 40px;
      width: 205px;
    }

    .title_box_inner {
      margin-left: 32px;

      .title_num {
        font-size: 36px;
        font-family: DINPRO;
        font-weight: bold;
        color: #ffffff;
        background: linear-gradient(183deg, #ffffff 0%, #65adc9 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .death_num {
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

  ::v-deep .eventTable {
    margin-top: 35px;
    height: 200px;
    overflow: auto;

    .tablerowclass {
      background: url("~@/assets/images/safe_pup.png") 100% 100%;
    }
  }

  .gdp_row {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left_title {
      width: 360px;
      height: 30px;
      background: url(~@/assets/images/common/tab_title_bg_11.png) no-repeat;
      background-size: 100%;
      font-size: 20px;
      font-family: PangMenZhengDao;
      color: #ffffff;
      padding-left: 24px;
      line-height: 30px;
    }
  }

  .selected {
    color: #ffffff;
    background: url(~@/assets/images/common/selected.png) no-repeat;
  }

  .unselected {
    color: #c0d3e5;
    background: url(~@/assets/images/common/unselected.png) no-repeat;
  }

  .tableButton {
    margin-left: 25px;
  }

  .button {
    cursor: pointer;
    width: 160px;

    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 500;
    line-height: 38px;
  }

  .display_flex {
    display: flex;
    justify-content: flex-start;
    // flex-wrap: nowrap;
  }

  .echart_dom {
    width: 100%;
    height: 234px;
    margin: 34px 0;
  }
}
</style>
