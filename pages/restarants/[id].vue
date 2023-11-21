<script lang="ts" setup>
import { singleRestorant_API, updateRate_API } from '@/services/restorant';
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
async function addRate() {
   const [res, err] = await updateRate_API(route.params.id, _cost.value)
   console.log(res);

   if (err) return
   ElMessage.success('Baholadingiz!!!')
   dialogVisible.value = false
}

singleRestorant()
</script>

<template>
   <NuxtLayout>
      <div class="res_id">
         <div class="border p-2 mb-4 rounded border-[#ccc] bg-white relative">
            <img @click="$router.push('/restarants')" class="absolute z-10 top-2 left-4 w-6 h-5" src="@/assets/img/left.svg"
               alt="">

            <el-image fit="contain" class="h-[120px] w-full"
               :src="`http://217.18.63.130:8008/api/oqibat/v1/files/download/resource?file=${_item?.images[0]}`" />
            <div v-if="_item?.name" class="p-2">
               <bold class="font-montserrat-600 text-2xl">{{ _item.name }}</bold>
               <p>Manzill: <bold class="font-montserrat-600">{{ _item.address }}</bold>
               </p>
               <!-- <p >location: <bold class="font-montserrat-600">{{ _item.location }}</bold></p> -->
               <p>Telefon nomer: <bold class="font-montserrat-600">{{ _item.phoneNumber }}</bold>
               </p>
               <el-button @click="dialogVisible = true" class="!py-0 !rounded-xl !pb-[1px] text-xs !h-7 mt-2"
                  type="primary">Restarantni
                  baholash</el-button>
            </div>
         </div>
         <p class="font-montserrat-600 text-xl my-2">Ovqatlar</p>
         <div class="bg-white p-4 border border-[#ccc] rounded mb-4" v-for="food, ind in _item?.foods" :key="ind">
            <div>
               <el-image fit="contain" class="h-[120px] w-full"
                  :src="`http://217.18.63.130:8008/api/oqibat/v1/files/download/resource?file=${food?.images[0]}`" />
               <p>{{ food.name }}</p>
            </div>
         </div>
         <el-dialog v-if="dialogVisible" v-model="dialogVisible" title="" width="90%">
            <el-form class="" label-position="top">
               <div class="flex justify-center items-center flex-col">
                  <h2 class="text-2xl">Baholash</h2>
                  <el-rate size="large" v-model="_cost.rate" clearable />
               </div>
               <el-form-item label="Ism">
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