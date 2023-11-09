<template>
    <div class="bg-blue-100 min-h-screen">
      <div class="w-full bg-indigo-700 py-4">
       <img class="cursor-pointer" src="@/assets/img/logo.svg" alt="">
     </div>
    <div style="height: calc(100vh - 63px);" class="flex justify-center flex-col items-center">
      <slot />
    </div>
    </div>
</template>
