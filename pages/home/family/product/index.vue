<script lang="ts" setup>
import FamilyLayout from '../index.vue'
import { getProduct_API, createProduct_API, getCategories_API, createNotes_API, getNotes_API } from '@/services/product';

const _items = ref<any>([])
const _product = ref<any>({
   name: "",
})
const dialogVisible = ref(false)
const _status = ref('ACTIVE')

const route = useRoute()
const router = useRouter()
const queryData = ref<any>({
   page: Number(route.query?.currentPage) || 0,
   size: 10,
})


async function createNotes() {
   const [res, err] = await createNotes_API(_product.value.name)
   console.log(res);

   if (err) return
   ElMessage.success("bozorlik qo'shildi")
   dialogVisible.value = false
   getNotes()
}
async function getNotes() {
   const [res, err] = await getNotes_API(queryData.value, _status.value)
   console.log(res);

   if (err) return
   _items.value = res.content
}

getNotes()
</script>

<template>
   <FamilyLayout>
      <div class="flex justify-end">
         <el-button @click="dialogVisible = true" type="primary">Bozorlik qo'shish</el-button>
         <!-- <el-button @click="dialogVisible = true" type="primary">Kategoriya qo'shish</el-button> -->
      </div>
      <div>
         {{ _items }}
         <div @click="$router.push({ path: '/home/family/product/' + item.id, query: { status: _status } })"
            class="bg-white border border-[#ccc] rounded p-2 mb-2 flex items-center justify-between"
            v-for="item, ind in _items" :key="ind">
            <p>{{ item.name }}</p>
            <img v-if="item.hasChild" class="w-5 h-5 rotate-180" src="@/assets/img/arrow-left.svg" alt="">
         </div>
      </div>
      <el-dialog v-if="dialogVisible" v-model="dialogVisible" title="Bozorlik qo'shish" width="90%">
         <el-form label-position="top">
            <div class="grid grid-cols-1 gap-2">
               <el-form-item class="w-full" label="Nomini kiriting">
                  <el-input v-model="_product.name" />
               </el-form-item>   
            </div>
            <div class="flex justify-end">
               <span class="dialog-foote2r">
                  <el-button @click="dialogVisible = false">Cancel</el-button>
                  <el-button type="primary" @click="createNotes">
                     Confirm
                  </el-button>
               </span>
            </div>
         </el-form>
      </el-dialog>
   </FamilyLayout>
</template>
<style scoped>
.dialog-footer button:first-child {
   margin-right: 10px;
}
</style>