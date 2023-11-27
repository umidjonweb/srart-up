<script lang="ts" setup>
import { ref } from 'vue'
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
import { uploadFile_API } from "@/services/file"
import { _loginStore } from '@/services/login'
import type { UploadFile } from 'element-plus'
import { addFood_API, addAdminFood_API } from "@/services/food"

const router = useRouter()
const _item = ref<any>({
   name: "",
   images: []
})


const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)

const handleRemove = (file: UploadFile) => {
   console.log(file)
}

const handlePictureCardPreview = (file: UploadFile) => {
   console.log(file);

   dialogImageUrl.value = file.url!
   dialogVisible.value = true
}

const handleDownload = (file: UploadFile) => {
   console.log(file)
}
async function handleFile(file: UploadFile) {
   console.log('filll', file);

   const [res, err] = await uploadFile_API(file.raw as any as File)
   if (err) return
   _item.value.images.push(res)
   console.log(res);
}

async function addFood() {
   // if (!formRef.value) return
   // formRef.value.validate(async (valid) => {
   // if (valid) {
   const [res, err] = await addFood_API(_item.value)
   console.log(res);

   if (err) return
   ElMessage.success("Ovqat qo'shildi")
   router.push('/foods')
   //    } else {
   //       return false
   //    }
   // })
}
async function addAdminFood() {
   const [res, err] = await addAdminFood_API(_item.value)
   console.log(res);

   if (err) return
   ElMessage.success("Ovqat qo'shildi")
   router.push('/foods')
}

</script>

<template>
   <NuxtLayout>
      <div class="max-w-[370px] w-full mx-auto">
         <div class="flex gap-2 items-center mb-3">
            <img @click="$router.push('/foods')" class="w-6 h-5" src="@/assets/img/left.svg" alt="">
            <h1 class="text-xl">Ovqat qo'shish</h1>
         </div>
         <el-form label-position="top">
            <el-form-item size="small" label="Nomi">
               <el-input v-model="_item.name" />
            </el-form-item>
            <div>
               <p class="text-xs mb-2 text-black-800">Ovqat</p>
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
               <el-button type="primary" @click="!_loginStore.role?.includes('ADMIN') ? addFood() : addAdminFood()"
                  class="w-full mt-6">Ovqat qo'shish</el-button>
            </el-form-item>
         </el-form>
      </div>
   </NuxtLayout>
</template>
<style>
.el-form-item--small {
   margin-bottom: 5px;
}

.el-input--small .el-input__wrapper {
   height: 30px;
}
</style>