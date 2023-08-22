<script lang="ts" setup>

const _links =
      ref([
    {
        "to": "/dashbords",
        "title": "Дашборд",
         img: 'dashbord.svg',
         "activeClass": "dashbord"
    },
    {
        "to": "/orders",
        "title": "Заказы",
         img: 'Inbox.svg',
        "activeClass": "orders"
    },
    {
        "to": "/liveMaps",
        "title": "Живая карта",
         img: "karta.svg",
        "activeClass": "liveMaps"
    }
])
function setImageUri(image_name: string) {
   let uri = new URL(`../../assets/img/${image_name}`, import.meta.url)?.href
   return uri
}

</script>
<template>
    <div class="sidebar w-[250px] h-full bg-white p-6 border-r border-r-black/10"> 
        <div v-for="link, ind in _links" :key="ind">    
            <NuxtLink :to="link.to" :class="$route.path.includes(link.activeClass) ? 'router-link-active bg-primary-300' : ''" class="flex gap-3 items-center p-4 mt-1 rounded-xl">
                <!-- <component class="w-4 h-4" :is="link.img"></component> -->
                <img :src="setImageUri(link.img)" alt="">
                <p class="font-montserrat-600 text-sm text-black">{{ link.title }}</p>
            </NuxtLink>
        </div>
    </div>
</template>
<style lang="scss">
 .sidebar {   

 }
</style>