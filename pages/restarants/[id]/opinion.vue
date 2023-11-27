<script lang="ts" setup>
import { formatDate_UTIL } from "@/utils"
import { getRestorantComment_API, commentRestarant_API } from "@/services/restorant"
const route = useRoute()

const queryData = ref<any>({
   page: Number(route.query?.currentPage) || 0,
   size: 10,
})
const _cost = ref({
   text: ''
})
const _items = ref<any>([])

async function getRestorantComment() {
   const [res, err] = await getRestorantComment_API(route.params.id, queryData.value)
   console.log(res);

   if (err) return
   _items.value = res
}
getRestorantComment()

async function addRate() {
   const [res, err] = await commentRestarant_API(route.params.id, _cost.value)

   if (err) return
   ElMessage.success('Comentariya qoldirdiz!!!')
   getRestorantComment()
   _cost.value.text = ''
}
</script>

<template>
   <NuxtLayout>
      <div>
         <el-form label-position="top">
            <el-form-item label="O'z fikringizni qoldiring">
               <el-input  type="textarea" v-model="_cost.text" />
            </el-form-item>
            <el-form-item class="mt-8">
               <el-button @click="addRate" type="primary">Yuborish</el-button>
            </el-form-item>
         </el-form>
      </div>
      <div class="bg-[#f5f0f0] mt-4 p-2 rounded" v-for="item in _items.content" :key="item.username">
         <div class="flex gap-1">
            <p class="text-xs text-gray-800">{{ item.firstname }}</p>
            <p class="text-xs text-gray-800">{{ item.lastname }}</p>
            <p class="text-xs text-gray-800">{{ formatDate_UTIL(item.createdDate, false) }}</p>
         </div>
         <p>{{ item.content }}</p>
      </div>
   </NuxtLayout>
</template>