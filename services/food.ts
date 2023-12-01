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
export async function getFood_API(data: any, item: string): Promise<[BaseResponse<any>, null] | [null, Error]> {
   try {
      const response = <AxiosResponse<BaseResponse<any>>>(
         await axiosInstance.get('/foods', {
            params: {
               ...data,
               status: item
            }
         }))
      return [response.data, null]
   } catch (error) {
      return [null, error as Error]
   }
}
export async function getAdminFood_API(data: any, item: string): Promise<[BaseResponse<any>, null] | [null, Error]> {
   try {
      const response = <AxiosResponse<BaseResponse<any>>>(
         await axiosInstance.get('/admins/food', {
            params: {
               ...data,
               status: item
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
export async function addAdminFood_API(data: any): Promise<[BaseResponse<any>, null] | [null, Error]> {
   try {
      const response = <AxiosResponse<BaseResponse<any>>>(
         await axiosInstance.post('/admins/food', data))
      return [response.data, null]
   } catch (error) {
      return [null, error as Error]
   }
}

export async function adminVerify_API(id: any): Promise<[BaseResponse<any>, null] | [null, Error]> {
   try {
      const response = <AxiosResponse<BaseResponse<any>>>(
         await axiosInstance.put('/admins/food/verify/' + id))
      return [response.data, null]
   } catch (error) {
      return [null, error as Error]
   }
}
export async function adminReject_API(id: any): Promise<[BaseResponse<any>, null] | [null, Error]> {
   try {
      const response = <AxiosResponse<BaseResponse<any>>>(
         await axiosInstance.put('/admins/food/reject/' + id))
      return [response.data, null]
   } catch (error) {
      return [null, error as Error]
   }
}
