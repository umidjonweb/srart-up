    
<script lang="ts" setup>
import { _loginStore } from '@/services/login';
import { _registerStore } from '@/services/register';
import { profilUser_API } from '@/services/profil';
const router = useRouter()
function logout() {
   _loginStore.value = {}
   _registerStore.value = {}
   router.push('/login')
}
const _item = ref({})
async function profilUser() {
   const [res, err ] = await profilUser_API(_loginStore.value.userId)
   if (err) return
   _item.value = res
}
profilUser()
</script>
<template>
   <NuxtLayout>
      <div>
         <div class="flex items-center gap-3 ">
            <img v-if="!_item?.avatar" src="@/assets/img/user.svg" alt="">
            <img v-else  class="h-10 w-10 rounded-full"
                        :src="`http://217.18.63.130:8008/api/oqibat/v1/files/download/resource?file=${_item?.avatar}`" />
            <h2 class="text-2xl">{{ _loginStore.role[0] }}</h2>
         </div>
         <p class="text-[#B0B0B0] mb-4">{{ _loginStore.username }}</p>
         <div @click="$router.push('/profil/update')"
            class="cursor-pointer flex justify-between items-center border-t border-[#C2C2C2] py-1 px-2">
            <p class="text-[#03899A]">Profilni tahrirlash </p>
            <img src="@/assets/img/next.svg" alt="">
         </div>
         <div @click="$router.push('/profil/contact')"
            class="cursor-pointer flex justify-between items-center border-t border-[#C2C2C2] py-1 px-2">
            <p class="text-[#03899A]">Kontaktlar </p>
            <img src="@/assets/img/next.svg" alt="">
         </div>
         <div @click="$router.push('/profil/group')"
            class="cursor-pointer flex justify-between items-center border-t border-[#C2C2C2] py-1 px-2">
            <p class="text-[#03899A]">Mening guruhlarim </p>
            <img src="@/assets/img/next.svg" alt="">
         </div>
         <div class="cursor-pointer flex justify-between items-center border-t border-[#C2C2C2] py-1 px-2">
            <p class="text-[#03899A]">Ovqatlar </p>
            <img src="@/assets/img/next.svg" alt="">
         </div>
         <div class="cursor-pointer flex justify-between items-center border-t border-[#C2C2C2] py-1 px-2">
            <p class="text-[#03899A]">Restorantlar</p>
            <img src="@/assets/img/next.svg" alt="">
         </div>
         <div @click="logout" class="cursor-pointer flex justify-between items-center border-t border-[#C2C2C2] py-1 px-2">
            <p class="text-[#d83a5d]">Chiqish </p>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M9 6L15 12L9 18" stroke="#d83a5d" stroke-width="2" />
            </svg>
         </div>
      </div>
   </NuxtLayout>
</template>

<style></style>