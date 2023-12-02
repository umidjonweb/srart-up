import { AxiosResponse, BaseResponse, axiosInstance } from './axios'

export async function getProduct_API(item: any): Promise<[BaseResponse<any>, null] | [null, Error]> {
   try {
      const response = <AxiosResponse<BaseResponse<any>>>(
         await axiosInstance.get('/products', {
            params: {
               ...item
            }
         }))
      return [response.data, null]
   } catch (error) {
      return [null, error as Error]
   }
}
export async function createProduct_API(item: any): Promise<[BaseResponse<any>, null] | [null, Error]> {
   try {
      const response = <AxiosResponse<BaseResponse<any>>>(
         await axiosInstance.post('/admins/product', item))
      return [response.data, null]
   } catch (error) {
      return [null, error as Error]
   }
}
export async function verifyProduct_API(id: number): Promise<[BaseResponse<any>, null] | [null, Error]> {
   try {
      const response = <AxiosResponse<BaseResponse<any>>>(
         await axiosInstance.patch('/products/verify/' + id,))
      return [response.data, null]
   } catch (error) {
      return [null, error as Error]
   }
}
export async function singleProduct_API(id: number): Promise<[BaseResponse<any>, null] | [null, Error]> {
   try {
      const response = <AxiosResponse<BaseResponse<any>>>(
         await axiosInstance.get('/products/verify/' + id,))
      return [response.data, null]
   } catch (error) {
      return [null, error as Error]
   }
}
export async function searchProduct_API(name: string): Promise<[BaseResponse<any>, null] | [null, Error]> {
   try {
      const response = <AxiosResponse<BaseResponse<any>>>(
         await axiosInstance.get('/products/autocomplete', {
            params: {
               name
            }
         },))
      return [response.data, null]
   } catch (error) {
      return [null, error as Error]
   }
}

export async function getCategories_API(parentId: any): Promise<[BaseResponse<any>, null] | [null, Error]> {
   try {
      const response = <AxiosResponse<BaseResponse<any>>>(
         await axiosInstance.get('/categories', {
            params: {
               parentId
            }
         }))
      return [response.data, null]
   } catch (error) {
      return [null, error as Error]
   }
}
export async function createCategories_API(item: any): Promise<[BaseResponse<any>, null] | [null, Error]> {
   try {
      const response = <AxiosResponse<BaseResponse<any>>>(
         await axiosInstance.post('/categories', item))
      return [response.data, null]
   } catch (error) {
      return [null, error as Error]
   }
}
export async function productCategories_API(id: number): Promise<[BaseResponse<any>, null] | [null, Error]> {
   try {
      const response = <AxiosResponse<BaseResponse<any>>>(
         await axiosInstance.get(`/categories/${id}/product`))
      return [response.data, null]
   } catch (error) {
      return [null, error as Error]
   }
}

export async function getNotes_API(item: any, status: string): Promise<[BaseResponse<any>, null] | [null, Error]> {
   try {
      const response = <AxiosResponse<BaseResponse<any>>>(
         await axiosInstance.get(`/notes`))
      return [response.data, null]
   } catch (error) {
      return [null, error as Error]
   }
}

export async function createNotes_API(name: any,): Promise<[BaseResponse<any>, null] | [null, Error]> {
   try {
      const response = <AxiosResponse<BaseResponse<any>>>(
         await axiosInstance.post(`/notes`, { name }))
      return [response.data, null]
   } catch (error) {
      return [null, error as Error]
   }
}
export async function patchNotes_API(id: any, item: any): Promise<[BaseResponse<any>, null] | [null, Error]> {
   try {
      const response = <AxiosResponse<BaseResponse<any>>>(
         await axiosInstance.patch(`/notes/upsert/${id}`, { ...item }))
      return [response.data, null]
   } catch (error) {
      return [null, error as Error]
   }
}

export async function singleNotes_API(id: any): Promise<[BaseResponse<any>, null] | [null, Error]> {
   try {
      const response = <AxiosResponse<BaseResponse<any>>>(
         await axiosInstance.get(`/notes/` + id))
      return [response.data, null]
   } catch (error) {
      return [null, error as Error]
   }
}

