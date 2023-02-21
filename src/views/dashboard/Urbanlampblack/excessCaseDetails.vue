<template>
  <section class="fill">
    <div class="title">
      <div>事件详情</div>
      <i @click="$emit('closeDetailWindow')"></i>
    </div>
    <div class="detail_container">
      <div class="left">
        <div class="title">
          事件类型 {{ detail.case_type === 1 ? "超标" : "投诉" }}
        </div>
        <!-- <div>
          由于后端没有这个字段，暂时不显示
          <div>事件来源</div>
          <div>{{ detail.source }}</div>
        </div> -->
        <div>
          <div>企业名称</div>
          <div>{{ eventResume.company_name }}</div>
        </div>
        <div>
          <div>上报时间</div>
          <div>{{ eventResume.create_time }}</div>
        </div>
        <div>
          <div>区域</div>
          <div>{{ eventResume.areaname }}</div>
        </div>
        <div>
          <div>事件状态</div>
          <div style="color: #38CA15;">
            {{ eventStatusFormat(detail.case_status) }}
          </div>
        </div>
        <!-- <div>
          <div>流程限期</div>
          <div>{{ detail.list_his_qx }}（天）</div>
        </div> -->
        <!-- <div>
          <div>站点类型</div>
          <div>{{ detail.siteTydive }}</div>
        </div> -->
        <div>
          <div>附属资料</div>
          <div>
            <img
              :src="url"
              @click="showBigImage(url)"
              class="poiner"
              v-for="url in detail.files"
              :key="url"
            />
          </div>
        </div>
      </div>
      <div class="split_line"></div>
      <div class="right">
        <div v-for="(item, index) in step" :key="index">
          <div>
            <div class="desc">{{ item.create_time }}</div>
          </div>
          <div>
            <div class="title">流程状态</div>
            <div class="desc">{{ item.list_his_type }}</div>
          </div>
          <div>
            <div class="title">结束时间</div>
            <div class="desc">{{ item.finish_time }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "excessCaseDetails",
  props: {
    eventResume: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      // 案件详情
      detail: {},
      // 案件处理步骤，到了哪个阶段？
      step: [],
    };
  },
  watch: {
    "eventResume.case_id": {
      handler() {
        this.getEventDetail();
      },
    },
  },
  methods: {
    showBigImage(url) {
      this.$emit("showBigImage", url);
    },
    eventStatusFormat(statuCode) {
      switch (statuCode) {
        case 1:
          return "未处理";
        case 2:
          return "处理中";
        case 3:
          return "已结案";
        default:
          return "";
      }
    },
    getEventDetail() {
      this.$api.statePup
        .cookFumeObserveEvenetDetail({
          case_id: this.eventResume.case_id,
        })
        .then((res) => {
          this.detail = res[0];
          const {
            list_imgurl_1,
            list_imgurl_2,
            list_imgurl_3,
            list_imgurl_4,
            list_imgurl_5,
            list_imgurl_6,
            list_imgurl_7,
          } = res[0];
          this.detail.files = [
            list_imgurl_1,
            list_imgurl_2,
            list_imgurl_3,
            list_imgurl_4,
            list_imgurl_5,
            list_imgurl_6,
            list_imgurl_7,
          ].filter((url) => url);
          this.detail.files = this.detail.files.map((v) => {
            v = v.replace("http://47.93.222.102:98", "/api-yyjcImg");
            return v;
          });
          this.step = res.reverse();
        })
        .catch((err) => {
          console.error("获取油烟检测超标案件详情失败: ", err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.poiner {
  cursor: pointer;
}
.title {
  display: flex;
  width: 100%;
  height: 47px;
  justify-content: space-between;
  & > div {
    height: 37px;
    font-size: 30px;
    font-family: FZZZHONGJW--GB1-0, FZZZHONGJW--GB1;
    font-weight: normal;
    line-height: 37px;
    letter-spacing: 6px;
    width: 800px;
    margin-top: 17px;
    padding-left: 44px;
    color: #ffffff;
    background: url(~@/assets/images/cook_fume_detail_title_bg.png)
      no-repeat left;
    background-size: 100%;
  }
  & > i {
    display: block;
    width: 47px;
    height: 47px;
    margin-right: -16px;
    background: url(~@/assets/images/qt_icon_fhuiq.png) 100% 100%
      no-repeat;
    cursor: pointer;
  }
}
.detail_container {
  display: flex;
  width: 100%;
  height: auto;
  margin-top: 20px;
  .left {
    width: 420px;
    height: 720px;
    overflow-y: auto;
    .title {
      padding-left: 35px;
      margin-bottom: 20px;
      width: 405px;
      height: 44px;
      font-size: 22px;
      font-family: FZZZHONGJW--GB1-0, FZZZHONGJW--GB1;
      color: #ffffff;
      line-height: 44px;
      background: url(~@/assets/images/excess_case_event_type_title_bg.png)
        no-repeat;
      background-size: 100%;
      letter-spacing: 1px;
    }
    div:not(.title) {
      display: flex;
      width: 100%;
      height: auto;
      min-height: 44px;
      & > div:nth-child(1) {
        width: 85px;
        height: 28px;
        font-size: 20px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #287cae;
        line-height: 28px;
        justify-content: flex-end;
      }
      & > div:nth-child(2) {
        margin-left: 16px;
        width: 288px;
        font-size: 20px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #dff6ff;
        line-height: 28px;
        display: flex;
        flex-direction: column;
        & > img {
          margin-top: 20px;
          width: 288px;
          height: 195px;
          &:last-child {
            margin-bottom: 20px;
          }
        }
      }
    }
  }
  .split_line {
    margin-top: 10px;
    height: 703px;
    width: 3px;
    background: url(~@/assets/images/common/day_line.png) no-repeat;
    background-size: 100% 100%;
  }
  .right {
    width: 427px;
    height: 720px;
    overflow-y: auto;
    padding: 64px 0 20px 32px;
    box-sizing: border-box;
    div {
      width: 100%;
      height: auto;
      & > div {
        display: flex;
        height: auto;
        min-height: 44px;
        .title {
          margin-right: 16px;
          width: 150px;
          height: 28px;
          font-size: 20px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #287cae;
          line-height: 28px;
          letter-spacing: 1px;
        }
        .desc {
          // width: 290px;
          width: calc(100% - 16px);
          font-size: 20px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #dff6ff;
          line-height: 28px;
          display: flex;
          flex-direction: column;
        }
      }
    }
  }
}
</style>
