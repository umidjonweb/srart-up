    
<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'
const _search = ref<string>('')

</script>
<template>
   <NuxtLayout>
      <div class="flex justify-between gap-2">
         <el-input class="!w-[90%]" v-model="_search" placeholder="Restorantni qidiring..." :prefix-icon="Search" />
         <img src="@/assets/img/message.svg" />
      </div>
      <div class="grid grid-cols-4 my-4">
         <div class="flex flex-col justify-center items-center">
            <div class="flex justify-center items-center w-[60px] h-[60px] rounded-full bg-white">
               <img src="@/assets/img/family.svg" alt="">
            </div>
            <p class="text-sm">Oila</p>
         </div>
         <div class="flex flex-col justify-center items-center">
            <div class="flex justify-center items-center w-[60px] h-[60px] rounded-full bg-white">
               <img src="@/assets/img/friend.svg" alt="">
            </div>
            <p class="text-sm">Do'stlar</p>
         </div>
         <div class="flex flex-col justify-center items-center">
            <div class="flex justify-center items-center w-[60px] h-[60px] rounded-full bg-white">
               <img src="@/assets/img/friend.svg" alt="">
            </div>
            <p class="text-sm">Hamkasblar</p>
         </div>
         <div class="flex flex-col justify-center items-center">
            <div class="flex justify-center items-center w-[60px] h-[60px] rounded-full bg-white">
               <img src="@/assets/img/family.svg" alt="">
            </div>
            <p class="text-sm">Boshqalar</p>
         </div>

      </div>
   </NuxtLayout>
</template>

<style></style>