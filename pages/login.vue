<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'

const router = useRouter()
const formRef = ref<FormInstance>()
const _form = ref({
    email: '',
    password:''
})
const checked1 = ref(false)

const rules = reactive<FormRules<any>>({
  email: [{required: true, message: 'Введите электронная почта', trigger: 'blur' }],
  password: [{required: true, message: 'Введите пароль', trigger: 'blur' }],
})

const submitForm = () => {
  if (!formRef.value) return
  formRef.value.validate((valid) => {
    if (valid) {
      console.log('submit!')
      router.push('/dashbords')
    } else {
      console.log('error submit!')
      return false
    }
  })
}
</script>
<template>
  <NuxtLayout name="auth" class="email">
    <div class="flex gap-1 items-center">
      <div class="w-[606px] h-[606px] px-[76px] py-10 bg-white rounded-3xl">
        <img class="mb-4 mx-auto" src="@/assets/img/logo-green.svg" alt="">
        <h3 class="text-indigo-light text-center uppercase font-montserrat-700 text-xl">Система управления <br/>
          банковских карт и терминалов</h3>
          <div class="flex justify-between items-center my-6">
            <div class="h-[2px] grow bg-indigo-500"></div>
            <p class="text text-center font-montserrat-500 text-[15px] px-6 text-indigo-500">
              Вход в панель <br> администратора
            </p>
            <div class="h-[2px] grow  bg-indigo-500"></div>
          </div>
          <el-form @submit.prevent="submitForm" :model="_form" :rules="rules" ref="formRef">
             <el-form-item class="relative" prop="email">
              <img class="absolute top-5 left-3 z-50" src="@/assets/img/email.svg" alt="">
                <el-input
                  v-model="_form.email"
                  type="email"
                  placeholder="Email"
               />
             </el-form-item>
               <el-form-item class="relative" prop="password">
                <img class="absolute top-5 left-3 z-50" src="@/assets/img/parol.svg" alt="">
                <el-input
                  v-model="_form.password"
                  type="password"
                  placeholder="Password"
                  show-password
               />
             </el-form-item>
             <div class="flex justify-between items-center -mt-2">
              <el-checkbox v-model="checked1" label="Запомнить  логин" size="large" />
              <a href="#" class="text-indigo-light">Забыли пароль?</a>
             </div>
             <el-button @click="submitForm" native-type="submit" class="w-full !py-8 mt-4 text-xl font-inter-600" type="primary">Войти</el-button>
          </el-form>
      </div>
      <div>
        <img class="bg-blue-100" src="@/assets/img/login-img.png" alt="">
      </div>
    </div>
    </NuxtLayout>
</template>
<style lang="scss">
.email {
 .el-input{
    height: 64px;
 .el-input__icon {
  font-size: 24px;
  color: #D3D4EC;
 }
}
.el-input__inner::placeholder {
   color: #D3D4EC;
}
.el-input__wrapper {
  border-radius: 10px !important;
  padding: 1px 45px;
  padding-right: 18px;
}
.el-checkbox__inner{
  width: 20px !important;
  height: 20px !important;
  &::after{
    height: 10px !important;
    left: 6px;
    top: 2px;
    width: 4px;
    border-right: 2px solid;
    border-bottom: 2px solid;
  }
}
 .el-checkbox__label {
  font-size: 16px !important;
  font-weight: 400 !important;
  font-family: 'Montserrat';
 }
}
</style>
