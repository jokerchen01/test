<template>
  <section class="opinions">
    <section class="detail_box detail_bg" v-show="isShowDetail">
      <section class="left_box">
        <div class="dh">
          <span>相关舆情</span>
        </div>
        <div class="box_container">
          <span class="left_text left_title">事件描述</span>
        </div>
        <div class="box_container">
          <span class="des_bg">
            <div class="box-item">
              <div class="item_left">时间</div>
              <div class="item_right">{{ detail.event_time }}</div>
            </div>
            <div class="box-item">
              <div class="item_left">事件</div>
              <div class="item_right">{{ detail.name }}</div>
            </div>
            <div class="box-item">
              <div class="item_left">坐标</div>
              <div class="item_right" v-if="Object.is(detail, {})">
                [{{ detail.longitude }},{{ detail.latitude }}]
              </div>
            </div>
          </span>
        </div>
        <div class="box_container">
          <span class="left_text left_title">直击现场</span>
        </div>
        <div class="box_container">
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
                v-show="v.includes('jpg') || v.includes('png')"
                @click="openImgClick(v)"
                :key="i"
                :src="v"
                class="flexImg"
              />
            </span>
          </span>
        </div>
      </section>
      <section class="midden_line"></section>
      <div class="right_box">
        <div class="box_container2">
          <span class="left_text">事件轨迹</span>
          <span class="flex1">
            <section class="process_box">
              <div v-for="(v, i) in processList" class="process_item" :key="i">
                <div class="line_box">
                  <span class="circle">首发</span>
                  <span class="line"></span>
                </div>
                <div>
                  <div class="time">
                    {{ v.startTime }}
                    {{ v.nodeName }}
                  </div>

                  <div class="name">
                    <span class="text">{{ v.message || "无" }}</span>
                  </div>
                </div>
              </div>
            </section>
          </span>
        </div>
      </div>
      <section class="dialog">
        <el-dialog
          :visible.sync="showBigImg"
          :modal-append-to-body="false"
          :modal="false"
          width="820px"
          height="1120px"
          top="6.8vh"
        >
          <img width="780px" height="1120px" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </section>
    </section>
  </section>
</template>

<script>
export default {
  data() {
    return {
      processList: [

      ], // 流程
      detail: {},
      isShowDetail: true,
      showBigImg: false,
      dialogImageUrl: "",
    };
  },

  mounted() {
  /*   this.reqAirOpinions(); */
  },
  methods: {
    async reqAirOpinions() {
      let res = await this.$api.statePup.getAirOpinions();
      this.detail = res.data;
      this.getProce(res.data);
    },
    //待更换正确的接口
    async reqEventTrajectory() {
      let res = await this.$api.statePup.getAirOpinions({
        id: this.detail.uuid,
      });
    },
    getProce(val) {
      this.processList = [];
      if (val.eventSource == "区城运平台") {
        // e网通管获取的接口
        let json = new FormData();
        json.append("eventId", this.detail.uuid);
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
  position: fixed;
  top: 780px;
  right: 20px;
  display: flex;
  height: 590px;
  width: 940px;
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
        height: 480px;
        padding: 30px 0 20px 20px;
        .process_item {
          display: flex;
          color: #fff;
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
          margin-right: 30px;
        }
        span {
          display: inline-block;
        }
        .circle {
          width: 52px;
          height: 52px;
          background: url("~@/assets/images/circle.png") no-repeat 100%
            100%;
          border-radius: 50%;
        }
        .line {
          width: 1px;
          height: 100%;
          background: #89c7ff;
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

            letter-spacing: 1px;
          }
          .text {
            font-size: 20px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            letter-spacing: 1px;
            flex: 1;
            line-height: 35px;
          }
        }
      }
      .detail_bg {
      /*   background: url(/eventCenter/img/safe_pup.1a0fda15.png) 100% 100%
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
  margin-left: 36px;
}
.dh {
  padding-left: 10px;
  padding-top: 5px;
  font-size: 26px;
  line-height: 26px;
  height: 30px;
  margin-bottom: 20px;
  width: 340px;

}
.box_container {
  margin: 24px 0;
  line-height: 24px;
  display: flex;
  span {
    display: inline-block;
  }
  .des_bg {
    width: 440px;
    height: 187px;
    background: rgba($color: #c3e2ff, $alpha: 0.07);
    .box-item {
      display: flex;
      font-size: 20px;
      margin-top: 20px;
      .item_left {
        flex: 1;
        color: #acd9f7;
      }
      .item_right {
        flex: 5;
      }
    }
  }
}
.box_img {
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: space-around;
  .img_left {
    width: 50%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .img_right {
    margin-left: 10px;
    width: 50%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
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
  font-family: PingFang SC;
}
.left_title {
  color: #fff;
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
    margin-right: 50px span {
      display: inline-block;
    }
    .circle {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: url("~@/assets/images/circle.png") no-repeat 100%
        100%;
      line-height: 50px;
      text-align: center;
      color: #acd9f7;
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
/*   background: url(/eventCenter/img/safe_pup.1a0fda15.png) 100% 100% no-repeat; */
  background-size: 100% 100%;
}
.img_detail {
  position: absolute;
  top: 30px;
  left: 900px;
  display: inline-block;
  width: 24px;
  height: 24px;
  cursor: pointer;
  z-index: 99999;
}
.opinions {
  .dialog {
    ::v-deep {
      .el-dialog__wrapper {
        overflow: hidden;
      }
      .el-dialog {
        margin: 0 auto 50px !important;
        margin-left: auto !important;
        margin-top: 8.6vh !important;
        .el-dialog__body {
          padding: 30px 20px !important;
        }
        .el-dialog__header {
          padding: 20px 20px 10px !important;
        }
      }
      .el-dialog__header {
        .el-dialog__headerbtn {
          font-size: 30px !important;
          top: 15px;
        }
      }
    }
  }
}
</style> 