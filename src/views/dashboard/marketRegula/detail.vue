<template>
  <section class="fill">
    <div class="main_title">
      <div>详情</div>
      <i @click="goBack"></i>
    </div>
    <div class="detail_container">
      <div>
        <div>
          <div>案件来源</div>
             <div style="margin-right:100px">{{detail.ajly}}</div>
        </div>
        <div>
          <div>大类</div>
          <div>{{ detail.dl }}</div>
        </div>
        <div>
          <div>小类</div>
          <div>{{ detail.xl }}</div>
        </div>
        <div>
          <div>当事人名称</div>
          <div>{{ detail.dsrmc }}</div>
        </div>
        <div>
          <div>涉嫌/违法行为</div>
          <div>{{ detail.wfxw }}</div>
        </div>
        <div>
          <div>立案/当场处罚编号</div>
          <div>{{ detail.cfbh }}</div>
        </div>
        <div>
          <div>案件名称</div>
          <div>{{ detail.ajmc }}</div>
        </div>
        <div>
          <div>查办案件的主要违法行为</div>
          <div>{{ detail.zywfxw }}</div>
        </div>
        <div>
          <div>违法行为的法条明细</div>
          <div>{{ detail.wfxwft }}</div>
        </div>
        <div>
          <div>处罚条款明细</div>
          <div>{{ detail.cftkmx }}</div>
        </div>
        <div>
          <div>没收违法所得（元）</div>
          <div>{{ detail.mswfsd }}</div>
        </div>
        <div>
          <div>罚款（元）</div>
          <div>{{ detail.fk }}</div>
        </div>
        <div>
          <div>结案时间</div>
          <div>{{ detail.jasj }}</div>
        </div>
        <div>
          <div>处罚决定书号</div>
          <div>{{ detail.cfjdsh }}</div>
        </div>
        <div>
          <div>备注</div>
          <div>{{ detail.remark }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "cookFumeDisturbResidentsDetail",

  data() {
    return {
      detail: {},
      processList: [],
      seq_id: "",
    };
  },
  watch: {
    seq_id: {
      handler(newVal) {
        if (newVal) {
          this.getDetailList();
        }
      },
    },
  },

  methods: {
    goBack() {
      this.$parent.isShowDetail = false;
      this.$parent.isShowTable = true;
    },
    async getDetailList() {
      {
        let res = await this.$api.operationSituaty.getParameter(
          {
            seq_id: this.seq_id,
          },
          `ajlbxq`
        );
      
         this.detail = res[0];
      }
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
  margin-top: 50px;
  overflow-y: auto;
  & > div {
    width: 100%;
    height: auto;
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
      margin-bottom: 4px;
      & > div:nth-child(1) {
        width: 130px;
        height: 28px;
        font-size: 20px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #287cae;
        line-height: 28px;
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
</style>
