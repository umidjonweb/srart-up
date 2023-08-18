<template>
  <div class="bg-green-dark flex justify-between h-screen py-5">
    <Sidebar />
    <div class="rounded-2xl grow bg-white h-full py-6 px-12">
      <slot />
    </div>
  </div>
</template>