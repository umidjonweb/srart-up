import { AxiosResponse, BaseResponse, axiosInstance } from './axios'
import { useStorage } from '@vueuse/core';
export const _registerStore = useStorage('register', {})
export async function register_API(data: any): Promise<[BaseResponse<any>, null] | [null, Error]> {
   try {
      console.log(data);

      const response = <AxiosResponse<BaseResponse<any>>>(
         await axiosInstance.post('/auths/register', data)
      )

      return [response.data, null]
   } catch (error) {
      return [null, error as Error]
   }
}

