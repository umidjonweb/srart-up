<script lang="ts" setup>
import HomeLayout from '../index.vue'
import { getHomeStyle_API, postHomeStyle_API, getHomeStyleMenu_API, postHomeStyleMenu_API, randomHomeStyle_API } from '@/services/home';
import { uploadFile_API } from "@/services/file"
import type { UploadFile } from 'element-plus'
const route = useRoute()
const router = useRouter()
const _items = ref<any>([])
const _item = ref({
   name: "",
   description: "",
   type: "",
   recipe: "",
   images: []
})
const _menu = ref({
   day: "",
   homeStyleId: "",
   type: ""
})
const _random = ref('')
const _option = ref([
   {
      label: "Nonushta",
      value: "BREAKFAST"
   },
   {
      label: "Tushlik yoki kechgi ovqat",
      value: "LUNCH_AND_DINNER"
   }
])

const _optionType = ref([
   {
      label: "Nonushta",
      value: "BREAKFAST"
   },
   {
      label: "Tushlik",
      value: "LUNCH"
   },
   {
      label: "Kechgi ovqat",
      value: "DINNER"
   }
])
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const dialogVisibleRandom = ref(false)
const dialogVisibleMenu = ref(false)
const disabled = ref(false)
const queryData = ref<any>({
   page: Number(route.query?.currentPage) || 0,
   size: 10,
})

async function getHomeStyle() {
   const [res, err] = await getHomeStyle_API(queryData.value)
   console.log(res);

   if (err) return
   _items.value = res.content
}
async function randomHome() {
   const [res, err] = await randomHomeStyle_API(_random.value)
   console.log('22222222222222',res);
   dialogVisibleRandom.value = false
   if (err) return
   _items.value = [res]
}

async function addFood() {
   // if (!formRef.value) return
   // formRef.value.validate(async (valid) => {
   // if (valid) {
   const [res, err] = await postHomeStyle_API(_item.value)
   console.log(res);

   dialogVisible.value = false
   if (err) return
   ElMessage.success("Ovqat qo'shildi")
   getHomeStyle()
   // router.push('/home/family')
   //    } else {
   //       return false
   //    }
   // })
}
const handleRemove = (file: UploadFile) => {
   console.log(file)
}

const handlePictureCardPreview = (file: UploadFile) => {
   dialogImageUrl.value = file.url!
   dialogVisible.value = true
}

const handleDownload = (file: UploadFile) => {
   console.log(file)
}
async function handleFile(file: UploadFile) {
   const [res, err] = await uploadFile_API(file.raw as any as File)
   if (err) return
   _item.value.images.push(res)
}

getHomeStyle()
function handleMenu(item) {
   dialogVisibleMenu.value = true
   _menu.value.homeStyleId = item.id
}
async function addMenu() {
   const [res, err] = await postHomeStyleMenu_API(_menu.value)
   console.log(res);

   if (err) return
   ElMessage.success("Menyu qo'shildi")
   dialogVisibleMenu.value = false
}

</script>

