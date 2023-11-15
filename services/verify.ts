import { AxiosResponse, BaseResponse, axiosInstance } from './axios'

export async function verifyCode_API(data): Promise<[BaseResponse<any>, null] | [null, Error]> {
   try {
      console.log(data);
      
      const response = <AxiosResponse<BaseResponse<any>>>(
         await axiosInstance.post('/auths/verify', data )
      )

      return [response.data, null]
   } catch (error) {
      return [null, error as Error]
   }
}