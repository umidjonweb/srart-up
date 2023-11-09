    
<script lang="ts" setup> 
    
</script>
<template>
   <div>
     <NuxtLayout>
         <div>
           <div class="py-6 px-5 bg-white">
            <h3 class="text-3xl font-inter-600">Дашборд</h3>
            <h6 class="text-xs font-inter-600">Отчеты</h6>
           </div>
           <div class="bg-white grid grid-cols-5 ">
             <div class="px-6 mt-4 flex justify-between col-span-3 border">
                 <p>Продукты</p>  
                 <img src="@/assets/img/chevron-right.svg" alt="">
             </div>
             <div class="px-6 mt-4 flex justify-between col-span-2 border">
                <p>Рейтинг логистов</p>  
                <img src="@/assets/img/chevron-right.svg" alt="">
             </div>

           </div>
         </div>
     </NuxtLayout>
   </div>
</template>

<style>
 
</style>