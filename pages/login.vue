<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { login_API, _loginStore } from "@/services/login"
const router = useRouter()
const formRef = ref<FormInstance>()
const _form = ref({
   username: '',
   password: ''
})

const rules = reactive<FormRules<any>>({
   username: [{ required: true, message: "Maydonni to'ldiring", trigger: 'blur' }],
   password: [{ required: true, message: "Maydonni to'ldiring", trigger: 'blur' }],
})

const submitForm = () => {
   if (!formRef.value) return
   formRef.value.validate(async(valid) => {
      if (valid) {
         const [res, err] = await login_API(_form.value)
         if (err) return
         ElMessage.success("Ro'yxatdan o'tdingiz!!!")
         _loginStore.value = res
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
            <img class="mb-4 mx-auto" src="@/assets/img/logoo.svg" alt="">

            <div class="flex justify-between items-center my-6">
               <div class="h-[2px] grow bg-indigo-500"></div>
               <p class="text text-center font-montserrat-500 text-2xl px-6">
                  Kirish
               </p>
               <div class="h-[2px] grow  bg-indigo-500"></div>
            </div>
            <el-form label-position="top" @submit.prevent="submitForm" :model="_form" :rules="rules" ref="formRef">
               <el-form-item prop="username" label="Telefon nomer">
                  <el-input v-model="_form.username" type="text" placeholder="998 XX XXX XX XX" />
               </el-form-item>
               <el-form-item prop="password" label="password">
                  <el-input show-password v-model="_form.password" type="password" placeholder="Password" />
               </el-form-item>
               <div class="flex justify-between items-center -mt-2">
                  <a href="#" class="text-indigo-light block text-right w-full text-xs underline">Parolni unutdingizmi? </a>
               </div>
               <el-button native-type="submit" class="w-full !py-4 mt-4 font-inter-600"
                  type="primary">Kirish</el-button>
            </el-form>
         </div>
      </div>
   </NuxtLayout>
</template>
<style lang="scss">
.el-form-item{
   margin-bottom: 10px!important;
}
.email {
   .el-input {
      height: 36px;

      .el-input__icon {
         font-size: 18px;
         color: #c1c1ca;
      }
   }

   .el-input__inner::placeholder {
      color: #D3D4EC;
   }

   // .el-input__wrapper {
   //   border-radius: 10px !important;
   //   padding: 1px 45px;
   //   padding-right: 18px;
   // }
   // .el-checkbox__inner{
   //   width: 20px !important;
   //   height: 20px !important;
   //   &::after{
   //     height: 10px !important;
   //     left: 6px;
   //     top: 2px;
   //     width: 4px;
   //     border-right: 2px solid;
   //     border-bottom: 2px solid;
   //   }
   // }
   //  .el-checkbox__label {
   //   font-size: 16px !important;
   //   font-weight: 400 !important;
   //   font-family: 'Montserrat';
   //  }
}
</style>
