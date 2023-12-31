import { AxiosResponse, BaseResponse, axiosInstance } from './axios'
import { useStorage } from '@vueuse/core';
export const _loginStore = useStorage('login', {})

export async function login_API(data): Promise<[BaseResponse<any>, null] | [null, Error]> {
   try {
      console.log(data);
      
      const response = <AxiosResponse<BaseResponse<any>>>(
         await axiosInstance.post('/auths/login', data )
      )

      return [response.data, null]
   } catch (error) {
      return [null, error as Error]
   }
}