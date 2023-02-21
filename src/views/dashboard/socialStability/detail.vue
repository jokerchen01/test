<template>
  <section class="fill">
    <div class="main_title">
      <div>详情</div>
      <i @click="goBack"></i>
    </div>
    <div class="detail_container">
      <div v-if="type">
        <div>
          <div>排查时间</div>
          <div style="margin-right:100px">{{ detail.troubleshooting_time }}</div>
        </div>
        <div>
          <div>隐患名称</div>
          <div>{{ detail.hidden_danger }}</div>
        </div>
        <div>
          <div>事件情况</div>
          <div>{{ detail.basic_information }}</div>
        </div>
        <div>
          <div>属地街道</div>
          <div>{{ detail.street }}</div>
        </div>
        <div>
          <div>类别领域</div>
          <div>{{ detail.category_field }}</div>
        </div>
        <div>
          <div>属事部门</div>
          <div>{{ detail.dept }}</div>
        </div>
        <div>
          <div>调处情况</div>
          <div>{{ detail.mediation }}</div>
        </div>
        <div>
          <div>风险等级</div>
          <div>{{ detail.risk_level }}</div>
        </div>
        <div>
          <div>是否引发群体性事件</div>
          <div>{{ detail.trigger_group }}</div>
        </div>
      </div>
      <div v-else>
        <div>
          <div>发生时间</div>
          <div style="margin-right:100px">{{ detail.occurrence_time }}</div>
        </div>
        <div>
          <div>事件名称</div>
          <div>{{ detail.event_name }}</div>
        </div>
        <div>
          <div>事件情况</div>
          <div>{{ detail.event_overview }}</div>
        </div>
        <div>
          <div>属地街道</div>
          <div>{{ detail.street }}</div>
        </div>
        <div>
          <div>类别领域</div>
          <div>{{ detail.category_field }}</div>
        </div>
        <div>
          <div>属事部门</div>
          <div>{{ detail.dept }}</div>
        </div>
        <div>
          <div>事件规模</div>
          <div>{{ detail.event_scale }}</div>
        </div>
        <div>
          <div>表现形式</div>
          <div>{{ detail.manifestation }}</div>
        </div>
        <div>
          <div>关注等级</div>
          <div>{{ detail.attention_level }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      detail: {},
      type: "",
    };
  },
  methods: {
    goBack() {
      this.$parent.isShowDetail = false;
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
