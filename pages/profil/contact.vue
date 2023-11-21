<script lang="ts" setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { searchContact_API, addContact_API } from "@/services/contact"

const dialogVisible = ref(false)

const _phone = ref('')
const input2 = ref('')
const _item = ref<any>({})
async function searchContact() {
   console.log('_phone.value', _phone.value);

   const [res, err] = await searchContact_API(_phone.value)
   console.log(res);

   if (err) return
   _item.value = res
}
async function addContact() {
   console.log('_phone.value', _phone.value);

   const [res, err] = await addContact_API(_item.value)
   console.log(res);
   dialogVisible.value = false
   if (err) return
   _item.value = res
}
</script>
<template>
   <NuxtLayout>
      <div class="p-2">
         <h2 class="text-2xl mb-2">Kontaktlar</h2>
         <div>
            <el-form class="flex items-end justify-between gap-3" label-position="top">
               <el-form-item class="w-full" label="Telefon nomer">
                  <el-input v-model="_phone" placeholder="99890 XX XXX XX XX" :prefix-icon="Search" />
               </el-form-item>
               <el-form-item>
                  <el-button @click="searchContact" type="primary">Izlash</el-button>
               </el-form-item>
            </el-form>
            <div v-if="_item?.id" class="border border-[#ccc] bg-white rounded p-5">
               <div class="flex justify-between">
                  <p>Ism: </p>
                  <p>{{ _item.firstname }}</p>
               </div>
               <div class="flex justify-between">
                  <p>Familiya: </p>
                  <p>{{ _item.lastname }}</p>
               </div>
            </div>
            <div v-if="_item?.id" class="flex justify-end">
               <el-button @click="dialogVisible = true" class="mt-6" type="primary">
                  Kontaktnini qo'shish
               </el-button>
            </div>
            <el-dialog v-if="dialogVisible" v-model="dialogVisible" title="Tips" width="90%">
               <el-form class="" label-position="top">
                  <el-form-item class="w-full" label="Telefon nomer">
                     <el-input disabled v-model="_item.phoneNumber" placeholder="99890 XX XXX XX XX"
                        :prefix-icon="Search" />
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