import { AxiosResponse, BaseResponse, axiosInstance } from './axios'
// import { useStorage } from '@vueuse/core';


export async function getProfil_API(id: string): Promise<[BaseResponse<any>, null] | [null, Error]> {
   try {
      const response = <AxiosResponse<BaseResponse<any>>>(
         await axiosInstance.get('/profiles/'+ id )
      )

      return [response.data, null]
   } catch (error) {
      return [null, error as Error]
   }
}
export async function profilUser_API(id: string): Promise<[BaseResponse<any>, null] | [null, Error]> {
   try {
      const response = <AxiosResponse<BaseResponse<any>>>(
         await axiosInstance.get('/profiles/user/'+ id )
      )

      return [response.data, null]
   } catch (error) {
      return [null, error as Error]
   }
}
export async function updateProfil_API(id: string, data): Promise<[BaseResponse<any>, null] | [null, Error]> {
   try {
      const response = <AxiosResponse<BaseResponse<any>>>(
         await axiosInstance.put('/profiles/'+ id, data )
      )

      return [response.data, null]
   } catch (error) {
      return [null, error as Error]
   }
}