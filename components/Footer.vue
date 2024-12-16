<template>
  <div class="p-6 flex gap-9 text-black border-t-2 border-gray-400">
    <!-- logo n ad -->
    <div class="ml-7">
      <img src="/public/images/logo.png" class="w-[200px] flex" />

      <p class="mt-5 ml-7">
        88/8 หมู่ 12 ตำบลศิลา อำเภอเมือง จังหวัดขอนแก่น 40000
      </p>
    </div>

    <!-- menu -->
    <div class="grid grid-cols-3 w-full text-lg ml-10 px-32">
      <div>
        <div class="font-semibold mb-3">หมวดหมู่</div>
        <div v-for="(data, i) in page.slice(0, 3)" :key="i" class="hover:text-indigo-500">
          <NuxtLink :to="data.path">
            {{ data.name }}
          </NuxtLink>
        </div>
      </div>

      <div>
        <div class="font-semibold mb-3">ช่วยเหลือ</div>
        <div v-for="(data, i) in page.slice(3, 6)" :key="i" class="hover:text-indigo-500">
          <NuxtLink :to="data.path">
            {{ data.name }}
          </NuxtLink>
        </div>
      </div>

      <div>
        <div class="font-semibold mb-3">ช่องทางการติดต่อ</div>
        <div v-for="(data, i) in page.slice(6, 9)" :key="i">
          <NuxtLink :to="data.path">
            {{ data.name }}
          </NuxtLink>
        </div>
        <div>อีเมล : GritElectronic@gmail.com</div>
        <div>โทรศัพท์ : 061 - 532 - 9130</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Pages } from "~/Models/page.model";

const page = ref<Pages[]>([
  {
    name: "โน๊ตบุ๊ค",
    path: "/laptop",
    active: false,
  },
  {
    name: "คอมพิวเตอร์",
    path: "/computer",
    active: false,
  },
  {
    name: "อุปกรณ์เสริม",
    path: "/accessory",
    active: false,
  },
  {
    name: "ชำระเงิน",
    path: "/payment",
    active: false,
  },
  {
    name: "คืนสินค้า",
    path: "/return",
    active: false,
  },
  {
    name: "ติดต่อสอบถาม",
    path: "/contact",
    active: false,
  },
]);
</script>

<style scoped>
</style>