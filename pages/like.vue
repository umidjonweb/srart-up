    
<script lang="ts" setup>
import { ref, watch } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { searchRestorant_API, getLikeRestorant_API, like_API, unLike_API } from "@/services/restorant"
const _items = ref<any>([])
const _search = ref<any>('')
const route = useRoute()

const queryData = ref<any>({
   page: Number(route.query?.currentPage) || 0,
   size: 10,
})
async function searchRestorant() {
   const [res, err] = await searchRestorant_API(_search.value)
   console.log(res);

   if (err) return
   _items.value = res
}
async function getRestorant() {
   const [res, err] = await getLikeRestorant_API(queryData.value)
   console.log(res);

   if (err) return
   _items.value = res
}

watch(_search, () => {
   if (_search.value?.length > 3) {
      setTimeout(() => {
         searchRestorant()
      }, 400)
   }
})
getRestorant()
async function handleLike(food: any) {
   console.log(food);
   food.liked = !food.liked
   const [res, error] = !food.liked ? await like_API(food.id) : await unLike_API(food.id)
   if (error) return
   getRestorant()
}
</script>
<template>
   <NuxtLayout>
      <div class="restarant p-2">
         <div class="flex justify-between items-center mb-4">
            <h2 class="text-2xl mb-2">Tanlangan restarantlar</h2>
         </div>
         <div>
            <el-form class="flex items-end justify-between gap-3" label-position="top">
               <el-form-item class="w-full">
                  <el-input v-model="_search" placeholder="Restorantni qidiring..." :prefix-icon="Search" />
               </el-form-item>
            </el-form>
            <div>
               <NuxtLink :to="`/restarants/${food.id}`" class="block bg-white border border-[#ccc] rounded mb-6 relative"
                  v-for="food, ind in _items?.content" :key="ind">
                  <div class="flex justify-center items-center bg-[#e7e3e3] p-2">
                     <el-image fit="contain" class="h-[120px] rounded"
                        :src="`http://217.18.63.130:8008/api/oqibat/v1/files/download/resource?file=${food?.images[0]}`" />
                  </div>
                  <div @click.prevent="handleLike(food)" class="absolute top-2 right-2">
                     <img v-if="!food.liked" src="@/assets/img/heart_bg.svg" alt="">
                     <img v-else src="@/assets/img/heart.svg" alt="">
                  </div>
                  <div class="flex justify-between p-4">
                     <p class="font-inter-500">{{ food.name }}</p>
                     <el-rate disabled v-model="food.rate" clearable allow-half />
                  </div>
               </NuxtLink>
            </div>
         </div>
         <div>

         </div>
      </div>
   </NuxtLayout>
</template>

<style lang="scss" >
.demo-rate-block {
   padding: 30px 0;
   text-align: center;
   border-right: solid 1px var(--el-border-color);
   display: inline-block;
   width: 39%;
   box-sizing: border-box;
}

.demo-rate-block:last-child {
   border-right: none;
}


.restarant {
   .el-input__wrapper {
      height: 30px !important;
   }

   .el-rate .el-rate__icon {
      margin: 0;
   }
}
</style>