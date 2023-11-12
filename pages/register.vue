<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'

const router = useRouter()
const formRef = ref<FormInstance>()
const _form = ref({
    last_name: '',
    first_name: '',
    phone: '',
    password:''
})
const checked1 = ref(false)

const rules = reactive<FormRules<any>>({
  email: [{required: true, message: "Maydonni to'ldiring", trigger: 'blur' }],
  password: [{required: true, message: "Maydonni to'ldiring", trigger: 'blur' }],
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
    <div class="w-full max-w-[370px]">
      <div class="p-8 rounded-3xl">
        <img class="mb-4 mx-auto" src="@/assets/img/logo-green.svg" alt="">
    
          <div class="flex justify-between items-center my-6">
            <div class="h-[2px] grow bg-indigo-500"></div>
            <p class="text text-center font-montserrat-500 text-[15px] px-6 text-indigo-500">
              Ro'yxatdan o'tish
            </p>
            <div class="h-[2px] grow  bg-indigo-500"></div>
          </div>
          <el-form label-position="top" @submit.prevent="submitForm" :model="_form" :rules="rules" ref="formRef">
             <el-form-item class="my-4" label="Ism">
                <el-input
                  v-model="_form.first_name"
                  type="text"
                  placeholder="Ism"
               />
             </el-form-item>
           
              <el-form-item class="mt-4" label="Familiya">
                <el-input
                  v-model="_form.last_name"
                  type="text"
                  placeholder="Familiya"
               />
             </el-form-item>
            <el-form-item class="mt-4" label="Telefon nomer">
                <el-input
                  v-model="_form.phone"
                  type="text"
                  placeholder="Telefon nomer"
               />
             </el-form-item>
             <el-form-item class="mt-4" label="password">
                <el-input
                  show-password
                  v-model="_form.password"
                  type="password"
                  placeholder="Password"
               />
             </el-form-item>
             <div class="flex justify-between items-center -mt-2">
              <p>Ro'yxatdan o'tganmisiz?</p>
              <a href="#" class="text-indigo-light">Kirish</a>
             </div>
             <el-button @click="submitForm" native-type="submit" class="w-full !py-4 mt-4  font-inter-600" type="primary">Kirish</el-button>
          </el-form>
      </div>
    </div>
    </NuxtLayout>
</template>
<style lang="scss" scoped>
.email {
 .el-input{
    height: 36px;
 .el-input__icon {
  font-size: 18px;
  color: #c1c1ca;
 }
}
.el-input__inner::placeholder {
   color: #D3D4EC;
}
}
</style>
