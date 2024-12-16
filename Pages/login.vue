<template>
  <div class="h-[910px] bg-[url('/images/bg.png')]">
    <div class="flex justify-center">
      <div
        class="border-solid border-2 rounded-lg border-white mt-10 w-[700px] h-[800px]"
      >
        <div>
          <div class="flex justify-center">
            <img src="/images/grit.png" alt="" class="mt-20" />
          </div>
          <div class="mt-5 text-center font-semibold text-3xl">Login</div>
          <div class="ml-10 mt-10 mx-10">
            <div class="mx-10 mt-10">
              <p class="font-semibold">username :</p>
              <input
                type="text"
                id="username"
                v-model="logins.username"
                name="username"
                class="border-solid border-2 rounded-lg border-gray-200 h-[50px] w-full mt-4"
                required
                placeholder="Enter your username"
              />
            </div>
            <div class="mt-5 mx-10">
              <p class="font-semibold">password :</p>
              <input
                type="password"
                id="password"
                v-model="logins.password"
                name="password"
                class="border-solid border-2 rounded-lg border-ray-200 h-[50px] w-full mt-4"
                required
                placeholder="Enter your password"
              />
            </div>
            <div class="mt-3 text-end text-red-800 mr-10">
              <a href="#">forgot password</a>
            </div>

            <!-- login buttom -->
            <div class="flex justify-center mt-20">
              <button
                type="submit"
                @click="loginUser"
                class="border-solid border-2 rounded-lg border-white h-[60px] w-[300px] p-3 text-white bg-purple-500 text-xl font-bold"
              >
                Login
              </button>
            </div>
            <div class="text-center">
              <p class="mt-20">
                Don't have an account?
                <a href="#" class="text-red-800">Register</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <pre>{{ logins }}</pre>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import type { Login } from "~/Models/page.model";
import service from "~/service";
import { useIndexStore } from "~/store/main";

const store = useIndexStore();
const router = useRouter();

definePageMeta({
  layout: "auth",
});

const logins = ref<Login>({
  username: "",
  password: "",
});

const loginUser = async () => {
  await service.login.login(logins.value)
    .then((resp: any) => {
      console.log(resp.data);
      store.$state.token = resp.data.token;
      const reftoken = useStatefulCookie('token')
      reftoken.value = resp.data.token
      if (store.$state.token != null) {
        router.push("/");
      }
    })
    .catch((error: any) => {
      console.log(error.data);
    })
    .finally(() => {});
};

// onMounted(() => {
//   loginUser();
// });
// 
// 
// 
</script>

<style scoped></style>
