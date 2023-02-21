<template>
  <section class="socialAppeal">
    <titleNav :title="'社会诉求'" />
    <section class="container">
      <div class="left_box">
        <lableNav :width="'462px'" :title="'热门舆情'" />
        <div class="scroll_box">
          <div class="item" v-for="(v, i) in hotList" :key="i">
            <el-tooltip
              popper-class="test"
              :visible-arrow="false"
              :content="v.title"
              placement="top-start"
            >
              <a target="_blank" :href="v.url">
                <div class="text">{{ i + 1 }} {{ v.title }}</div></a
              >
            </el-tooltip>
          </div>
        </div>
      </div>
      <div class="right_box">
        <lableNav :width="'432px'" :title="'诉求热词'" />
        <div class="hot_bg">
          <hotNav />
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import titleNav from "./title.vue";
import lableNav from "./lable.vue";
import hotNav from "./hot.vue";
export default {
  components: {
    titleNav,
    lableNav,
    hotNav,
  },
  data() {
    return {
      hotList: [],
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      this.$api.home.reqHotOpintions().then((res) => {
        this.hotList=res.data
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.socialAppeal {
  background: url(~@/assets/images/appeal_box.png) no-repeat;
  background-size: 100% 100%;
  height: 326px;
  width: 100%;
  padding-left: 9px;
  padding-top: 14px;
  padding-right: 13px;
  .container {
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    .left_box {
      width: 320px;
      .scroll_box {
        margin-top: 14px;
        height: 211px;
        overflow: hidden;
        overflow-y: auto;
        &::-webkit-scrollbar {
          display: none;
        }
      }
      .item {
        background: url(~@/assets/images/yq_item.png) no-repeat;
        background-size: 100% 100%;
        height: 40px;
        line-height: 40px;
        width: 100%;
        margin-bottom: 17px;
        &:last-child {
          margin-bottom: 0;
        }
        .text {
          padding-left: 21px;
          width: 100%;
          //   height: 21px;
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #ffffff;
          overflow: hidden; /*隐藏*/
          white-space: nowrap; /*不换行*/
          text-overflow: ellipsis; /* 超出部分省略号 */
        }
      }
    }
    .right_box {
      width: 360px;
      .hot_bg {
        margin-top: 14px;
        background: url(~@/assets/images/hot_bg.png) no-repeat;
        background-size: 100% 100%;
        height: 215px;
        width: 100%;
        position: relative;
      }
    }
  }
}
</style>
