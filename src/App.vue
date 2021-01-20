<template>
  <div id="app" class="h-full sm:h-1/2 flex flex-col">
    <nav
      class="h-16 overflow-x-auto px-6 bg-gray-800 flex items-center space-x-4"
    >
      <a
        href="#"
        @click="selectedIndex = idx"
        :class="
          idx === selectedIndex
            ? 'bg-indigo-700 text-white'
            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        "
        class="flex-shrink-0 px-3 py-2 rounded-md text-sm font-medium"
        v-for="(example, idx) in examples"
        :key="idx"
      >
        {{ example.name }}
      </a>
    </nav>
    <component
      class="overflow-y-auto"
      style="height: calc(100% - 4rem)"
      :is="selectedComponent"
    ></component>
  </div>
</template>

<script>
import Example1 from "./1-lifecycle/Example1.vue";
import Example2 from "./2-lifecycle-services/Example2.vue";
import Example3 from "./3-driven-by-tag/Example3.vue";

export default {
  mounted() {},
  components: {
    Example1,
    Example2,
    Example3,
  },
  data() {
    return {
      selectedIndex: 0,
      examples: [
        {
          name: "Example 1",
          component: "example-1",
        },
        {
          name: "Example 2",
          component: "example-2",
        },
        {
          name: "Example 3",
          component: "example-3",
        },
      ],
    };
  },
  computed: {
    selectedComponent() {
      return this.examples[this.selectedIndex].component;
    },
  },
};
</script>