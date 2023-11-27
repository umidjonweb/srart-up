import { AxiosResponse, BaseResponse, axiosInstance } from './axios'


export async function getGroup_API(data: any): Promise<[BaseResponse<any>, null] | [null, Error]> {
   try {
      const response = <AxiosResponse<BaseResponse<any>>>(
         await axiosInstance.get('/groups', {
            params: {
               ...data
            }
         }))
      return [response.data, null]
   } catch (error) {
      return [null, error as Error]
   }
}
export async function getGroupOffer_API(data: any): Promise<[BaseResponse<any>, null] | [null, Error]> {
   try {
      const response = <AxiosResponse<BaseResponse<any>>>(
         await axiosInstance.get('/groups/offer', {
            params: {
               ...data
            }
         }))
      return [response.data, null]
   } catch (error) {
      return [null, error as Error]
   }
}
export async function getMembersGroup_API(data: any, id: string): Promise<[BaseResponse<any>, null] | [null, Error]> {
   try {
      const response = <AxiosResponse<BaseResponse<any>>>(
         await axiosInstance.get(`/groups/${id}/members`, {
            params: {
               ...data,
            }
         }))
      return [response.data, null]
   } catch (error) {
      return [null, error as Error]
   }
}
export async function inviteGroup_API(userId: any, id: string): Promise<[BaseResponse<any>, null] | [null, Error]> {
   try {
      const response = <AxiosResponse<BaseResponse<any>>>(
         await axiosInstance.post(`/groups/${id}/invite?userId=${userId}`))
      return [response.data, null]
   } catch (error) {
      return [null, error as Error]
   }
}
export async function declineGroup_API(id: string): Promise<[BaseResponse<any>, null] | [null, Error]> {
   try {
      const response = <AxiosResponse<BaseResponse<any>>>(
         await axiosInstance.put(`/groups/${id}/decline`))
      return [response.data, null]
   } catch (error) {
      return [null, error as Error]
   }
}
export async function acceptGroup_API(id: string): Promise<[BaseResponse<any>, null] | [null, Error]> {
   try {
      const response = <AxiosResponse<BaseResponse<any>>>(
         await axiosInstance.put(`/groups/${id}/accept`))
      return [response.data, null]
   } catch (error) {
      return [null, error as Error]
   }
}
export async function addGroup_API(data: any): Promise<[BaseResponse<any>, null] | [null, Error]> {
   try {
      const response = <AxiosResponse<BaseResponse<any>>>(
         await axiosInstance.post('/groups', data))
      return [response.data, null]
   } catch (error) {
      return [null, error as Error]
   }
}
