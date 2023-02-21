<template>
  <!-- 进度条组件 -->
  <div class="scrollBar" :style="{ width: scrollWidth }">
    <div class="scrollBar_process" :style="{ width: width + '%' }">
      <div
        class="process"
        :class="[
          backgroundColor == 0
            ? 'process_ative'
            : backgroundColor == 1
            ? 'process_ative2'
            : backgroundColor == 2
            ? 'process_ative3'
            : '',
        ]"
      ></div>
      <div
        class="dot"
        v-if="width != 0"
        :class="[
          backgroundColor == 0
            ? 'dot_ative'
            : backgroundColor == 1
            ? 'dot_ative2'
            : backgroundColor == 2
            ? 'dot_ative3'
            : '',
        ]"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    height: {
      type: String,
      default() {
        return "8px";
      },
    },
    width: {
      type: String,
      default() {
        return "80";
      },
    },
    scrollWidth: {
      type: String,
      default() {
        return "440px";
      },
    },
    backgroundColor: {
      type: Number,
      default() {
        return 0;
      },
    },
  },
  data() {
    return {};
  },
  watch: {
    width(e) {
      console.log(e);
    },
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang='scss'>
.scrollBar {
  height: 8px;
  background: rgba(255, 255, 255, 0.06);
  // opacity: 0.33;
  position: relative;
  .scrollBar_process {
    position: absolute;
    top: -1px;
    width: 80%;
    height: 8px;
    display: flex;
    .process {
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        rgba(37, 166, 255, 0.3) 0%,
        #25a6ff 100%
      );
    }
    .process_ative {
      background: linear-gradient(
        90deg,
        rgba(250, 102, 102, 0.19) 0%,
        #ff6767 100%
      );
      opacity: 0.99;
    }
    .process_ative2 {
      background: linear-gradient(
        270deg,
        #ff7373 0%,
        rgba(201, 77, 77, 0.15) 100%
      );
      border-radius: 1px;
      opacity: 0.99;
    }
    .process_ative3 {
      background: linear-gradient(
        90deg,
        rgba(132, 255, 187, 0) 0%,
        rgba(139, 255, 187, 1) 100%
      );
      opacity: 0.99;
    }
    // .dot {
    //   margin-top: -2px;
    //   box-shadow: 0px 0px 2px 6px rgba(35, 157, 242, 0.3);
    //   width: 8px;
    //   height: 8px;
    //   border-radius: 50%;
    //   background-color: #24a1f9;
    // }
    // .dot_ative {
    //   background-color: rgba(255, 103, 103, 1);
    //   box-shadow: 0px 0px 2px 6px rgba(255, 103, 103, 0.3);
    // }
    // .dot_ative2 {
    //   background-color: rgba(241, 212, 71, 1);
    //   box-shadow: 0px 0px 2px 6px rgba(241, 212, 71, 0.3);
    // }
    // .dot_ative3 {
    //   background-color: rgba(97, 229, 77, 1);
    //   box-shadow: 0px 0px 2px 6px rgba(97, 229, 77, 0.3);
    // }
  }
}
</style>