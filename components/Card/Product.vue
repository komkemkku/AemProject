<template>
  <div class="rounded-xl border-solid border-2 border-teal-950 w-96">
    <div class="flex justify-end">
      <div class="flex justify-end">
        <NuxtLink :to="`/product/edit/${product.id}`">
          <img
            src="/public/images/edit.png"
            alt="edit"
            class="w-8 object-cover cursor-pointer"
          />
        </NuxtLink>
      </div>
      <div class="flex justify-end">
        <img src="/public/images/dele.png" alt="delete" class="w-8 object-cover
        cursor-pointer" @click="emit('product-delete', product.id)"/>
      </div>
    </div>
    <div class="flex justify-center mt-5">
      <img
        :src="product.img"
        :alt="product.name"
        class="h-52 w-52 object-cover rounded-xl"
      />
    </div>
    <div class="ml-5 mt-5 mb-5 text-lg">
      <div class="font-bold text-xl mb-3">{{ product.name }}</div>
      <div>
        รายละเอียดสินค้า : <i>{{ product.detail }}</i>
      </div>
      <div>
        ราคาสินค้า : <i>{{ product.price }}</i>
      </div>
      <div>
        <span v-if="product.amount > 0 && product.amount <= 9">
          <i>( จำนวนสินค้า : {{ product.amount }} ชิ้น )</i>
        </span>
        <span v-else-if="product.amount >= 10"
          ><i>( มีสินค้ามากเกินไป )</i></span
        >
        <span v-else><i>( สินค้าหมด )</i></span>
        <!-- <span v-show="product.amount >= 10">มีสินค้า</span> -->
      </div>
    </div>
    <div class="flex justify-center mt-5 mb-5 gap-5">
      <button
        type="button"
        class="bg-blue-400 hover:bg-indigo-400 text-white font-bold py-2 px-4 rounded-xl"
      >
        เพิ่มในตะกร้า
      </button>
      <NuxtLink :to="`/product/${product.id}`">
        <button
          type="button"
          class="bg-blue-400 hover:bg-indigo-400 text-white font-bold py-2 px-4 rounded-xl"
        >
          รายละเอียดสินค้า
        </button>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from "~/Models/product.model";

const emit = defineEmits(["product-delete"]);
const props = defineProps({
  product: {
    type: Object as PropType<Product>,
    required: true,
  },
});
</script>

<style scoped></style>
