import { AxiosResponse, BaseResponse, axiosInstance } from './axios'

export async function getHomeStyle_API(data: any): Promise<[BaseResponse<any>, null] | [null, Error]> {
   try {
      const response = <AxiosResponse<BaseResponse<any>>>(
         await axiosInstance.get('/home-styles', {
            params: {
               ...data,
            }
         }))
      return [response.data, null]
   } catch (error) {
      return [null, error as Error]
   }
}
export async function postHomeStyle_API(data: any): Promise<[BaseResponse<any>, null] | [null, Error]> {
   try {
      const response = <AxiosResponse<BaseResponse<any>>>(
         await axiosInstance.post('/home-styles', {
            ...data,
            recipe: [data.recipe]
         }))
      return [response.data, null]
   } catch (error) {
      return [null, error as Error]
   }
}


export async function getHomeStyleMenu_API(data: any): Promise<[BaseResponse<any>, null] | [null, Error]> {
   try {
      const response = <AxiosResponse<BaseResponse<any>>>(
         await axiosInstance.get('/home-styles/plan', {
            params: {
               ...data,
            }
         }))
      return [response.data, null]
   } catch (error) {
      return [null, error as Error]
   }
}
export async function postHomeStyleMenu_API(data: any): Promise<[BaseResponse<any>, null] | [null, Error]> {
   try {
      const response = <AxiosResponse<BaseResponse<any>>>(
         await axiosInstance.post('/home-styles/plan', data))
      return [response.data, null]
   } catch (error) {
      return [null, error as Error]
   }
}
export async function randomHomeStyle_API(type: any): Promise<[BaseResponse<any>, null] | [null, Error]> {
   try {
      const response = <AxiosResponse<BaseResponse<any>>>(
         await axiosInstance.get('/home-styles/random/' + type))
      return [response.data, null]
   } catch (error) {
      return [null, error as Error]
   }
}


