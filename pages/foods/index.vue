    
<script lang="ts" setup>
import { ref, watch } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { searchFood_API, getFood_API, addFood_API, getAdminFood_API, adminVerify_API } from "@/services/food"
import { _loginStore } from '@/services/login';
const _items = ref<any>([])
const _search = ref<any>('')
const route = useRoute()
const queryData = ref<any>({
   page: Number(route.query?.currentPage) || 0,
   size: 10,
})

const activeName = ref('VERIFIED')
async function searchFood() {
   const [res, err] = await searchFood_API(_search.value)
   console.log(res);

   if (err) return
   _items.value = res
}
async function getFood(item: string = 'VERIFIED') {
   const [res, err] = !_loginStore.value.role?.includes('ADMIN') ? await getFood_API(queryData.value, item) : await getAdminFood_API(queryData.value, item)
   console.log(res);

   if (err) return
   _items.value = res.content
}
async function adminVerify(id) {
   const [res, err] =  await adminVerify_API(id)
   console.log(res);

   if (err) return
   ElMessage.success('Ovqat tasqidlandi!!!')
   getFood("NOT_VERIFIED")
}

watch(_search, () => {
   console.log('salomm', _search.value);

   if (_search.value?.length > 3) {
      setTimeout(() => {
         searchFood()
      }, 400)
   }
   else {
      getFood()
   }
})
getFood()
</script>
<template>
   <NuxtLayout>
      <div class="restarant p-2">
         <div class="flex justify-between items-center mb-4">
            <h2 class="text-2xl mb-2">Ovqatlar</h2>
            <el-button @click="$router.push('/foods/addFood')" type="primary">Qo'shish</el-button>
         </div>
         <el-tabs v-model="activeName" class="demo-tabs" @tab-change="getFood(activeName)">
            <el-tab-pane label="Tasqidlangan" name="VERIFIED"></el-tab-pane>
            <el-tab-pane label="Tasqidlanmagan" name="NOT_VERIFIED"></el-tab-pane>
         </el-tabs>
         <div>
            <el-form class="flex items-end justify-between gap-3" label-position="top">
               <el-form-item class="w-full">
                  <el-input v-model="_search" placeholder="Ovqatlarni qidiring..." :prefix-icon="Search" />
               </el-form-item>
               <!-- <el-form-item>
                  <el-button size="small" @click="searchFood" type="primary">Izlash</el-button>
               </el-form-item> -->
            </el-form>
            <div class="">
               <!-- {{ _items?.content }} -->
               <div class="bg-white  border border-[#ccc] rounded mb-4" v-for="food, ind in _items" :key="ind">
                  <div class="flex justify-center items-center bg-[#e7e3e3] p-2">
                     <el-image fit="contain" class="h-[100px] rounded"
                        :src="`http://217.18.63.130:8008/api/oqibat/v1/files/download/resource?file=${food?.images[0]}`" />
                  </div>
                  <p class="p-2 font-inter-500">{{ food.name }}</p>
                  <div class="flex gap-2 p-2">
                     <el-button @click="adminVerify(food.id)" size="small" type="primary">Tasdiqlash</el-button>
                     <el-button @click="adminVerify(food.id)" size="small" type="danger">Rad etish</el-button>
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