<script setup>
import { ref } from "vue"
const value1 = ref("");
</script>
<template>
  <div>
    <el-date-picker
      v-model="value1"
      type="date"
      placeholder="Pick a day"
      size="large"
    />
    <ElButton type="primary">awdasdasdasdasd</ElButton>
  </div>
  <p class="text-2xl text-red-200">dasdasdasd</p>
  <!-- <div class="d-flex justify-center align-center h-screen">
        <div class="card  d-flex  h-75 border border-gray  rounded-xl">
            <div class="bg-green w-50 h-100 d-flex justify-center align-center">
                <img class="flex justify-center align-center" src="@/assets/img/logo.svg" alt="">
            </div>
            <div class="w-50 px-7 py-16">
               <div class="d-flex gap-4">
                  <img src="@/assets/img/login.svg" alt="">
                  <p class="pl-2 font-inter text-center font-weight-medium">Система управления доставкой
                   банковских карт и корреспонденцы</p>
               </div>
               <h3 class="text-center font-wight-600 mt-10">Вход в панель администратора</h3>
             <div class="input">
                 <label for="login">Логин</label>
                 <input class="w-100  border-green" />
             </div>
            </div>
        </div>
    </div> -->
</template>
<style scoped lang="scss">
.card {
  width: 780px;
}
</style>
