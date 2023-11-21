<script lang="ts" setup>
const _isVisible = ref(true)
</script>
<template>
   <div>
      <div style="min-height: calc(100vh - 55px); height: 100%;">
         <div class="rounded-2xl h-full  p-4 mb-4 pb-12">
            <slot />
         </div>
         <div class="fixed bottom-0 w-full">
            <Sidebar />
         </div>
      </div>
   </div>
</template>
<style lang="scss"></style>