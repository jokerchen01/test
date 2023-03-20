<template>
  <div>
    <component :is="component" @changeState="changeState" @changeID="changeID" :id="id" :state="state"></component>
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
 props:{
  state:{
    type:String,
    default:'全部'
  }
 },
  data() {
    return {
      component: "search",
      id: 0,

    };
  },
  methods: {
    changeState(v) {
      this.component = v;
    },
    changeID(v) {
      this.id = v

    }
  },
};
</script>

<style></style>