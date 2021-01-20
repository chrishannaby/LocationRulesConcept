<template>
  <div class="flex-grow flex flex-col md:flex-row bg-gray-200">
    <div class="py-6 sm:px-6 md:flex-grow">
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
      <ul class="py-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <product-instance
          class="ring-4 ring-opacity-70 ring-transparent"
          @click.native="selectedProduct = product"
          :class="product === selectedProduct ? 'ring-blue-600' : 'product'"
          v-for="(product, idx) in products"
          :key="product"
          :product="product"
          @delete-instance="deleteProduct(idx)"
        />
      </ul>
    </div>
    <div class="min-h-1/2 w-full md:w-1/2 order-first md:order-none">
      <ubi-map
        :selectedProduct="selectedProduct"
        :tagLocations="tagLocations"
        @tag-event="handleTagEvent"
      />
    </div>
  </div>
</template>

<script>
import ProductInstance from "./ProductInstance.vue";
import UbiMap from "./UbiMap.vue";

export default {
  components: {
    ProductInstance,
    UbiMap,
  },
  provide() {
    return {
      tryMakeAssociation: this.tryMakeAssociation,
      tryDisassociate: this.tryDisassociate,
    };
  },
  data() {
    return {
      tags: new Set(),
      associations: {},
      tagLocations: {},
      selectedProduct: "",
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
    handleTagEvent(event) {
      this.$set(this.tagLocations, event.id, {
        x: event.x,
        y: event.y,
      });
    },
    addProduct() {
      this.products.push(this.productToAdd);
      this.productToAdd = "";
    },
    deleteProduct(index) {
      this.products.splice(index, 1);
    },
    tryMakeAssociation(tagId, objectId) {
      return new Promise((resolve, reject) => {
        console.log({ tagId, objectId });
        if (
          Object.prototype.hasOwnProperty.call(this.associations, tagId) ||
          (this.associations.values &&
            this.associations.values.includes(objectId))
        ) {
          reject();
        } else {
          this.$set(this.associations, tagId, objectId);
          resolve();
        }
      }).then();
    },
    tryDisassociate(objectId) {
      console.log({ objectId });
      const tagId = Object.keys(this.associations).find(
        (key) => this.associations[key] === objectId
      );
      if (tagId) {
        this.$delete(this.associations, tagId);
      }
    },
  },
};
</script>

<style scoped>
.product:hover {
  --tw-ring-color: rgba(79, 70, 229, var(--tw-ring-opacity));
}
</style>
