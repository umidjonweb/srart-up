<script lang="ts" setup>
import { _loginStore } from '@/services/login';
const _links = computed(() => {
   if (_loginStore.value?.role?.[0] == 'USER') {
      return [
         {
            "to": "/home/family",
            "title": "Asosiy",
            "img": resolveComponent("IconHome"),
            "activeClass": "home"
         },
         {
            "to": "/restarants",
            "title": "Restarantlar",
            "img": resolveComponent("IconRestarant"),
            "activeClass": "restarants"
         },
         {
            "to": "/like",
            "title": "Tanlanganlar",
            "img": resolveComponent("IconLike"),
            "activeClass": "like"
         },
         {
            "to": "/foods",
            "title": "Ovqatlar",
            "img": resolveComponent("IconFood"),
            "activeClass": "foods"
         },
         {
            "to": "/profil",
            "title": "Profil",
            "img": resolveComponent("IconProfil"),
            "activeClass": "profil"
         }
      ]
   }
   else {
      return [
         {
            "to": "/restarants",
            "title": "Restarantlar",
            "img": resolveComponent("IconRestarant"),
            "activeClass": "restarants"
         },
         {
            "to": "/like",
            "title": "Tanlanganlar",
            "img": resolveComponent("IconLike"),
            "activeClass": "like"
         },
         {
            "to": "/foods",
            "title": "Ovqatlar",
            "img": resolveComponent("IconFood"),
            "activeClass": "foods"
         },
         {
            "to": "/profil",
            "title": "Profil",
            "img": resolveComponent("IconProfil"),
            "activeClass": "profil"
         }
      ]
   }
})





</script>
<template>
   <div class="sidebar bg-white h-[70px] border-r border-r-black/10 w-full flex justify-between px-3">
      <div class="h-full" v-for="link, ind in _links" :key="ind">
         <NuxtLink :to="link.to" :class="$route.path.includes(link.activeClass) ? 'router-link-active' : ''"
            class="block h-full">
            <div class="flex justify-center items-center flex-col h-full">
               <component :is="link.img"></component>
               <p class="font-inter-500 text-sm text-[#B8B8D2]">{{ link.title }}</p>
            </div>
         </NuxtLink>
      </div>
   </div>
</template>
<style lang="scss">
.sidebar {
   .router-link-active {
      p {
         color: #00A2B7;
      }
   }
}

.w-12 {
   .item {
      display: none;
   }
}
</style>