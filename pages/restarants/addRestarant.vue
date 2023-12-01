<script lang="ts" setup>
import { addRestorant_API, addAdminRestorant_API } from "@/services/restorant"
import { getFood_API } from "@/services/food"
import { ref } from 'vue'
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
import { uploadFile_API } from "@/services/file"
import type { UploadFile } from 'element-plus'
import { _loginStore } from "@/services/login"
const router = useRouter()

const _optionsFood = ref<any>([])
const _item = ref({
   name: "",
   address: "",
   location: "",
   phoneNumber: "",
   images: [],
   foodIds: []
})
const route = useRoute()

const queryData = ref<any>({
   page: Number(route.query?.currentPage) || 0,
   size: 30,
})
async function getFood(item: string = 'VERIFIED') {
   const [res, err] = await getFood_API(queryData.value, item)
   console.log(res);
   if (err) return
   _optionsFood.value = Array.from({ length: res.content?.length || 0 }).map((_, idx) => ({
      value: res.content[idx]?.id,
      label: `${res.content[idx]?.name}`,
   }))
}
getFood()

async function addRestorant() {
   // if (!formRef.value) return
   // formRef.value.validate(async (valid) => {
   // if (valid) {
   _item.value.phoneNumber = _item.value.phoneNumber?.replaceAll(" ", "")

   const [res, err] = await addRestorant_API(_item.value)
   console.log(res);

   if (err) return
   ElMessage.success("Restarant qo'shildi")
   router.push('/restarants')
   //    } else {
   //       return false
   //    }
   // })
}
async function addAdminRestorant() {
   // if (!formRef.value) return
   // formRef.value.validate(async (valid) => {
   // if (valid) {
   _item.value.phoneNumber = _item.value.phoneNumber?.replaceAll(" ", "")

   const [res, err] = await addAdminRestorant_API(_item.value)
   console.log(res);

   if (err) return
   ElMessage.success("Restarant qo'shildi")
   router.push('/restarants')
   //    } else {
   //       return false
   //    }
   // })
}

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)

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
</script>

<template>
   <NuxtLayout>
      <div class="restarant max-w-[370px] p-2 pb-2 w-full mx-auto">
         <div class="flex gap-2 items-center mb-2">
            <img @click="$router.push('/restarants')" class="w-6 h-5" src="@/assets/img/left.svg" alt="">
            <h1 class="text-xl">Restarant qo'shish</h1>
         </div>
         <el-form label-position="top">
            <el-form-item size="small" label="Nomi">
               <el-input v-model="_item.name" />
            </el-form-item>
            <el-form-item size="small" label="Telefon nomer">
               <el-input v-model="_item.phoneNumber" v-maska data-maska="998 ## ### ## ##"
                  placeholder="998 ## ### ## ##" />
            </el-form-item>
            <el-form-item size="small" label="Address">
               <el-input v-model="_item.address" />
            </el-form-item>
            <!-- <el-form-item size="small" label="Location">
               <el-input v-model="_item.location" />
            </el-form-item> -->
            <el-form-item class="w-full" label="Ovqatlar">
               <el-select-v2 class="w-full" v-model="_item.foodIds" :options="_optionsFood" placeholder="Ovqatni tanlang"
                  multiple />
            </el-form-item>
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

               <el-dialog v-model="dialogVisible">
                  <img w-full :src="dialogImageUrl" alt="Preview Image" />
               </el-dialog>
            </div>
            <el-form-item>
               <el-button type="primary" @click="!_loginStore.role?.includes('ADMIN') ? addRestorant() : addAdminRestorant()" class="w-full mt-6 mb-2">Restarant qo'shish</el-button>
            </el-form-item>
         </el-form>
      </div>
   </NuxtLayout>
</template>
<style lang="scss">
.restarant {
   .el-form-item--small {
      margin-bottom: 5px !important;
   }

   .el-input--small .el-input__wrapper {
      height: 30px;
   }
}
</style>