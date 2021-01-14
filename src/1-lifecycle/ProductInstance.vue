<template>
  <li
    class="bg-white divide-y divide-gray-200 flex flex-col justify-between shadow sm:rounded-lg"
  >
    <div class="flex gap-2 items-center justify-between px-4 py-5 sm:p-6">
      <h3 class="text-2xl leading-6 font-medium text-gray-900">
        {{ product }}
      </h3>
      <div
        class="truncate px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
      >
        {{ state.toStrings().pop() }}
      </div>
      <button
        @click="send('DELETE')"
        type="button"
        class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="w-5 h-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
    <div class="px-4 py-5 sm:p-6">
      <div v-if="isAssociated">
        <dl>
          <dt class="text-sm font-medium text-gray-700 truncate">Tag ID</dt>
          <dd class="mt-1">
            <div
              class="py-2 w-full inline-flex items-center px-3 rounded-md shadow-sm rounded-l-md border border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"
            >
              {{ tagId }}
            </div>
          </dd>
        </dl>
        <button
          type="button"
          @click="disassociateTag"
          class="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Disassociate
        </button>
      </div>
      <div v-else class="flex flex-col">
        <div>
          <label for="tag_id" class="block text-sm font-medium text-gray-700">
            Tag ID
          </label>
          <div class="mt-1 flex rounded-md shadow-sm">
            <span
              class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"
            >
              00:11:CE:00:00:00:00
            </span>
            <input
              v-model="tagIdInput"
              maxlength="2"
              autocomplete="off"
              type="text"
              name="tag_id"
              id="tag_id"
              class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full px-3 py-2 rounded-none rounded-r-md sm:text-sm border-gray-300"
              placeholder="01"
            />
          </div>
        </div>
        <button
          type="button"
          :disabled="!inputIsValidTagId"
          @click="associateTag"
          :class="inputIsValidTagId ? '' : 'opacity-20 cursor-not-allowed'"
          class="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Associate
        </button>
      </div>
    </div>
  </li>
</template>

<script>
import { useMachine } from "@xstate/vue";
import { productMachine } from "./productMachine";
import { ref, computed } from "@vue/composition-api";

export default {
  props: ["product"],
  setup(props, context) {
    const options = {
      devTools: true,
      context: {
        name: props.product,
      },
      actions: {
        cleanupInstance: () => {
          context.emit("delete-instance");
        },
      },
    };
    const { state, send } = useMachine(productMachine, options);

    const tagIdInput = ref("");
    const re = /^[A-Fa-f0-9]{2}$/;
    const inputIsValidTagId = computed(() => {
      return re.test(tagIdInput.value);
    });

    const associateTag = () => {
      const id = `00:11:CE:00:00:00:00:${tagIdInput.value.toUpperCase()}`;
      tagIdInput.value = "";
      send({
        type: "MANUAL_ASSOCIATION",
        tagId: id,
      });
    };

    const tagId = computed(() => {
      return state.value.context.tagId;
    });

    const isAssociated = computed(() => {
      return state.value.matches("associated");
    });

    const disassociateTag = () => {
      send("MANUAL_DISASSOCIATION");
    };

    return {
      tagIdInput,
      tagId,
      inputIsValidTagId,
      associateTag,
      isAssociated,
      disassociateTag,
      send,
      state,
    };
  },
};
</script>