<template>
  <section class="urban">
    <section class="detail_box detail_bg" v-show="isShowDetail">
      <img
        data-v-61b8ce11=""
        src="@/assets/images/close_pup.png"
        class="img_detail"
        @click="close"
      />
      <section class="left_box">
        <div class="dh">
          <span>事件详情</span>
        </div>
        <div class="box_container">
          <span class="left_text">事件类型</span>
          <span class="flex1" v-if="detail.eventType2">{{
            detail.eventType2
          }}</span>
          <span class="flex1" v-else>{{ detail.eventType1 }}</span>
        </div>
        <div class="box_container">
          <span class="left_text">事件来源</span>
          <span class="flex1">{{ detail.eventSource }}</span>
        </div>
        <div class="box_container">
          <span class="left_text">所属街道</span>
          <span class="flex1">{{ detail.street }}</span>
        </div>
        <div class="box_container">
          <span class="left_text">上报时间</span>
          <span class="flex1">{{ detail.eventTime }}</span>
        </div>
        <div class="box_container">
          <span class="left_text">更新时间</span>
          <span class="flex1">{{ detail.updateTime }}</span>
        </div>
        <div class="box_container">
          <span class="left_text">事件状态</span>
          <span class="flex1">{{ detail.eventStatus }}</span>
        </div>
        <div class="box_container">
          <span class="left_text">事件描述</span>
          <span class="flex1">{{ detail.eventDesc }}</span>
        </div>
      </section>
      <section class="midden_line"></section>
      <div class="right_box">
        <div class="box_container">
          <span class="left_text">资料附件</span>
          <span class="flex1">
            <span v-for="(v, i) in detail.uploadFiles">
              <div
                class="enclosure"
                v-show="v.includes('pdf')"
                @click="annexDownload(1)"
              >
                附件下载
              </div>
              <img
                @click="openImgClick(v)"
                :key="i"
                :src="v"
                class="flexImg"
                ref="img"
              />
              <!-- v-show="v.includes('jpg') || v.includes('png')" -->
            </span>
          </span>
        </div>
        <div class="box_container">
          <span class="left_text">处置附件</span>
          <span
            class="flex1"
            v-if="detail.handleFiles && detail.handleFiles.length != 0"
          >
            <span v-for="(v, i) in detail.handleFiles">
              <div
                class="enclosure"
                v-show="v.includes('pdf')"
                @click="annexDownload(2)"
              >
                附件下载
              </div>
              <img @click="openImgClick(v)" :key="i" :src="v" class="flexImg" />
            </span>
          </span>
        </div>
        <div class="box_container2">
          <span class="left_text">处置流程</span>
          <span class="flex1">
            <section class="process_box">
              <div v-for="(v, i) in processList" class="process_item" :key="i">
                <div class="line_box">
                  <span class="circle"></span>
                  <span class="line"></span>
                  <span class="arrow"></span>
                </div>
                <div>
                  <div class="time">
                    {{ v.startTime }}
                    {{ v.nodeName }}
                  </div>

                  <div class="name">
                    <span class="lable_color">处理意见</span>
                    <span class="text">{{ v.message || "无" }}</span>
                  </div>
                </div>
              </div>
            </section>
          </span>
        </div>
      </div>
      <section class="dialog">
        <imagePreview
          v-if="showBigImg"
          :show.sync="showBigImg"
          :url="dialogImageUrl"
        >
        </imagePreview>
      </section>
    </section>
  </section>
</template>

<script>
import imagePreview from "@/views/dashboard/imagePreview.vue";
export default {
  components: {
    imagePreview,
  },
  data() {
    return {
      processList: [], // 流程
      detail: {},
      isShowDetail: true,
      id: "",
      source: "oneNetWork",
      uploadFiles: [],
      showBigImg: false,
      dialogImageUrl: "",
    };
  },
  watch: {
    id: {
      handler(newVal) {
        if (newVal) {
          this.reqDetailsList();
        }
      },
    },
  },
  methods: {
    close() {
      this.isShowDetail = false;
      this.$parent.isShowContainer = true;
    },
    async reqDetailsList() {
      let res = await this.$api.statePup.getDetailsList({
        id: this.id,
        source: this.source,
      });
      console.log(res);
      this.detail = res.data;
      this.getProce(res.data);
    },
    getProce(val) {
      this.processList = [];
      if (val.eventSource == "区城运平台") {
        // e网通管获取的接口
        let json = new FormData();
        json.append("eventId", this.detail.id);
        this.$api.eventpivot.queryEventProcess(json).then((res) => {
          this.processList = res.reverse();
        });
      } else {
        // 市上获取的接口
        let json = new FormData();
        json.append("flowNo", val.eventNo);
        json.append("actionType", 1);
        json.append("page", 1);
        json.append("size", 100);
        this.$api.eventpivot.getFlowProcess(json).then((res) => {
          this.processList = res.data.data.rows.map((v) => {
            return {
              startTime: v.createDate,
              nodeName: v.orderNodeId == "end" ? v.nodeName : v.nowNodeName,
              message: v.operationContent,
            };
          });
        });
      }
    },
    openImgClick(url) {
      this.showBigImg = true;
      this.dialogImageUrl = url;
    },
  },
};
</script>

