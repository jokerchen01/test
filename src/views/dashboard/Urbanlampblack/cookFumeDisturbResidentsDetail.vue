<template>
  <section class="fill">
    <div class="main_title">
      <div>事件详情</div>
      <i @click="$emit('closeDetailWindow')"></i>
    </div>
    <div class="detail_container">
      <div v-for="(item, index) in detail" :key="index">
        <caseGeneration v-if="item.list_his_type === '案件生成'" :item="item" />
        <caseCheck v-if="item.list_his_type === '现场核查'" :item="item" />
        <caseHandling v-if="item.list_his_type === '跟进处理'" :item="item" />
        <caseRecitification
          v-if="item.list_his_type === '现场整改'"
          :item="item"
        />
        <caseClosure v-if="item.list_his_type === '结案'" :item="item" />
      </div>
    </div>
  </section>
</template>

<script>
import caseGeneration from "./eventProcessComponents/generation.vue";
import caseCheck from "./eventProcessComponents/check.vue";
import caseHandling from "./eventProcessComponents/handling.vue";
import caseClosure from "./eventProcessComponents/closure.vue";
import caseRecitification from "./eventProcessComponents/recitifaction.vue";
export default {
  name: "cookFumeDisturbResidentsDetail",
  components: {
    caseGeneration,
    caseCheck,
    caseHandling,
    caseClosure,
    caseRecitification,
  },
  props: {
    eventResume: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      detail: [],
      // a: {
      //   case_id: "案件编号，案件的唯一标识",
      //   company_name: "企业名称 ",
      //   contacts: "商家联系人",
      //   phone: "商家联系人电话",
      //   areaname: "区域",
      //   address: "地址",
      //   contacts_daily: "街道责任人",
      //   phone_daily: "责任人电话",
      //   create_time: "生成时间",
      //   finish_time: "结束时间",
      //   new_his_name: "当前流程名称",
      //   case_status: "案件状态，1=未处理，2=处理中，3=已结案",
      //   case_result: "案件结果",
      //   list_his_type: "流程状态",
      //   list_create_time: "流程生成时间 ",
      //   list_finish_time: "流程结束时间",
      //   list_his_qx: "流程期限，天",
      //   list_contacts_daily: "街道责任人",
      //   list_phone_daily: "责任人电话",
      //   list_hc_contacts: "街道核查人",
      //   list_hc_phone: "核查人电话",
      //   list_three_contacts: "第三方公司人员",
      //   list_three_phone: "第三方电话",
      //   list_imgurl_1: "核查人照片",
      //   list_imgurl_2: "集烟罩",
      //   list_imgurl_3: "净化器",
      //   list_imgurl_4: "除味器",
      //   list_imgurl_5: "消声器",
      //   list_imgurl_6: "在线监控仪",
      //   list_imgurl_7: "清洗合同",
      //   case_type: "案件类型，1=超标，2=投诉",

      //   /**
      //    * 生成原因
      //    * 超标日期浓度
      //    * 现场照片
      //    * 结案备注
      //    */
      // },
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
    getEventDetail() {
      console.log("eventResume: ", this.eventResume);
      this.$api.statePup
        .cookFumeObserveEvenetDetail({
          case_id: this.eventResume.case_id,
        })
        .then((res) => {
          this.detail = res.map((item) => {
            item.files = [
              item.list_imgurl_1,
              item.list_imgurl_2,
              item.list_imgurl_3,
              item.list_imgurl_4,
              item.list_imgurl_5,
              item.list_imgurl_6,
              item.list_imgurl_7,
            ].filter((url) => url);
            return item;
          });
        })
        .catch((err) => {
          console.error("获取油烟扰民举报事件详情失败: ", err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.main_title {
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
  width: 100%;
  height: auto;
  margin-top: 20px;
  max-height: 720px;
  overflow-y: auto;
  & > div {
    width: 100%;
    height: auto;
    & > div {
      .title {
        margin: 20px 0;
        padding-left: 35px;
        width: 418px;
        height: 44px;
        font-size: 22px;
        font-family: FZZZHONGJW--GB1-0, FZZZHONGJW--GB1;
        color: #ffffff;
        line-height: 44px;
        background: url(~@/assets/images/excess_case_event_type_title_bg.png)
          no-repeat;
        background-size: 100%;
      }
      div:not(.title) {
        display: flex;
        width: 100%;
        height: auto;
        min-height: 44px;
        & > div:nth-child(1) {
          width: 160px;
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
          width: calc(100% - 146px);
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
  }
}
</style>
