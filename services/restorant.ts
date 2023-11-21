import { AxiosResponse, BaseResponse, axiosInstance } from './axios'

export async function searchRestorant_API(name: string): Promise<[BaseResponse<any>, null] | [null, Error]> {
   try {
      const response = <AxiosResponse<BaseResponse<any>>>(
         await axiosInstance.get('/restaurants/autocomplete', {
            params: {
               name
            }
         }))
      return [response.data, null]
   } catch (error) {
      return [null, error as Error]
   }
}
export async function getRestorant_API(data: any): Promise<[BaseResponse<any>, null] | [null, Error]> {
   try {
      const response = <AxiosResponse<BaseResponse<any>>>(
         await axiosInstance.get('/restaurants', {
            params: {
               ...data,
               status: 'NOT_VERIFIED'
            }
         }))
      return [response.data, null]
   } catch (error) {
      return [null, error as Error]
   }
}
export async function singleRestorant_API(id: any): Promise<[BaseResponse<any>, null] | [null, Error]> {
   try {
      const response = <AxiosResponse<BaseResponse<any>>>(
         await axiosInstance.get('/restaurants/' + id,))
      return [response.data, null]
   } catch (error) {
      return [null, error as Error]
   }
}
export async function updateRate_API(id: any, data: any): Promise<[BaseResponse<any>, null] | [null, Error]> {
   try {
      const response = <AxiosResponse<BaseResponse<any>>>(
         await axiosInstance.put(`/restaurants/rate/${id}?rate=${data.rate}`))
      return [response.data, null]
   } catch (error) {
      return [null, error as Error]
   }
}

export async function addRestorant_API(data: any): Promise<[BaseResponse<any>, null] | [null, Error]> {
   try {
      const response = <AxiosResponse<BaseResponse<any>>>(
         await axiosInstance.post('/restaurants', data))
      return [response.data, null]
   } catch (error) {
      return [null, error as Error]
   }
}