<style lang="scss" scoped>
.detail_box {
  display: flex;
  height: 600px;
  padding-top: 25px;
  .left_box,
  .right_box {
    width: 50%;
    overflow-y: auto;
  }
  .right_box {
    padding-top: 30px;
    .box_container2 {
      margin-top: 20px;

      .left_text {
        display: inline-block;
        color: #cccccc;
        width: 120px;
        font-size: 20px;
      }
      .flex1 {
        flex: 1;
        font-size: 20px;
      }
      .flex1 {
        flex: 1;
        font-size: 20px;
      }
      .bg_line {
        background: #0b6787;
        height: 2px;
        width: 100%;
        margin: 20px 0;
      }
      .left_text {
        display: inline-block;
        color: #acd9f7;
        width: 120px;
        font-size: 20px;
      }
      .flexImg {
        cursor: pointer;
        display: inline-block;
        width: 200px;
        height: 112px;
        border: 2px solid rgba($color: #62859d, $alpha: 0.5);
      }
      .process_box {
        overflow-y: auto;
        height: 400px;
        padding: 10px 20px 20px 5px;
        .process_item {
          display: flex;
          color: #fff;
          margin-bottom: -5px;
        }
        .time {
          margin-right: 10px;
          margin-bottom: 16px;
        }
        .line_box {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 10px;
          margin-right: 10px;
        }
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
          position: relative;
          top: -45%;
          left: 0.3%;
          transform: translate(-50%, -50%);
          background: url(~@/assets/images/newEvent/arrowRever.png) no-repeat;
          background-size: 100% 100%;
          width: 13px;
          height: 15px;
          transform: rotate(180deg);
        }
        .time {
          margin-bottom: 16px;
          margin-top: 20px;
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
            line-height: 30px;
            letter-spacing: 1px;
          }
          .text {
            font-size: 20px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            letter-spacing: 1px;
            flex: 1;
            line-height: 30px;
          }
        }
      }
      .detail_bg {
        /* background: url(/eventCenter/img/safe_pup.1a0fda15.png) 100% 100%
          no-repeat; */
        background-size: 100% 100%;
      }
      .img_detail {
        position: absolute;
        top: 360px;
        left: 900px;
        display: inline-block;
        width: 24px;
        height: 24px;
        cursor: pointer;
        z-index: 99999;
      }
    }
  }
}
.left_box {
  padding: 0 10px;
  color: #fff;
}
.midden_line {
 
  background-size: 100% 100%;
  width: 2px;
  height: 100%;
  margin-right: 20px;
}
.dh {
  padding-left: 10px;
  padding-top: 5px;
  font-size: 26px;
  line-height: 26px;
  height: 30px;
  margin-bottom: 20px;
  width: 340px;
/*   background: url(/eventCenter/img/liner-gradient-title-bg.fbde0c47.png)
    no-repeat center; */
}
.box_container {
  margin: 24px 0;
  line-height: 30px;
  display: flex;
  span {
    display: inline-block;
  }
}
.flex1 {
  flex: 1;
  font-size: 20px;
  line-height: 30px;
  text-align: justify;
}
.bg_line {
  background: #0b6787;
  height: 2px;
  width: 100%;
  margin: 20px 0;
}
.left_text {
  display: inline-block;
  color: #acd9f7;
  width: 120px;
  font-size: 20px;
}
.flexImg {
  cursor: pointer;
  display: inline-block;
  width: 200px;
  height: 112px;
  border: 2px solid rgba($color: #62859d, $alpha: 0.5);
}
.process_box {
  overflow-y: auto;
  padding: 10px 0 20px 20px;
  .process_item {
    display: flex;
    color: #fff;
  }
  .time {
    margin-right: 10px;
  }
  .line_box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 10px;
    margin-right: 10px;
    span {
      display: inline-block;
    }
    .circle {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #fff;
    }
    .line {
      width: 1px;
      height: 50px;
      background: #fff;
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
.detail_bg {
 /*  background: url(/eventCenter/img/safe_pup.1a0fda15.png) 100% 100% no-repeat; */
  background-size: 100% 100%;
}
.img_detail {
  position: absolute;
  top: 55px;
  left: 915px;
  display: inline-block;
  width: 24px;
  height: 24px;
  cursor: pointer;
  z-index: 99999;
}
</style> 
