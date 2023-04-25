<template>
  <section class="eventDetail" v-if="isShowDetail">
    <div class="title_bg">
      <div class="lable">事件详情</div>
      <!--    <div class="lable link">调度指挥</div> -->

      <img src="@/assets/images/close_pup.png" class="img" @click="isShowDetail = false" />
    </div>
    <!--    <div :class="retuenBGImg" class="bgImg">
      <span class="text">{{ detail.eventSource }}</span>
    </div> -->
    <section class="container">
      <div class="box_container jobNumber">
        <span class="left_text">工单号</span>
        <span class="flex1">{{ detail.id }}</span>
      </div>
      <section></section>
      <div class="box_container">
        <span class="left_text">事件主题</span>
        <span class="flex1">{{ detail.title }}</span>
      </div>
      <div class="box_container">
        <span class="left_text">事件来源</span>
        <span class="flex1">区城运平台</span>
      </div>
      <div class="box_container">
        <span class="left_text">事件类型</span>
        <span class="flex1">{{ detail.classify }}</span>
      </div>
      <div class="box_container">
        <span class="left_text">发生地点</span>
        <span class="flex1">{{ detail.position }}</span>
      </div>
      <div class="box_container">
        <span class="left_text">发生时间</span>
        <span class="flex1">{{ detail.time }}</span>
      </div>
      <div class="box_container">
        <span class="left_text">所属街道</span>
        <span class="flex1">{{ detail.street || "--" }}</span>
      </div>
      <div v-if="detail.reportRole" class="box_container">
        <span class="left_text">上报角色</span>
        <span class="flex1">{{ detail.name }}</span>
      </div>
      <div class="box_container">
        <span class="left_text">问题描述</span>
        <span class="flex1">{{ detail.describe }}</span>
      </div>
      <div class="box_container">
        <span class="left_text">资料附件</span>
        <span class="flex1">
          <span v-for="(v, i) in handleFiles" :key="i" style="display: flex">
            <!-- <div class="enclosure" v-show="isUploadFiles(v)">附件下载</div> -->
            <img @click="openImgClick(v.url)" :src="v.url" class="flexImg" />
          </span>
        </span>
      </div>
      <div class="box_container">
        <span class="left_text">处置流程</span>
        <div class="flex1" v-if="processList.length">
          <section class="process_box">
            <div v-for="(v, i) in processList" class="process_item" :key="i">
              <div class="line_box">
                <span class="circle"></span>
                <span class="line"></span>
                <span class="arrow"></span>
              </div>
              <div>
                <div class="time">
                  {{ v.time }}
                  {{ v.state }}
                </div>
                <!-- <div class="name" v-show="i == 0">
                  <span class="lable_color">来源平台</span
                  ><span class="text">{{ detail.eventSource }}</span>
                </div> -->
                <div class="name">
                  <span class="lable_color">处置操作</span>
                  <span class="text">{{ v.opinion || "无" }}</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <!-- <div class="box_container">
        <span class="left_text">领导批示</span>
        <span class="flex1">{{ detail.ldps || "--" }}</span>
      </div> -->
      <!--      <div class="box_container">-->
      <!--        <span class="left_text">责任部门</span>-->
      <!--        <span class="flex1">{{ detail.mainOrg || "&#45;&#45;" }}</span>-->
      <!--      </div>-->
      <div class="box_container">
        <span class="left_text">事件状态</span>
        <span class="flex1">{{ detail.state || "--" }}</span>
      </div>
      <!--   <div
        class="box_container"
        v-if="handleFiles "
      >
        <span class="left_text">完成情况</span>
        <span class="flex1">
          <span
            v-for="(v, i) in handleFiles"
            :key="i"
            style="display: flex"
          >
            <div class="enclosure" v-show="isUploadFiles(v)">附件下载</div>
            <img
              v-show="!isUploadFiles(v)"
              @click="openImgClick(v)"
              :src="v.img"
              class="flexImg"
            />
          </span>
        </span>
      </div> -->
      <!--      <div class="box_container">-->
      <!--        <span class="left_text">完成部门</span>-->
      <!--        <span class="flex1">{{ detail.mainOrg || "&#45;&#45;" }}</span>-->
      <!--      </div>-->
      <!-- <section v-show="detail.eventStatus == '已结案'">
        <div class="box_container">
          <span class="left_text">核查状态</span>
          <span class="flex1">{{ detail.verifyStatus }}</span>
        </div>
        <div class="box_container">
          <span class="left_text">核查部门</span>
          <span class="flex1">{{ detail.verifyOrg }}</span>
        </div>
        <div class="box_container">
          <span class="left_text">核查时间</span>
          <span class="flex1">{{ detail.dealTime }}</span>
        </div>
        <div class="box_container">
          <span class="left_text">处置评价</span>
          <span class="flex1">--</span>
        </div>
        <div class="box_container">
          <span class="left_text">上报评价</span>
          <span class="flex1">--</span>
        </div>
      </section> -->
    </section>
    <imagePreview v-if="showBigImg" :show.sync="showBigImg" :url="dialogImageUrl">
    </imagePreview>
  </section>
</template>

