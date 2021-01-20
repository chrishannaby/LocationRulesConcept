<template>
  <div class="py-6 sm:px-6 w-full bg-gray-200">
    <div
      class="px-6 sm:px-0 pb-5 border-b border-gray-300 sm:flex sm:items-center sm:justify-between"
    >
      <h3 class="text-xl leading-6 font-medium text-gray-900">Products</h3>
      <div class="mt-3 sm:mt-0 sm:ml-4">
        <div class="flex rounded-md shadow-sm">
          <div class="relative flex-grow focus-within:z-10">
            <input
              v-model="productToAdd"
              type="text"
              class="h-full truncate focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md sm:hidden border-gray-300"
              placeholder="Enter a new Product ID"
            />
            <input
              v-model="productToAdd"
              type="text"
              class="h-full truncate hidden focus:ring-indigo-500 focus:border-indigo-500 w-full rounded-none rounded-l-md sm:block sm:text-sm border-gray-300"
              placeholder="Enter a new Product ID"
            />
          </div>
          <button
            type="button"
            @click="addProduct"
            :disabled="!isValidId"
            :class="isValidId ? '' : 'opacity-20 cursor-not-allowed'"
            class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-blue-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span class="ml-2">Add Product</span>
          </button>
        </div>
      </div>
    </div>
    <ul class="py-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <product-instance
        v-for="(product, idx) in products"
        :key="product"
        :product="product"
        :storageKey="getStorageKey(product)"
        @delete-instance="deleteProduct(idx, product)"
      />
    </ul>
  </div>
</template>

<script>
import { useLocalStorage } from "@vueuse/core";
import ProductInstance from "./ProductInstance.vue";
import { ref, computed } from "@vue/composition-api";
const name = "example-1";

export default {
  name,
  components: {
    ProductInstance,
  },
  setup() {
    const productToAdd = ref("");
    const products = useLocalStorage(`${name}-products`, []);

    const getStorageKey = (product) => {
      return `${name}-product-${product}`;
    };

    const addProduct = () => {
      products.value.push(productToAdd.value);
      productToAdd.value = "";
    };

    const deleteProduct = (index, product) => {
      products.value.splice(index, 1);
      const storageKey = getStorageKey(product);
      localStorage.removeItem(storageKey);
    };

    const isValidId = computed(() => {
      return (
        productToAdd.value.length > 0 &&
        !products.value.includes(productToAdd.value)
      );
    });

    return {
      productToAdd,
      products,
      addProduct,
      deleteProduct,
      isValidId,
      getStorageKey,
    };
  },
};
</script>
