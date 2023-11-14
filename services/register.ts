import { AxiosResponse, BaseResponse, axiosInstance } from './axios'

export async function register_API(data): Promise<[BaseResponse<any>, null] | [null, Error]> {
   try {
      console.log(data);
      
      const response = <AxiosResponse<BaseResponse<any>>>(
         await axiosInstance.post('/register', data )
      )

      return [response.data, null]
   } catch (error) {
      return [null, error as Error]
   }
}