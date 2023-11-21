<script lang="ts" setup>

const _links =
   ref([
      {
         "to": "/",
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
         "to": "/foods",
         "title": "Ovqatlar",
         "img": resolveComponent("IconLike"),
         "activeClass": "foods"
      },
      {
         "to": "/profil",
         "title": "Profil",
         "img": resolveComponent("IconProfil"),
         "activeClass": "profil"
      }
   ])


</script>
<template>
   <div class="sidebar bg-white h-[70px] border-r border-r-black/10 w-full grid grid-cols-4">
      <div class="h-full" v-for="link, ind in _links" :key="ind">
         <NuxtLink :to="link.to" :class="$route.path.includes(link.activeClass) ? 'router-link-active' : ''"
            class="block h-full">
            <div class="flex justify-center items-center flex-col h-full">
               <component  :is="link.img"></component>
               <p class="font-montserrat-600 text-sm text-[#B8B8D2]">{{ link.title }}</p>
            </div>
         </NuxtLink>
      </div>
   </div>
</template>
<style lang="scss">
.sidebar{
   .router-link-active{
      p{
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