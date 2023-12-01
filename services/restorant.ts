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
export async function getRestorant_API(data: any, item: string): Promise<[BaseResponse<any>, null] | [null, Error]> {
   try {
      const response = <AxiosResponse<BaseResponse<any>>>(
         await axiosInstance.get('/restaurants', {
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
export async function getAdminRestatant_API(data: any, item: string): Promise<[BaseResponse<any>, null] | [null, Error]> {
   try {
      const response = <AxiosResponse<BaseResponse<any>>>(
         await axiosInstance.get('/admins/restaurant', {
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
export async function getLikeRestorant_API(data: any): Promise<[BaseResponse<any>, null] | [null, Error]> {
   try {
      const response = <AxiosResponse<BaseResponse<any>>>(
         await axiosInstance.get('/restaurants/liked', {
            params: {
               ...data,
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
export async function getRestorantComment_API(id: any, data: any): Promise<[BaseResponse<any>, null] | [null, Error]> {
   try {
      const response = <AxiosResponse<BaseResponse<any>>>(
         await axiosInstance.get('/restaurants/comment/' + id, {
            params: {
               ...data,
            }
         }))
      return [response.data, null]
   } catch (error) {
      return [null, error as Error]
   }
}
export async function verifyRestorant_API(id: any): Promise<[BaseResponse<any>, null] | [null, Error]> {
   try {
      const response = <AxiosResponse<BaseResponse<any>>>(
         await axiosInstance.put('/admins/restaurant/verify/' + id,))
      return [response.data, null]
   } catch (error) {
      return [null, error as Error]
   }
}
export async function rejectRestorant_API(id: any): Promise<[BaseResponse<any>, null] | [null, Error]> {
   try {
      const response = <AxiosResponse<BaseResponse<any>>>(
         await axiosInstance.put('/admins/restaurant/reject/' + id,))
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
export async function like_API(id: any): Promise<[BaseResponse<any>, null] | [null, Error]> {
   try {
      const response = <AxiosResponse<BaseResponse<any>>>(
         await axiosInstance.put(`/restaurants/like/${id}`))
      return [response.data, null]
   } catch (error) {
      return [null, error as Error]
   }
}
export async function unLike_API(id: any): Promise<[BaseResponse<any>, null] | [null, Error]> {
   try {
      const response = <AxiosResponse<BaseResponse<any>>>(
         await axiosInstance.put(`/restaurants/unlike/${id}`))
      return [response.data, null]
   } catch (error) {
      return [null, error as Error]
   }
}
export async function commentRestarant_API(id: any, data: any): Promise<[BaseResponse<any>, null] | [null, Error]> {
   try {
      const response = <AxiosResponse<BaseResponse<any>>>(
         await axiosInstance.post(`/restaurants/comment/${id}?content=${data.text}`))
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
export async function addAdminRestorant_API(data: any): Promise<[BaseResponse<any>, null] | [null, Error]> {
   try {
      const response = <AxiosResponse<BaseResponse<any>>>(
         await axiosInstance.post('/admins/restaurant', data))
      return [response.data, null]
   } catch (error) {
      return [null, error as Error]
   }
}
