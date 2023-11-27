<script lang="ts" setup>
import { getGroup_API, getGroupOffer_API } from '@/services/groups';

const route = useRoute()
const activeName = ref('INITIAL')
const queryData = ref<any>({
   page: Number(route.query?.currentPage) || 0,
   size: 10,
})
const _phone = ref('')
const _offerCount = ref(0)
const _groupCount = ref(0)

const _item = ref<any>({})
const _items = ref<any>([])
async function getGroup() {
   const [res, err] = await getGroup_API(queryData.value)
   console.log(res);

   if (err) return
   _items.value = res
   _groupCount.value = res.totalElements
}
async function getGroupOffer() {
   const [res, err] = await getGroupOffer_API(queryData.value)
   console.log(res);

   if (err) return
   _items.value = res
   _offerCount.value = res.totalElements
}
async function addMembers(item) {
   console.log(item);

   // const [res, err] = await getGroup_API(queryData.value)
   //    console.log(res);

   //    if (err) return
   //    _items.value = res
}

getGroupOffer()
</script>
<template>
   <NuxtLayout>
      <div class="flex justify-between items-center mb-6">
         <div class="flex gap-2 items-center">
            <img @click="$router.push('/profil')" class="w-6 h-5" src="@/assets/img/left.svg" alt="">
            <h2 class="text-xl">Mening guruhlarim</h2>
         </div>
         <el-button class="!h-8" @click="$router.push('/profil/group/add')" type="primary">Qo'shish</el-button>
      </div>
      <el-tabs v-model="activeName" class="demo-tabs" @tab-change="activeName != 'INITIAL' ? getGroup() : getGroupOffer()">
         <el-tab-pane :label="`Takliflar`" name="INITIAL"></el-tab-pane>
         <el-tab-pane :label="`Guruhlar`" name="ACCEPTED"></el-tab-pane>
      </el-tabs>
      <NuxtLink :to="{ path: `/profil/group/${food.id}`, query: { item: JSON.stringify(food), status: activeName } }"
         class="block bg-white p-2 border border-[#ccc] rounded mb-2 relative" v-for="food, ind in _items?.content"
         :key="ind">
         <div class="flex gap-4 items-center">
            <div class="flex justify-center items-center h-10 w-10 rounded-full bg-[#ccc] text-xl text-white"
               v-if="!food?.avatar">{{ food.name?.substring(0, 1).toUpperCase() }}</div>
            <el-image v-else fit="contain" class="h-10 w-10 rounded-full border border-[#ccc]"
               :src="`http://217.18.63.130:8008/api/oqibat/v1/files/download/resource?file=${food?.avatar}`" />

            <div class="flex justify-between">
               <p class="">{{ food.name }}</p>
            </div>
         </div>
      </NuxtLink>
   </NuxtLayout>
</template>

<style></style>