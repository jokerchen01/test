<template>
  <div class="personal">
    <eventsearch :state="state"></eventsearch>
  </div>
</template>

<script>
import eventsearch from "../eventsearch/index.vue";
export default {
  components: {
    eventsearch,
  },
  data() {
    return {
      state:'已完成'
    };
  },
  mounted() {
   
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.personal {
  width: 100%;
  margin-top: 50px;
}
</style>