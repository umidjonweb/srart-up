<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import { verifyCode_API } from '@/services/verify'
import { register_API, _registerStore } from "@/services/register"
import { _loginStore } from '@/services/login';
const router = useRouter()

const _formRef = ref<FormInstance>()
const _isSMS = ref(true)
const _time = ref(0)
const _item = ref({
   username: _registerStore.value.username?.replaceAll(" ", ""),
   code: ''
})
function timeSMS() {
   _time.value = 59
   const timeSms = setInterval(() => {
      _time.value--
      if (_time.value <= 0) {
         clearInterval(timeSms)
      }
   }, 1000)
}

function parseJwt(token: string) {
   var base64Url = token.split('.')[1];
   var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
   var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
   }).join(''));

   return { token: token, ...JSON.parse(jsonPayload) };
}

async function sendSMS() {
   _formRef.value?.validate(async (valid) => {
      if (valid) {
         const [res, error] = await verifyCode_API(_item.value)
         if (error) {
            ElMessage.error(error.message)
            return
         }
         let decode = await parseJwt(res.token)
         console.log('kkk', decode);

         _loginStore.value = { ...res, role: decode.roles }
         _isSMS.value = false
         ElMessage.success("Ro'yxatdan o'tdingiz!!!")
         router.push('/home')
      }
   })
}
timeSMS()

async function sendVerify() {

   const [res, error] = await register_API(_registerStore.value)
   if (error) {
      console.log('error: ' + error);
      ElMessage.error(error.message)
   }
   return
}

</script>
<template>
   <div class="verify h-screen flex justify-center flex-col">

      <h2 class="text-xl font-inter-700 text-center">Tasdiq kodini kiriting</h2>
      <p class="text-center text-[14px] text-[#93969F] mt-1">Kod {{ _registerStore?.username }} raqamiga yuborildi</p>
      <el-form ref="_formRef" :model="_item" class="flex flex-col justify-between" label-position="top">
         <div class="bg-success-200 rounded-xl p-8 flex-col flex justify-center items-center">

            <section class=" max-w-[370px] w-full">
               <el-form-item class="relative" label="Sms kod">
                  <el-input v-model="_item.code" maxlength="6" data-mask="### ###" />
               </el-form-item>
               <div>
                  <p v-if="_time > 0" class="text-[#93969F]">Kodni kiriting: {{ _time }}</p>
                  <p @click="sendVerify" v-else>Kodni olmadingizmi? <a class="text-primary">Yuborish</a></p>
               </div>
               <div>
                  <el-button @click="sendSMS" class="w-full mt-6" type="primary">Davom etish</el-button>
               </div>
            </section>
         </div>
      </el-form>
   </div>
</template>
<style lang="scss">
.verify .el-form--label-top .el-form-item {
   width: 100%;
}
</style>
