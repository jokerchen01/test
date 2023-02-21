<template>
  <div class="personal">
    <eventsearch></eventsearch>
  </div>
</template>

<script>
import eventsearch from "../eventsearch/index.vue";
export default {
  components: {
    eventsearch,
  },
  data() {
    return {};
  },
  mounted() {
    this.getFormData();
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