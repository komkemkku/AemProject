<template>
  <div>
    <Loading :loading="loading" />
    <div class="mt-10 text-center font-bold text-3xl">Edit Product</div>
    <div class="flex justify-center">
      <div
        class="border-solid border-2 rounded-lg border-gray-700 mt-10 w-[700px] h-[900px]"
      >
        <div class="mt-5 ml-10">
          <form action="" method="post">
            <div class="mt-10">
              <label for="title" class="font-semibold">title: </label>
              <input
                class="border-solid border-2 rounded-lg border-gray-600 bg-gray-300 h-[40px] w-5/6 ml-4"
                type="text"
                id="title"
                v-model="product.title"
                required
              />
            </div>
            <div class="mt-5">
              <label for="price" class="font-semibold">Price: </label>
              <input
                class="border-solid border-2 rounded-lg border-gray-600 bg-gray-300 h-[40px] w-[150px] ml-3"
                type="number"
                id="price"
                v-model="product.price"
                required
              />
            </div>
            <div class="mt-5">
              <label for="Detail" class="font-semibold">description: </label>
              <textarea
                class="border-solid border-2 rounded-lg border-gray-600 bg-gray-300 h-40 w-5/6 ml-16"
                type="text area"
                id="description"
                v-model="product.description"
                required
              ></textarea>
            </div>
            <div class="mt-5">
              <label for="image" class="font-semibold">Image: </label>
              <input
                class="border-solid border-2 rounded-lg border-gray-600 bg-gray-300 h-[40px] w-5/6 ml-4"
                type="url"
                id="image"
                v-model="product.image"
                required
              />
            </div>
            <div class="mt-5">
              <label for="category" class="font-semibold">Category: </label>
              <select
                class="border-solid border-2 rounded-lg border-gray-600 bg-gray-300 h-[40px] w-5/6"
                id="category"
                v-model="product.category"
                required
              >
                <option value="">Select Category</option>
                <option value="Computer">Computer</option>
                <option value="Notebok">Notebok</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>
          </form>
          <div class="mt-10">
            <h2 class="font-bold text-center mb-5 bg-slate-400 mr-10">
              result
            </h2>
            <div>
              <p>ID: {{ ProductResp.id }}</p>
              <p>Title: {{ ProductResp.title }}</p>
              <p>Price: {{ ProductResp.price }}</p>
              <p class="mr-10">Description: {{ ProductResp.description }}</p>
              <p>Image: {{ ProductResp.image }}</p>
              <p>Category: {{ ProductResp.category }}</p>
            </div>
          </div>
          <div class="flex justify-center">
            <button
              type="submit"
              @click="UpdateProduct"
              class="bg-gray-500 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg mt-10"
            >
              Edit Product
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductCreate } from "~/Models/product.model";
import type { ProductResp } from "~/Models/product.model";
import type { ProductUpdate } from "~/Models/product.model";
import type { Product } from "~/Models/product.model";
import axios from "axios";
import { errorMessages } from "vue/compiler-sfc";
import Swal from "sweetalert2";
import service from "~/service";

definePageMeta({
    middleware: 'auth'
});

const route = useRoute();
const loading = ref<boolean>(false);

const product = ref<ProductUpdate>({
  id: 0,
  title: "",
  price: 0,
  description: "",
  image: "",
  category: "",
});

const ProductResp = ref<ProductResp>({
  id: 0,
  title: "",
  price: 0,
  description: "",
  image: "",
  category: "",
});

const getProductById = async () => {
  loading.value = true;
  await service.product
    .getProductById(route.params.id)
    .then((resp: any) => {
      loading.value = true;
      const data = resp.data;
      const products: ProductUpdate = {
        id: data.id,
        title: data.title,
        price: data.price,
        description: data.description,
        image: data.image,
        category: data.category,
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

const UpdateProduct = async () => {
  loading.value = true;
  await service.product
    .putUpdateProduct(route.params.id, product.value)
    // .put(`https://fakestoreapi.com/products/${product.value.id}`, {
    //   title: product.value.title,
    //   price: product.value.price,
    //   description: product.value.description,
    //   image: product.value.image,
    //   category: product.value.category,
    // })
    .then((resp: any) => {
      const data = resp.data;
      if (data) {
        Swal.fire({
          title: "Product updated successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
      }

      const product: ProductResp = {
        id: data.id,
        title: data.title,
        price: data.price,
        description: data.description,
        image: data.image,
        category: data.category,
      };
      ProductResp.value = product;
    })
    .catch((error: any) => {
      console.log(errorMessages);
    })
    .finally(() => {});
  loading.value = false;
};

onMounted(() => {
  getProductById();
});
</script>

<style scoped></style>
