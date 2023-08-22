<template>
  <div>
    <div class="bg-indigo-700 py-4">
      <img class="cursor-pointer" src="@/assets/img/logo.svg" alt="">
    </div>
    <div style="height: calc(100vh - 55px);" class="bg-green-dark flex justify-between">
      <div class="relative">
        <div class="w-7 h-7 flex justify-center items-center rounded-lg border border-gray/20 cursor-pointer absolute -right-[14px] top-9  bg-white">
          <img src="@/assets/img/arrow.svg" alt="">
        </div>
        <Sidebar />
      </div>
      <div class="rounded-2xl grow bg-white h-full py-6 px-12">
        <slot />
      </div>
    </div>
  </div>
</template>