<script>
import imagePreview from "./imagePreview.vue";
export default {
  components: {
    imagePreview,
  },
  props: {
    postJson: {
      type: Object,
    },
    detail: {
      type: Object
    }
  },
  data() {
    return {
      showBigImg: false, // 显示图片弹窗
      dialogImageUrl: "", //  显示图片地址

      isShowDetail: false, // 显示详情弹窗
      processList: [
        /*  {
           createDate: "2023-02-11 13:48:38",
           createUser: "系统用户",
           esId: "3d575fdd-6143-45d2-a252-95d6e53ddfec",
           flowNo: "20230211392906160",
           fromNodeId: "node-300",
           groupId: "-2",
           groupName: "市网络理政办",
           groupUser: "1694",
           isDel: false,
           nodeName: "处置中",
           nowNodeName: "处置中",
           operationContent: "市网络理政办 1694 审核工单 备注:派发工单",
           operationType: "处置完成",
           optDate: "2023-02-11 13:49:40.277",
           orderNodeId: "node-300",
           updateDate: "2023-02-11 13:48:38",
           useTimeMinute: "0",
           userId: 46497,
         }, */
      ], // 流程
      eventInfo: {},
    };
  },
  computed: {

    handleFiles() {
      return JSON.parse(this.detail.img)
    },
    // 附件资源可下载的文件类型
    /*   uploadType() {
        return this.$store.state.handPageDownLoadFileTypes || ["pdf", "docx"];
      }, */
  },
  watch: {
    detail: {
      handler() {
        this.$api.event.reqEventAllProcess({
          id: this.detail.id
        }).then((res) => {
       
            let new_process = JSON.parse(res.data.process)
            this.processList = new_process

        })
      }
    }
  },
  methods: {


    openImgClick(url) {
      this.showBigImg = true;
      this.dialogImageUrl = url;
    },
  },
};
</script>

<style lang="scss" scoped>
.eventDetail {
  z-index: 5;
  position: fixed;
  top: 57px;
  right: 43.5%;
  width: 445px;
  height: 850px;
  overflow-y: auto;
  font-size: 18px;
  font-family: PingFang SC;
  background: rgba(10, 39, 51, 0.9);
  padding: 5px 28px 0 26px;
}

.flexbetween {
  display: flex;
  justify-content: space-between;
}

.title_bg {
  margin-top: 20px;
  margin-bottom: 16px;
  background: url(~@/assets/images/SJHJ.png);
  background-size: 100% 100%;
  width: 100%;
  height: 28px;
  padding-left: 23px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .lable {
    color: #ffffff;
    line-height: 32px;
    letter-spacing: 1px;
    font-size: 18px;
    font-family: ShiShangZhongHeiJianTi;
  }

  .img {
    display: inline-block;
    width: 18px;
    height: 18px;
    margin-bottom: 15px;
    cursor: pointer;
  }
}

.bgImg {
  margin-left: -38px;
}

.container {
  height: 1122px;
  overflow-y: auto;
  color: #fff;

  .box_container {
    margin-bottom: 20px;
    display: flex;
    line-height: 32px;

    span {
      display: inline-block;
    }
  }

  .jobNumber {
    background: url(~@/assets/images/detail_gdh.png);
    background-size: 100% 100%;
    // width: 509px;
    height: 30px;
    display: flex;
    align-items: center;
    padding-left: 20px;

    .left_text {
      width: 78px;
      font-size: 12px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: bold;
      color: #bcdbe8;
      line-height: 12px;
      letter-spacing: 1px;
      margin-right: 6px;
    }

    .flex1 {
      font-size: 22px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      line-height: 16px;
      letter-spacing: 1px;
      position: relative;
    }
  }

  .flex1 {
    flex: 1;
    font-size: 20px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    letter-spacing: 1px;
  }

  .enclosure {
    color: #acd9f7;
    cursor: pointer;
    border-bottom: 1px solid #acd9f7;
  }

  .left_text {
    font-size: 12px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #acd9f7;
    // line-height: 12px;
    letter-spacing: 1px;
    width: 92px;
    margin-right: 6px;
  }

  .flexImg {
    cursor: pointer;
    display: inline-block;
    width: 200px;
    height: 112px;
    border: 2px solid rgba($color: #62859d, $alpha: 0.5);
  }

  .process_box {
    width: 315px;
    max-height: 312px;
    background: rgba(195, 226, 255, 0.07);
    border-radius: 4px;
    overflow-y: auto;
    padding: 13px 0 11px 23px;

    .process_item {
      display: flex;
    }

    .line_box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      // transform:rotate(90deg);
      width: 10px;
      margin-right: 10px;
      margin-top: 12px;
      position: relative;

      span {
        display: inline-block;
      }

      .circle {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #89c7ff;
      }

      .line {
        width: 1px;
        height: 100%;
        background: #89c7ff;
      }

      .arrow {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: url(~@/assets/images/arrowRever.png) no-repeat;
        background-size: 100% 100%;
        width: 13px;
        height: 15px;
      }
    }

    .time {
      margin-bottom: 16px;
    }

    .name {
      margin-bottom: 16px;
      display: flex;

      .lable_color {
        margin-right: 12px;
        color: #82a3c5;
        font-size: 20px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;

        letter-spacing: 1px;
      }

      .text {
        font-size: 20px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        letter-spacing: 1px;
        flex: 1;
      }
    }
  }
}

::v-deep {
  .el-dialog__wrapper {
    right: 120px;
  }
}

.link {
  cursor: pointer;
}

.source12345,
.sourcedld,
.sourceszcg,
.sourceqsjsn {
  background-size: 100% 100%;
  width: 239px;
  height: 58px;

  .text {
    font-size: 20px;
    font-family: YouSheBiaoTiHei;
    font-weight: 400;
    color: #feffff;
    line-height: 43px;
    padding-left: 71px;
  }
}

.source12345 {
  background: url(~@/assets/images/source12345.png) no-repeat;
}

.sourcedld {
  background: url(~@/assets/images/sourcedld.png) no-repeat;
}

.sourceszcg {
  background: url(~@/assets/images/sourceszcg.png) no-repeat;
}

.sourceqsjsn {
  background: url(~@/assets/images/sourceqsjsn.png) no-repeat;
}
</style>
