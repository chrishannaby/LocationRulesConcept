<template>
  <svg
    ref="svg"
    class="w-full h-full"
    viewBox="0 0 1000 1000"
    @click="handleClick"
  >
    <ubi-tag
      v-for="(p, id) in tagLocations"
      :key="id"
      :x="p.x"
      :y="p.y"
      :r="400"
    >
      {{ id }}
    </ubi-tag>
  </svg>
</template>

<script>
import UbiTag from "./UbiTag.vue";

export default {
  props: ["tagLocations", "selectedProduct"],
  components: {
    UbiTag,
  },
  methods: {
    handleClick(e) {
      if (!this.selectedProduct) return;
      const svg = this.$refs.svg;
      const pt = svg.createSVGPoint();

      pt.x = e.clientX;
      pt.y = e.clientY;

      // transform to SVG coordinates
      const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());

      const tagEvent = {
        id: this.selectedProduct,
        x: svgP.x,
        y: svgP.y,
      };

      this.$emit("tag-event", tagEvent);
    },
  },
};
</script>

<style>
</style>