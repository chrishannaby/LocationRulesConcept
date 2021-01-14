<template>
  <div id="app" class="py-6 sm:px-6 w-full flex-grow bg-gray-200">
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
        @delete-instance="deleteProduct(idx)"
      />
    </ul>
  </div>
</template>

<script>
import ProductInstance from "./ProductInstance.vue";

export default {
  components: {
    ProductInstance,
  },
  data() {
    return {
      products: [],
      productToAdd: "",
    };
  },
  computed: {
    isValidId() {
      return (
        this.productToAdd.length > 0 &&
        !this.products.includes(this.productToAdd)
      );
    },
  },
  methods: {
    addProduct() {
      this.products.push(this.productToAdd);
      this.productToAdd = "";
    },
    deleteProduct(index) {
      this.products.splice(index, 1);
    },
  },
};
</script>
