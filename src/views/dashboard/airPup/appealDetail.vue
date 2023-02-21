<template>
  <section>
    <section class="container">
      <div class="box_container">
        <span class="left_text"></span>
        <span class="flex1"></span>

        <div class="right_text">
          <span @click="goBack" class="reply"></span>
        </div>
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
        <span class="flex1">{{
          processList.length != 0 ? processList[0].nodeName : "--"
        }}</span>
      </div>
      <div class="box_container">
        <span class="left_text">事件描述</span>
        <span class="flex1">{{ detail.eventDesc }}</span>
      </div>

      <div class="box_container">
        <span class="left_text">处置流程</span>
        <div class="flex1">
          <section class="process_box">
            <div v-for="(v, i) in processList" class="process_item" :key="i">
              <div class="line_box">
                <span class="circle"></span>
                <span class="line"></span>
              
              </div>
              <div>
                <div class="time text">
                  {{ v.startTime }}
                  {{ v.nodeName }}
                </div>
                <div class="name">
                  <span class="text">{{ v.message || "无" }}</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  data() {
    return {
      detail: {}, // 详情数据
      processList: [],
      id: "",
      source: "citySysn",
    };
  },

  watch: {
    id: {
      handler(newVal) {
        if (newVal) {
          this.reqDetailsList();
          this.processList.forEach((v) => {
            if (v.nodeName == "结束") {
              /*   this.detail.eventStatus = "结束"; */
              console.log(123);
              this.$set(this.detail, "eventStatus", "结束");
            }
          });
        }
      },
    },
  },
  methods: {
    goBack() {
      this.$parent.isShowAnalysis = true;
      this.$parent.isShowDetail = false;
    },
    async reqDetailsList() {
      let res = await this.$api.statePup.getDetailsList({
        pkId: this.id,
        source: this.source,
      });

      if (res.data != null) {
        this.detail = res.data;

        this.getProce(res.data);
      }
    },
    /*  getProce(val) {
      this.processList = [];
      if (val.eventSource == "区城运平台") {
        this.$api.statePup
          .getProcessList({
            uuid: this.detail.id,
            platformCode: this.platformCode,
          })
          .then((res) => {
            console.log(res);
            this.processList = res.data.reverse();
          });
      } else {
        // 市上获取的接口
        let json = new FormData();
        json.append("flowNo", val.eventNo);
        json.append("actionType", 1);
        json.append("page", 1);
        json.append("size", 100);
        this.$api.eventpivot.getFlowProcess(json).then((res) => {
          console.log("==============res.data.data.rows", res.data.data.rows)
          this.processList = res.data.data.rows.map((v) => {
            return {
              startTime: v.createDate,
              nodeName: v.orderNodeId == "end" ? v.nodeName : v.nowNodeName,
              message: v.operationContent,
            };
          });
          console.log("==============res.data.data.rows", this.processList)
          const newProcessList = []
          this.processList.forEach((item, index)=>{
            const last = newProcessList[newProcessList.length - 1] || {}
            if(last.startTime != item.startTime || last.nodeName != item.nodeName || last.message != item.message){
              newProcessList.push(item)
            }
          })
          this.processList = newProcessList
          console.log("==============processList", this.processList)
        });
      }
    }, */
    getProce(val) {
      this.processList = [];
      if (val.eventSource == "区城运平台") {
        // e网通管获取的接口
        let json = new FormData();
        json.append("eventId", this.detail.id);
        this.$api.eventpivot.queryEventProcess(json).then((res) => {
          this.processList = res.reverse();
          console.log(res);
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
  },
};
</script>

<style lang="scss" scoped>
.detail_color {
  color: rgb(43, 148, 235);
  cursor: pointer;
}
.container {
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
  .flex1 {
    flex: 1;
    font-size: 20px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    letter-spacing: 1px;
  }
  .left_text {
    font-size: 20px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #acd9f7;
    // line-height: 12px;
    letter-spacing: 1px;
    width: 128px;
    text-align: right;
    margin-right: 15px;
  }
  .right_text {
    padding-top: 30px;
    font-size: 20px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #acd9f7;
    // line-height: 12px;
    letter-spacing: 1px;
    margin-right: 50px;
    .reply {
      display: block;
      width: 47px;
      height: 47px;
   /*    background: url(/eventCenter/img/qt_icon_fhuiq.bb5ccd16.png) 100% 100%
        no-repeat; */
      cursor: pointer;
      margin-right: 50px;
      
    }
  }
}
.process_box {
  width: 100%;
  height: 400px;
  background: rgba(195, 226, 255, 0.07);
  border-radius: 4px;
  border: 1px solid #476f93;
  padding-top: 20px;
  padding-left: 19px;
  overflow-y: auto;
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
    margin-top: 8px;
    position: relative;
    span {
      display: inline-block;
    }
    .circle {
       width: 10px;
    height: 10px;
 
    box-sizing: border-box;
    border-radius: 50%;
    background: #175270;
    border: 1px solid #fff;
    }
    .line {
      width: 2px;
    height: 100%;
    background-image: linear-gradient(180deg,transparent 0,transparent 6px,#175270 0,#175270 12px);
    background-repeat: repeat;
    background-size: 2px 12px;
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
      width: 90px;
      letter-spacing: 1px;
    }
  }
  .text {
    font-size: 20px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    line-height: 30px;
    letter-spacing: 1px;
    flex: 1;
  }
}
/* @import "./product.scss"; */
</style>
