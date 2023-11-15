<script lang="ts" setup>
const _isVisible = ref(true)
</script>
<template>
   <div>

      <div style="height: calc(100vh - 55px);" class="bg-green-dark flex justify-between">
         <!-- <div class="relative">
        <div @click="_isVisible = !_isVisible" class="w-7 h-7 flex justify-center items-center rounded-lg border border-gray/20 cursor-pointer absolute -right-[14px] top-9  bg-white">
          <img  :class="!_isVisible ? 'rotate-180 cursor-pointer' :'cursor-pointer'" src="@/assets/img/arrow.svg" alt="">
        </div>
        <SidebarSalom class="transition-all" :class="_isVisible ? 'w-[250px]' : 'w-12' "/>
      </div> -->
         <div class="rounded-2xl grow bg-indigo-200 h-full p-4">
            <slot />
         </div>
         <div class="fixed bottom-0 w-full">
            <Sidebar />
         </div>
      </div>
   </div>
</template>
<style lang="scss"></style>