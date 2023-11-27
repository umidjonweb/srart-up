<script lang="ts" setup>
import { addGroup_API } from '@/services/groups';
import type { UploadFile } from 'element-plus'
import { uploadFile_API } from "@/services/file"

const router = useRouter()
const activeName = ref('INITIAL')
const disabled = ref(false)
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const _item = ref({
   name: "",
   type: "",
   avatar: ""
})
const _option = ref([
   {
      label: "Oila",
      value: "FAMILY"
   },
   {
      label: "Boshqalar",
      value: "OTHER"
   }
])
const _phone = ref('')
const input2 = ref('')

async function addGroup() {
   const [res, err] = await addGroup_API(_item.value)
   console.log(res);

   if (err) return
   router.push('/profil/group')
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
   _item.value.avatar = res
}
</script>
<template>
   <NuxtLayout>
      <h2>Group</h2>
      <el-form class="" label-position="top">
         <!-- <el-form-item class="w-full">
            <el-input v-model="_search" placeholder="Ovqatlarni qidiring..." :prefix-icon="Search" />
         </el-form-item> -->

         <div class="grid grid-cols-2 gap-4 items-end">
            <el-form-item size="small" label="Nomi">
               <el-input v-model="_item.name" />
            </el-form-item>
            <el-form-item class="w-full" label="Kimni qo'shmoqchisiz">
               <el-select class="w-full" v-model="_item.type" placeholder="type" size="small">
                  <el-option v-for="item in _option" :key="item.value" :label="item.label" :value="item.value" />
               </el-select>
            </el-form-item>
         </div>
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
         <el-form-item class="w-full mt-4">
            <el-button class="w-full" @click="addGroup" type="primary">Qo'shish</el-button>
         </el-form-item>
      </el-form>
   </NuxtLayout>
</template>

<style></style>