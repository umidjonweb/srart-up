<script lang="ts" setup>

const _links = computed(()=> { 
    return  [
    {
        "to": "/dashbords",
        "title": "Дашборд",
        "img": resolveComponent("IconDashbord"),
         "activeClass": "dashbord"
    },
    {
        "to": "/orders",
        "title": "Заказы",
        "img": resolveComponent("IconDriver"),
        "activeClass": "orders"
    },
    {
        "to": "/logistics",
        "title": "Логисты",
        "img": resolveComponent("IconNet"),
        "activeClass": "logistics"
    }
]}
)

</script>
<template>
    <div class="sidebar w-[270px]"> 
        <div class="py-7 px-6 flex gap-1 items-center">
            <img src="@/assets/img/person.png" alt="">
            <div>
                <p class="text-white font-poppins-600 mt-1 text-lg leading-3">KAMOLIDDIN</p>
                <span class="font-poppins-400 text-white text-[11px] leading-3">+998 (97) 772-73-71</span>
            </div>
        </div>
        <h4 class="font-montserrat-800 text-xs text-white/60 px-7 mb-7">ГЛАВНОЕ МЕНЮ</h4>
        <div v-for="link, ind in _links" :key="ind">    
            <NuxtLink :to="link.to" :class="$route.path.includes(link.activeClass) ? 'router-link-active' : ''" class="relative ml-2 flex gap-3 items-center px-5 py-3 mt-1 rounded-l-3xl">
                <img class="absolute right-0 -top-6  z-0 hidden" src="@/assets/img/top.svg" alt="">
                <img class="absolute right-0 -bottom-6   z-0 hidden" src="@/assets/img/bottom.svg" alt="">
                <component class="w-4 h-4" :is="link.img"></component>
                <p class="font-montserrat-600 text-sm text-white">{{ link.title }}</p>
            </NuxtLink>
        </div>
    </div>
</template>
<style lang="scss">
 .sidebar {   
     .router-link-active{
        background: white;
        img{
            display: block;
        }
        p{
            color: #025256;
        }
     }
 }
</style>