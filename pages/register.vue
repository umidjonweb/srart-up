<script lang="ts" setup>
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { register_API, _registerStore } from "@/services/register"
const router = useRouter()
const formRef = ref<FormInstance>()
const _form = ref({
   lastname: '',
   username: '',
   firstname: '',
   password: '',
})
const RoleOptions = ref([
   { label: 'Admin', value: 'ADMIN' },
   { label: 'Manager', value: 'MANAGER' },
   { label: 'user', value: 'USER' }
])


const rules = reactive<FormRules<any>>({
   email: [{ required: true, message: "Maydonni to'ldiring", trigger: 'blur' }],
   password: [{ required: true, message: "Maydonni to'ldiring", trigger: 'blur' }],
})

const submitForm = () => {
   if (!formRef.value) return
   formRef.value.validate(async (valid) => {
      if (valid) {
         console.log('submit!')
         const [res, err] = await register_API(_form.value)
         if (err) return
         ElMessage.success("Tasdiqlash kodi yuborildi")
         _registerStore.value = {..._form.value}
         router.push('/verify')
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
                  Ro'yxatdan o'tish
               </p>
               <div class="h-[2px] grow  bg-indigo-500"></div>
            </div>
            <el-form label-position="top" @submit.prevent="submitForm" :model="_form" :rules="rules" ref="formRef">
               <el-form-item  prop="username" label="username">
                  <el-input v-model="_form.username" type="text" placeholder="username" />
               </el-form-item>
               <el-form-item  label="Ism">
                  <el-input v-model="_form.firstname" type="text" placeholder="Ism" />
               </el-form-item>

               <el-form-item  label="Familiya">
                  <el-input v-model="_form.lastname" type="text" placeholder="Familiya" />
               </el-form-item>
               <el-form-item  label="password">
                  <el-input show-password v-model="_form.password" type="password" placeholder="Password" />
               </el-form-item>
               <div class="flex justify-between items-center mt-2">
                  <p>Ro'yxatdan o'tganmisiz?</p>
                  <a href="#" class="text-indigo-light underline">Kirish</a>
               </div>
               <el-button  native-type="submit" class="w-full !py-4 mt-4  font-inter-600"
                  type="primary">Ro'yxatdan o'tish</el-button>
            </el-form>
         </div>
      </div>
   </NuxtLayout>
</template>
<style lang="scss" >
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
}
</style>
