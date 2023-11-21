    
<script lang="ts" setup>
import { ref, watch } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { searchFood_API, getFood_API, addFood_API } from "@/services/food"
const _items = ref<any>([])
const _search = ref<any>('')
const route = useRoute()
const queryData = ref<any>({
   page: Number(route.query?.currentPage) || 0,
   size: 10,
})
async function searchFood() {
   const [res, err] = await searchFood_API(_search.value)
   console.log(res);

   if (err) return
   _items.value = res
}
async function getFood() {
   const [res, err] = await getFood_API(queryData.value)
   console.log(res);

   if (err) return
   _items.value = res
}

watch(_search, () => {
   console.log('salomm', _search.value);

   if (_search.value?.length > 3) {
      setTimeout(() => {
         searchFood()
      }, 400)
   }
})
getFood()
</script>
<template>
   <NuxtLayout>
      <div class="restarant p-2">
         <div class="flex justify-between items-center mb-4">
            <h2 class="text-2xl mb-2">Ovqatlar</h2>
            <el-button @click="$router.push('/foods/addFood')" size="small" type="primary">Qo'shish</el-button>
         </div>
         <div>
            <el-form class="flex items-end justify-between gap-3" label-position="top">
               <el-form-item class="w-full">
                  <el-input v-model="_search" placeholder="Ovqatlarni qidiring..." :prefix-icon="Search" />
               </el-form-item>
               <!-- <el-form-item>
                  <el-button size="small" @click="searchFood" type="primary">Izlash</el-button>
               </el-form-item> -->
            </el-form>
            <div class="grid grid-cols-2 gap-x-4">
               <!-- {{ _items?.content }} -->
               <div class="bg-white p-4 border border-[#ccc] rounded mb-4" v-for="food, ind in _items?.content" :key="ind">
                  <div>
                     <el-image fit="contain" class="h-[100px] w-full"
                        :src="`http://217.18.63.130:8008/api/oqibat/v1/files/download/resource?file=${food?.images[0]}`" />
                     <p>{{ food.name }}</p>
                  </div>
               </div>
            </div>
         </div>
         <div>

         </div>
      </div>
   </NuxtLayout>
</template>

<style lang="scss">
.restarant {
   .el-input__wrapper {
      height: 30px !important;
   }
}
</style>