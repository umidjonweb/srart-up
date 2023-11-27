import { AxiosResponse, BaseResponse, axiosInstance } from './axios'

export async function searchContact_API(number: string): Promise<[BaseResponse<any>, null] | [null, Error]> {
   try {
      const response = <AxiosResponse<BaseResponse<any>>>(
         await axiosInstance.get('/contacts/search', {
            params: {
               number: number?.replaceAll(" ", "")
            }
         }))
      return [response.data, null]
   } catch (error) {
      return [null, error as Error]
   }
}

export async function addContact_API(data: any): Promise<[BaseResponse<any>, null] | [null, Error]> {
   try {
      const response = <AxiosResponse<BaseResponse<any>>>(
         await axiosInstance.post('/contacts', data))
      return [response.data, null]
   } catch (error) {
      return [null, error as Error]
   }
}
export async function myContact_API(data: any): Promise<[BaseResponse<any>, null] | [null, Error]> {
   try {
      const response = <AxiosResponse<BaseResponse<any>>>(
         await axiosInstance.get('/contacts/me', {
            params: {
               ...data
            }
         }))

      return [response.data, null]
   } catch (error) {
      return [null, error as Error]
   }
}