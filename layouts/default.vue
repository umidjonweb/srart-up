<!-- <script lang="ts" setup>
const _isVisible = ref(true)
</script> -->
<template>
   <div>
      <div style="height: calc(100vh - 55px);">
         <div class="overflow-auto rounded-2xl h-full  p-4 mb-4 pb-16">
            <slot />
         </div>
         <div class="fixed bottom-0 w-full">
            <Sidebar />
         </div>
      </div>
   </div>
</template>
<style lang="scss"></style>