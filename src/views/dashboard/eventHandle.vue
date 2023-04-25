<template>
  <section @click.stop class="event-handle-container">
    <div class="event-handle-title">
      <span class="title">事件处置</span>
      <template v-if="listTitle">
        <span class="line"></span>
        <span class="label">{{ listTitle }}</span>
      </template>
      <span class="icon-more" @click="openEvevtClick"></span>
    </div>

    <div class="event-box">
      <section ref="scrollBox" class="event-list" element-loading-text="数据查询中" v-loading="isLoading">
        <div ref="scroll" :data="list" :class-option="eventOption(1, 5)">
          <div class="event-item" :class="[v.eventLevel == '一般' ? 'normal' : 'no-normal']" v-for="(v, i) in list" :key="i"
            @click="eventClick(v)">
            <div v-if="v.eventStatus == '超期' || v.eventStatus == '逾期'" class="event-status-label">
              <span class="label">{{ v.eventStatus }}</span>
            </div>
            <div class="event-title">
              <div class="lable con-value">{{ v.title }}</div>
              <div class="event-title-tag" :class="[v.properties
                == '一般' ? 'normal' : 'no-normal']">
                {{ v.properties }}
              </div>
            </div>
            <div class="event-content">
              <div class="con-nav">
                <div class="con-label">描述</div>
                <div class="con-value">{{ v.describe }}</div>
              </div>
              <div class="con-nav">
                <img class="con-label" :src="require('@/assets/images/event_hand_adress.png')" alt="" />
                <div class="con-value color-1">{{ v.position }}</div>
              </div>
              <div class="con-nav">
                <img class="con-label" :src="require('@/assets/images/event_hand_time.png')" alt="" />
                <div class="con-value color-1">{{ v.time }}</div>
              </div>
            </div>
            <div class="event-bottom">
              <div class="source">区城运平台</div>
            </div>
          </div>
        </div>
      </section>
      <section class="baColor" v-if="list.length == 0 && isLoading == false">
        <div class="no_eventData"></div>
      </section>
    </div>
    <eventDetail ref="detail" :detail="detail"></eventDetail>
  </section>
</template>

