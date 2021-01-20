<template>
  <div id="app" class="min-h-screen flex flex-col">
    <nav
      class="overflow-x-auto px-6 bg-gray-800 flex items-baseline space-x-4 py-3"
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
    <component :is="selectedComponent"></component>
    <iframe ref="xstate" style="height: 30rem"></iframe>
  </div>
</template>

<script>
import { inspect } from "@xstate/inspect";
import Example1 from "./1-lifecycle/Example1.vue";
import Example2 from "./2-something/Example2.vue";

export default {
  mounted() {
    inspect({
      iframe: this.$refs.xstate,
    });
  },
  components: {
    Example1,
    Example2,
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