<template>
   <HomeLayout>
      <div class="home">
         <div class="grid grid-cols-2 gap-4">
            <el-form-item>
               <el-button type="primary" @click="dialogVisible = true" class="w-full mt-6">Ovqat qo'shish</el-button>
            </el-form-item>
            <el-form-item>
               <el-button @click="$router.push('/home/family/menu')" type="primary" plain
                  class="w-full mt-6">Rejalar</el-button>
            </el-form-item>
         </div>
         <div class="grid grid-cols-2 gap-4 my-6">
            <div></div>
            <el-button @click="dialogVisibleRandom = true" type="primary">Tasodifiy ovqat tanlash</el-button>
         </div>
         <NuxtLink :to="`/restarants/${food.id}`" class="block bg-white border border-[#ccc] rounded-md overflow-hidden mb-6 relative"
            v-for="food, ind in _items" :key="ind">
            <div>
               <div class="flex justify-center items-center bg-[#e7e3e3] p-2">
                  <el-image fit="contain" class="h-[120px]  rounded"
                     :src="`http://217.18.63.130:8008/api/oqibat/v1/files/download/resource?file=${food?.images[0]}`" />
               </div>
               <div class="p-4">
                  <p class="text-xl">{{ food.name }}</p>
                  <p class="text-black/50"><span class="text-black">Tayyorlash tartibi: </span>{{ food.description }}</p>
                  <p class="text-black/50"><span class="text-black">Retsept: </span>{{ food.recipe?.[0] }}</p>
                  <div class="">
                     <el-button class="mt-4" type="primary" @click.prevent="handleMenu(food)" primary>Reja
                        qo'shish</el-button>
                  </div>
               </div>
            </div>
         </NuxtLink>
         <el-dialog v-if="dialogVisible" v-model="dialogVisible" title="Ovqat" width="90%">
            <el-form label-position="top">
               <div class="grid grid-cols-2 gap-5">
                  <el-form-item size="small" label="Nomi">
                     <el-input v-model="_item.name" />
                  </el-form-item>
                  <el-form-item class="w-full" label="Ovqat Turi">
                     <el-select v-model="_item.type" placeholder="type" size="small">
                        <el-option v-for="item in _option" :key="item.value" :label="item.label" :value="item.value" />
                     </el-select>
                  </el-form-item>
               </div>
               <el-form-item size="small" label="Tayyorlash Tartibi">
                  <el-input rows="3" type="textarea" v-model="_item.description" />
               </el-form-item>
               <el-form-item size="small" label="Retsept">
                  <el-input rows="3" type="textarea" v-model="_item.recipe" />
               </el-form-item>
               <!-- <el-form-item size="small" label="Location">
               <el-input v-model="_item.location" />
            </el-form-item> -->

               <div>
                  <p class="text-xs mb-2 text-black-800">Rasm yuklang</p>
                  <el-upload :on-change="handleFile" action="#" list-type="picture-card" :auto-upload="false">
                     <el-icon>
                        <Plus />
                     </el-icon>

                     <template #file="{ file }">
                        <div>
                           <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                           <span class="el-upload-list__item-actions">
                              <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                                 <el-icon><zoom-in /></el-icon>
                              </span>
                              <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
                                 <el-icon>
                                    <Download />
                                 </el-icon>
                              </span>
                              <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                                 <el-icon>
                                    <Delete />
                                 </el-icon>
                              </span>
                           </span>
                        </div>
                     </template>
                  </el-upload>

               </div>
               <el-form-item>
                  <el-button type="primary" @click="addFood" class="w-full mt-6">Ovqat qo'shish</el-button>
               </el-form-item>
            </el-form>
         </el-dialog>
         <el-dialog v-if="dialogVisibleMenu" v-model="dialogVisibleMenu" title="Menyu" width="90%">
            <el-form label-position="top">
               <el-form-item class="w-full" label="Ovqat pishirish kuni">
                  <el-date-picker class="!w-full" format="DD.MM.YYYY" value-format="YYYY-MM-DD" v-model="_menu.day"
                     type="date" placeholder="Ovqat pishirish kuni" />
               </el-form-item>
               <el-form-item class="w-full" label="Ovqat Turi">
                  <el-select class="w-full" v-model="_menu.type" placeholder="type" size="small">
                     <el-option v-for="item in _optionType" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
               </el-form-item>
               <el-form-item>
                  <el-button type="primary" @click="addMenu" class="w-full mt-6">Rejani qo'shish</el-button>
               </el-form-item>
            </el-form>
         </el-dialog>
         <el-dialog v-if="dialogVisibleRandom" v-model="dialogVisibleRandom" title="Tasodifiy ovqat tanlash" width="90%">
            <el-form label-position="top">
               <el-form-item class="w-full" label="Ovqat Turi">
                  <el-select class="w-full" v-model="_random" placeholder="type" size="small">
                     <el-option v-for="item in _option" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
               </el-form-item>
               <el-form-item>
                  <el-button type="primary" @click="randomHome" class="w-full mt-6">Rejani qo'shish</el-button>
               </el-form-item>
            </el-form>
         </el-dialog>
      </div>
   </HomeLayout>
</template>

<style lang="scss">
.home {
   .el-dialog__body {
      padding-top: 0 !important;
   }
}
</style>