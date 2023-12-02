<script lang="ts" setup>
// import FamilyLayout from './index.vue'
import { getProduct_API, createProduct_API, getCategories_API, createCategories_API, productCategories_API } from '@/services/product';
const route = useRoute()
const router = useRouter()
const _items = ref<any>([])
const _optionType = ref<any>([])
const _product = ref<any>({
   name: "",
   measureType: ""
})
const _catolog = ref<any>(JSON.parse(route?.query?.catalog))
const _category = ref<any>({
   name: '',
   parentId: _catolog?.value?.id
})
const dialogVisible = ref(false)
const dialogCategoriyaVisible = ref(false)

// const queryData = ref<any>({
//    page: Number(route.query?.currentPage) || 0,
//    size: 10,
// })

// async function getProduct() {
//    const [res, err] = await getProduct_API(queryData.value)
//    console.log(res);

//    if (err) return
//    _items.value = res.content
// }
async function getCategories(item = null) {
   const [res, err] = await getCategories_API(item)

   if (err) return
   _items.value = res
}
async function createCategories() {
   const [res, err] = await createCategories_API(_category.value)
   if (err) return

   dialogCategoriyaVisible.value = false
   ElMessage.success("Categoriya qo'shildi")
   getCategories(_catolog?.value.id)
   _category.value.name = ''
}
async function getProductCategories() {
   const [res, err] = await productCategories_API(_catolog?.value.id)
   console.log(res);

   if (err) return
   _optionType.value = res
}


async function createProduct() {
   _product.value.parentCategoryId = route.params.id
   const [res, err] = await createProduct_API(_product.value)
   console.log(res);

   if (err) return
   dialogVisible.value = false
   ElMessage.success("Maxsulot qo'shildi")
   getProductCategories()
   _product.value.name = ''
   _product.value.measureType = ''
}

!(!_catolog?.value.hasChild || _items?.length) ? getCategories(_catolog?.value.id) : getProductCategories()
</script>

<template>
   <NuxtLayout>
      <div class="flex justify-between">
         <div @click="router.go(-1)" class="flex justify-between items-center mb-6">
            <img class="w-6 h-6" src="@/assets/img/arrow-left.svg" alt="">
            <h2 class="text-xl text-[rgba(129,131,135,1)]">Katalog</h2>
         </div>
         <div class="flex justify-end">
            <el-button v-if="!_optionType?.length && (_items?.length || !_catolog.hasChild)"
               @click="dialogCategoriyaVisible = true" type="primary">Kategoriya qo'shish</el-button>
            <el-button v-if="!_items?.length && (_catolog?.length || !_catolog.hasChild)" @click="dialogVisible = true"
               type="primary">Maxsulot
               qo'shish</el-button>
         </div>
      </div>
      <div v-if="_catolog?.hasChild || _items?.length" class="mt-4">
         <h2 class="my-2 text-xl">Turkumlar</h2>
         <div @click="$router.push({ path: '/categories/' + item.id, query: { catalog: JSON.stringify(item) } })"
            class="bg-white border border-[#ccc] rounded p-2 mb-2 flex items-center justify-between"
            v-for="item, ind in _items" :key="ind">
            <p>{{ item.name }}</p>
            <img v-if="item.hasChild" class="w-5 h-5 rotate-180" src="@/assets/img/arrow-left.svg" alt="">
         </div>
      </div>
      <div v-else-if="!_catolog?.hasChild && _optionType?.length" class="mt-4">
         <h2 class="my-2 text-xl">Maxsulotlar</h2>
         <div class="bg-white border border-[#ccc] rounded p-2 mb-2" v-for="item, ind in _optionType" :key="ind">
            <p>{{ item.name }}</p>
         </div>
      </div>
      <el-dialog v-if="dialogVisible" v-model="dialogVisible" title="Katalog qo'shish" width="90%">
         <el-form label-position="top">
            <div class="grid grid-cols-1 gap-2">
               <el-form-item class="w-full" label="Nomini kiriting">
                  <el-input v-model="_product.name" />
               </el-form-item>
               <el-form-item class="w-full" label="O'lchov turi">
                  <el-input v-model="_product.measureType" />
               </el-form-item>
               <!-- <el-form-item class="w-full" label="Kategoriyani tanlang">
                  <el-select class="w-full" v-model="_product.parentCategoryId" placeholder="type" size="small">
                     <el-option v-for="item in _optionType" :key="item.id" :label="item.name" :value="item.id" />
                  </el-select>
               </el-form-item> -->
            </div>
            <div class="flex justify-end">
               <span class="dialog-foote2r">
                  <el-button @click="dialogVisible = false">Cancel</el-button>
                  <el-button type="primary" @click="createProduct">
                     qo'shish
                  </el-button>
               </span>
            </div>
         </el-form>
      </el-dialog>
      <el-dialog v-if="dialogCategoriyaVisible" v-model="dialogCategoriyaVisible" title="Maxsulot qo'shish" width="90%">
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
<style scoped>
.dialog-footer button:first-child {
   margin-right: 10px;
}
</style>