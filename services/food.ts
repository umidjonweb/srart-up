import { AxiosResponse, BaseResponse, axiosInstance } from './axios'

export async function searchFood_API(name: string): Promise<[BaseResponse<any>, null] | [null, Error]> {
   try {
      const response = <AxiosResponse<BaseResponse<any>>>(
         await axiosInstance.get('/foods/autocomplete', {
            params: {
               name
            }
         }))
      return [response.data, null]
   } catch (error) {
      return [null, error as Error]
   }
}
export async function getFood_API(data: any): Promise<[BaseResponse<any>, null] | [null, Error]> {
   try {
      const response = <AxiosResponse<BaseResponse<any>>>(
         await axiosInstance.get('/foods', {
            params: {
               ...data
            }
         }))
      return [response.data, null]
   } catch (error) {
      return [null, error as Error]
   }
}
export async function singleFood_API(id: any): Promise<[BaseResponse<any>, null] | [null, Error]> {
   try {
      const response = <AxiosResponse<BaseResponse<any>>>(
         await axiosInstance.get('/foods/' + id,))
      return [response.data, null]
   } catch (error) {
      return [null, error as Error]
   }
}

export async function addFood_API(data: any): Promise<[BaseResponse<any>, null] | [null, Error]> {
   try {
      const response = <AxiosResponse<BaseResponse<any>>>(
         await axiosInstance.post('/foods', data))
      return [response.data, null]
   } catch (error) {
      return [null, error as Error]
   }
}
