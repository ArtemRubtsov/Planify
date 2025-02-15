import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { handleError } from 'common/utils';

export const baseApi = createApi({
  reducerPath: 'todolistsApi',

  baseQuery: async (args, api, extraOptions) => {
    const response = await fetch('https://social-network.samuraijs.com/api/1.1/' + args.url, {
      method: args.method || 'GET',  
      headers: {
        'API-KEY': 'd9bbcdc0-0dbd-4e98-ab2c-6652c2ba0fb0',
        'Authorization': `Bearer ${localStorage.getItem('sn-token')}`, 
        'Content-Type': 'application/json',  
      },
      credentials: 'include',  
      body: args.body ? JSON.stringify(args.body) : undefined,  
    });

    // Ошибка если запрос не успешный
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Преобразуем ответ в JSON
    const jsonResponse = await response.json();

    // Возвращаем результат в формате, который ожидает fetchBaseQuery
    return { data: jsonResponse };
  },

  endpoints: () => ({}),
  tagTypes: ['Todolist', 'Task'],
});

