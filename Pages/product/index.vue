<template>
  <div>
    <div class="text-gray-500 mt-10 ml-20">
      หน้าหลัก > <span class="text-black">สินค้าทั้งหมด</span>
    </div>
    <div class="text-[30px] mt-6 ml-20">
      สินค้าทั้งหมด
      <span class="text-sm text-gray-500">(จำนวนสินค้าทั้งหมด)</span>
    </div>
    <hr class="mt-8 ml-20 w-11/12" />

    <!-- Products -->
    <div
      class="grid grid-cols-4 gap-4 mx-10 mt-10 ml-20 mb-20 w-11/12 h-96"
      v-if="Products.length > 0"
    >
      <div v-for="(item, index) in Products" :key="index">
        <!-- <NuxtLink :to="`/product/${item.id}`"> -->
        <CardProduct :product="item" @product-delete="deleteProduct" />
        <!-- </NuxtLink> -->
      </div>
    </div>
    <div class="text-center" v-else>ไม่มีรายการสินค้า</div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from "~/Models/product.model";
// import service from "~/plugins/axios";
import axios from "axios";
import { errorMessages } from "vue/compiler-sfc";
import service from "~/service";

definePageMeta({
    middleware: 'auth'
});

const loading = ref<boolean>(false);
const Products = ref<Product[]>([
  {
    id: 1,
    name: "ASUS tuf FX505",
    detail: "tuf Gamming FX505",
    price: 10000,
    amount: 0,
    img: "https://dlcdnwebimgs.asus.com/gain/49bac8ff-76c9-45b5-846c-057f79c30c8b/",
  },
  {
    id: 2,
    name: "ASUS tuf F16",
    detail: "tuf Gamming F16",
    price: 15000,
    amount: 3,
    img: "https://dlcdnwebimgs.asus.com/gain/f69cfad3-af20-403e-ad93-1ffb91604d82/",
  },
  {
    id: 3,
    name: "ASUS tuf A15",
    detail: "tuf Gamming A15",
    price: 20000,
    amount: 10,
    img: "https://dlcdnwebimgs.asus.com/gain/49bac8ff-76c9-45b5-846c-057f79c30c8b/",
  },
  {
    id: 4,
    name: "ASUS tuf A16",
    detail: "tuf Gamming A16",
    price: 25000,
    amount: 15,
    img: "https://dlcdnwebimgs.asus.com/gain/f69cfad3-af20-403e-ad93-1ffb91604d82/",
  },
  {
    id: 5,
    name: "ASUS tuf A17",
    detail: "tuf Gamming A17",
    price: 15000,
    amount: 25,
    img: "https://i5.walmartimages.com/seo/ASUS-TUF-Gaming-A17-17-3-FHD-Gaming-Laptop-AMD-Ryzen-7-4800H-16GB-RAM-NVIDIA-GeForce-RTX-3050-512GB-SSD-Windows-10-Eclipse-Gray-FA706IC-PB74_15ebcef9-13e2-4eae-aad5-67d805f05d19.f4aff1817b10e652bbf77be0f02bc67c.jpeg",
  },
  {
    id: 6,
    name: "ASUS tuf A15 (2024)",
    detail: "tuf Gamming A15 (2024)",
    price: 25000,
    amount: 30,
    img: "https://dlcdnwebimgs.asus.com/gain/3e19323f-de18-4bd0-95cf-471cc3940594/w800",
  },
]);

const getProductList = async () => {
  //example 1 No error
  // const ref = await axios.get("https://fakestoreapi.com/products");
  // const data = ref.data
  // const productList: Product[] = [];

  // for (let i = 0; i < ref.data.length; i++) {
  //   const e = ref.data[i];
  //   const product: Product = {
  //     id: e.id,
  //     name: e.title,
  //     price: e.price,
  //     amount: e.rating.count,
  //     detail: e.description,
  //     img: e.image,
  //   }
  //   productList.push(product)
  // }
  // Products.value = productList;

  //example 2 use error
  await service.product
    .getProductList()
    .then((resp: any) => {
      loading.value = true;
      const { data } = resp.data;
      const productList: Product[] = [];
      for (let i = 0; i < resp.data.length; i++) {
        const e = resp.data[i];
        const product: Product = {
          id: e.id,
          name: e.title,
          price: e.price,
          amount: e.rating.count,
          detail: e.description,
          img: e.image,
        };
        productList.push(product);
      }
      Products.value = productList;
    })
    .catch((error: any) => {
      console.log(errorMessages);
    })
    .finally(() => {
      loading.value = false;
    });
};

const deleteProduct = async (id: number) => {
  await service.product
    .deleteProduct(id)
    .then((resp: any) => {
      const data = resp.data;
      console.log(data);
    })
    .catch((error: any) => {
      console.log(errorMessages);
    })
    .finally(() => {});
};

onMounted(async () => {
  await getProductList();
});
</script>

<style lang="scss" scoped></style>
