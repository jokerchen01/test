<template>
  <div>
    <component :is="component" @changeState="changeState"></component>
  </div>
</template>

<script>
import detail from "./detail.vue";
import search from "./search.vue";
export default {
  components: {
    detail,
    search,
  },
  data() {
    return {
      component: "search",
    };
  },
  methods: {
    changeState(v) {
      this.component = v;
    },
  },
};
</script>

<style>
</style>