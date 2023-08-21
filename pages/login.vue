<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'

const router = useRouter()
const formRef = ref<FormInstance>()
const _form = ref({
    login: '',
    password:''
})

const rules = reactive<FormRules<any>>({
  login: [{required: true, message: 'Введите логин', trigger: 'blur' }],
  password: [{required: true, message: 'Введите пароль', trigger: 'blur' }],
})

const submitForm = () => {
  if (!formRef.value) return
  formRef.value.validate((valid) => {
    if (valid) {
      console.log('submit!')
      router.push('/dashbords')
    } else {
      console.log('error submit!')
      return false
    }
  })
}
</script>
<template>
  <NuxtLayout name="auth" class="login flex justify-center items-center h-screen">
        <div class="">
           <el-button type="primary" >asdasdasd</el-button>
        </div>
    </NuxtLayout>
</template>
<style lang="scss">

.login {
   .el-form-item__label{
     color: #358589 !important;
   }
   .el-input__wrapper {
    box-shadow: none;
   }
}
</style>
