<template>
  <div>
    <div class="m-20" v-if="product.id != 0">
    <div class="text-gray-500">
      อุปกรณ์เสริม > <span class="text-black">โน๊ตบุ๊ค</span>
    </div>
    <div class="border-solid border-2 rounded-lg border-gray-400 mt-10">
      <div class="mx-10">
        <div class="flex gap-10">
          <div
            class="mt-10 border-solid border-2 rounded-lg border-gray-400 w-8/12 h-5/6 shadow-2xl"
          >
            <img :src="product.img" alt="img" />
          </div>
          <div class="flex flex-col justify-between w-full mt-10">
            <!-- 1 -->
            <div class="h-[200px]">
              <div class="mt-5 ml-5 font-bold text-2xl">
                {{ product.name }}
              </div>
              <div class="text-red-700 mt-3 ml-5 font-bold text-2xl">
                ฿ {{ product.price }}
                <span class="text-gray-500 text-sm ml-2"
                  >( จำนวนสินค้า {{ product.amount }} )</span
                >
              </div>
            </div>
            <!-- 2 -->
            <div class="flex justify-between flex-col h-full">
              <p class="font-bold text-center mb-10 mt-10">
                <i>รายละเอียดสินค้า</i>
              </p>
              <div
                class="border-solid border-2 rounded-lg border-gray-400 h-full mx-10"
              >
                <p class="ml-5 mt-5">
                  {{ product.detail }}
                </p>
              </div>
              <div class="flex justify-start gap-5 mb-5">
                <!-- Input -->
                <div>
                  <input
                    type="number"
                    class="w-40 h-10 border-2 border-gray-400 rounded-xl px-4 mt-7 ml-10"
                    placeholder="Quantity"
                  />
                </div>

                <!-- button -->
                <div
                  class="w-40 h-10 bg-blue-400 hover:bg-indigo-400 text-white font-bold px-4 rounded-xl mt-7 flex justify-center"
                >
                  <button type="button">Add to Cart</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-between mb-10">
          <!-- review -->
          <div class="mt-10 ml-7">
            <div class="font-semibold text-center mt-5">
              <i>รีวิวสินค้า</i>
            </div>
            <div class="text-center">..............</div>
            <div class="flex justify-between mx-20 mt-10 gap-5">
              <div
                class="border-solid border-2 rounded-lg border-white bg-gray-300 shadow-xl h-48 w-48"
              >
                <div class="mt-3 ml-3">Name : AEM</div>
              </div>
              <div
                class="border-solid border-2 rounded-lg border-white bg-gray-300 shadow-lg h-48 w-48"
              ></div>
            </div>
            <div class="flex justify-between mx-20 mt-10">
              <div
                class="border-solid border-2 rounded-lg border-white bg-gray-300 shadow-lg h-48 w-48"
              ></div>
              <div
                class="border-solid border-2 rounded-lg border-white bg-gray-300 shadow-lg h-48 w-48"
              ></div>
            </div>
          </div>

          <!-- same pro -->
          <div class="mt-10">
            <div class="font-semibold text-center mt-5">
              <i>สินค้าที่คล้ายกัน</i>
            </div>
            <div class="flex justify-between mx-10 mt-10 gap-5">
              <div
                class="border-solid border-2 rounded-lg border-white bg-gray-300 shadow-xl h-48 w-96"
              ></div>
              <div
                class="border-solid border-2 rounded-lg border-white bg-gray-300 shadow-xl h-48 w-96"
              ></div>
            </div>
            <div class="flex justify-between mx-10 mt-10 gap-5">
              <div
                class="border-solid border-2 rounded-lg border-white bg-gray-300 shadow-xl h-48 w-96"
              ></div>
              <div
                class="border-solid border-2 rounded-lg border-white bg-gray-300 shadow-xl h-48 w-96"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <span>Loanding...</span>
  </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from "~/Models/product.model";
import axios from "axios";
import { errorMessages } from "vue/compiler-sfc";

const route = useRoute();
const loading = ref<boolean>(false);

const product = ref<Product>({
  id: 0,
  name: "TUF Gaming Nvidia GeForce GTX 1060 6GB",
  detail: "TUF Gamming",
  price: 10000,
  amount: 1,
  img: "https://dlcdnwebimgs.asus.com/gain/49bac8ff-76c9-45b5-846c-057f79c30c8b/",
});

const getProductById = async () => {
  // connect API
  //   try {
  //     const response = await fetch(
  //       `https://api.example.com/products/${route.params.id}`
  //     );
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  //     const data = await response.json();
  //     product.value = data;
  //   } catch (error) {
  //     console.error("Error fetching product:", error);
  //   }

  await axios
    .get(`https://fakestoreapi.com/products/${route.params.id}`)
    .then((resp: any) => {
      loading.value = true;
      const data = resp.data;
      const products: Product = {
        id: data.id,
        name: data.title,
        price: data.price,
        amount: data.rating.count,
        detail: data.description,
        img: data.image,
      };
      product.value = products;
    })
    .catch((error: any) => {
      console.log(errorMessages);
    })
    .finally(() => {
      loading.value = false;
    });
};

onMounted(() => {
  getProductById();
});
</script>

<style scoped></style>
