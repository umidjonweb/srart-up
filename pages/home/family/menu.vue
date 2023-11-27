<script lang="ts" setup>
import HomeLayout from '../index.vue'
import { getHomeStyle_API, postHomeStyle_API, getHomeStyleMenu_API, postHomeStyleMenu_API, randomHomeStyle_API } from '@/services/home';

const route = useRoute()
const router = useRouter()

const _items = ref<any>([])

const queryData = ref<any>({
   page: Number(route.query?.currentPage) || 0,
   size: 10,
})
async function getHomeStyleMenu() {
   const [res, err] = await getHomeStyleMenu_API(queryData.value)
   console.log(res);

   if (err) return
   _items.value = res.content
}
getHomeStyleMenu()
</script>

<template>
   <HomeLayout>
      <div class="border border-[#ccc] rounded p-4 bg-white mt-4" v-for="item in _items" :key="item.id">
         <p>{{ item.name }}</p>
         <p>{{ item.day }}</p>
         <p>{{ item.type }}</p>
      </div>
   </HomeLayout>
</template>

<style></style>