<script>
import eventDetail from "./eventDetail.vue";
let timer = null;
export default {
  components: {
    eventDetail,
  },
  data() {
    return {
      list: [
        /*  {
           eventName: "非机动车乱停放",
           place: "D-06060006-YA-(球)站西桥东巷431招待所前(1)",
           eventLevel: "一般",
           eventTime: "2022-11-29 09:10:00",
           flowSource: "区城运平台",
         }, */

      ],
      lableIndex: null, // 新增重点工单，，突出事件接口
      isLoading: false, // 数据是否加载,
      listTitle: "",
      detail:{},
      timeInterval: 20,
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getIinitData();
  },
  methods: {
    openEvevtClick() { },
    getIinitData(data) {
      this.$api.event.reqAllEvent().then((res) => {
        this.list = res.data
      })
      clearInterval(timer);
      this.roll();
    },

    // 点击事件详情
    eventClick(v) {
      this.$refs.detail.isShowDetail = true
      this.detail = v
      console.log(v);
    },

    // 公告滚动自定义
    eventOption(value, step) {
      return {
        step: this.step, // 数值越大速度滚动越快
        limitMoveNum: 4, // 开始无缝滚动的数据量
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: value, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
      };
    },
    roll() {
      this.$nextTick(() => {
        let ulbox = this.$refs.scrollBox;
        let ul1 = this.$refs.scroll;
        ulbox.scrollTop = 0;
        timer = setInterval(this.rollStart, this.timeInterval);
        ulbox.onmouseover = () => {
          clearInterval(timer);
        };
        ulbox.onmouseout = () => {
          if (this.step == 0) return;
          timer = setInterval(this.rollStart, this.timeInterval);
        };
      });
    },
    rollStart() {
      // 上面声明的DOM对象为局部对象需要再次声明
      let ulbox = this.$refs.scrollBox;
      let ul1 = this.$refs.scroll;
      if (!ulbox || !ul1) return;
      // 正常滚动不断给scrollTop的值+1,当滚动高度大于列表内容高度时恢复为0
      if (ulbox.scrollTop + 1220 >= ul1.scrollHeight) {
        ulbox.scrollTop = 0;
      } else {
        ulbox.scrollTop += 1;
      }
    },
  },
  beforeDestroy() {
    clearInterval(timer);
    timer = null;
  },
};
</script>

<style lang="scss" scoped>
.event-handle-container {
  margin-left: 2px;
  width: 320px;
  background: rgba(10, 39, 51, 0.5);
  border-radius: 4px;
  z-index: 12;
  position: relative;

  .event-handle-title {
    width: 100%;
    height: 29px;
    margin: 15px 0 0 0px;
    background: url("~@/assets/images/evnet_handler_title_bg.png") no-repeat;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    position: relative;

    .title {
      margin-left: 30px;
      font-size: 20px;
      font-family: YouSheBiaoTiHei;
      font-weight: 400;
      color: #ffffff;
    }

    .line {
      width: 12px;
      height: 4px;
      border-radius: 1px;
      margin: 0 12px;
      background: #fff;
    }

    .label {
      font-family: ShiShangZhongHeiJianTi;
      font-weight: 400;
      color: #50ace7;
    }

    .icon-more {
      width: 20px;
      height: 20px;
      background: url(~@/assets/images/more_icon.png) no-repeat;
      background-size: 100% 100%;
      position: absolute;
      right: 0;
      top: 5px;
      cursor: pointer;
      transition: all 0.3s linear;
    }
  }

  .lable_div {
    width: 100%;
    overflow-x: auto;
  }

  .lable_box {
    display: flex;
    justify-content: space-between;

    .lable_item,
    .active {
      font-size: 20px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #c9def5;
      width: 130px;
      height: 44px;
      background-size: 100%;
      text-align: center;
      line-height: 44px;
      cursor: pointer;
    }

    .lable_item {
      // margin-right: 20px;
      background: url(~@/assets/images/lable_item.png) no-repeat;
    }

    .active {
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #ffffff;
      background: url(~@/assets/images/lable_active_item.png) no-repeat;
    }
  }

  .title_bg {
    cursor: pointer;
    margin-bottom: 16px;
    background: url(~@/assets/images/event_commonbg.png);
    background-size: 100% 100%;
    width: 100%;
    height: 39px;
    letter-spacing: 1px;
    padding-left: 23px;
    display: flex;
    align-items: center;

    .lable {
      font-family: PangMenZhengDao-3, PangMenZhengDao;
      font-weight: normal;
      color: #ffffff;
      line-height: 32px;
      letter-spacing: 1px;
    }
  }

  .event-box {
    position: relative;
  }

  .event-list {
    margin-top: 18px;
    height: 800px;
    overflow-y: auto;
    padding: 0 16px;
    pointer-events: auto;

    &::-webkit-scrollbar {
      display: none;
    }

    .event-item {
      width: 100%;
      height: 242px;
      box-sizing: border-box;
      padding: 0 16px;
      margin-bottom: 10px;
      background: rgba(107, 198, 255, 0.05);
      position: relative;
      cursor: pointer;

      .event-status-label {
        width: 64px;
        height: 65px;
        background: url("~@/assets/images/event_hand_status_label.png") no-repeat;
        position: absolute;
        right: 130px;
        top: 0px;
        display: flex;
        align-items: center;
        justify-content: center;

        .label {
          font-size: 22px;
          font-family: ShiShangZhongHeiJianTi;
          color: #f5cc7c;
          -webkit-text-stroke: 1px #f26d6d;
          text-stroke: 1px #f26d6d;
          transform: rotate(45deg);
        }
      }

      &.normal {
        border-right: 3px solid #3de4f1;
      }

      &.no-normal {
        border-right: 3px solid #3de4f1;
      }

      .event-title {
        width: 100%;
        height: 42px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid rgba(188, 219, 232, 0.2);

        .lable {
          font-family: ShiShangZhongHeiJianTi;
          color: #ffffff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          flex: 1;
        }

        .event-title-tag {
          flex-shrink: 0;

          font-family: ShiShangZhongHeiJianTi;

          &.normal {
            color: #55f2cb;
          }

          &.no-normal {
            color: #f2ad55;
          }
        }
      }

      .event-content {
        width: 100%;
        height: 144px;
        padding: 20px 0;
        border-bottom: 1px solid rgba(188, 219, 232, 0.2);
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .con-nav {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #ffffff;
          display: flex;
          align-items: center;

          .con-label {
            flex-shrink: 0;
          }

          .con-value {
            margin-left: 20px;
            flex: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;

            &.color-1 {
              color: #bcdbe8;
            }
          }
        }
      }

      .event-bottom {
        width: 100%;
        height: 54px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .source {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          font-family: ShiShangZhongHeiJianTi;
          color: #3de4f1;
        }

        .source-label {
          width: 103px;
          height: 30px;
          background: url("~@/assets/images/event_hand_zhdd_bg.png") no-repeat;
          background-size: 100% 100%;
          display: flex;
          justify-content: center;
          align-items: center;

          .value {
            font-size: 18px;
            font-family: ShiShangZhongHeiJianTi;
            color: #ffc7a2;
            background: linear-gradient(183deg, #ffffff 0%, #c9e6ff 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
      }
    }
  }

  ::v-deep {
    .el-loading-mask {
      background: rgba($color: #1a2d3b, $alpha: 0.3);
    }
  }

  .baColor {
    background: rgba(26, 45, 59, 0.5);
    width: 100%;
    height: 87%;
    position: absolute;
    top: 100px;
    left: 0;
  }
}
</style>
