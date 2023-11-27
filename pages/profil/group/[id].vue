<script lang="ts" setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { getMembersGroup_API, inviteGroup_API, declineGroup_API, acceptGroup_API } from "@/services/groups"
import { searchContact_API } from '@/services/contact';
const dialogVisible = ref(false)
const route = useRoute()
const router = useRouter()
const queryData = ref<any>({
   page: Number(route.query?.currentPage) || 0,
   size: 10,
})
const _groupName = ref<any>(JSON.parse(route?.query?.item as string))
const _phone = ref('')

const _item = ref<any>({})
const _items = ref<any>([])

async function searchContact() {
   const [res, err] = await searchContact_API(_phone.value)

   if (err) {
      ElMessage.error('Contact mavjud emas')
      return
   }
   dialogVisible.value = true
   _item.value = res
}
async function getMembersGroup() {
   const [res, err] = await getMembersGroup_API(queryData.value, route.params.id as string)
   console.log(res);

   if (err) return
   _items.value = res
}
async function inviteGroup() {
   const [res, err] = await inviteGroup_API(_item.value.userId, route.params.id as string)
   console.log(res);
   dialogVisible.value = false
   if (err) {
      if (err.response.data.code == 11) {
         ElMessage.error('Bu kontakt guruhda mavjud yoki taklif yuborilgan')
      }
      return
   }
   _item.value = res
}
async function declineGroup() {
   const [res, err] = await declineGroup_API(route.params.id as string)
   if (err) return
   ElMessage.success('Rad etildi!!!')
   router.push('/profil/group')
}
async function acceptGroup() {
   const [res, err] = await acceptGroup_API(route.params.id as string)
   if (err) return
   ElMessage.success('Tasdiqlandi!!!')
   router.push('/profil/group')
}

getMembersGroup()
</script>
<template>
   <NuxtLayout>
      <div class="groupId p-2">
         <div class="flex justify-between items-center">
            <img @click="$router.push('/profil/group')" class="w-6 h-5" src="@/assets/img/left.svg" alt="">
            <div class="flex gap-4 items-center">
               <div class="flex justify-center items-center h-10 w-10 rounded-full bg-[#ccc] text-xl text-white"
                  v-if="!_groupName.avatar">{{ _groupName?.name?.substring(0, 1).toUpperCase() }}</div>
               <el-image v-else fit="contain" class="border border-[#ccc] h-10 w-10 rounded-full"
                  :src="`http://217.18.63.130:8008/api/oqibat/v1/files/download/resource?file=${_groupName?.avatar}`" />

               <div class="flex justify-between">
                  <p class="font-inter-500">{{ _groupName.name }}</p>
               </div>
            </div>
         </div>
         <el-form v-if="route.query.status != 'INITIAL'" class="flex items-end justify-between" label-position="top">
            <el-form-item class="!w-full mr-4" label="Telefon nomer">
               <el-input v-model="_phone" v-maska data-maska="998 ## ### ## ##" placeholder="998 ## ### ## ##"
                  :prefix-icon="Search" />
            </el-form-item>
            <el-form-item>
               <el-button class="!h-8" @click="searchContact" type="primary">Azo qo'shish</el-button>
            </el-form-item>
         </el-form>

         <div>
            <p class="text-center my-3 text-primary-500  " v-if="route.query.status == 'INITIAL'">{{ `Sizni bu guruhga ${_groupName.benefactor} taklif qildi` }}</p>
            <h2 class="my-2 text-xl font-inter-600 text-black/70">Guruh azolari</h2>
            <div v-for="member in _items.content" :key="member.id" class="border border-[#ccc] bg-white rounded p-3 mb-4">
               <div class="flex justify-between">
                  <p>Ism: </p>
                  <p>{{ member.firstname }}</p>
               </div>
               <div class="flex justify-between">
                  <p>Familiya: </p>
                  <p>{{ member.lastname }}</p>
               </div>
            </div>
         </div>
         <div v-if="route.query.status == 'INITIAL'" class="flex justify-end mt-6">
            <el-button @click="declineGroup" type="danger">Rad etish</el-button>
            <el-button @click="acceptGroup" type="primary">Tasdiqlash</el-button>
         </div>
         <el-dialog v-if="dialogVisible" v-model="dialogVisible" title="Tips" width="90%">
            <el-form class="" label-position="top">
               <el-form-item class="w-full" label="Telefon nomer">
                  <el-input disabled v-model="_item.phoneNumber" placeholder="998 ## ### ## ##" :prefix-icon="Search" />
               </el-form-item>
               <el-form-item label="Ism">
                  <el-input disabled v-model="_item.firstname" />
               </el-form-item>
               <el-form-item label="Familiya">
                  <el-input disabled v-model="_item.lastname" />
               </el-form-item>
            </el-form>
            <template #footer>
               <span class="dialog-footer">
                  <el-button @click="dialogVisible = false">Cancel</el-button>
                  <el-button type="primary" @click="inviteGroup">
                     Qo'shish
                  </el-button>
               </span>
            </template>
         </el-dialog>

      </div>
   </NuxtLayout>
</template>

<style lang="scss" >
.el-message {
   width: 250px !important;
}

.groupId {

   .el-form-item__content,
   .el-input__wrapper {
      height: 32px !important;
   }

}
</style>