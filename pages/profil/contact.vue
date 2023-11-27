<script lang="ts" setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { searchContact_API, addContact_API, myContact_API } from "@/services/contact"

const dialogVisible = ref(false)
const route = useRoute()
const queryData = ref<any>({
   page: Number(route.query?.currentPage) || 0,
   size: 10,
})
const _phone = ref('')
const input2 = ref('')
const _item = ref<any>({})
const _contacts = ref<any>([])
async function searchContact() {
   console.log('_phone.value', _phone.value);

   const [res, err] = await searchContact_API(_phone.value)
   console.log(res);

   if (err) {
      ElMessage.error("Bunday kontakt yo'q")
      return
   }
   dialogVisible.value = true
   _item.value = res
}
async function myContact() {
   const [res, err] = await myContact_API(queryData.value)
   console.log(res);

   if (err) return
   _contacts.value = res.content
}
myContact()
async function addContact() {
   const [res, err] = await addContact_API(_item.value)
   console.log(res);
   dialogVisible.value = false
   if (err) return
   myContact()
}
</script>
<template>
   <NuxtLayout>
      <div class="p-2">
         <div class="flex items-center mb-2  gap-2">
            <img @click="$router.push('/profil')" class="w-6 h-5" src="@/assets/img/left.svg" alt="">
            <h2 class="text-xl  font-inter-600">Kontaktlar</h2>
         </div>
         <div>
            <el-form class="flex items-end justify-between gap-3" label-position="top">
               <el-form-item class="w-full" label="Telefon nomer">
                  <el-input v-model="_phone" v-maska data-maska="998 ## ### ## ##" placeholder="998 ## ### ## ##"
                     :prefix-icon="Search" />
               </el-form-item>
               <el-form-item>
                  <el-button @click="searchContact" type="primary"> Kontakt qo'shish</el-button>
               </el-form-item>
            </el-form>
            <!-- <div v-if="_item?.id" class="border border-[#ccc] bg-white rounded p-5">
               <div class="flex justify-between">
                  <p>Ism: </p>
                  <p>{{ _item.firstname }}</p>
               </div>
               <div class="flex justify-between">
                  <p>Familiya: </p>
                  <p>{{ _item.lastname }}</p>
               </div>
            </div> -->
            <!-- <div v-if="_item?.id" class="flex justify-end">
               <el-button @click="dialogVisible = true" class="mt-6" type="primary">
                  Kontaktnini qo'shish
               </el-button>
            </div> -->
            <div>
               <h2 class="mt-2 font-inter-600">Mening Kontaktlarim</h2>
               <div v-for="contact, ind in _contacts" :key="ind"
                  class="border border-[#ccc] bg-white rounded p-4 py-3 mt-2">
                  <div class="flex justify-between">
                     <p>Ism: </p>
                     <p>{{ contact.firstname }}</p>
                  </div>
                  <div class="flex justify-between">
                     <p>Familiya: </p>
                     <p>{{ contact.lastname }}</p>
                  </div>
                  <div class="flex justify-between">
                     <p>Telefon nomer: </p>
                     <p>{{ contact.phoneNumber }}</p>
                  </div>
               </div>
            </div>
            <el-dialog v-if="dialogVisible" v-model="dialogVisible" title="Tips" width="90%">
               <el-form class="" label-position="top">
                  <el-form-item class="w-full" label="Telefon nomer">
                     <el-input disabled v-model="_item.phoneNumber" placeholder="998 ## ### ## ##" :prefix-icon="Search" />
                  </el-form-item>
                  <el-form-item label="Ism">
                     <el-input v-model="_item.firstname" />
                  </el-form-item>
                  <el-form-item label="Familiya">
                     <el-input v-model="_item.lastname" />
                  </el-form-item>
               </el-form>
               <template #footer>
                  <span class="dialog-footer">
                     <el-button @click="dialogVisible = false">Cancel</el-button>
                     <el-button type="primary" @click="addContact">
                        Qo'shish
                     </el-button>
                  </span>
               </template>
            </el-dialog>
         </div>
         <div>

         </div>
      </div>
   </NuxtLayout>
</template>

<style>
.el-form-item__content {
   height: 36px !important;
}
</style>