<script lang="ts" setup>
import FamilyLayout from '../index.vue'
import { singleNotes_API, searchProduct_API, patchNotes_API } from '@/services/product';
const dialogVisible = ref(false)
const _items = ref<any>([])
const route = useRoute()

const links = ref<any[]>([])
const _product = ref<any>({
   productId: "",
   name: "",
   weight: null,
   active: true
})
const status = ref<any>(false)

async function searchProduct() {
   const [res, err] = await searchProduct_API(_product.value.name)
   console.log(res);

   if (err) return
   links.value = res
}
async function patchNotes() {
   const [res, err] = await patchNotes_API(route.params.id, _product.value)
   console.log(res);

   if (err) return
   ElMessage.success("Maxsulot qo'shildi")
   dialogVisible.value = false
   _product.value.name = ""
   _product.value.productId = ""
   _product.value.weight = ""
}

let timeout: ReturnType<typeof setTimeout>
async function querySearchAsync(queryString: string, cb: (arg: any) => void) {
   if (queryString.length > 2) {
      await searchProduct()
   }
   const results = queryString
      ? links.value?.filter(createFilter(queryString))
      : links.value

   clearTimeout(timeout)
   timeout = setTimeout(() => {
      cb(results)
   }, 300 * Math.random())
}
const createFilter = (queryString: string) => {
   return (link: any) => {
      return (
         link.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      )
   }
}

const handleSelect = (item: Record<string, any>) => {
   console.log(item)
   _product.value.name = item.name
   _product.value.productId = item.id
}


async function getNotes() {
   const [res, err] = await singleNotes_API(route.params.id)
   console.log(res);

   if (err) return
   _items.value = res
}
getNotes()

async function handleItem() {
   const [res, err] = await patchNotes_API(route.params.id, { active: status.value })
   console.log(res);

   if (err) return
}
</script>
<template>
   <FamilyLayout>
      <div class="flex justify-end">
         <el-button @click="dialogVisible = true" type="primary">Maxsulot qo'shish</el-button>
      </div>
      <div v-for="item in _items.products" :key="item.id">
         <el-checkbox @change="handleItem" v-model="status"
            :label="item.weight + ' ' + item.measureType + ' ' + ' ' + item.name" size="large" />
      </div>
      <el-dialog v-if="dialogVisible" v-model="dialogVisible" title="Bozorlik qo'shish" width="90%">
         <el-form label-position="top">
            <div class="grid grid-cols-1 gap-2">
               <el-form-item class="w-full" label="Maxsulotni nomi">
                  <el-autocomplete class="w-full" v-model="_product.name" :fetch-suggestions="querySearchAsync"
                     placeholder="Maxsulotni qidiring" @select="handleSelect">
                     <template v-slot:default="{ item }">
                        {{ item.name }}
                     </template>
                  </el-autocomplete>
               </el-form-item>
               <el-form-item class="w-full" label="Og'irligini kiriting">
                  <el-input v-model="_product.weight" />
               </el-form-item>
            </div>
            <div class="flex justify-end">
               <span class="dialog-foote2r">
                  <el-button @click="dialogVisible = false">Cancel</el-button>
                  <el-button type="primary" @click="patchNotes">
                     Confirm
                  </el-button>
               </span>
            </div>
         </el-form>
      </el-dialog>
   </FamilyLayout>
</template>

<style></style>