import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { handleError } from "common/utils"

export const baseApi = createApi({
  reducerPath: "todolistsApi",

  baseQuery: async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: 'https://social-network.samuraijs.com/api/1.1/',
      credentials: 'include',
      prepareHeaders: (headers) => {
        headers.set('API-KEY', '00a6a071-8c92-43aa-847a-13b3b55569f0');
        const token = localStorage.getItem('sn-token');
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
      },
    })(args, api, extraOptions)

    handleError(api, result)

    return result
  },
  endpoints: () => ({}),
  tagTypes: ["Todolist", "Task"],
})
