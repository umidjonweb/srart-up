<script lang="ts" setup>
import { getProfil_API, updateProfil_API } from "@/services/profil"
import type { FormInstance, FormRules } from 'element-plus'
import { _loginStore } from "@/services/login"
import { uploadFile_API } from "@/services/file"
const formRef = ref<FormInstance>()
const router = useRouter()
const _form = ref({
   username: '',
   password: ''
})
const _item = ref({
   avatar: "",
   birthDate: "",
   favoriteFoods: [],
   favoriteRestaurants: []
})
async function getProfil() {
   console.log('_loginStore', _loginStore.value);

   const [res, err] = await getProfil_API(_loginStore.value.userId)
   console.log(res);

   if (err) return
   _item.value = res
}
getProfil()

async function updateForm() {
   // if (!formRef.value) return
   // formRef.value.validate(async (valid) => {
   // if (valid) {
   const [res, err] = await updateProfil_API(_loginStore.value.userId, _item.value)
   console.log(res);

   if (err) return
   ElMessage.success("Profil yangilandi")
   // router.push('/profil')
   //    } else {
   //       return false
   //    }
   // })
}
async function handleAvatar(e: Event) {
   const file = (e.target as HTMLInputElement)?.files?.[0]
   console.log('fileee', file);

   const [res, err] = await uploadFile_API(file as File)
   if (err) return
   console.log(res);

   _item.value.avatar = res

}
</script>
<template>
   <NuxtLayout>
      <div class="flex justify-center flex-col items-center">
         <div @click="$router.push('/profil')" class="flex items-center gap-2 px-4">
            <img class="w-6 h-5" src="@/assets/img/left.svg" alt="">
            <p>Orqaga</p>
         </div>
         <div class="flex flex-col justify-center max-w-[320px] w-full mt-10">
            <div class="relative mx-auto mb-6 ">
               <img v-if="_item.avatar" class="w-20 h-20 rounded-full" :src="_item.avatar" alt="">
               <img v-else class="w-20 h-20" src="@/assets/img/user.svg" alt="">
               <img class="absolute -right-0 bottom-1" src="@/assets/img/kamera.svg" alt="">
               <input :value="_item.avatar" class="w-6 h-6 rounded-full opacity-0 absolute -right-0 bottom-1" accept="img"
                  type="file" @change="handleAvatar" />
            </div>
            <el-form label-position="top">
               <el-form-item label="Telefon nomer">
                  <el-input disabled v-model="_loginStore.username" />
               </el-form-item>
               <el-form-item class="w-full" label="Tug'ilgan sana">
                  <el-date-picker class="w-full" format="DD.MM.YYYY" value-format="YYYY-DD-MM" v-model="_item.birthDate"
                     type="date" placeholder="Tug'ilgan sana" />
               </el-form-item>
               <el-form-item>
                  <el-button type="primary" @click="updateForm" class="w-full mt-3">Yangilash</el-button>
               </el-form-item>
            </el-form>
         </div>
      </div>
   </NuxtLayout>
</template>
<style>
.el-date-editor.el-input,
.el-date-editor.el-input__wrapper {
   width: 100%;
}
</style>