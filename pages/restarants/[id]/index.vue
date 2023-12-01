<script lang="ts" setup>
import { _loginStore } from "@/services/login"
import { singleRestorant_API, updateRate_API, commentRestarant_API, verifyRestorant_API, rejectRestorant_API } from '@/services/restorant';
const _item = ref()
const dialogVisible = ref(false)

const route = useRoute()
const router = useRouter()

const _cost = ref({
   rate: null,
   text: ''
})

async function singleRestorant() {
   const [res, err] = await singleRestorant_API(route.params.id)
   console.log(res);

   if (err) return
   _item.value = res
}
async function resolveRestorant() {
   const [res, err] = await verifyRestorant_API(route.params.id)

   if (err) return
   ElMessage.success('Tasdiqlandi!!!')
}
async function rejectRestorant() {
   const [res, err] = await rejectRestorant_API(route.params.id)

   if (err) return
   ElMessage.success('Rad etildi!!!')
}
async function addRate() {
   commentRestarant_API(route.params.id, _cost.value)
   const [res, err] = await updateRate_API(route.params.id, _cost.value)

   if (err) return
   ElMessage.success('Baholadingiz!!!')
   dialogVisible.value = false
}

singleRestorant()
</script>

<template>
   <NuxtLayout>
      <div class="res_id">
         <div class="border mb-4 rounded border-[#ccc] bg-white relative">
            <img @click="$router.push('/restarants')" class="absolute z-10 top-2 left-4 w-6 h-5"
               src="@/assets/img/left.svg" alt="">
            <div class="flex justify-center items-center bg-[#e7e3e3] p-2">
               <el-image fit="contain" class="h-[120px] rounded"
                  :src="`http://217.18.63.130:8008/api/oqibat/v1/files/download/resource?file=${_item?.images[0]}`" />
            </div>
            <div v-if="_item?.name" class="p-4">
               <bold class="font-inter-600 text-2xl">{{ _item.name }}</bold>
               <p>Manzill: <bold class="font-inter-600">{{ _item.address }}</bold>
               </p>
               <!-- <p >location: <bold class="font-inter-600">{{ _item.location }}</bold></p> -->
               <p>Telefon nomer: <bold class="font-inter-600">{{ _item.phoneNumber }}</bold>
               </p>
               <div class="flex gap-3">
                  <img class="w-6 " src="@/assets/img/comment.svg" alt="">
                  <router-link class="underline block text-primary " :to="`/restarants/${route.params.id}/opinion`">Fikr
                     Mulohazalar </router-link>
               </div>
               <el-button v-if="_loginStore?.role[0] == 'ADMIN'" class="!py-0 !rounded-xl !pb-[1px] text-xs !h-7 mt-2"
                  @click="resolveRestorant" type="info">
                  Tasdiqlash
               </el-button>
               <el-button v-if="_loginStore?.role[0] == 'ADMIN'" class="!py-0 !rounded-xl !pb-[1px] text-xs !h-7 mt-2"
                  @click="rejectRestorant" type="danger">
                  Rad etish
               </el-button>
               <el-button v-else @click="dialogVisible = true" class="!py-0 !rounded-xl !pb-[1px] text-xs !h-7 mt-2"
                  type="primary">Restarantni
                  baholash</el-button>
            </div>
         </div>
         <p class="font-inter-600 text-xl my-2">Ovqatlar</p>
         <div class="bg-white border border-[#ccc] rounded mb-4" v-for="food, ind in _item?.foods" :key="ind">
            <div class="flex justify-center items-center bg-[#e7e3e3] p-2">
               <el-image fit="contain" class="h-[120px] rounded"
                  :src="`http://217.18.63.130:8008/api/oqibat/v1/files/download/resource?file=${food?.images[0]}`" />
            </div>
            <p class="p-4 font-inter-500">{{ food.name }}</p>
         </div>
         <el-dialog v-if="dialogVisible" v-model="dialogVisible" title="" width="90%">
            <el-form class="" label-position="top">
               <div class="flex justify-center items-center flex-col">
                  <h2 class="text-2xl">Baholash</h2>
                  <el-rate size="large" v-model="_cost.rate" clearable />
               </div>
               <el-form-item label="O'z fikringizni qoldiring">
                  <el-input rows="3" type="textarea" v-model="_cost.text" />
               </el-form-item>
            </el-form>
            <template #footer>
               <span class="dialog-footer">
                  <el-button @click="dialogVisible = false">Cancel</el-button>
                  <el-button type="primary" @click="addRate">
                     Baholash
                  </el-button>
               </span>
            </template>
         </el-dialog>
      </div>
   </NuxtLayout>
</template>
<style lang="scss">
.res_id {
   .el-rate__item {
      margin-right: 10px;
   }

   .el-icon svg {
      width: 32px;
      height: 32px;
   }
}
</style>