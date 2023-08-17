<script setup>
import { ref } from "vue";
const value1 = ref("");
const _form = ref({
    login: '',
    password:''
})
</script>
<template>
  <div class="login flex justify-center items-center h-screen">
        <div class="w-[780px] overflow-hidden flex h-3/4 border border-gray rounded-xl">
            <div class="bg-green w-1/2 flex justify-center align-center">
                <img class="w-3/4"  src="@/assets/img/logo.svg" alt="">
            </div>
            <div class="w-1/2 px-7 py-16">
               <div class="flex items-center gap-2">
                  <img src="@/assets/img/login.svg" alt="">
                  <p class="font-inter-600 text-center font-weight-medium">Система управления доставкой
                   банковских карт и корреспонденцы</p>
               </div>
               <h3 class="text-center font-inter-600 text-xl mt-16 mb-10">Вход в панель администратора</h3>
             <!-- <div class="input">
                 <label for="login">Логин</label>
                 <input class="w-100  border-green" />
             </div> -->
              <el-form :model="_form" label-position="top" >
                <el-form-item label="Логин">
                  <el-input class="border rounded-lg overflow-hidden text-green-800" v-model="_form.login" placeholder="Введите логин"/>
                </el-form-item>
                  <el-form-item class="!text-danger" label="Пароль">
                  <el-input class="border rounded-lg overflow-hidden text-green-800" v-model="_form.password" placeholder="Введите логин"/>
                </el-form-item>
                <el-form-item>
                   <el-button loading class="!h-12 !rounded-lg !w-full !bg-green-800 !text-white mt-3"  @click="onSubmit">Войти</el-button>
                 </el-form-item>
                 <p class="font-inter-400 text-gray text-center">Забыли пароль? <a class="text-green-800 font-inter-400" href="!#"> Восстановить</a></p>
              </el-form>
            </div>
        </div>
    </div>
</template>
<style lang="scss">

.login {
   .el-form-item__label{
     color: #358589 !important;
   }
   .el-input__wrapper {
    box-shadow: none;
   }
}
</style>
