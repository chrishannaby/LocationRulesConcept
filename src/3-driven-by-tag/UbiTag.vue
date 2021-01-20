<template>
  <svg
    :x="shiftedX"
    :y="shiftedY"
    :width="r"
    :height="r"
    viewBox="0 0 500 500"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle class="fill-current text-green-600" cx="250" cy="250" r="58.694" />

    <text
      style="
        fill: white;
        font-family: Consolas;
        font-size: 35px;
        white-space: pre;
        text-anchor: middle;
      "
      x="250"
      y="364.774"
    >
      <slot></slot>
    </text>
  </svg>
</template>

<script>
export default {
  props: ["x", "y", "r"],
  computed: {
    shiftedX() {
      return this.x - this.r / 2;
    },
    shiftedY() {
      return this.y - this.r / 2;
    },
  },
};
</script>