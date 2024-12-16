<template>
  <div>
    <div class="mt-10 text-center font-bold text-3xl">Create new Product</div>
    <div class="flex justify-center">
      <div
        class="border-solid border-2 rounded-lg border-gray-700 mt-10 w-[700px] h-[600px]"
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
          <div class="flex justify-center">
            <button
              type="submit"
              @click="addProduct"
              class="bg-gray-500 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg mt-10"
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
    <div>
      <h2>result</h2>
      <div>
        <p>ID: {{ ProductResp.id }}</p>
        <p>Title: {{ ProductResp.title }}</p>
        <p>Price: {{ ProductResp.price }}</p>
        <p>Description: {{ ProductResp.description }}</p>
        <p>Image: {{ ProductResp.image }}</p>
        <p>Category: {{ ProductResp.category }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import Swal from "sweetalert2";
import type { ProductCreate } from "~/Models/product.model";
import type { ProductResp } from "~/Models/product.model";
import service from "~/service";

definePageMeta({
    middleware: 'auth'
});

const product = ref<ProductCreate>({
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

const addProduct = async () => {
  // post - method
  await service.product
    .postCreateProduct(product.value)
    .then((resp: any) => {
      console.log(resp.data);
      const data = resp.data;
      if (data) {
        Swal.fire({
          title: "Product added successfully!",
          icon: "success",
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
      console.log(error.data);
    })
    .finally(() => {});
};
</script>

<style scoped></style>

// { // title: product.value.title, // price: product.value.price, //
description: product.value.description, // image: product.value.image, //
category: product.value.category // }
