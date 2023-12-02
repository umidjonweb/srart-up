<script lang="ts" setup>
import { getCategories_API, createCategories_API } from '@/services/product';


const _items = ref<any>([])
const _category = ref<any>({
   name: ''
})
const dialogVisible = ref<any>(false)
async function getCategories(item = null) {
   const [res, err] = await getCategories_API(item)
   console.log(res);

   if (err) return
   _items.value = res
}

async function createCategories() {
   const [res, err] = await createCategories_API(_category.value)
   console.log(res);

   if (err) return
   dialogVisible.value = false
   ElMessage.success("Categoriya qo'shildi")
   getCategories()
   _category.value.name = ''
}
getCategories()
</script>
<template>
   <NuxtLayout>
      <div class="flex justify-between mb-6">
         <h2 class="text-xl">Katalog</h2>
         <el-button @click="dialogVisible = true" type="primary">katalog qo'shish</el-button>
      </div>
      <div @click="$router.push({ path: '/categories/' + item.id, query: { catalog: JSON.stringify(item) } })"
         class="bg-white border border-[#ccc] rounded p-2 mb-2 flex items-center justify-between"
         v-for="item, ind in _items" :key="ind">
         <p>{{ item.name }}</p>
         <img v-if="item.hasChild" class="w-5 h-5 rotate-180" src="@/assets/img/arrow-left.svg" alt="">
      </div>
      <el-dialog v-if="dialogVisible" v-model="dialogVisible" title="Katalog qo'shish" width="90%">
         <el-form label-position="top">
            <el-form-item class="w-full" label="Nomini kiriting">
               <el-input v-model="_category.name" />
            </el-form-item>
            <div class="flex justify-end">
               <span class="dialog-foote2r">
                  <el-button @click="dialogVisible = false">Cancel</el-button>
                  <el-button type="primary" @click="createCategories">
                     qo'shish
                  </el-button>
               </span>
            </div>
         </el-form>
      </el-dialog>
   </NuxtLayout>
</template>

<style></style>