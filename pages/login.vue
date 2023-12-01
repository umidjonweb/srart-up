<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { login_API, _loginStore } from "@/services/login"
const router = useRouter()
const formRef = ref<FormInstance>()
const _form = ref({
   username: '+998',
   password: ''
})

const rules = reactive<FormRules<any>>({
   username: [{ required: true, message: "Maydonni to'ldiring", trigger: 'blur' }],
   password: [{ required: true, message: "Maydonni to'ldiring", trigger: 'blur' }],
})
function parseJwt(token: string) {
   var base64Url = token.split('.')[1];
   var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
   var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
   }).join(''));

   return { token: token, ...JSON.parse(jsonPayload) };
}

const submitForm = () => {
   if (!formRef.value) return
   formRef.value.validate(async (valid) => {
      if (valid) {
         const [res, err] = await login_API({ ..._form.value, username: _form.value.username?.replaceAll(" ", "") })
         if (err) {
            if (err?.response?.data?.code == 12) {
               ElMessage.error('Telefon yoki parol xato')
            }
            return
         }
         ElMessage.success("Muvofaqiyatli kirdingiz!!!")
         let decode = await parseJwt(res.token)
         _loginStore.value = { ...res, role: decode.roles }
         router.push('/home/family')
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
            <img class="mb-4 w-28 mx-auto" src="@/assets/img/logoo.svg" alt="">

            <div class="flex justify-between items-center my-6">
               <div class="h-[2px] grow bg-indigo-500"></div>
               <p class="text text-center font-inter-500 text-2xl px-6">
                  Kirish
               </p>
               <div class="h-[2px] grow  bg-indigo-500"></div>
            </div>
            <el-form label-position="top" @submit.prevent="submitForm" :model="_form" :rules="rules" ref="formRef">
               <!-- <input v-model="_form.username" v-maska data-maska="+1 ### ###-##-##"> -->
               <el-form-item prop="username" label="Telefon nomer">
                  <el-input v-maska data-maska="+998 ## ### ## ##" v-model="_form.username" type="text"
                     placeholder="998 ## ### ## ##" />
               </el-form-item>
               <el-form-item prop="password" label="Parol">
                  <el-input show-password v-model="_form.password" type="password" placeholder="Parol" />
               </el-form-item>
               <div class="flex justify-between items-center">
                  <router-link class="text-indigo-light w-full text-xs" to="/register">Ro'yxatdan o'tish</router-link>
                  <router-link to="/register" href="#"
                     class="text-indigo-light block text-right w-full text-xs underline">Parolni unutdingizmi?
                  </router-link>
               </div>
               <el-button native-type="submit" class="w-full !py-4 mt-4 font-inter-600" type="primary">Kirish</el-button>
            </el-form>
         </div>
      </div>
   </NuxtLayout>
</template>
<style lang="scss">
.el-form-item {
   margin-bottom: 10px !important;
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
