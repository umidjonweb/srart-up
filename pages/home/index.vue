    
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
         <router-link to="/home/family" class="flex flex-col justify-center items-center">
            <div class="flex justify-center items-center w-[60px] h-[60px] rounded-full bg-white">
               <img src="@/assets/img/family.svg" alt="">
            </div>
            <p class="font-inter-500 text-sm">Oila</p>
         </router-link>
         <router-link to="/home/friends" class="flex flex-col justify-center items-center">
            <div class="flex justify-center items-center w-[60px] h-[60px] rounded-full bg-white">
               <img src="@/assets/img/friend.svg" alt="">
            </div>
            <p class="font-inter-500 text-sm">Do'stlar</p>
         </router-link>
         <router-link to="/home/jobs" class="flex flex-col justify-center items-center">
            <div class="flex justify-center items-center w-[60px] h-[60px] rounded-full bg-white">
               <img src="@/assets/img/friend.svg" alt="">
            </div>
            <p class="font-inter-500 text-sm">Hamkasblar</p>
         </router-link>
         <router-link to="/home/other" class="flex flex-col justify-center items-center">
            <div class="flex justify-center items-center w-[60px] h-[60px] rounded-full bg-white">
               <img src="@/assets/img/family.svg" alt="">
            </div>
            <p class="font-inter-500 text-sm">Boshqalar</p>
         </router-link>
      </div>
      <div>
         <slot />
      </div>
   </NuxtLayout>
</template>

<style lang="scss" scoped>
.router-link-active {
   div {
      border: 1px solid #00A2B7;
   }
   p{
      color: #00A2B7;
   }
}
</style>