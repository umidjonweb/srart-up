<script lang="ts" setup>
import HomeLayout from '../index.vue'
import { getHomeStyle_API, postHomeStyle_API, getHomeStyleMenu_API, postHomeStyleMenu_API, randomHomeStyle_API } from '@/services/home';
import { uploadFile_API } from "@/services/file"
import type { UploadFile } from 'element-plus'
const route = useRoute()
const router = useRouter()
const activeName = ref('first')
// const _items = ref<any>([])
// const _item = ref({
//    name: "",
//    description: "",
//    type: "",
//    recipe: "",
//    images: []
// })
// const _menu = ref({
//    day: "",
//    homeStyleId: "",
//    type: ""
// })
// const _random = ref('')
// const _option = ref([
//    {
//       label: "Nonushta",
//       value: "BREAKFAST"
//    },
//    {
//       label: "Tushlik yoki kechgi ovqat",
//       value: "LUNCH_AND_DINNER"
//    }
// ])

// const _optionType = ref([
//    {
//       label: "Nonushta",
//       value: "BREAKFAST"
//    },
//    {
//       label: "Tushlik",
//       value: "LUNCH"
//    },
//    {
//       label: "Kechgi ovqat",
//       value: "DINNER"
//    }
// ])
// const dialogImageUrl = ref('')
// const dialogVisible = ref(false)
// const dialogVisibleRandom = ref(false)
// const dialogVisibleMenu = ref(false)
// const disabled = ref(false)
// const queryData = ref<any>({
//    page: Number(route.query?.currentPage) || 0,
//    size: 10,
// })

// async function getHomeStyle() {
//    const [res, err] = await getHomeStyle_API(queryData.value)
//    console.log(res);

//    if (err) return
//    _items.value = res.content
// }
// async function randomHome() {
//    const [res, err] = await randomHomeStyle_API(_random.value)
//    console.log('22222222222222', res);
//    dialogVisibleRandom.value = false
//    if (err) return
//    _items.value = [res]
// }

// async function addFood() {
//    // if (!formRef.value) return
//    // formRef.value.validate(async (valid) => {
//    // if (valid) {
//    const [res, err] = await postHomeStyle_API(_item.value)
//    console.log(res);

//    dialogVisible.value = false
//    if (err) return
//    ElMessage.success("Ovqat qo'shildi")
//    getHomeStyle()
//    // router.push('/home/family')
//    //    } else {
//    //       return false
//    //    }
//    // })
// }
// const handleRemove = (file: UploadFile) => {
//    console.log(file)
// }

// const handlePictureCardPreview = (file: UploadFile) => {
//    dialogImageUrl.value = file.url!
//    dialogVisible.value = true
// }

// const handleDownload = (file: UploadFile) => {
//    console.log(file)
// }
// async function handleFile(file: UploadFile) {
//    const [res, err] = await uploadFile_API(file.raw as any as File)
//    if (err) return
//    _item.value.images.push(res)
// }

// getHomeStyle()
// function handleMenu(item) {
//    dialogVisibleMenu.value = true
//    _menu.value.homeStyleId = item.id
// }
// async function addMenu() {
//    const [res, err] = await postHomeStyleMenu_API(_menu.value)
//    console.log(res);

//    if (err) return
//    ElMessage.success("Menyu qo'shildi")
//    dialogVisibleMenu.value = false
// }

</script>

<template>
   <HomeLayout>
      <div class="home">
         <div class="flex gap-6">
            <router-link class="font-montserrat-600 text-sm" to="/home/family/foods"> Ovqatlar</router-link>
            <router-link class="font-montserrat-600 text-sm"  to="/home/family/product"> Bozorlik</router-link>
         </div>
         <div class="mt-4">
            <slot />
         </div>
      </div>
   </HomeLayout>
</template>

<style lang="scss">
.home {
   margin-top: 10px;
   .router-link-active {
      border-bottom: 2px solid #00A2B7;
      color: #00A2B7 !important;
   }

   .el-dialog__body {
      padding-top: 0 !important;
   }
}
</style>